var querystring = require("querystring"),
	url = require("url"),
    fs = require("fs"),
    formidable = require("formidable");
// NodeClass를 선언한다. 여기서 NodeClass 는 변구명이 아니라 class 명이므로 첫글자를 대문자로 한다.
var NodeClass = require("./NodeClass");

// new 연산자를 사용하여 NodeClass 클래스를 nodeClass 변수로 초기화 한다.
var nodeClazz = new NodeClass();

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '<a href="/nodeClass">Go to Class Test</a>'+
    '</form>'+
    '</body>'+
    '</html>';

    console.log("test Project !!!!");

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function nodeClass(response, request){
	console.log("================= nodeClass =================");
	nodeClazz.setMessage("Good to See u!");
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(nodeClazz.getMessage());
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "C:/tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("C:/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

function getMethodTest(response, request){
	console.log("================= getMethodTest start =================");

	var parsedUrl = url.parse(request.url);
	var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
	console.log(parsedQuery);
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(parsedQuery.test);

    console.log("================= getMethodTest end =================");
}

function postMethodTest(response, request){
	var result = {};
	request.on('data', function(data){
		result.data = data;
	});

	request.on('end', function(){
		response.end(result.data);
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.nodeClass = nodeClass;
exports.getMethodTest = getMethodTest;
exports.postMethodTest = postMethodTest;

