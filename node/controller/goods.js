const Goods = require('../model/goods.js')
const { getConsumerlist, getParam} = require('../utils/utils.js')
const async = require('async')

const getGoodsList = function(req, res, next){
	let {pageNo , pagesize}=req.query
	let pageSize = pagesize ? parseInt(pagesize) :5
	async.parallel([
		function (cb){
			Goods.find({})
				.then((all) => {
					cb(null,all.length)
				})
		},
		function (cb) {
			Goods.find({})
				.skip((pageNo-1)*pageSize)
				.limit(pageSize)
				.then((result) => {
					cb(null,result)
				})
		}
		],function (err, results) {
			let page = {				
	            result:results[1],
	            total: results[0],
	            pageNo: parseInt(pageNo, 10)
	          }
	          var t= setTimeout(function () {
	          	res.json(getConsumerlist(page))
	          	clearTimeout(t)
	          },1000)
		})
}

const addOrUpdate = function (req, res, next) {
  const {   goodsname,
			goodsprice,
			goodsactivity,
			goodssend,
			goodstag } = req.body
  if (req.body.goodsid) {
    const setObj = {
      goodsname,
			goodsprice,
			goodsactivity,
			goodssend,
			goodstag
    }

    if (req.file && req.file.filename) {
      setObj.goodsimg = req.file.filename
    }
    console.log(req.file && req.file.filename);
    Goods.findByIdAndUpdate(req.body.goodsid, {
      $set: setObj
    }).then(() => {
			res.json(getParam({success:true}))
    })
  } else {
    const willSave = new Goods({
            goodsname,
			goodsprice,
			goodsactivity,
			goodssend,
			goodstag,
			goodsimg: req.file && req.file.filename ? req.file.filename : ''
    })
    console.log('test');
    // 数据存储（入库）
    willSave.save().then(() => {
	    res.json(getParam({success:true}))
      
    })
  }
}


const deleteGoods = function (req, res ,next) {
	const {id} = req.query
	Goods.findByIdAndRemove(id)
		.then((result) => {
			res.json(getParam({success:true}))
		})
}

const getGoods = function (req, res, next) {
	const {id } = req.query
	Goods.findOne({_id:id})
		.then((goods) => {
			res.json(getParam(goods))
		})
}



module.exports = { getGoods, getGoodsList, deleteGoods, addOrUpdate}









