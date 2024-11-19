create a repository
initialize the project
node_modules,package.json,package-lock.json
install express
create a server
listen to port 7777
write request handler for /test, /hello
Install nodemon and update scripts inside package.json
differnce between carret and tilda (^ and ~)
what are dependencies and dev dependencies
what is the use of "-g while installing npm install


initialize git 
gitignore
create a remote repository on github
push all code to remote origin

play with routes and route extensions ex: /hello, /hello/2, /xyz

Order of the routes matters
install postman app and make a workspace and collection
make a test api call

make right logic to handle get ,post ,patch,delete API calls and test them on postman

explore routing and use of ?,(),*,+ in the routes
Use of regex

use of regex in routes /a/, /.*fly$/
reading the query params  in the routes

//dynamic routes
Reading the query params in the routes
Reading the dynamic routes

Multiple Route Handlers - Play with the code
next()
next function and errors along with res.send()
app.use("/route", rH, [rH2,rH3],rH4,rH5);
read more about middlewares what is it and why do we need it
How express JS basically handles requests behind the scenes

http response status codes
 informational responses (100-199)
 Successful responses(200-299)
 Redirection messages(300-399)
 client error responses(400-499)
 Server error responses(500-599)

difference between app.use and app.all 
write a dummy auth middleware for admin
write a dummy auth middleware for all user routes,except /user/login

error handling usigng app.use("/",(err,req,res,next)=>{});

Create a free cluster on mongodb official website (Mongodb ATLAS)
Install mongoose library
connect your application to the database "Connection-URL"/devTinder
call the connectDb function and connect to the database before starting application on 7777

Create a userSchema and userModel
Create post /signup API to add data to database
push some documents using API calls from postman
Error Handling using try, catch
JS object and JSON (difference)
Add the express.json middleware to your app
Make your signup API dynamic to recieve data from the end user
User.findOne with duplicate email ids, which object returned

API -  get user by email
API- Feed API - GET/feed - get all the users from the database