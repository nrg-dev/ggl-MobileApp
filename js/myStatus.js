var memberID =window.localStorage.getItem("memberNumber");
var role =window.localStorage.getItem("Role");
var commonURL=window.localStorage.getItem("URL");
var primaryKey = window.localStorage.getItem("primaryKey");

$(function(){	
	$('.ajax-loader').css("visibility", "hidden");
	$("#memberHOmeDive").show();
	$("#div1").hide();
	$("#div2").hide();
});

function backToMyStatus(){
	$('.ajax-loader').css("visibility", "hidden");
	$("#memberHOmeDive").show();
	$("#div1").hide();
	$("#div2").hide();
	window.location.reload(true);
}

function nodataMyStatus(){
	$('.ajax-loader').css("visibility", "hidden");
	$("#memberHOmeDive").show();
	$("#div1").hide();
	$("#div2").hide();
}

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}

function statusOfPublicTree(){
	var url = commonURL+"getMobileSingleUnitInfo?primaryKey="+primaryKey;
	$.ajax({
		dataType: "json",
		url: url,
		cache: false,
		method: 'GET',
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function(json) {
			$('.ajax-loader').css("visibility", "hidden");
			console.log("statusOfPublicTree List Size-------------->"+Object.keys(json).length);
			if(Object.keys(json).length > 0){
				$("#memberHOmeDive").hide();
				$("#div1").hide();
				$("#div2").show();
				for (var i = 0; i < json.length; i++) {	
				ul = $('<ul class="w3-card-8">');
					ul.append('<li style="color: #fff !important;background-color: #3c8dbc !important;padding: 25px;border-bottom: 1px solid transparent;"><h2>  Queue No :' +json[i].queueNumber+ '</h2></li>');
					ul.append('<li style="background-color: #d2d6de !important;"><br/></li>');
					ul.append('<li style="background-color: #d2d6de !important;"> Unit Status: <label style="font-size: 16px;"> ' + json[i].userstatus+ '</label></li>');
					ul.append('<li style="background-color: #d2d6de !important;"><br/></li>');
					ul.append('<li style="background-color: #d2d6de !important;"> Payment Status: <label style="font-size: 16px;"> ' + json[i].paymentStatus+ '</label></li>');
					ul.append('<li style="background-color: #d2d6de !important;"><br/></li>');
					ul.append('<li style="background-color: #d2d6de !important;"> Unit ID: <label style="font-size: 16px;"> ' + json[i].invoiceNumber+ '</label></li>');
					ul.append('<li style="background-color: #d2d6de !important;"><br/></li>');
					$("#publictreeview").append(ul);
					ul.append('<li><br/></li>');
				}
			}else {
				BootstrapDialog.alert('No units Found');
				nodataMyStatus();
			}
		}, error: function (error) {
			$('.ajax-loader').css("visibility", "hidden");
			BootstrapDialog.alert('Network issue please try again');
		}
	});
}

function chooseTreeName(){
	$('.ajax-loader').css("visibility", "hidden");
	$("#memberHOmeDive").hide();
	$("#div1").show();
	$("#div2").hide();
	var url=commonURL+"mobileloadTreeName";
	$.ajax({
		dataType: "json",
		url: url,
		method: 'GET',
		success: function(json) {
			for (var i = 0; i < json.length; i++) {
				select = $('<option>');
				select.append("<option>" + json[i]+ "<option>");
				$('#treename').append(select);
			}
		}
	}); 
}

function statusofPrivateTree(){
    var treeName=$('#treename').val();
	var treeNameflag=false;
	if(treeName==""){
		$('#treenameerror').html("select tree number");
		$('#treename').css("border-color","red");
		treeNameflag=false;
	}else{
		$('#treenameerror').html("");
		$('#treename').css("border-color","");
		treeNameflag=true;
	}
	if(treeNameflag==true){
		var url = commonURL+"getmobileSinglePrivateUnitInfo?primaryKey="+primaryKey+"&treeName="+treeName;
		$.ajax({
			dataType: "json",
			url: url,
			cache: false,
			method: 'GET',
			beforeSend: function(){
				$('.ajax-loader').css("visibility", "visible");
			},
			success: function(json) {
				$('.ajax-loader').css("visibility", "hidden");
				console.log("statusOfPublicTree List Size-------------->"+Object.keys(json).length);
				if(Object.keys(json).length > 0){
					$("#memberHOmeDive").hide();
					$("#div1").hide();
					$("#div2").show();
					for (var i = 0; i < json.length; i++) {	
					ul = $('<ul class="w3-card-8">');
						ul.append('<li style="color: #fff !important;background-color: #3c8dbc !important;padding: 25px;border-bottom: 1px solid transparent;"><h2>  Queue No :' +json[i].queueNumber+ '</h2></li>');
						ul.append('<li style="background-color: #d2d6de !important;"><br/></li>');
						ul.append('<li style="background-color: #d2d6de !important;"> Unit Status: <label style="font-size: 16px;"> ' + json[i].userstatus+ '</label></li>');
						ul.append('<li style="background-color: #d2d6de !important;"><br/></li>');
						ul.append('<li style="background-color: #d2d6de !important;"> Payment Status: <label style="font-size: 16px;"> ' + json[i].paymentStatus+ '</label></li>');
						ul.append('<li style="background-color: #d2d6de !important;"><br/></li>');
						ul.append('<li style="background-color: #d2d6de !important;"> Unit ID: <label style="font-size: 16px;"> ' + json[i].invoiceNumber+ '</label></li>');
						ul.append('<li style="background-color: #d2d6de !important;"><br/></li>');
						$("#publictreeview").append(ul);
						ul.append('<li><br/></li>');
					}
				}else {
					BootstrapDialog.alert('No units Found');
					nodataMyStatus();
				}
			}, error: function (error) {
				$('.ajax-loader').css("visibility", "hidden");
				BootstrapDialog.alert('Network issue please try again');
			}
		});
	}
	
}