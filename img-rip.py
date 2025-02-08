import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

def sanitize_filename(name):
    return re.sub(r'[\\/*?"<>|]', "_", name)

def download_images(url, base_folder="tokens"):
    # Ensure the base output directory exists
    if not os.path.exists(base_folder):
        os.makedirs(base_folder)
    
    # Get the webpage content
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to retrieve page: {response.status_code}")
        return
    
    # Parse the HTML content
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Find all relevant P tags
    paragraphs = soup.find_all("p", class_="has-large-font-size")
    image_count = 0
    
    for p_tag in paragraphs:
        folder_name = "monsters" if "Monster" in p_tag.get_text() else sanitize_filename(p_tag.get_text().strip())
        subdir_path = os.path.join(base_folder, folder_name)
        if not os.path.exists(subdir_path):
            os.makedirs(subdir_path)
        
        # Get the next figure tag
        figure = p_tag.find_next_sibling("figure")
        if figure:
            download_images_from_figure(figure, subdir_path, url)
            image_count += 1
    
    print(f"Downloaded {image_count} images into subdirectories of '{base_folder}'")

def download_images_from_figure(figure, folder, base_url):
    for img_tag in figure.find_all("img"):
        if img_tag and img_tag.get("src"):
            img_url = urljoin(base_url, img_tag["src"])
            if "stupid-spacer" not in img_url:
                save_image(img_url, folder)

def save_image(img_url, folder):
    parsed_url = urlparse(img_url)
    filename = os.path.basename(parsed_url.path)
    
    if "stupid-spacer" in filename:
        print(f"Skipped: {filename}")
        return
    
    filepath = os.path.join(folder, filename)
    
    try:
        img_data = requests.get(img_url, stream=True)
        img_data.raise_for_status()
        
        with open(filepath, "wb") as file:
            for chunk in img_data.iter_content(1024):
                file.write(chunk)
        print(f"Saved: {filename} in {folder}")
    except requests.RequestException as e:
        print(f"Failed to download {img_url}: {e}")

if __name__ == "__main__":
    download_images("https://youseethis.blog/tokens/")
