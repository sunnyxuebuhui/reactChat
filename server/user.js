const express = require('express')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

Router.get('/info', (req, res) => {
  const { userId } = req.cookies
  console.log(req.cookies)
  if (!userId) return res.json({code: 1, msg: '服务异常'})
  User.find({_id: userId}, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '服务异常'})
    } else {
      if (doc) {
        return res.json({code: 0, data: doc})
      }
    }
  })
})

Router.get('/list', (req, res) => {
  const { userType } = req.query
  User.find({userType}, (err, doc) => {
    if(!err) return res.json(doc)
  })
})


/**
 * 获取聊天信息
 */
Router.get('/getMsgList', (req, res) => {
  const user = req.cookies.userId

  User.find({}, (e, userdoc) => {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    Chat.find({'$or': [{from: user}, {to: user}]}, (err, doc) => {
      if (!err) {
        return res.json({code: 0, msg: doc, users: users})
      }
    })
  })

})

/**
 * 双向通信，实时发送聊天信息
 */
Router.post('/readMsg', (req, res) => {
  const userId = req.cookies.userId
  const {from} = req.body
  Chat.update(
    {from, to: userId},
    {'$set': {read: true}},
    {'multi': true},
    (err, doc) => {
      if (!err) return res.json({code: 0, num: doc.nModified})
      return res.json({code: 1, msg: '修改失败'})
    }
  )
})





Router.post('/update', (req,res) => {
  const userId = req.cookies.userId
	if (!userId) {
		return res.json({code:1, msg: '未登录'})
	}
	const body = req.body
	User.findByIdAndUpdate(userId,body, (err,doc) => {
    console.log(111, doc)
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		}, body)
		return res.json({code:0,data})
	})
})



Router.post('/register', (req, res) => {
  const {user, pwd, repeatPwd, userType} = req.body
  console.log(req.body)
  let query = User.where({user});
  query.findOne((err, doc) => {
    if (!err) {
      if (doc) {
        return res.json({code: 3, msg: '账户已存在！'})
      } else {
        new User({user, pwd, repeatPwd, userType}).save((e,d) => {
          if (!e) {
            res.cookie('userId', d._id)
            return res.json({code: 0, msg: 'success', data: {user, pwd, repeatPwd, userType}})
          } else {
            return res.json({code: 1, msg: '服务异常！'})
          }
        })
      }
    } else {
      return res.json({code: 1, msg: '服务异常！'})
    }
  })
})


Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  let query = User.where({user, pwd})
  query.findOne((err, doc) => {
    if (!err) {
      if (!doc) {
        return res.json({code: 3, msg: '用户名或密码错误'})
      }
      res.cookie('userId', doc._id)
      return res.json({code: 0, data: doc})
    } else {
      return res.json({code: 1, msg: '服务异常！'})
    }
  })
})

module.exports = Router

