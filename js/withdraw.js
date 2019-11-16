var memberID =window.localStorage.getItem("memberNumber");
var role =window.localStorage.getItem("Role");
var commonURL=window.localStorage.getItem("URL");
var primaryKey = window.localStorage.getItem("primaryKey");

$(function(){	
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
			$('#totalAmount').val(json.totalAmount);
		}
	});
	$('.ajax-loader').css("visibility", "hidden");
});

function memberWithdraw(){
	var totalAmount = $("#totalAmount").val();
	var commission = $('#memberCommition').val();
	var overriding = $('#memberOvrriding').val();
	var myData = JSON.stringify({
		"memberID" : memberID,
		"totalAmount" : totalAmount,
		"commission" : commission,
		"overriding" : overriding
	});
	var url = commonURL+"submitWithdraw";
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
				BootstrapDialog.alert('Withdraw is requested successfully.If Admin approve then take amount.');
			}else if(json.status=="failure"){
				BootstrapDialog.alert('Failed to taken withdraw amount.');
			}else if(json.status=="exsist"){
				BootstrapDialog.alert("You don't have any sufficient amount.So you can not withdraw.");
			}else{
				BootstrapDialog.alert('Due to some Technical issue. Please try later.');
			}
		},complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
	console.log("Called Successfully :::::::::::::::::::::::::::::");	
}

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}