const mysql = require("mysql");
const Promise = require("bluebird");
const Connection = require("mysql/lib/Connection");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "project2",
};

async function connectionCheck() {
  const Connection = mysql.createConnection(dbinfo);
  await Connection.connectAsync();
  console.log("connection success!!");
  await Connection.endAsync();
}

connectionCheck();

async function addUser(user) {
  const Connection = mysql.createConnection(dbinfo);
  await Connection.connectAsync();
  console.log("connection success!!");

  let sql = `insert into user (username,password) values (?,?)`;
  await Connection.queryAsync(sql, [user.username, user.password]);
  await Connection.endAsync();
  console.log("record added");
}

const user = { username: "shailesh", password: "password" };
addUser(user);

async function selectUser() {
  const Connection = mysql.createConnection(dbinfo);
  await Connection.connectAsync();
  console.log("connection success!!");

  let sql = `select * from user`;
  const list = await Connection.queryAsync(sql, []);
  await Connection.endAsync();
  console.log(list);
  return list;
}

selectUser();
