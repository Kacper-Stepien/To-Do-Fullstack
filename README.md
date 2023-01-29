# To Do
The To Do app is a simple web application that allows users to create and manage a list of tasks. The app allows users to create an account, add tasks, edit them, delete them, and mark them as completed. When creating tasks, users can assign them a priority of "Low", "Medium", or "High", and tasks are displayed in different colors based on their priority. Users can also choose to display all tasks or only tasks of a certain priority, and this preference is saved in Local Storage. Tasks also have a creation date and a last modification date.


## Table of contents
- [Technologies used in the project](#technologies-used-in-the-project)
- [Features](#features)
- [App screenshots](#app-screenshots)
- [Run app](#run-app)


## Technologies used in the project:
[![](https://skills.thijs.gg/icons?i=nodejs,express,mysql,js,html,css,&theme=dark)](https://skills.thijs.gg)


## Features:
- Creating accounts
- Logging in
- Adding new tasks
- Editing tasks
- Deleting tasks
- Adding tasks to completed
- Assigning priorities to tasks: "low importance" "medium importance" "high importance"
- Selecting tasks to display: all or based on priority, user's selection is saved in local storage.


## App screenshots
### Landing page
![landing_page](/screens/landing%20page.png)
### Login page
![login_page](/screens/login%20page.png)
### Register page
![register_page](/screens/register%20page.png)
### Main page (after logging in)
![main_page](/screens/main%20page.png)
### Add new task
![add_task](/screens/add%20task.png)
### Modify task
![modify_task](/screens/modify%20task.png)


## Run App
To run the application on your computer, you need to follow these steps:
1.	Install Node.js
2.	Clone the repository with the application code to your computer (or download the ZIP file):

        git clone https://github.com/Kacper-Stepien/To-Do-Fullstack-.git 
    
3.	Go to the application folder and install dependencies:

        npm install

4.	Start XAMPP and turn on the Apache and MySQL servers
5.	Configure the database according to the data in the .env configuration file or modify the .env file so that the database configuration data in the file matches your database configuration data. The configuration file looks like this:
        
        DATABASE_HOST = "127.0.0.1"
        DATABASE_PORT = "3308"
        DATABASE_USER = "root"
        DATABASE_PASSWORD = ""  
        DATABASE_NAME = "todo"
        PORT = 8000
        
6.	Create tables in the database using the following SQL commands:

        CREATE TABLE users (
        iduser INT(11) NOT NULL AUTO_INCREMENT,
        login VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (iduser)
        );

        CREATE TABLE tasks (
        idtask INT(11) NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        priority VARCHAR(45) NOT NULL,
        finished TINYINT(4) NOT NULL,
        user_id INT(11) NOT NULL,
        added_date DATETIME NULL,
        last_modify_date DATETIME NULL,
        PRIMARY KEY (idtask),
        FOREIGN KEY (user_id) REFERENCES users(iduser)
        );

7.	Run the application with the command: node app.js

        node app.js

8.	Open the browser and enter the address http://localhost:8000 to access the application.
