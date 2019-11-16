var memberID =window.localStorage.getItem("memberNumber");
var role =window.localStorage.getItem("Role");
var commonURL=window.localStorage.getItem("URL");
var primaryKey = window.localStorage.getItem("primaryKey");

$(function(){	
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").show();
});

function wirePayment(){
	$("#div1").show();
	$("#div2").hide();
	$("#div3").hide();
}

function home(){
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").show();
}

function onlinePay(){
    $("#div1").hide();
	$("#div2").show();
	$("#div3").hide();
}

function paymentUpload(){
	window.location.href = "investment-paymentupload.html";
}

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}