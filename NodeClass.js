function Clazz(){
	this.name = "Hello three!!";

	this.message;
}

// message 변수에 값을 입력하는 함수
Clazz.prototype.setMessage = function(msg){
	this.message = msg;
}

// message 변수의 값을 가져오는 함수.
Clazz.prototype.getMessage = function(){
	return this.message;
}

// export 명령어를 사용함으로써 다른 파일에서  require 예약어를 이용해 Clazz 객체를 사용할수 있게된다.
// export 명령어의 위치는 파일의 어떤곳에 위치해도 동일하게 작동한다.
module.export = Clazz;