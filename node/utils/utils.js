module.exports = {
  getParam: function (data) {
    return {
      "errcode": 0,
      "errmsg": "",
      "data": data
     }
    },
    getConsumerlist: function (data){
		return {
		"content": {
	          "data": data,
	          "rows": []
	      },
	      "message": "查询成功!",
	      "state": 1
        }
    }
}
