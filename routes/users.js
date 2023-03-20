var express = require('express');
var router = express.Router();
const { setResultInfo, SUCCESS,FAIL } = require('../public/common/common-result')
const user_connect = require('../public/mysql/mysql-db');
const userApi = require('../public/mysql/user-api/user-api')

/* GET users listing. */
router.get('/search/user/info', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.header('origin')); 
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const query = req.query;
  const sql = userApi.getSearchUserSql(query);
  const {userName, password} = query;
  user_connect.query(sql, [userName, password], (err, userList) => {
    if(err){
      const errRes = setResultInfo({errMsg: err.sqlMessage}, FAIL)
      res.send(errRes);
    }else{
      const result = setResultInfo({data: userList}, SUCCESS)
      res.send(result)
    }
  })
})

router.post('/create/user', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.header('origin')); 
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const query = req.body;
  const sql = userApi.getCreateUserSql()
  const { userName, nickName, password, email, level, age } = query || {};
  user_connect.query(sql, [userName, nickName, password, email, level, age ], (err, data) => {
    if(err){
      const errRes = setResultInfo({errMsg: err.sqlMessage}, FAIL)
      res.send(errRes);
    }else{
      const result = setResultInfo({data: data}, SUCCESS)
      res.send(result)
    }

  })
})

router.post('/vaild/user/account', (req,res) => {
  res.setHeader("Access-Control-Allow-Origin", req.header('origin')); 
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const query = req.body;
  const sql = userApi.getSearchUserSql(query);
  const {userName, password} = query;
  user_connect.query(sql, [userName, password], (err, data) => {
   if (Array.isArray(data) && data.length === 1 && data[0].username) {
        const result = setResultInfo({data}, SUCCESS)
        res.send(result);
        return
    }
    const errRes = setResultInfo({errMsg: err || '账号密码输入错误', data: []}, FAIL);
    res.send(errRes);
  })
})

module.exports = router;
