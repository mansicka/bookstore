# Bookstore app
This is a simple excercise project written to gain knowledge on building a simple CRUD REST API. The UI is a rudimentary placeholder React project to serve as a simple testing plattform for the API. 


## Dependencies

Backend:

- cors@2.8.5 for CORS
- dotenv@10.0.0 for enviromental variables
- express@4.17.1 for web server functionality
- mysql2@2.3.0 for MySQL database connection


Frontend:

- @emotion/react@11.4.1 - for MaterialUI library
- @emotion/styled@11.3.0 - for MaterialUI library
- @mui/material@5.0.0 - An UI library for React
- react-dom@17.0.2 - an UI framework
- react-scripts@4.0.3 - for React functionality
- react@17.0.2- for React functionality


## Installation

For automated installation:

A bash script is included to automate the installation process. To run the installation, first make the script file executable:

    chmod u+x install

Then run the installation script:

    ./install

After this, you need to configure your database enviroment for the backend. To do this, see included .env.example file in /backend directory. Edit this file and save with a filename of ".env". 


Non-bash users should run *npm install* in both frontend and backend directories, as no automated installation script is provided for such enviroments.

## Starting the app

To start both the front and backend, run **npm start** in the main directory.
