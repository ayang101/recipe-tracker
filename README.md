# recipe-tracker
###Author:__
    Anna Yang__



###Purpose:__
    The Recipe Tracker application provides a way for users to easily store their
    saved recipes, without having to look it up each time.



###Stack:__
    - Frontend:__
            React / HTML / CSS / JS____

    - Backend:__
            NodeJS / ExpressJS / MongoDB / Python__



###Special Instructions:__
    1) Download the code base onto your system.__
    2) Open two terminals (ex. bash)__
            - navigate the first one to the directory of the frontend, using this command:__
                    cd /recipe-tracker/react-frontend__
            - navigate the second one to the directory of the backend, using this command:__
                    cd /recipe-tracker/expressjs-backend__
    3) To run the application:__
            - in the react-frontend directory, execute this command__
                    npm start__
            - in the expressjs-backend directory, execute this command__
                    npm run dev__
    4) The application should appear in a new browser.__



###Existing Bugs:
    -> Upon refresh of the recipe details page, the screen is blank and the server crashes,
       because the backend does not retain the value of the recipe id after multiple calls.
    