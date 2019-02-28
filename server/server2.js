const express = require('express')
const mongoose = require('mongoose')

// 链接mongoose
const DB_URL = 'mongodb://127.0.0.1:27017/aaa'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('nongoose connect success')
})

// 类似于mysql的表
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true}
  })
)


var schema = new mongoose.Schema({ user: 'string', pwd: 'string' });
var KK = mongoose.model('User', schema);
//new KK({"user":"bbbb"}).save()

User.find({},(res,doc)=>{
  console.log(doc)
})


return;
// 新增数据
User.create({
  user: 'SUNNY',
  age: 11
}, {
  user: 'LIBAI',
  age: 13
}, {
  user: 'HOYTF',
  age: 18
}, (err, doc) => {
  !err ? console.log(doc) : console.log(err)
})

// 删除数据
User.remove({age: 11}, (err, doc) => {
  if (!err) {
    User.findOne({}, (e, d) => {
      console.log(d)
    })
  }
})

// 更新数据
User.update({'user': 'HOYTF'}, {'$set': {'user': 'STAY_WITH_ME'}}, (err, doc) => {
  if (!err) {
    User.find({}, (e, d) => {
      console.log(d)
    })
  }
})

const app = express()

app.get('/', (req, res) => {
  // res.send('<h1>Hello World</h1>')
  User.create({
    user: 'SUNNY',
    age: 11
  }, {
    user: 'LIBAI',
    age: 13
  }, {
    user: 'HOYTF',
    age: 18
  }, (err, doc) => {
    !err ? console.log(doc) : console.log(err)
  })
})

// 查找数据
app.get('/data', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})

app.listen(9093, () => {
  console.log('9093端口服务启动')
})