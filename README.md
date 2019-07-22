This project helps you to track the number of smokes that you have in a day and will warn you with different colors regarding the smokes  you've had and the target number you set.

This app also provides you a graph where you can see how many smokes you had on different days.

To make the prototype working I also added the backend server to the project.

## Available Scripts

### `npm install`

After you clone the repository you need to run `npm install` in both `/LearnReact` and `.../LearnReact/server` roots.

### `npm start`

To start both servers (frontend & backend) all you need is just to run `npm start` in the project main root, `/LearnReact`

## Backend Sever

For the sake of having the backend server, I used JSON-server which is a very well known package that gives you a full fake REST API.
The only issue with JSON-servers is that they can be fragile and easily crash. It may happen for instance if you make multiple deletions. In that case, don't worry at all, just kill both servers and re-run `npm start` in the main root.

## Used Packages
axios

 concurrently
 
  json-server
  
 lodash
 
 material-ui
 
react-date-picker  

 react-final-form
 
 react-redux
 
 react-router-dom
 
 recharts
 
 redux
 
 redux-thunk
