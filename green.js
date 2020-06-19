//需要的模块安装
//express模块：cnpm install express --save
//body-parser模块：cnpm install body-parser --save
//cookie-parser模块：cnpm install cookie-parser --save
//multer模块：cnpm install multer --save

var express = require('express');
var app = express();

var mysql  = require('mysql');
//建立连接池
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port: '3306',
    database: ''
});

//房主登录验证
//下面get中的第一个字段为目标路径，只要和前端表单action指向路径一致即可
app.get('/signin', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 查询语句
        var  sql = 'SELECT * FROM user WHERE id=? AND password=? AND type=1;';
        var  SqlParams = [req.query.id,req.query.password]; //前端请求传送的数据

        // 执行查询
        var query = connection.query(sql,SqlParams ,function(error, results) {
            if(error) {
                console.log('[SELECT ERROR] - ',err.message);
                throw error;
            }
            // 处理结果
            //判断结果集是否为空
            if(JSON.stringify(results) === '[]'){
                //结果集为空
                console.log('密码错误');
                //跳转到指定页面，密码错误可返回原页面
                res.redirect("http://localhost:63342/untitled/gethtml.html" );
                return;
            }
            //结果集不为空
            console.log('登录成功');
            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});

//管理员登录验证
//房主和管理员登录验证的不同在于sql语句的type不同，也可以考虑在登录页面区分
//下面get中的第一个字段为目标路径字段，只要和前端表单action指向路径一致即可
app.get('/rootsignin', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 查询语句
        var  sql = 'SELECT * FROM user WHERE id=? AND password=? AND type=2;';
        var  SqlParams = [req.query.id,req.query.password];//前端请求传送的数据

        // 执行查询
        var query = connection.query(sql,SqlParams ,function(error, results) {
            if(error) {
                console.log('[SELECT ERROR] - ',err.message);
                throw error;
            }
            // 处理结果
            //判断结果集是否为空
            if(JSON.stringify(results) === '[]'){
                //结果集为空
                console.log('密码错误');
                //跳转到指定页面，密码错误可返回原页面
                res.redirect("http://localhost:63342/untitled/gethtml.html" );
                return;
            }
            //结果集不为空
            console.log('登录成功');
            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});

//房主注册
//下面get中的第一个字段为目标路径字段，只要和前端表单action指向路径一致即可
app.get('/signup', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 插入语句
        //ID字段设置为自增，不在SQL中插入,秘钥和实名制状态暂不操作
        var  addSql = 'INSERT INTO user(username,password,phone_number,sex,type) VALUES(?,?,?,?,1)';
        //req.query.属性获取
        var  addSqlParams = [req.query.username,req.query.password,req.query.phone_number,req.query.sex];

        // 执行语句
        var query = connection.query(addSql,addSqlParams ,function(error, results) {
            if(error) {
                console.log('[INSERT ERROR] - ',err.message);
                throw error;
            }
            // 处理结果
            console.log('INSERT ID:',results);
            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});

//管理员注册
//下面get中的第一个字段为目标路径字段，只要和前端表单action指向路径一致即可
app.get('/rootsignup', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 插入语句
        //ID字段设置为自增，不在SQL中插入,秘钥和实名制状态暂不操作
        var  addSql = 'INSERT INTO user(username,password,phone_number,sex,type) VALUES(?,?,?,?,2)';
        //req.query.属性获取
        var  addSqlParams = [req.query.username,req.query.password,req.query.phone_number,req.query.sex];

        // 执行语句
        var query = connection.query(addSql,addSqlParams ,function(error, results) {
            if(error) {
                console.log('[INSERT ERROR] - ',err.message);
                throw error;
            }
            // 处理结果
            console.log('INSERT ID:',results);
            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});



//房主/管理员查看个人信息
app.get('/get_information', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 查询语句
        var  sql ='SELECT username,password,phone_number,sex,public_key from user where id=?';
        //req.query.属性获取
        var  selSqlParams = [req.query.id];

        // 执行语句
        var query = connection.query(sql,selSqlParams ,function(error, results) {
            if(error) {
                console.log('[SELECT ERROR] - ',err.message);
                throw error;
            }
            // 处理结果
            console.log(JSON.stringify(results));
            //向前端返回数据，用send方法也可，前端可对数据进行渲染
            var retval=JSON.stringify(results);
            res.end(retval);// response对象结束响应

            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});

//房主/管理员查看已发布的房源信息
app.get('/get_house_information', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 查询语句
        var  sql ='SELECT * from house where owner=?';
        //req.query.属性获取
        var  selSqlParams = [req.query.owner];

        // 执行语句
        var query = connection.query(sql,selSqlParams ,function(error, results) {
            if(error) {
                console.log('[SELECT ERROR] - ',err.message);
                throw error;
            }
            // 处理结果
            console.log(JSON.stringify(results));
            //向前端返回数据，用send方法也可，前端可对数据进行渲染
            var retval=JSON.stringify(results);
            res.end(retval);// response对象结束响应

            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});

//房主更新房屋信息（价格，细节）
app.get('/update_house_information', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 更新语句
        var  sql ='UPDATE house SET price=?,detail=?  WHERE owner=?;';
        //req.query.属性获取
        var  updateSqlParams = [req.query.price,req.query.detail,req.query.owner];

        // 执行语句
        var query = connection.query(sql,updateSqlParams ,function(error, results) {
            if(error) {
                console.log('[UPDATE ERROR] - ',err.message);
                throw error;
            }
            // 返回结果结果
            console.log('UPDATE affectedRows',results.affectedRows);

            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});

//房主发布房源
//下面get中的第一个字段为目标路径字段，只要和前端表单action指向路径一致即可
app.get('/add_house', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 插入语句
        var  addSql = 'INSERT INTO house (owner,province,city,district,address,price,area,detail) VALUES(?,?,?,?,?,?,?,?)';
        //req.query.属性获取
        var  addSqlParams = [req.query.owner,req.query.province,req.query.city,req.query.district,req.query.address,req.query.price,req.query.area,req.query.detail];

        // 执行语句
        var query = connection.query(addsql,addSqlParams ,function(error, results) {
            if(error) {
                console.log('[INSERT ERROR] - ',err.message);
                throw error;
            }
            // 处理结果
            console.log('INSERT ID:',results);
            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});

//房主/管理员删除房源
//下面get中的第一个字段为目标路径字段，只要和前端表单action指向路径一致即可
app.get('/add_house', function (req, res) {
    //建立数据库连接
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('获取数据库连接异常！');
            throw error;
        }
        console.log('获取数据库连接成功！');

        // 删除语句
        var  delSql = 'DELETE FROM house WHERE id=?;';
        //req.query.属性获取
        var  delSqlParams = [req.query.id];

        // 执行语句
        var query = connection.query(delSql,delSqlParams ,function(error, results) {
            if(error) {
                console.log('[DELETE ERROR] - ',err.message);
                throw error;
            }
            // 处理结果
            console.log('DELETE affectedRows',results.affectedRows);
            //跳转到指定页面
            res.redirect("http://localhost:63342/untitled/posthtml.html" );
        });
        //控制台输出sql
        console.log(query.sql);

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('关闭数据库连接异常！');
                throw error;
            }
        });
    });
});