# MERNt ToDo That

A ToDo app. Used to explore the features and organization of the full MERN stack. Uses the Express router and Mongoose for database management, uses React features where possible for quicker view updates without needing the back end, and uses careful execution of asynchronous code to ensure no inconsistencies between front and back end data.

## How to read it

My front end starts in the `src` folder with `App.js` and `index.js`. Views are in the `components` directory.

My back end root is in `src/server.js`. This depends on files in the `routes`, `models`, and `controllers` directories.

## How to use it

Assuming you have NPM and Node installed you can just install dependencies and go:

You can use `npm run startBoth` to spin up the front and back ends simultaneously. A page for the front end will open automatically and you can test features like toggling complete/incomplete views, removing all completed todos, and updating todo content inline by clicking the text.

Use `npm run startDB` if you only want the back end to run. With this you can use Postman to check things like error handling with bad data (for instance send a GET to /todos/ and pull one of the todo id values, then send a PUT request to /todos/:id where you try to change the boolean value of "completed" to a nonsense string).

Using `npm start` will open just the front end but there won't be any major functionality and there is not much reason to do this.

_Of note:_ The CORS is set to allow requests from localhost:3000, which is where the front end will open by default. If you have anything on your system interfering with this default, you can just change `Access-Control-Allow-Origin` in `server.js` to a `*` wildcard, since security won't be an issue on a test-drive.
