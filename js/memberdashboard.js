var commonURL=window.localStorage.getItem("URL");
var Role=window.localStorage.getItem("Role");
var primaryKey = window.localStorage.getItem("primaryKey");
var country = window.localStorage.getItem("Country");
var state = window.localStorage.getItem("State");
var category = window.localStorage.getItem("Category");
var cname = window.localStorage.getItem("CName");

$(function(){	
	if(Role == "searchList"){
		$("#dashboarddiv").show();
		getSearchDashboardList();
	}else{ 
		$("#dashboarddiv").show();
		getCompanyList();
	}
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
	
	var url=commonURL+"getHotelNameList";
	$.ajax({
		dataType: "json",
		url: url,
		method: 'GET',
		success: function(json) {
			for (var i = 0; i < json.length; i++) {
				select = $('<option>');
				select.append("<option>" + json[i]+ "<option>");
				$('#cname').append(select);
			}
		}
	});  
});

function onCountryChoose(){
	$('#selectedState').empty();
	var selectCountry = document.getElementById("selectedCountry").value;
	var url=commonURL+"getStateList?selectCountry="+selectCountry;
	$.ajax({
		dataType: "json",
		url: url,
		method: 'GET',
		success: function(json) {
			for (var i = 0; i < json.length; i++) {
				select = $('<option>');
				select.append("<option>" + json[i]+ "<option>");
				$('#selectedState').append(select);
			}
		}
	});  
}

