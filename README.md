## Recipe Tracker
An application used to store custom-filled or externally-linked recipes, built with React, ExpressJS, NodeJS, Python, MongoDB, Javascript, HTML, and CSS.

## Author
Anna Yang

## Features:
- #### Import Recipe given Recipe URL
Users may import a recipe by providing a recipe url from an external site. After the url has been validated, data is scraped from the website with the use of python libraries, Beautiful Soup and recipe-scrapers.

- #### Import Recipe through Direct Entry
Users may customize their own recipe. Form validation is included.

- #### Search Bar
Users can search a recipe by name out of all their recipes.

## Challenges Faced:
- In setting up the web scraper in the backend, a new child process was spawned in Javascript (NodeJS) in order to run the python script. There are four different ways of doing so: spawn(), fork(), exec(), execFile(). Failure to conduct thorough research on all of the different functions led to a lack of efficiency via brute forcing.
The solution was to use execSync(). This function always waits for the child process to run and terminate before returning. This function fit perfectly for sending user input from javascript to the python script and receiving the results in the same API request.

- (BIG FIXED) Upon refreshing of the recipe details page, the webpage becomes blank. This was because the value of the useState Hook was not preserved after rerendering the webpage.
The solution was to use the useRef Hook to save the value across page refreshes.

## Project Status
This project is currently undergoing development.
Some other features that will be implemented in the future:
- Sort Recipes alphabetically, categorically, etc.
- User Login/Logout
- User Authentication
- Web security (prevent SQL injection, unauthorized access)
- Chrome extension
- Improved Frontend CSS styling


## Project Screen Shot(s)

#### Recipe Table  
<img src="images/recipe-table.png" width="750" />

#### Recipe Details 
<img src="images/recipe-detail-1.png" width="750" />
<img src="images/recipe-detail-2.png" width="750" />

#### Custom Recipe Form
<img src="images/recipe-custom-form-1.png" width="750" />
<img src="images/recipe-custom-form-2.png" width="750" />

#### Import Recipe Form
<img src="images/recipe-url-form.png" width="750" />

## Installation and Setup Instructions
Clone this repository. This project requires `node` and `npm` to be installed globally onto your machine.  

Installation:

`npm install`  

To Run Test Suite:

`npm test`  

To Start Server, navigate to the 'react-frontend' directory and execute this command:

`npm start`

To Run Backend, navigate to the 'expressjs-backend' directory and execute this command:

`npm run dev`

To Visit App (Frontend):

`http://localhost:3000/recipes` 

To Visit App (Backend):

`http://localhost:5000`

## Existing Bugs:
  None so far
    