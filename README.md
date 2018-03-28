
*Project utilizes 4 CRUD methods with Mongoose. Application tracks business assets (specifically hardware equipment).

GET '/' Displays all of the equipment.
GET '/equipment/:id' Displays information about one piece of equipment.
GET '/equipment/new' Displays a form for adding new item to the DB.
POST '/equipment' Aaction attribute for the form in the above route (GET '/equipment/new').
GET '/equipment/edit/:id' Shows a form to edit an existing item.
POST '/equipment/:id' action attribute for the form in the above route (GET '/equipment/edit/:id').
POST '/equipment/destroy/:id'  deletes the item from the database by ID.

Dependencies:
-Node.js
-Express
-MongoDB

Node Modules:
-Mongoose
-EJS
-Express
-Body-Parser

Use Node Package Manager to install modules:
'npm install express --save'
'npm install ejs --save'
'npm install mongoose --save'
'npm install body-parser --save'