function getCompanyList(){
	$("#dashboarddiv").show();
	var country = "Malaysia";
	var url=commonURL+"getCompanyList?country="+country;
	$.ajax({
		dataType: "json",
		url: url,
		method: 'GET',
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function(json) {
			$('#myTable').empty();
			$('.ajax-loader').css("visibility", "hidden");
			/* for (var i = 0; i < json.length; i++) {
				ul = $('<ul class="w3-card-8">');
				ul.append("<li><img src= " +'"' + json[i].hotelImagePath + '"' + " id='imgSrc' /> </li>");
				ul.append("<li style='font-family: none;font-size: 15px;'><strong>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp; </strong>" + json[i].cname+ "</li>");
				ul.append("<li style='font-family: none;font-size: 15px;'><strong>Category Name &nbsp; : &nbsp;&nbsp; </strong>" + json[i].categoryname+ "</li>");
				ul.append("<li style='font-family: none;font-size: 15px;'><strong>Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp; </strong>" + json[i].selectedState +","+ json[i].selectedCountry + "</li>");
				ul.append("<li style='font-family: none;font-size: 15px;'><strong>Description &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp; </strong>" + json[i].description + "</li>");
				ul.append("<li style='font-family: none;font-size: 15px;'><strong>Phone Number &nbsp;&nbsp; : &nbsp;&nbsp; </strong> " + json[i].phoneNumber + "</li>");
				ul.append("<li style='font-family: none;font-size: 15px;'><strong>EmailID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp; </strong>" + json[i].emailID + "</li>");
				ul.append("<br/>");
				ul.append("<li id='idd'>"+ '<button onclick="companyAction(\'' + json[i].categoryname + '\',\'' + json[i].cname + '\',\'' + json[i].selectedCountry + '\',\'' + json[i].selectedState + '\')" class="btn btn-primary" style="background-color: #4CAF50">Book</button>'+ "</li>");
				ul.append("<br/>");
				$("#myTable").append(ul);
			} */
			for (var i = 0; i < json.length; i++) {
				ul = $('<ul class="w3-card-8">');
				ul.append("<li><img src= " +'"' + json[i].hotelImagePath + '"' + " id='imgSrc' /> </li>");
				ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Name</label></div>'+
					'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].cname+ '</div></div></div></li>');
				ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Category Name</label></div>'+
					'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].categoryname+ '</div></div></div></li>');
				ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Address</label></div>'+
					'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].selectedState +","+ json[i].selectedCountry + '</div></div></div></li>');
				ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Phone Number </label></div>'+
					'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].phoneNumber+ '</div></div></div></li>');
				ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">EmailID</label></div>'+
					'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].emailID+ '</div></div></div></li>');	
				ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Description</label></div></div></div></li>'); 	
				ul.append('<li style="font-family: none;font-size: 15px;"><div class="form-group" style="font-size: 15px;"><textarea id="agreement" style="height: 150px;" readonly>' + json[i].description + '</textarea> </div></li>'); 	
				ul.append("<li id='idd'>"+ '<button onclick="companyAction(\'' + json[i].categoryname + '\',\'' + json[i].cname + '\',\'' + json[i].selectedCountry + '\',\'' + json[i].selectedState + '\')" class="btn btn-primary" style="background-color: #4CAF50">Book</button>'+ "</li>");
				ul.append("<br/>");
				ul.append("<hr style='height:1px;border:none;color:#333;background-color:#333;' />");
				$("#myTable").append(ul);
			}
		},
		complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
}

function getCompanyListDashboard(){
	$('.ajax-loader').css("visibility", "hidden");
	var country = document.getElementById("selectedCountry").value;
	var state = document.getElementById("selectedState").value;
	var categoryName = document.getElementById("categoryname").value;
	var cname = document.getElementById("cname").value;	
	
	window.localStorage.setItem("Country",country);
	window.localStorage.setItem("State",state);
	window.localStorage.setItem("Category",categoryName);
	window.localStorage.setItem("CName",cname);
	window.localStorage.setItem("Role","searchList");
} 
	
function getSearchDashboardList(){
	$("#dashboarddiv").show();
	var searchData = new Object();
	var searchData = JSON.stringify({
		"country": country,
		"state" : state,
		"category" : category,
		"cname" : cname
	});
	
	var url=commonURL+"getSearchCompanyList";
	$.ajax({
		url: url,
		cache: true,
		method: 'POST',
		data: searchData,
		dataType: "json",
		async: true,
		contentType: "application/json; charset=utf-8",
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function(json) {
			$('#myTable').empty();
			$('.ajax-loader').css("visibility", "hidden");
			if(json.length == 0){
				BootstrapDialog.alert("No Data for Information.");
			}else{
				for (var i = 0; i < json.length; i++) {
					ul = $('<ul class="w3-card-8">');
					ul.append("<li><img src= " +'"' + json[i].hotelImagePath + '"' + " id='imgSrc' /> </li>");
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Name</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].cname+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Category Name</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].categoryname+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Address</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].selectedState +","+ json[i].selectedCountry + '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Phone Number </label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].phoneNumber+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">EmailID</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].emailID+ '</div></div></div></li>');	
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Description</label></div></div></div></li>'); 	
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="form-group" style="font-size: 15px;"><textarea id="agreement" style="height: 150px;" readonly>' + json[i].description + '</textarea> </div></li>'); 	
					ul.append("<li id='idd'>"+ '<button onclick="companyAction(\'' + json[i].categoryname + '\',\'' + json[i].cname + '\',\'' + json[i].selectedCountry + '\',\'' + json[i].selectedState + '\')" class="btn btn-primary" style="background-color: #4CAF50">Book</button>'+ "</li>");
					ul.append("<br/>");
					ul.append("<hr style='height:1px;border:none;color:#333;background-color:#333;' />");
					$("#myTable").append(ul);
				}
			}
		},
		complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
}

function companyAction(categoryname,cname,selectedCountry,selectedState){	
	window.localStorage.setItem("CategoryName",categoryname);
	window.localStorage.setItem("CompanyName",cname);
	window.localStorage.setItem("SelectedCountry",selectedCountry);
	window.localStorage.setItem("SelectedState",selectedState);
	
	if(categoryname == "Food and hotels"){
		window.location.href = "BookingMenu.html";
		$("#dashboarddiv").hide();
	}else if(categoryname == "Ticketing"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Travel and Tour"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Financial Solution"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Education"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Insurance"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Medical Treatment"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Health Accessories"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Herbal Product"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Umrah"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Software And Hardware"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}else if(categoryname == "Energy Saving"){
		BootstrapDialog.alert("Work In Progress.");
		$("#dashboarddiv").show();
	}
}

function logoff() {
	localStorage.clear();
	window.location.href = "index.html";
} 