var commonURL=window.localStorage.getItem("URL");
var Role=window.localStorage.getItem("Role");
var primaryKey = window.localStorage.getItem("primaryKey");
var memberNumber = window.localStorage.getItem("memberNumber");
var forgetUser = window.localStorage.getItem("forgetUser");	

$(function(){	
	$(".passwordsuccess").hide();
});

function checkUserName(){
	$(".passwordsuccess").hide();
	var username=document.getElementById('username').value;
	window.localStorage.setItem("forgetUser",username);
	console.log("User Name ---"+forgetUser);
	var url=commonURL+"checkUserName?username="+username;
	$.ajax({
		dataType: "json",
		url: url,
		cache: false,
		method: 'GET',
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function(json){
			$('.ajax-loader').css("visibility", "hidden");
			console.log("User Status ----"+json);
			if(json=="success"){
				$('.login-body').find("input[type=text]").val("");
				$("#otpcheck").show();
				$("#generateuser").hide();
				$("#createpass").hide();
			}else if(json=="failure"){
				$("#otpcheck").hide();
				$("#generateuser").show();
				$("#createpass").hide();
				BootstrapDialog.alert("User name is not valid.");
			}
		}, error: function (error) {
			BootstrapDialog.alert("Due to some Technical issue. Please try later");
		}, 
		complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
}

function OTPCheck(){
	$(".passwordsuccess").hide();
	var otpstatus = false;
	var otp=document.getElementById('otp').value;
	if (otp == null || otp == "") {
		$('#otperr').html("Please Enter the OTP").css("color", "red")
	} else {
		$('#otperr').html("");
		$('#otp').css("color", "green")
		otpstatus = true;
	}
	var JSONObject = {
		"otp" : otp
    }; 	
	if(otpstatus==true){
		var url=commonURL+"otpCheck?otp="+otp;
		$.ajax({
			dataType: "json",
			url: url, 
			method: 'GET',
			beforeSend: function(){
				$('.ajax-loader').css("visibility", "visible");
			},
			success: function(json) {
				$('.ajax-loader').css("visibility", "hidden");
				console.log("OtpCheck Status ---"+json);
				if (json == "success") {
					$("#otpcheck").hide();
					$("#generateuser").hide();
					$("#createpass").show();
				} else if (json == "failure") {
					BootstrapDialog.alert("Please enter valid OTP.");
				} 
			}, error: function (error) {
				$('#pwderr').html("Due to some Technical issue. Please try later").css("color", "red");
			}, 
			complete: function(){
				$('.ajax-loader').css("visibility", "hidden");
			}
		});
	}	
}

function submitPassword(){
	$(".passwordsuccess").hide();
	var newPassword1=document.getElementById('newPassword1').value;
	var newPassword2=document.getElementById('newPassword2').value;
	var forgetUser = window.localStorage.getItem("forgetUser");	
	if(newPassword1 == newPassword2){
		var url=commonURL+"changePassword?newPassword1="+newPassword1+"&forgetUser="+forgetUser;
		$.ajax({
			dataType: "json",
			url: url, 
			method: 'GET',
			beforeSend: function(){
				$('.ajax-loader').css("visibility", "visible");
			},
			success: function(json) {
				$('.ajax-loader').css("visibility", "hidden");
				console.log("New Password Status --"+json);
				if (json == "success") {
					$('.login-body').find("input[type=password]").val("");
					$("#otpcheck").hide();
					$("#generateuser").show();
					$("#createpass").hide();
					$(".passwordsuccess").show();
				} else if (json == "failure") {
					BootstrapDialog.alert("Please enter valid Password.");
				} 
			}, error: function (error) {
				$('#pwderr').html("Due to some Technical issue. Please try later").css("color", "red");
			}, 
			complete: function(){
				$('.ajax-loader').css("visibility", "hidden");
			}
		});
	} else {
		BootstrapDialog.alert("Pass word is mismatch please try again");
    }
}

function onCloseHandled(){
	$(".passwordsuccess").hide();
	window.location.href = "index.html";
}