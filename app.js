const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const FileStore = require('session-file-store')(session); // 세션을 파일에 저장
const cookieParser = require('cookie-parser');
// express 설정 1
const app = express();

const port = 3000 
const con = mysql.createConnection({
    host: 'localhost',
    user: 'supermom',
    password: 'supermom1234!'
}); 

// db 연결 2
const client = mysql.createConnection({
    user : 'supermom',
    password : 'supermom1234!',
    database : 'superdb'
});

// 정적 파일 설정 (미들웨어) 3
app.use(express.static(path.join(__dirname,'/public')));

// ejs 설정 4
app.set('views', __dirname + '\\views');
app.set('view engine','ejs');

// 정제 (미들웨어) 5
app.use(bodyParser.urlencoded({extended:false}));

// 세션 (미들웨어) 6
app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store : new FileStore() // 세션이 데이터를 저장하는 곳
}));
