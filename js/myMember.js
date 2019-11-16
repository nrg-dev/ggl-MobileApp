var commonURL=window.localStorage.getItem("URL");
var Role=window.localStorage.getItem("Role");
var primaryKey = window.localStorage.getItem("primaryKey");
var memberNumber = window.localStorage.getItem("memberNumber");

$(document).ready(function() 
{ 
	var url=commonURL+"getMyMemberViewList?memberNumber="+memberNumber;
	$.ajax({
		dataType: "json",
		url: url,
		method: 'GET',
		success: function(json) {
			$('#memberview').empty();
			console.log(json);
			if(json.length == 0){
				BootstrapDialog.alert("You don't have any member.");
			}else{
				for (var i = 0; i < json.length; i++) {
					ul = $('<ul class="w3-card-8">');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Member Name</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].memberName+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Member ID</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].memberID+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Phone</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].memberPhone+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">EmailID</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].memberEmail+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Member Type</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].memberType+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Commission</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].memberCommition+ '</div></div></div></li>');
					ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Overriding</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].memberOvrriding+ '</div></div></div></li>');
						ul.append('<li style="font-family: none;font-size: 15px;"><div class="row"><div class="col-sm-12 col-md-12 col-xs-12 col-lg-12"><div class="col-sm-3 col-md-5 col-xs-5 col-lg-4"><label class="name">Member Status</label></div>'+
						'<div class="col-sm-2 col-md-2  col-xs-2 col-lg-1"><label class="name">:</label></div><div class="col-sm-5 col-md-5  col-xs-5 col-lg-6">' + json[i].memberStatus+ '</div></div></div></li>');
					ul.append("<li>" + "<hr/>" + "</li>");
					$("#memberview").append(ul);
				}
			}
		},
	});
}); 

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}
