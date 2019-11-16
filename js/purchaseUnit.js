var memberID =window.localStorage.getItem("memberNumber");
var role =window.localStorage.getItem("Role");
var commonURL=window.localStorage.getItem("URL");
var primaryKey = window.localStorage.getItem("primaryKey");

$(function(){	
	$("#div0").show();
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").hide();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
});

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}

function homePage(){
	$("#div0").show();
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").hide();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
}

function selectPublic(){
	$("#div0").hide();
	$("#div1").show();
	$("#div2").hide();
	$("#div3").hide();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
	//$("#div6").load();
}

function donePublic(){
	$("#div0").hide();
	$("#div1").show();
	$("#div2").hide();
	$("#div3").hide();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
	window.location.reload(true);
}

function createPublicUnit(numberofUnit){
	var publicData = new Object();
	var publicData = JSON.stringify({
	   "numberofUnit" : numberofUnit,
	   "primaryKey" : primaryKey
	}); 
	var url = commonURL+"mobileTempPublicTreeUnitSave";
	$.ajax({
		url: url,
		cache: true,
		method: 'POST',
		data: publicData,
		dataType: "json",
		async: true,
		contentType: "application/json; charset=utf-8",
		beforeSend: function(){
			$("#div1").hide();
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function(json) {
			$('.ajax-loader').css("visibility", "hidden");
			$("#div1").show();
			BootstrapDialog.alert('Thanks and Successfully purchase Public Unit');
			onPublicTreeClose(json);
		}, error: function (error) {
			$("#div1").show();
			$('.ajax-loader').css("visibility", "hidden");
			BootstrapDialog.alert('Network issue please try again');
		}
	});
	console.log("Called Successfully :::::::::::::::::::::::::::::");	
}

function onPublicTreeClose(json){
	$("#div0").hide();
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").hide();
	$("#div6").show();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
	ul = $('<ul class="w3-card-8">');
	ul.append('<li><label>   Thank you for buy the Unit from GGL Investment:</label></li>');
	for (var i = 0; i < json.length; i++) {
		ul.append('<li><h4 style="font-size: 17px;font-weight: bold;">  Unit Invoice Number #:' + json[i].invoiceNumber+ '</h4></li>');
	}
	ul.append('<li><div class="col-sm-4 col-xs-7"><label>  Amount Details :	</label> </div></li>');
	ul.append('<li><div class="col-sm-4 col-xs-2"><output id="totalAmount" style="font-weight: bold;"></output></div></li>');
	ul.append('<li><div class="col-sm-4 col-xs-3"><label>  SGD </label></div></li>');
	ul.append('<li><br/></li>');
	ul.append('<li>Note</li>');
	ul.append('<li>Please make the payment via Wire transfer or Online payment </li>');
	ul.append('<li><br/></li>');
	ul.append('<li><br/></li>');
	ul.append('<li>For and on behalf of</li>');
	ul.append('<li>Global Gains Limited </li>');
	$("#publictreeview").append(ul);
	$('#totalAmount').val(json[0].totalAmount);

}

function selectOwnTree(){
	$("#div0").hide();
	$("#div1").hide();
	$("#div2").show();
	$("#div3").hide();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
}

function doneOwnTree(){
	$("#div0").hide();
	$("#div1").hide();
	$("#div2").show();
	$("#div3").hide();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
	window.location.reload(true);
}

function createOwnTree(numberofUnit){
	var ownData = new Object();
	var ownData = JSON.stringify({
	   "numberofUnit" : numberofUnit,
	   "primaryKey" : primaryKey
	}); 
	var url = commonURL+"mobileTempOwnTreeUnitSave";
	$.ajax({
		url: url,
		cache: true,
		method: 'POST',
		data: ownData,
		dataType: "json",
		async: true,
		contentType: "application/json; charset=utf-8",
		beforeSend: function(){
			$("#div2").hide();
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function(json) {
			$('.ajax-loader').css("visibility", "hidden");
			$("#div2").show();
			BootstrapDialog.alert('Thanks and Successfully purchase Own Unit');
			onOwnTreeClose(json);
		}, error: function (error) {
			$("#div2").show();
			$('.ajax-loader').css("visibility", "hidden");
			BootstrapDialog.alert('Network issue please try again');
		}
	});
	console.log("Own Tree Called Successfully ::::::::::::::::::");	
}

function onOwnTreeClose(json){
	$("#div0").hide();
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").hide();
	$("#div6").hide();
	$("#div7").show();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
	ul = $('<ul class="w3-card-8">');
	ul.append('<li><label> Thank you for buy the Unit from GGL Investement:</label></li>');
	ul.append('<li><div class="col-sm-4 col-xs-5"><label style="color: #9C27B0;">  Tree Name  #:	</label> </div></li>');
	ul.append('<li><div class="col-sm-4 col-xs-7"><output id="treeName" style="font-weight: bold;color: #9C27B0;"></output></div></li>');
	ul.append('<li><br/></li>');
	for (var i = 0; i < json.length; i++) {
		ul.append('<li><h4 style="font-size: 17px;font-weight: bold;">  Unit Invoice Number #:' + json[i].invoiceNumber+ '</h4></li>');
	}
	ul.append('<li><div class="col-sm-4 col-xs-7"><label>  Amount Details :	</label> </div></li>');
	ul.append('<li><div class="col-sm-4 col-xs-2"><output id="totalAmount" style="font-weight: bold;"></output></div></li>');
	ul.append('<li><div class="col-sm-4 col-xs-3"><label>  SGD </label></div></li>');
	ul.append('<li><br/></li>');
	ul.append('<li>Note</li>');
	ul.append('<li>Please make the payment via Wire transfer or Online payment  </li>');
	ul.append('<li><br/></li>');
	ul.append('<li><br/></li>');
	ul.append('<li>For and on behalf of</li>');
	ul.append('<li>Global Gains Limited </li>');
	$("#owntreeview").append(ul);
	$('#treeName').val(json[0].treeName);
	$('#totalAmount').val(json[0].totalAmount);
}

function selectPrivate(){
	$("#div0").hide();
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").show();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
}

function donePrivateTree(){
	$("#div0").hide();
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").show();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").hide();
	$('.ajax-loader').css("visibility", "hidden");
	window.location.reload(true);
}

function privateTree(){
	var refmemberID=$('#owntreenumber').val();
	var numberOfUnits=$('#numberofunits').val();
	var publicTreeFormflag=false;
	var numberOfUnitsflag=false;
	if(refmemberID==""){
		$('#owntreenumbererror').html("please enter GSP Number");
		$("#owntreenumber").css("border-color","red");
		publicTreeFormflag=false;
	}else{
		$('#owntreenumbererror').html("");
		$('#owntreenumber').css("border-color","");
		publicTreeFormflag=true;
	}
	if(numberOfUnits==""){
		$('#numberofunitseerror').html("Unit is required");
		$('#numberofunits').css("border-color","red");
		numberOfUnitsflag=false;
	}else{
		$('#numberofunitseerror').html("");
		$('#numberofunits').css("border-color","");
		numberOfUnitsflag=true;
	}
	
	if(publicTreeFormflag==true && numberOfUnitsflag==true){
		var url = commonURL+"getMobileOwnTreeNameValidate?memberID="+refmemberID;
		$.ajax({
			dataType: "json",
			url: url,
			cache: false,
			method: 'GET',
			success: function(json) {
				if(json.status=="Valid"){
					$("#div3").hide();
					$('.ajax-loader').css("visibility", "visible");
					validPrivateTree(refmemberID,numberOfUnits);
				}else if(json.status=="InValid"){
					BootstrapDialog.alert("GSP ID is not Valid...");
				}
			}
		});
	}
}

function getTreeName(){
    console.log("-----------Load Tree Name-------------");
}

function validPrivateTree(refmemberID,numberOfUnits){
	var privateData = new Object();
	var privateData = JSON.stringify({
	   "refmemberID" : refmemberID,
	   "numberOfUnits" : numberOfUnits,
	   "primaryKey" : primaryKey
	}); 
	var url = commonURL+"mobileTempPrivateTreeUnitSave";
	$.ajax({
		url: url,
		cache: true,
		method: 'POST',
		data: privateData,
		dataType: "json",
		async: true,
		contentType: "application/json; charset=utf-8",
		beforeSend: function(){
			$("#div3").hide();
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function(json) {
			$('.ajax-loader').css("visibility", "hidden");
			$("#div3").show();
			BootstrapDialog.alert('Thanks and Successfully purchase Unit');
			onPrivateTreeClose(json);
		}, error: function (error) {
			$("#div3").show();
			$('.ajax-loader').css("visibility", "hidden");
			BootstrapDialog.alert('Network issue please try again');
		}
	});
	console.log("Private Tree Called Successfully ::::::::::::::::::");	
}

function onPrivateTreeClose(json){
	$("#div0").hide();
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").hide();
	$("#div6").hide();
	$("#div7").hide();
	$("#div8").show();
	$('.ajax-loader').css("visibility", "hidden");
	ul = $('<ul class="w3-card-8">');
	ul.append('<li><label> Thank you for buy the Unit from GGL Investement:</label></li>');
	ul.append('<li><br/></li>');
	for (var i = 0; i < json.length; i++) {
		ul.append('<li><h4 style="font-size: 17px;font-weight: bold;">  Unit Invoice Number #:' + json[i].invoiceNumber+ '</h4></li>');
	}
	ul.append('<li><div class="col-sm-4 col-xs-7"><label style="color: #9C27B0;">  Amount Details :	</label> </div></li>');
	ul.append('<li><div class="col-sm-4 col-xs-2"><output id="totalAmount" style="font-weight: bold;color: #9C27B0;"></output></div></li>');
	ul.append('<li><div class="col-sm-4 col-xs-3"><label style="color: #9C27B0;">  SGD </label></div></li>');
	ul.append('<li><br/></li>');
	ul.append('<li>Note</li>');
	ul.append('<li>Please make the payment via Wire transfer or Online payment </li>');
	ul.append('<li><br/></li>');
	ul.append('<li><br/></li>');
	ul.append('<li>For and on behalf of</li>');
	ul.append('<li>Global Gains Limited </li>');
	$("#privatetreeview").append(ul);
	$('#totalAmount').val(json[0].totalAmount);
}