import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import time

# URL to fetch
base_url = "https://oldschoolessentials.necroticgnome.com/srd/index.php/Monster_Descriptions"

# File to save the output
output_file = "ose-rip.json"

try:
    # Fetch the main webpage
    response = requests.get(base_url)
    response.raise_for_status()

    # Parse the main page
    soup = BeautifulSoup(response.text, 'html.parser')
    links = soup.find_all('a', title=True)

    all_data = []  # Collect all the data here

    for link in links:
        if 'href' in link.attrs:
            href = link['href']
            
            # Exclude specified texts in URLs
            if all(excluded not in href for excluded in ["Main_Page", "Monster_Descriptions", "Open_Game_License"]):
                if ':' not in href and '?' not in href:
                    full_url = urljoin(base_url, href)
                    #debugging for limiting pages to parse
                    #if not any(included in href for included in ["Crocodile", "Rat", "Snake", "Bear", "Dragon"]):
                    #   continue
                    # Add a delay of 100 milliseconds between requests
                    time.sleep(0.1)

                    # Fetch the individual page
                    page_response = requests.get(full_url)
                    page_response.raise_for_status()
                    page_soup = BeautifulSoup(page_response.text, 'html.parser')

                    # Extract data
                    content_div = page_soup.find('div', id='content')
                    
                    if content_div:
                        toc_div = content_div.find('div', id='toc')

                        # Handle multiple entries if TOC is present
                        if toc_div:
                            # Extract 'description' from the first <p> tag in 'mw-parser-output' div
                            mw_parser_output = content_div.find('div', class_='mw-parser-output')
                            global_description_tag = ""
                            global_notes=[]
                            if mw_parser_output:
                                first_element = mw_parser_output.find()
                                if first_element and first_element.name == 'p':
                                    global_description_tag = first_element.get_text(strip=True)
                                
                                # Extract 'notes' from the <ul> list below the table
                                notes_list = mw_parser_output.find('ul')
                                if notes_list:
                                    notes = [li.get_text(strip=True) for li in notes_list.find_all('li', class_=lambda x: x is None)]
                                    if notes:
                                        global_notes = notes
                            
                            entries = content_div.find_all('h2')
                            for entry in entries:
                                data = {}
                                # Extract 'name'
                                name_span = entry.find('span', class_='mw-headline')
                                if name_span:
                                    data['name'] = name_span.get_text(strip=True)

                                    # Extract 'description' from <p> tag after <h2>
                                    description_tag = entry.find_next_sibling('p')
                                    if description_tag:
                                        data['description'] = description_tag.get_text(strip=True) + " " + global_description_tag
                                    else:
                                        data['description'] = global_description_tag

                                    # Extract table data (key-value pairs) after <h2>
                                    table = entry.find_next_sibling('table')
                                    if table:
                                        for row in table.find_all('tr'):
                                            th = row.find('th')
                                            td = row.find('td')
                                            if th and td:
                                                key = th.get_text(strip=True)
                                                value = td.get_text(strip=True)
                                                data[key] = value

                                    # Extract 'notes' from <ul> after the table
                                    notes_list = table.find_next_sibling('ul') if table else entry.find_next_sibling('ul')
                                    if notes_list:
                                        notes = [li.get_text(strip=True) for li in notes_list.find_all('li')]
                                        if notes:
                                            notes = [note for note in notes if "See main entry" not in note]
                                            data['notes'] = notes + global_notes
                                    else:
                                        data['notes'] = global_notes


                                    # Append this entry's data
                                    all_data.append(data)
                                    
                        # Handle single entry if no TOC
                        else:
                            data = {}
                            # Extract 'name' from the <h1> tag
                            name_tag = content_div.find('h1')
                            if name_tag:
                                data['name'] = name_tag.get_text(strip=True)
                            
                            # Extract 'description' from the first <p> tag in 'mw-parser-output' div
                            mw_parser_output = content_div.find('div', class_='mw-parser-output')
                            if mw_parser_output:
                                description_tag = mw_parser_output.find('p')
                                if description_tag:
                                    data['description'] = description_tag.get_text(strip=True)
                                
                                # Extract table data (key-value pairs)
                                table = mw_parser_output.find('table')
                                if table:
                                    for row in table.find_all('tr'):
                                        th = row.find('th')
                                        td = row.find('td')
                                        if th and td:
                                            key = th.get_text(strip=True)
                                            value = td.get_text(strip=True)
                                            data[key] = value
                                
                                # Extract 'notes' from the <ul> list below the table
                                notes_list = mw_parser_output.find('ul')
                                if notes_list:
                                    notes = [li.get_text(strip=True) for li in notes_list.find_all('li')]
                                    if notes:
                                        data['notes'] = notes
                            
                            # Add the extracted data to the list
                            all_data.append(data)

    # Write all data to a JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=4, ensure_ascii=False)

    print(f"Data successfully written to {output_file}!")

except requests.exceptions.RequestException as e:
    print(f"Error fetching the webpage: {e}")

except Exception as e:
    print(f"An error occurred: {e}")
