var express = require('express');
var router = express.Router();
// var User = require('../database/db').user;
var MongoClient = require('mongodb').MongoClient;
var MongoDBCURD = require("./mongodbCommon");
var DB_CONN_STR = 'mongodb://localhost:27017/website';


/* GET home page. */
router.get('/', function (req, res) {
    // res.render('index', { title: 'dfd' });
    res.render('website/index')
});

/* login */
router.get('/login', function (req, res) {
    res.render('website/login')
}).post('/login', function (req, res) {
    var query = {name: req.body.name, password: req.body.pwd};
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err) throw err;
        MongoDBCURD.selectData(db, 'test', query, function (result) {
            if (result.length) {
                console.log('可以登录')
                res.header("Access-Control-Allow-Origin", "*");
                res.send({code: 1})
            } else {
                console.log('用户或密码错误')
                res.send({msg: '用户或密码错误'})
            }
        })
    })
});

/* register */
router.get('/register', function (req, res) {
    res.render('website/register')
}).post('/register', function (req, res) {
    var username = {name: req.body.name};
    var usertel = {tel: req.body.tel};
    var data = {name: req.body.name, tel: req.body.tel, password: req.body.password};
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err) throw err;
        MongoDBCURD.selectData(db, 'test', username, function (result) {
            if (result.length > 0) {
                console.log('用户已注册')
                res.send('用户已注册')
                
            } else {
                MongoDBCURD.selectData(db, 'test', usertel, function (result) {
                    if (result.length > 0) {
                        console.log('手机号已注册')
                        res.send('手机已注册')
                    } else {
                        MongoDBCURD.insertData(db, 'test', data, function (result) {
                            console.log('插入成功')
                            console.log(result)
                            res.header("Access-Control-Allow-Origin", "*");
                            res.send({code: 1})
                        })
                    }
                })
                
               
            }
        })
    })
    
});
router.get('/building', function (req, res) {
    res.render('website/building')
})
/* ucenter */
router.post('/ucenter', function(req, res) {
    var query = {name: req.body.name, password: req.body.password};
    (function(){
        user.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
          if(doc == 1){
            console.log(query.name + ": 登陆成功 " + new Date());
            res.render('ucenter', { title:'ucenter' });
          }else{
            console.log(query.name + ": 登陆失败 " + new Date());
            res.redirect('/');
          }
        });
    })(query);
});

module.exports = router;
