var express = require("express"); //node.js的内容

var app = new express();

app.use(express.static("./page"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(12306); //端口号尽量大于8000。或者等于80(启动的时候不需要输入端口号。web服务默认的端口就是80)
//express默认访问index.html
//webstorm 右键 run server.js
//命令框或者vscode的客户端 进入到项目路径里 然后node server.js
