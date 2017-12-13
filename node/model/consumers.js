const db = require('../utils/database.js')

const schema = new db.Schema({
	  username: {
	  	type: String,
	  	required: true
	  },
	  email: {
	  	type: String,
	  	required: true
	  },
	  date: {
	  	type: Date,
	  	required: true
	  },
	  phone: {
	  	type: String,
	  	required: true
	  },
	  resource: {
	  	type: String,
	  	required: true
	  }
})

const Consumers = db.model('consumers',schema)

module.exports = Consumers