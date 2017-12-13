const Consumers = require('../model/consumers.js')
const {getConsumerlist, getParam} = require('../utils/utils.js')
const async = require('async')

const getList = function (req,res,next){
	// Consumers.find({})
	// 	.then( (result) =>{
	// 		var t=setTimeout(function(){
	// 		  res.json(getConsumerlist(result))	
	// 		  clearTimeout(t);
	// 		},1000)
	// 	})
	let {pageNo , pagesize}=req.query
	let pageSize = pagesize ? pagesize :5
	console.log(pageNo,pageSize);
	// async.parallel([
	// 	function (cb){
	// 		Consumers.find({})
	// 			.then((all) => {
	// 				cb(null,all.length)
	// 			})
	// 	},
	// 	function (cb) {
	// 		let pageSize = pagesize ? pagesize : 5;
	// 		Consumers.find({})
	// 			.skip((pageNo-1)*pageSize)
	// 			.limit(pageSize)
	// 			.then((result) => {
	// 				cb(null,result)
	// 			})
	// 	}
	// 	],function (err, results) {
	// 		console.log('test');
	// 		let page = {
	// 			result: results[1],
	// 			pageCount:Math.ceil(results[0]/pageSize),
	// 			pageNo: parseInt(pageNo,10)
	// 		}
	// 		console.log(page);
	// 		res.json(getconsumerlist(page))
	// 	})
	Consumers.find({})
    .then((all) => {
      let documentSize = all.length
      Consumers.find({})
        .skip((pageNo-1) * pageSize)
        .limit(pageSize)
        .then((result) => {
          let page = {
            result,
            total: documentSize,
            pageNo: parseInt(pageNo, 10)
          }
          var t= setTimeout(function () {
          	res.json(getConsumerlist(page))
          	clearTimeout(t)
          },1000)
        })
    })
}

const addconsumers = function(req,res ,next){
	const { username, email, date, phone, resource} =req.body
	console.log(req.body);
	const willaddconsumers = new Consumers({
		username, email, date, phone, resource
	})
	willaddconsumers.save().then( () =>{
		console.log(11);
		res.json(getParam({success:true}))
	})
}

const getconsumer = function (req, res ,next) {
	const {id} = req.query
	Consumers.findOne({_id:id})
		.then((con) => {
			console.log(con);
			res.json(getParam(con))
		})
}

const updataconsumers = function (req , res , next) {
	const { username, email,  phone, resource} =req.body
	const setObj ={
		username,
		email,
		phone,
		resource
	}
	Consumers.findByIdAndUpdate(req.body.id,{
		$set: setObj
	}).then(() => {
		res.json(getParam({success:true}))
	})
}

const delconsumers = function (req , res , next) {
	const { id } = req.query
	console.log(id);
	Consumers.findByIdAndRemove(id)
		.then((consumers) => {
			res.json(getParam(consumers))
		})
}
module.exports = {
	getList,addconsumers,updataconsumers,delconsumers,getconsumer
}