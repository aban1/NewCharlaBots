# New CharlaBots README
# Installation 
**These steps only need to be completed once.**  
**These instructions are for WSL.** To find the mac equivalent, visit https://eecs485.org/
### Clone CharlaBots Repo  
1. git clone git@github.com:aban1/NewCharlaBots.git  <span style="color:green"># clones repo into a new folder called NewCharlaBots</span>
2. navigate to /NewCharlaBots 
### Install Pip and Python
1. sudo apt-get install python3 python3-pip python3-venv python3-wheel python3-setuptools  
### Setup sqlite3  
1. sudo apt-get install sqlite3  <span style="color:green"># installs sqlite3</span>
2. sqlite3 var/NewCharlaBots.sqlite3 < sql/schema.sql  <span style="color:green"># enters schema into the database</span>
### Setup Python Virtual Environment
1. python3 -m venv env  <span style="color:green">#creates a python virtual environment</span>
2. source env/bin/activate <span style="color:green"> #activates python virtual env</span>
3. pip install -r requirements.txt <span style="color:green"> #installs all dependencies</span>
4.  pip install -e . <span style="color:green">#installs all necessary python packages</span>

# To Run 
The following commands are run within the NewCharlaBots folder:
1. source env/bin/activate <span style="color:green"> # activates python virtual env
2. npx webpack <span style="color:green"> # compiles JavaScript files for browser use
(ignore error about schema-utils)
3. ./bin/run <span style="color:green"> # runs a bash script to start a dev Flask server
    (first remove the npx webpack line if present. You will only need to do this once)
4. Open localhost http://localhost:8000/ in a browser <span style="color:green"> # displays the app in a browser

# To Test
to run all tests: '''npm test
to run a specific test: '''npm test [testFileName]
to run code coverage: '''npm test -- --coverage

# Code Organization
CharlaBots closely follows 485 project structure (https://eecs485.org/). 
## JavaScript (newCharlaBots/static/js)
chat.js: chat with 1 bot  
chat1.js: js shared by chat with 1 bot and chat with 2 bots  
chat2.js: chat with 2 bots  
createLang.js: create bot language  
editor.js: edit bot language  
messages.js: handles messages arrays for chat pages

## HTML (newCharlaBots/templates)

chat.html: chat with 1 bot  
chat2.html: chat with 2 bots  
create.html: create a bot  
createLang.html: create a new language  
editor.html: edit a bot  
index.html: home page  
  
## CSS (newCharlaBots/static/style)

basic.css: basic styling for all pages  
chats.css: stlying for chat components  
codeEditor.css: styling for code editing components  
form.css: styling for form components  

## Page Routing (newCharlaBots/views)

index.py: functions for routing

## SQL Database (newCharlaBots/sql)
This project uses SQLite.  
schema.sql: database organization














