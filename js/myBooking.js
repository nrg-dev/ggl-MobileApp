var commonURL=window.localStorage.getItem("URL");
var Role=window.localStorage.getItem("Role");
var primaryKey = window.localStorage.getItem("primaryKey");
var memberNumber = window.localStorage.getItem("memberNumber");

$(document).ready(function() 
{ 
	var url=commonURL+"getMyBookingList?primaryKey="+primaryKey;
	$.ajax({
		dataType: "json",
		url: url,
		method: 'GET',
		success: function(json) {
			$('#bookingview').empty();
			console.log(json);
			if(json.length == 0){
				BootstrapDialog.alert('No Data for Information.');
			}else{
				for (var i = 0; i < json.length; i++) {
					ul = $('<ul class="w3-card-8">');
					/* ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">S.No</label></div>'+
						'<div class="col-sm-2 col-md-2 col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].sNo+ '</div></div></div></li>'); */
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Booking Type</label></div>'+
						'<div class="col-sm-2 col-md-2 col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].categoryname+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Country</label></div>'+
						'<div class="col-sm-2 col-md-2 col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].selectedCountry+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">State</label></div>'+
							'<div class="col-sm-2 col-md-2 col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].selectedState+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Booking Date</label></div>'+
						'<div class="col-sm-2 col-md-2 col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].bookingtime+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Booking Status</label></div>'+
						'<div class="col-sm-2 col-md-2 col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].status+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Invoice Number</label></div>'+
						'<div class="col-sm-2 col-md-2 col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].invoiceNumber+ '</div></div></div></li>');
					ul.append("<li>"+ '<div class="row"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-5 col-md-7 col-xs-7 col-lg-6"></div>'+
						'<div class="col-sm-5 col-md-5 col-xs-5 col-lg-6"><a name="'+json[i].categoryname+'" id="'+json[i].userloginPrimaryKeyString+'" onclick="ReservationView(this.name,this.id)" style="color: #3c8dbc;">View</a></div></div>'+ "</li>");
					ul.append("<li>" + "<hr/>" + "</li>");
					$("#bookingview").append(ul);
				} 
			}
		}
	});
});
 
function ReservationView(categoryname,userloginPrimaryKeyString){ 
	var url=commonURL+"getMyBookingView?userloginPrimaryKeyString="+userloginPrimaryKeyString;
	$.ajax({
		dataType: "json",
		url: url,
		cache: false,
		method: 'GET',
		success: function(json) { 
			console.log(json);
			$('#bookingType').val(json.categoryname);
			$('#hotelName').val(json.cname);
			$('#adult').val(json.noofadult);
			$('#child').val(json.noofchild);
			$('#rooms').val(json.noofrooms);
			$('#bookingdate').val(json.financialtime);
			$('#bookingtime').val(json.bookingtime);
			$('#bookingstatus').val(json.bookingStatus);
			$('#table').val(json.noofTables);
		}
	});
	if(categoryname == "Food and hotels"){
		$('#foodView').modal('show');
	}else{
		BootstrapDialog.alert("Work In Progress.");
	}
}

function onClose(){
	$('#foodView').modal('hide');
}

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}
