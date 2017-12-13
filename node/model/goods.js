const db = require('../utils/database.js')

const schema = new db.Schema({
	goodsname:{
		type: String,
		required: true
	},
	goodsprice:{
		type: String,
		required: true
	},
	goodsactivity:{
		type: String,
		required: true
	},
	goodssend:{
		type: String,
		required: true
	},
	goodstag:{
		type: String,
		required: true
	},
	goodsimg:{
		type: String,
		required: true
	}
})

const Goods = db.model('goods',schema)

module.exports = Goods