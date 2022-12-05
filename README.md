# New CharlaBots README
# Installation 
The following commands are run within the NewCharlaBots folder:
1. '''python3 -m venv env
2. '''source env/bin/activate
3. '''pip install -r requirements.txt
4. '''pip install -e .

# To Run 
The following commands are run within the NewCharlaBots folder:
1. '''source env/bin/activate
2. '''npx webpack
(ignore error about schema-utils)
3. '''./bin/run
    (first remove the npx webpack line if present. You will only need to do this once)
4. Open localhost http://localhost:8000/ in a browser

# To Test
to run all tests: '''npm test
to run a specific test: '''npm test [testFileName]
to run code coverage: '''npm test -- --coverage




