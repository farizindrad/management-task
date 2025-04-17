# TASK MANAGEMENT API
This is a RESTful API for managing tasks. It allows users to create, read, update, and delete tasks. The API also supports filtering tasks based on their status and due date.

## FEATURE
* Create a new task
* Retrieve a list of all tasks
* Retrieve details of a specific task by ID
* Update a specific task's details
* Delete a task by ID

## Documentation
Complete documentation can be check in the [**API DOCUMENTATION**](https://documenter.getpostman.com/view/30931370/2sB2cbbypb)

## Installation
* Clone MANAGEMENT TASK API git repository
````
git clone https:// managementTaskApi
````
* Go to the  folder
````
cd managementTaskApi
````
* Make sure you have a `.env` file configured with your database credentials.
* Install dependencies
````
npm install
````
* Initialize the database
````
npm run sync
````
* Start the server
````
npm run start
````