var commonURL=window.localStorage.getItem("URL");
var Role=window.localStorage.getItem("Role");
var primaryKey = window.localStorage.getItem("primaryKey");

var categoryname = window.localStorage.getItem("CategoryName");
var cname = window.localStorage.getItem("CompanyName");
var selectedCountry = window.localStorage.getItem("SelectedCountry");
var selectedState = window.localStorage.getItem("SelectedState");

$(function(){	
	$('#categoryname').val(categoryname);
	$('#companyname').val(cname);
	$('#selectedCountry').val(selectedCountry);
	$('#selectedState').val(selectedState);
	$('.ajax-loader').css("visibility", "hidden");
	/* var url=commonURL+"getHotelNameList";
	$.ajax({
		dataType: "json",
		url: url,
		method: 'GET',
		success: function(json) {
			
			for (var i = 0; i < json.length; i++) {
				select = $('<option>');
				select.append("<option>" + json[i]+ "<option>");
				$('#companyname').append(select);
			} 
		}
	}); */
});

function saveReservation(){
	var selectedCountry = $('#selectedCountry').val();
	var selectedState = $('#selectedState').val();
	var categoryname = $('#categoryname').val();
	var companyname=$('#companyname').val();
	var noofadult=$('#noofadult').val();
	var noofchild=$('#noofchild').val();
	var noofrooms=$('#noofrooms').val();
	var bookingdate=$('#bookingdate').val();
	var medicaltime=$('#medicaltime').val();
	var noofTables=$('#noofTables').val();
	var adultflag = false;
	var childflag = false;
	var roomflag = false;
	var dateflag = false;
	var timeflag = false;
	var tableflag = false;
	
	if(noofadult==""){
		$('#adulterror').html("please Choose the Adult");
		$("#noofadult").css("border-color","red");
		adultflag=false;	
	}else{
		$('#adulterror').html("");
		$("#noofadult").css("border-color","");
		adultflag=true;
	}
	if(noofchild==""){
		$('#childerror').html("please Choose the Child");
		$("#noofchild").css("border-color","red");
		childflag=false;
	}else{
		$('#childerror').html("");
		$("#noofchild").css("border-color","");
		childflag=true;	
	}
	if(noofrooms==""){
		$('#roomerror').html("please Choose the Room");
		$("#noofrooms").css("border-color","red");
		roomflag=false;	
	}else{
		$('#roomerror').html("");
		$("#noofrooms").css("border-color","");
		roomflag=true;
	}
	if(bookingdate==""){
		$('#dateerror').html("please Choose the Date");
		$("#bookingdate").css("border-color","red");
		dateflag=false;
	}else{
		$('#dateerror').html("");
		$("#bookingdate").css("border-color","");
		dateflag=true;	
	}
	if(medicaltime==""){
		$('#timeerror').html("please Enter the First Name");
		$("#medicaltime").css("border-color","red");
		timeflag=false;	
	}else{
		$('#timeerror').html("");
		$("#medicaltime").css("border-color","");
		timeflag=true;
	}
	if(noofTables==""){
		$('#tableerror').html("please Choose the Date");
		$("#noofTables").css("border-color","red");
		tableflag=false;
	}else{
		$('#tableerror').html("");
		$("#noofTables").css("border-color","");
		tableflag=true;	
	}
	
	var myData = new Object();
	var myData = JSON.stringify({
		"primaryKey" : primaryKey,
		"selectedCountry" : selectedCountry,
		"selectedState" : selectedState,
		"categoryname" : categoryname,
		"companyname" : companyname,
		"noofadult" : noofadult,
		"noofchild" : noofchild,
		"noofrooms" : noofrooms,
		"bookingdate" : bookingdate,
		"medicaltime" : medicaltime,
		"noofTables": noofTables
	});
	var url = commonURL+"saveHotelBooking";
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
			console.log("Status ---->"+json.status);
			$('.ajax-loader').css("visibility", "hidden");
			if(json.status=="success"){
				$('.panel-body').find("input[type=text],input[type=number],input[type=date],input[type=time], select ").val("");
				BootstrapDialog.alert('Successfully Booked.');
			}else if(json.status=="failure"){
				BootstrapDialog.alert('Successfully not Saved Data.');
			}else{
				BootstrapDialog.alert('Due to some Technical issue. Please try later.');
			}
		},
		complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
	console.log("Called Successfully :::::::::::::::::::::::::::::");	
}

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}

function logoff() {
	window.location.href = "index.html";
} 