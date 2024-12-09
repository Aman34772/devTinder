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
API- get user by ID
Create a delete user API
difference between patch and put
API- Update an user
Explore the Mongoose Documentationfor Model methods
what are options in a model.findOneAndUpdate method, explore more about it
API- Update the user with emailId
explore schematype options from the documentation
add required, unique, lowercase, min, minLength, trim
Add default value 
create a custom validate function for gender
Improve the DB scema - Put all appropriate validations on each field in Schema
Add timestamps to the schema
never ever trust on users data
Add API level validation on patch request and signup api
Data sanitization -Add API validations for each fields --can save our api from malicious data from the users of hackers 
Install validator
Explore Use Validator library functions and use validator functions for password, email and photourl
validate data in signup API
Install bcrypt package
Create a passwordHash using bcrypt.hash & save the user is encrypted password
Create login API 
Compare passwords and throw errors if email or password is invalid


when we say that cookie hijacking/cookie stealing if somebody steals my cookies i anybody stole my cookiei can just use the cookie to get all the api's of logged in users okay this is known as cookie hijacking **but any random attacker cannot steal your cookie untill they access to your computer or i write the javascript into the console to give the access tokens that's how authentication works on most of the websites almost all the websites which is on internet when i logged in never share your cookie with anyone

install cookie-parser
jwt send a dummy cookie to user
create GET /profile API and check if you get the cookie back
install jsonwebtoken
In login api,after email and password validation, create a jwt token and send it to user inside the cookie
read the cookies inside your profile API and find the logged in user
userAuth Middleware
Add the userAuth middleware in profile API and a new send ConnectionRequest API
Set the expiry of JWT token and cookies to 7 days

create userSchema methods to getJWT() 
create userSchema method to comparepassword(passwordInputByUser)

- Explore tinder APIs 
- Create a list of all APIs you can think of in devTinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, requests routers
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /Logout API
- Create PATCH /profile/edit
- Create Patch /profile/password API=> forgot password API
- Make You Validate all data in every POST,PATCH apis
- Test all APIs 

- Create Connection Request Schema 
- Send Connection Request API
- Proper Validation of Data
- Think about all corner cases
- Read $or query $and queries in mongoose
- Schema.pre("Save") function
- Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantages of creating?

- Read this article about compound indexes:  https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/

-ALWAYS THINK ABOUT CORNER CASES

- write code with proper validations for POST /request/review/:review/:requestId