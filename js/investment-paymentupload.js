var memberID =window.localStorage.getItem("memberNumber");
var role =window.localStorage.getItem("Role");
var commonURL=window.localStorage.getItem("URL");
var primaryKey = window.localStorage.getItem("primaryKey");

$(function(){	
	$("#payUpload").show();
});

function home(){
	window.location.href = "dashboard.html";
}

function imageupload(){
	var invoiceNumber=document.getElementById("invoiceNumber").value;
	var treeName=document.getElementById("treeName").value;
	var fileupload = document.getElementById("upload").value;
	
	var invoiceNumberflag = false;
	var treeNameflag = false;
	var fileflag = false;
	
	if(treeName==""){
		$('#treeNameerror').html("Please Select the TreeName");
		$("#treeName").css("border-color","red");
		treeNameflag=false;
	}else{
		$('#treeNameerror').html("");
		$("#treeName").css("border-color","");
		treeNameflag=true;
	}
	if(invoiceNumber==""){
		$('#invoiceerror').html("Please Enter the InvoiceNumber");
		$("#invoiceNumber").css("border-color","red");
		invoiceNumberflag=false;
	}else{
		$('#invoiceerror').html("");
		$("#invoiceNumber").css("border-color","");
		invoiceNumberflag=true;
	}
	if(fileupload==""){
		$('#fileerror').html("Please Choose File");
		$("#upload").css("border-color","red");
		fileflag=false;
	}else{
		$('#fileerror').html("");
		$("#upload").css("border-color","");
		fileflag=true;
	}
	
	var url = commonURL+"getValidateTempmobileTree?invoiceNumber="+invoiceNumber+"&treeName="+treeName;
	$.ajax({
		dataType: "json",
		url: url,
		cache: false,
		method: 'GET',
		success: function(json) { 
			if(json.status == "Valid"){

				var fd = new FormData(); 
                var file_data = $('#upload')[0].files[0]; 
                fd.append("file", file_data);
				fd.append("invoiceNumber", invoiceNumber);
				fd.append("treeName", treeName);
				var url = commonURL+"uploadimage";
				
				$.ajax({
					url: url,
					cache: false,
					method: 'POST',
					data: fd,
					enctype: 'multipart/form-data',
					contentType: false,
					processData: false,
					async: true,
					success: function(data) {
						BootstrapDialog.alert("Payment was Uploaded successfully");
					}, error: function (error) {
						BootstrapDialog.alert("Payment was Not Uploaded");
					}
				});
			}else if(json.status == "InValid"){
				BootstrapDialog.alert("Invoice Number or Tree Number is not Valid.");
			}
		}
	});
}

function getCompanyList(){
	window.localStorage.setItem("Role","member");
	window.location.href = "dashboard.html";
}