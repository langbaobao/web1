// login.js  登录
const express = require('express');
const router=express.Router();
const handlers=require("./db");
// 配置路由
router.get('/', (req, res) => {
    var data={
        name:req.query.name,
        psw:Number(req.query.psw)
    }
    handlers("teachers","find",data,(result)=>{
        if(result.length>0){
            res.send({"msg":"success"})
            // res.render("index");
        }else{
            res.send({"msg":"error"})
        }
    })
});
// 暴露路由
module.exports=router;

