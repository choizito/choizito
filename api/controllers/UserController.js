/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	signup: function (req, res) {
		var username = req.param("username");
		var password = req.param("password");
		var mail = req.param("mail"); 
		User.findOne({ name:username},function(err, usr){
		    if (err) {
		        res.send(500, { error: "DB Error" });
		    } else if (usr) {
		        res.send(400, {error: "Username already Taken"});
		    } else {
			var bcrypt = require('bcrypt');
			 bcrypt.hash(password, 10, function(err, hash) {
			      if(err) res.send(400, {error: "Password Hash failed"});
			      password = hash;
			    });
		         
		        User.create({name: username, password: password,mail: mail}).done(function(error, user) {
		        if (error) {
		            res.send(500, {error: error});
		        } else {
		            req.session.user = user;
		            res.send(user);
		        }
		    });
		}
	    });
	},
	login: function (req, res) {
	    var username = req.param("username");
	    var password = req.param("password");
	     
	    User.findOne({ name:username}, function(err, usr) {
		if (err) {
		    res.send(500, { error: "DB Error" });
		} else {
		    if (usr) {
			var bcrypt = require('bcrypt');
                        bcrypt.compare(password, usr.password, function(error, result) {
                        if (result){
		            req.session.user = usr;
		            res.send(usr);
		        } else {
		            res.send(400, { error: "Wrong Password" });
		        }
                        });
		    } else {
		        res.send(404, { error: "User not Found" });
		    }
		}
	    });
	}
     
  
};
