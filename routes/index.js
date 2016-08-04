var express = require('express');
var router = express.Router();
var validator = require('validator');




/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var userEmail = req.body.useremail;

    // Set our collection
    if (validator.isEmail('foo@bar.com')) {
        var collection = db.get('usercollection');
        collection.find({email:userEmail},function(error,data){
            // Submit to the DB
            usr=data;
            if(!error && !usr.length){
                collection.insert({
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": userEmail,
                    "created_at": new Date()
                }, function (err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem adding the information to the database.");
                    }
                    else {
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        //res.location("userlist");
                        // And forward to success page
                        res.redirect("userlist");
                    }
                });

            }
            else{   res.redirect("/");

            }

        });

    }
    else    res.redirect("/");

});

module.exports = router;