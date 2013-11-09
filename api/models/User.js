/**
 * User
 *
 * @module      :: Model
 * @description :: basic model for a choizito user object 
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
	
	name: {
		type:'string',
		required:'true'
              },
	mail: {
		type:'email',
		required:'true'
              },
	 password: {
		type: 'string',
		minLength: 6,
		required: true,
		columnName: 'encrypted_password'
	      },
	fbid:'string' ,
	 // Override toJSON instance method
	 // to remove password value
	toJSON: function() {
	  var obj = this.toObject();
        // delete obj.password;
	   obj.password="HIDDEN"
	   return obj;
	   } 
  },
  // Encrypting pasword before saving it to database
  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
  }
};
