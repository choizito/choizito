/**
 * Vote
 *
 * @module      :: Model
 * @description :: voting actions are stored every time a user makes a choice , they 're stored according to this model 
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	voter:'integer',
	votedFor:'integer',
	election:'integer'
    
  }

};
