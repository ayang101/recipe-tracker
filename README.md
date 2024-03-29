## Recipe Tracker
An application that allows users to:
- store custom-filled or externally-linked recipes
- view saved recipes with ease, using an organized, tabular display
- plan meals from recipes or customized ingredients on a weekly basis
- create shopping lists to keep track of what items to shop for, saving more
This web application is built with React, ExpressJS, NodeJS, Python, MongoDB, Javascript, HTML, and CSS.

## Author
Anna Yang

## Features:
- #### (NEW) Frontend styling
 Home page comes with new attractions (in CSS), pleasing to the eyes.

- #### Import Recipe given Recipe URL
    * Users may import a recipe by providing a recipe url from an external site. After the url has been validated, data is scraped from the website with the use of python libraries, Beautiful Soup and recipe-scrapers.

- #### User
    * User Login/Logout
    * User Authentication

- #### Recipe Collection
    * Users can either customize their own recipes or import a recipe using a url. Form validation is included.
    * Sort Recipes alphabetically, rating, totalTime (ascending, descending)
    * Filter Recipes by category, cusine, ingredients, totalTime

- #### Meal Planner
    * Drag and drop meals to add a component into the weekly calender
    * Meal components may be added from uers' recipe list or created through a form
    * Delete meals easily after insertion
    * Navigate through the calender week by week

- #### Grocery Lists
    * Add multiple grocery lists
    * Add grocery items to each grocery list
    * View items from each grocery list and all items

## Challenges Faced:
- In setting up the web scraper in the backend, a new child process was spawned in Javascript (NodeJS) in order to run the python script. There are four different ways of doing so: spawn(), fork(), exec(), execFile(). Failure to conduct thorough research on all of the different functions led to a lack of efficiency via brute forcing.
The solution was to use execSync(). This function always waits for the child process to run and terminate before returning. This function fit perfectly for sending user input from javascript to the python script and receiving the results in the same API request.

- (BIG FIXED) Upon refreshing of the recipe details page, the webpage becomes blank. This was because the value of the useState Hook was not preserved after rerendering the webpage.
The solution was to use the useRef Hook to save the value across page refreshes.

- (TIP) Storing data in localStorage should be temporary. If implementing user accounts, localStorage should be cleared
  to ensure confidentiality of user data and information.

- (TIP) When setting localStorage, localStorage converts inputs to strings. To retreive from localStorage,
  convert the retreived entity into a string, replace unnecessary chars, wrap it in array brackets,
  and use JSON.parse() to produce a JSON array.

## Project Status
This project is currently undergoing development.
Some other features that will be implemented in the future:
- Web security (prevent SQL injection, unauthorized access)
- Chrome extension


## Project Screen Shot(s)

#### Signup/Login Forms  
<img src="images/signup-form.png" width="750" />
<img src="images/login-form.png" width="750" />

#### Home
##### Guest (unauthenticated user)
<img src="images/home-1.png" width="750" />

##### User (authenticated user)
<img src="images/home-2.png" width="750" />

#### Recipe Table  
<img src="images/recipe-table.png" width="750" />

#### Recipe Details 
<img src="images/recipe-detail.png" width="750" />

#### Custom Recipe Form
<img src="images/recipe-custom-form.png" width="750" />

#### Import Recipe Form
<img src="images/recipe-url-form.png" width="750" />

#### Meal Planner
<img src="images/meal-planner.png" width="750" />

#### Grocery List  
<img src="images/grocerylist.png" width="750" />


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

`http://localhost:3000` 

To Visit App (Backend):

`http://localhost:5000`

## Existing Bugs:
  - (FIXED) Upon user logging in, user-specific recipes only render only after refresh of webpage
  - Adding a new recipe triggers JSON.parse() error in the recipe table page; soon to be fixed
  - Grocery List check/uncheck issues
  - Webpage does not redirect user to user home page after successful login or logout
    