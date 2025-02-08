# ose-roll20-populate
tools to help populate a roll20 campaign with Old-School Essentials monsters

So, I didn't find a package in Roll20 to help me populate my campaign with monsters, so I decided to create it myself.

Using python 3.12.8, the javascript scripting engine included with Roll20, and Chatgpt.

ose-rip.py traverses the Old-School Essentials website (https://oldschoolessentials.necroticgnome.com/srd/index.php/Monster_Descriptions) and parses the pages
and stuffs that into a file ose-rip.json.

img-rip.py traverses the excellent art on https://youseethis.blog/tokens/ and sorts it into different subdirectories.

The plan so far is to run ose-rip.py, get the json, and plug it into ose-npc-create.js and run it.

Python Packages.
+ beautifulsoup4     4.12.3
+ certifi            2024.12.14
+ charset-normalizer 3.4.1
+ idna               3.10
+ pip                25.0
+ requests           2.32.3
+ soupsieve          2.6
+ urllib3            2.3.0


TODO List for Roll20 Monster Import Project

+ Convert Notes to Abilities
	+ Extract structured data from the "notes" field.
	+ Create abilities in Roll20 based on parsed content.
+ Parse and Add Attacks
	+ Extract attack details from the "Attacks" field.
	+ Properly format attacks into Roll20 attributes or abilities.
+ Handle Multi-Entry Monsters like Vampires or Elementals
	+ Identify entries with multiple attributes.
	+ Develop a method to process and store this data effectively.
+ Detect Embedded Monsters in Notes (Optional)
	+ Identify cases where additional creatures are mentioned in the "notes" field.
	+ Extract relevant details (e.g., "leader: group of 10 or more bandits has 3HD boss").
	+ Determine how to create separate NPCs for embedded monsters.