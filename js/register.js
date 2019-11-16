var commonURL=window.localStorage.getItem("URL");
var role=window.localStorage.getItem("Role");

$(document).ready(function(){
	$("#MemberValid").hide();
	$("#MemberNotValid").hide();
	var url=commonURL+"getCountryList";
	$.ajax({
		 dataType: "json",
		 url: url,
		 method: 'GET',
		 success: function(json) {
			for (var i = 0; i < json.length; i++) {
				select = $('<option>');
				select.append("<option>" + json[i]+ "<option>");
				$('#selectedCountry').append(select);
			}
		}
	}); 
});

function cancel(){
	window.location.href="index.html";
}

function getMemberIDValidate(refmemberID){
	var memberID=document.getElementById('refmemberID').value;
	var JSONObject = {
	   "refmemberID" : memberID
	}; 
	var url=commonURL+"getMemberIDValidation?memberID="+memberID;
	$.ajax({
		dataType: "json",
		url: url, 
		method: 'GET',
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function(json) {
			$('.ajax-loader').css("visibility", "hidden");	
			console.log(json);
			var memberstatus = json.status;
			console.log(memberstatus);
			if (memberstatus == "Valid") {
				$("#MemberValid").show();
				$("#MemberNotValid").hide();
			} else if (memberstatus == "InValid") {
				$("#MemberValid").hide();	
				$("#MemberNotValid").show();
			} else {
				$('#globalerr').html("Network error.please try again later.").css("color", "red");
				$('#pwderr').html("");
			}
		}, error: function (error) {
			$('#pwderr').html("Due to some Technical issue. Please try later").css("color", "red");
		}, 
		complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
	
}

function register(){
	var phonevalidation =/^(\$|)([10-13]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;
	var mailvalidation=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	var refmemberID=$('#refmemberID').val();
	var email=$('#email').val();
	var selectedCountry=$('#selectedCountry').val();
	var phoneNumber=$('#phoneNumber').val();
	var firstName=$('#firstName').val();
	var lastName=$('#lastName').val();
	var username=$('#username').val();
	var pass=$('#password').val();
	var bankName=$('#bankName').val();
	var bankAcctNumber=$('#bankAcctNumber').val();
	var actType = [];
	$.each($("input[name='actType']:checked"), function() {
		actType.push($(this).val());
	});
	 
	var memberflag = false;
	var emailflag=false;
	var countryflag=false;
	var phoneflag=false;
	var firstNameflag=false;
	var lastNameflag = false;
	var usernameflag = false;
	var passwordflag = false;
	var bankNameflag=false;
	var acctNumberflag = false;
	var agreeflag = false;
	var actTypeflag = false;
	if(refmemberID==""){
		$('#memberiderror').html("Please Enter the Ref.MemberID");
		$("#refmemberID").css("border-color","red");
		memberflag=false;
	}else{
		$('#memberiderror').html("");
		$("#refmemberID").css("border-color","");
		memberflag=true;
	}
	
	if(email!="" ){
		if(mailvalidation.test(email)){
			$('#emailerror').html("");
			$("#email").css("border-color","");
			emailflag=true;
		}else{
			$('#emailerror').html("Please Enter Valid EmailID");
			$("#email").css("border-color","red");
			emailflag=false;
		}
	}else{
		$('#emailerror').html("Please Enter the EmailID");
		$("#email").css("border-color","red");
		emailflag=true;
	}
	
	if(selectedCountry==""){
		$('#countryerror').html("please Select the Country");
		$("#selectedCountry").css("border-color","red");
		countryflag=false;
	}else{
		$('#countryerror').html("");
		$("#selectedCountry").css("border-color","");
		countryflag=true;	
	}
	
	if(phoneNumber==""){
		$('#phoneNumbererror').html("Please Enter the Phone Number");
		$("#phoneNumber").css("border-color","red");
		phoneflag=true;
	}else{
		if(phoneNumber!=""){
			if(phoneNumber.length >13){
				$('#phoneNumbererror').html("Phone Number with in 13 digit Numbers");
				$("#phoneNumber").css("border-color","red");
				phoneflag=false;
			}else{
				if(phonevalidation.test(phoneNumber)){
					$('#phoneNumbererror').html("");
					$("#phoneNumber").css("border-color","");
					phoneflag=true;
				} else{
					$('#phoneNumbererror').html("Please enter the Valid PhoneNumber");
					$("#phoneNumber").css("border-color","red");
					phoneflag=false;
				}
			}
		}
	}

	if(firstName==""){
		$('#firstNameerror').html("please Enter the First Name");
		$("#firstName").css("border-color","red");
		firstNameflag=false;
		
	}else{
		$('#firstNameerror').html("");
		$("#firstName").css("border-color","");
		firstNameflag=true;
		
		
	}
	if(lastName==""){
		$('#lastNameerror').html("please Enter the Last Name");
		$("#lastName").css("border-color","red");
		lastNameflag=false;
		
	}else{
		$('#lastNameerror').html("");
		$("#lastName").css("border-color","");
		lastNameflag=true;
		
		
	}

	if(username==""){
		$('#usernameerror').html("Please Enter User Name");
		$('#username').css("border-color","red");
		usernameflag=false;	
	}else{
		$('#usernameerror').html("");
		$('#username').css("border-color","");
		usernameflag=true;		
	}
	
	if(pass==""){
		$('#passworderror').html("Please Enter the Password");
		$("#password").css("border-color","red");
		passwordflag=false;
	}else{
		$('#passworderror').html("");
		$("#password").css("border-color","");
		passwordflag=true;
	}
	
	if(bankName==""){
		$('#bankNameerror').html("Please Enter the Bank Name");
		$("#bankName").css("border-color","red");
		bankNameflag=false;
	}else{
		$('#bankNameerror').html("");
		$("#bankName").css("border-color","");
		bankNameflag=true;
	}
	
	if(bankAcctNumber==""){
		$('#bankAcctNumbererror').html("Please Enter the Account Number");
		$("#bankAcctNumber").css("border-color","red");
		acctNumberflag=false;
	}else{
		$('#bankAcctNumbererror').html("");
		$("#bankAcctNumber").css("border-color","");
		acctNumberflag=true;
	}	
	
	if($('input[type=radio][name=actType]:checked').length == 0)
	{
		$('#actTypeerror').html("Account Type is Required.");
		$("#actType").css("border-color","red");
		actTypeflag=false;
	}
	else
	{
		$('#actTypeerror').html("");
		$("#actType").css("border-color","");
		actTypeflag=false;
	}
	if($('input[type=checkbox][name=agree]:checked').length == 0)
	{
		$('#agreementerror').html("Agreement must Selected.");
		$("#agree").css("border-color","");
		agreeflag=false;
	}
	else
	{
		$('#agreementerror').html("");
		$("#agree").css("border-color","");
		agreeflag=false;
	}
	if(firstNameflag==true && lastNameflag==true && usernameflag==true && passwordflag==true &&  bankNameflag==true && acctNumberflag==true){
		
		var myData = new Object();
		var myData = JSON.stringify({
			"refmemberID": refmemberID,
			"email" : email,
			"selectedCountry" : selectedCountry,
			"phoneNumber" : phoneNumber,
			"firstName" :firstName,
			"lastName" : lastName,
			"username": username,
			"password":pass,
			"bankName":bankName,
			"bankAcctNumber":bankAcctNumber,
			"actType":actType
		});
		var url = commonURL+"memberRegister";
		$.ajax({
			url: url,
			cache: true,
			method: 'POST',
			data:myData,
			dataType: "json",
			async: true,
			contentType: "application/json; charset=utf-8",
			beforeSend: function(){
				$('.ajax-loader').css("visibility", "visible");
			},
			success: function(json) {
				$('.ajax-loader').css("visibility", "hidden");
				if(json.status=="success"){
					$('.panel-body').find("input[type=text],input[type=number],input[type=password], select ").val("");
					$('input:radio').removeAttr('checked');
					$('input:checkbox').removeAttr('checked');
					$("#MemberValid").hide();
					$("#MemberNotValid").hide();
					BootstrapDialog.alert('Registration successfully completed. Please check your email');
				}else if(json.status=="userexits"){
					BootstrapDialog.alert('Username is already registered Please try again.');
				}else if(json.status=="otherError"){
					BootstrapDialog.alert('Network Issue Please try again.');
				}else if(json.status=="memberIDNotValid"){
					BootstrapDialog.alert('Given Member is not Valid Please check.');
				}
			},
			complete: function(){
				$('.ajax-loader').css("visibility", "hidden");
			}
		});
		console.log("Called Successfully :::::::::::::::::::::::::::::");	
	}
}
