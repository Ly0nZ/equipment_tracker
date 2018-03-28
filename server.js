var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var port = 8000;

var app = express();

// use body-parser
app.use(bodyParser.urlencoded({ extended: true}));
// Connecting static folder
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and connecting views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/equipment_tracker');

// Create a Schema for Quotes
var ItemSchema = new mongoose.Schema({
	name: {type: String, required: [true, "Item name is required."], minlength: [2, "Name must be at least two characters."]},
	//originally quote_post
	description: {type: String, required: [true, "Description is required."], minlength:[2, "Description is too short."]},
	department: {type: String, required: true},
	}, {timestamps: true});
// Store the Schema under the name 'Quote'
mongoose.model('Item', ItemSchema);
// Retrieve the Schema called 'Quotes' and store it in variable 'Quote'
var Item = mongoose.model('Item');

// root route - rendering index
app.get('/', function(req, res){
	Item.find({}, function(err, items){
		if(err){
			console.log("Could not retrieve items", err);
			data = [];
		}
		else {
			console.log("Items retrieved!");
			data = {items: items};
		}
		res.render('index', data);
	});
});

app.get('/edit', function(req, res){
	res.render('edit');
});

app.get('/equipment/new', function(req, res){
	res.render('new');
});

app.post('/equipment', function(req, res){
	console.log("Item form data received", req.body);
	var item = new Item(req.body);
    item.save(function(err){
        if(err){
        	console.log("Error when submitting item.");
            res.render('new', {errors: item.errors});
        }
        else {
        	console.log("Success! New item added.");
            res.redirect('/');
        }
    });
});

var server = app.listen(port, function() {
	console.log(`listening on port ${port}`);
});