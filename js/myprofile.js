var memberID =window.localStorage.getItem("memberID");
var role =window.localStorage.getItem("Role");
var commonURL=window.localStorage.getItem("URL");
var primaryKey = window.localStorage.getItem("primaryKey");

$(function(){	
	var url=commonURL+"getCountryList";
	$.ajax({
		dataType: "json",
		url: url,
		method: 'GET',
		success: function(json) {
			for (var i = 0; i < json.length; i++) {
				select = $('<option>');
				select.append("<option>" + json[i]+ "<option>");
				$('#ecountry').append(select);
			}
		}
	}); 
	Profile();
});
	 
function Profile() 
{
	var url = commonURL+"profileView?primaryKey="+primaryKey;
	$.ajax({
		dataType: "json",
		url: url,
		cache: false,
		method: 'GET',
		success: function(json) { 
			console.log(json);
			$('#username').val(json.username);
			$('#firstname').val(json.firstName);
			$('#lastname').val(json.lastName);
			$('#memberID').val(json.memberID);
			$('#membertype').val(json.actType);
			$('#bankname').val(json.bankName);
			$('#accountNumber').val(json.bankAcctNumber);
			$('#phoneNumber').val(json.phoneNumber);
			$('#email').val(json.emailID);
			$('#country').val(json.selectedCountry);
			$('#groupName').val(json.groupName);
			$('#memberCommition').val(json.memberCommition);
			$('#memberOvrriding').val(json.memberOvrriding);
		}
	});
}

function profileEdit(){
	$('#editModal').modal('show');
	var url = commonURL+"profileView?primaryKey="+primaryKey;
	$.ajax({
		dataType: "json",
		url: url,
		cache: false,
		method: 'GET',
		success: function(json) { 
			console.log(json);
			$('#eusername').val(json.username);
			$('#efirstname').val(json.firstName);
			$('#elastname').val(json.lastName);
			$('#emembernumber').val(json.memberID);
			$('#emembertype').val(json.actType);
			$('#ebankname').val(json.bankName);
			$('#eaccountNumber').val(json.bankAcctNumber);
			$('#ephoneNumber').val(json.phoneNumber);
			$('#eemail').val(json.emailID);
			$('#ecountry').val(json.selectedCountry);
			$('#egroupName').val(json.groupName);
			$('#ememberCommition').val(json.memberCommition);
			$('#ememberOvrriding').val(json.memberOvrriding);	
		}
	});
}	

function profileback(){
	$('#editModal').modal('hide');
}

function profileUpdate(){
	var userName=$('#eusername').val();
	var firstName=$('#efirstname').val();
	var lastName=$('#elastname').val();
	var memberNumber=$('#emembernumber').val();
	var memberType=$('#emembertype').val();
	var bankName=$('#ebankname').val();
	var accountNumber=$('#eaccountNumber').val();
	var phoneNumber=$('#ephoneNumber').val();
	var email=$('#eemail').val();
	var country=$('#ecountry').val();
	var groupName=$('#egroupName').val();
	var memberCommition=$('#ememberCommition').val();
	var memberOvrriding=$('#ememberOvrriding').val();
	var userNameflag=false;
	var firstNameflag=false;
	var lastNameflag=false;
	var memberNumberflag=false;
	var memberTypeflag=false;
	var bankNameflag=false;
	var countryflag=false;
	var accountNumberflag=false;
	var phoneNumberflag=false;
	var emailflag=false;
	var groupNameflag=false;
	var memberCommitionflag=false;
	var memberOvrridingflag=false;
	
	if(firstName==""){
		$('#firstnameerror').html("Please Enter the firstName");
		$("#efirstname").css("border-color","red");
		firstNameflag=false;
	}else{
		$('#firstnameerror').html("");
		$("#efirstname").css("border-color","");
		firstNameflag=true;
	}
	if(country==""){
		$('#countryerror').html("Please Select the Country");
		$("#ecountry").css("border-color","red");
		countryflag=false;
	}else{
		$('#countryerror').html("");
		$("#ecountry").css("border-color","");
		countryflag=true;
	}
	
	
	if(firstNameflag==true && countryflag==true){
		var JSONObject = new Object();
		var JSONObject = JSON.stringify({
		"memberID" : memberID,
		"primaryKey" : primaryKey,
		"userName" : userName,
		"firstName" : firstName,
		"lastName" : lastName,
		"memberNumber": memberNumber,
		"memberType": memberType,
		"bankName": bankName,
		"accountNumber": accountNumber,
		"phoneNumber": phoneNumber,
		"email": email,
		"country": country
		});
		var url = commonURL+"profileUpdate";
		$.ajax({
			url: url,
			cache: true,
			method: 'POST',
			data:JSONObject,
			dataType: "json",
			async: true,
			contentType: "application/json; charset=utf-8",
			success: function(json) {
				if(json.status=="success"){
					$('#editModal').modal('hide');
					$(".modal").show();
				}else if(json.status=="failure"){
					$('#editModal').modal('hide');
					BootstrapDialog.alert("Profile Information was not updated ....");
				}
			}
		});
		console.log("Called Successfully :::::::::::::::::::::::::::::");	
	}
}

function onCloseHandled(){
	$(".modal").hide();
	location.reload(true);
}

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}