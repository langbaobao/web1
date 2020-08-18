// db.js     通过nodejs链接数据库
// 1.加载模块   mongodb
const mongodb = require("mongodb");
// 2.初始化/创建 mongoClient    
const MongoClient = mongodb.MongoClient;
// 3.声明URL和端口号
const url = "mongodb://127.0.0.1:27017";

// 查找
function find(collection, data, callback) {
    collection.find(data).toArray((err, result) => {
        if (err) {
            console.log("查询失败：" + err)
        } else {
            callback(result)
        }
    })
}
// 插入
function insert(collection, data, callback) {
    collection.insertOne(data, (err, result) => {
        if (err) {
            console.log("插入数据失败：" + err)
        } else {
            callback(result)
        }
    })
}
// 更新/编辑    
function update(collection, data, callback) {
    collection.updateOne(data[0], {
        $set: data[1]
    }, (err, result) => {
        if (err) {
            console.log("修改失败：" + err)
        } else {
            callback(result)
        }
    })
}
// 删除
function deletes(collection, data, callback) {
    collection.deleteOne(data, (err, result) => {
        if (err) {
            console.log("删除数据失败" + err)
        } else {
            callback(result)
        }
    })
}

// 用一个对象将方法以键值对的方式储存起来
const methodType={
    find:find,
    insert:insert,
    delete:deletes,
    update:update
}



// 4.链接本地mongodb数据库
function handlers(collections,type,data,callback) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            // 错误处理
            console.log("连接数据库失败：" + err)
        } else {
            console.log("链接数据库成功");
            // console.log(client);
            // 5.链接数据库
            var db = client.db("web1");
            // console.log(web1);
            // 6.链接集合
            var collection = db.collection(collections);
            methodType[type](collection,data,callback)
            // 8.关闭客户端
            client.close()
        }
    })
}
module.exports=handlers;