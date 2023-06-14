# recipe-tracker
Author:
    Anna Yang



Purpose:
    The Recipe Tracker application provides a way for users to easily store their
    saved recipes, without having to look it up each time.



Stack:
    - Frontend:
            React / HTML / CSS / JS

    - Backend:
            NodeJS / ExpressJS / MongoDB / Python



Special Instructions:
    1) Download the code base onto your system.
    2) Open two terminals (ex. bash)
            - navigate the first one to the directory of the frontend, using this command:
                    cd /recipe-tracker/react-frontend
            - navigate the second one to the directory of the backend, using this command:
                    cd /recipe-tracker/expressjs-backend
    3) To run the application:
            - in the react-frontend directory, execute this command
                    npm start
            - in the expressjs-backend directory, execute this command
                    npm run dev
    4) The application should appear in a new browser.



Existing Bugs:
    -> Upon refresh of the recipe details page, the screen is blank and the server crashes,
       because the backend does not retain the value of the recipe id after multiple calls.
    