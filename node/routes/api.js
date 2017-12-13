const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')
const consumers = require('../controller/consumers.js')
const goods = require('../controller/goods.js')
const socket = require('../controller/socket.js')

const upload = require('../utils/uploadimg.js')

// 用户相关路由
router.post('/users/signUp', userController.signUp)
router.post('/users/signIn', userController.signIn)
router.get('/users/isLogin', userController.isLogin)
router.get('/users/logout', userController.logout)

//客户相关路由
router.post('/consumers/add', consumers.addconsumers)
router.get('/consumers/getconsumerlist', consumers.getList)
router.get('/consumers/delete',consumers.delconsumers)
router.get('/consumers/getconsumer',consumers.getconsumer)
router.post('/consumers/update',consumers.updataconsumers)

//商品有关路由
router.post('/goods/addorupdate', upload.single('pic'),goods.addOrUpdate)
router.get('/goods/getgoods', goods.getGoods)
router.get('/goods/deletegoods', goods.deleteGoods)
router.get('/goods/getgoodslist', goods.getGoodsList)

//socket 路由
router.post('/socket/send',socket.sendmes)

module.exports = router