function login() {
	try{
		var userstatus = false;
		var pwdstatus = false;
		var user=document.getElementById('username').value;
		var pass=document.getElementById('password').value;
		if (user == null || user == "") {
			$('#usererr').html("Please Enter the User Name").css("color", "red")
		} else {
			$('#usererr').html("");
			$('#username').css("color", "green")
			userstatus = true;
		}
		if (pass == null || pass == "") {
			$('#pwderr').html("Please Enter the Password").css("color", "red")
		} else {
			$('#pwderr').html("");
			$('#password').css("color", "green")
			pwdstatus = true;
		}
		var JSONObject = {
		   "username" : user,
		   "pwd" : pass
		}; 
		if(userstatus==true && pwdstatus==true){
			//var url="http://35.162.40.190:8091/user-portal/login?username="+user+"&pwd="+pass;
			var url="http://localhost:8091/user-portal/login?username="+user+"&pwd="+pass;
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
					var loginstatus = json.status;
					console.log(loginstatus);
					if (loginstatus == "success") {
						window.localStorage.setItem("Role",json.userRole);
						window.localStorage.setItem("memberNumber",json.memberNumber);
						window.localStorage.setItem("primaryKey",json.id);
						window.localStorage.setItem("URL","http://localhost:8091/user-portal/");
						//window.localStorage.setItem("URL","http://35.162.40.190:8091/user-portal/");
						var userRole = window.localStorage.getItem("Role");
						var memberNumber = window.localStorage.getItem("memberNumber");
						var primaryKey = window.localStorage.getItem("primaryKey");
						if(userRole == "admin"){
							//window.location.href = "admindashboard.html";
						}else if(userRole == "member"){
							window.location.href = "dashboard.html";
						}
						$('#globalerr').html("");
						$('#pwderr').html("");
						
					} else if (loginstatus) {
						$('#pwderr').html(loginstatus).css("color", "red");
						$('#globalerr').html("");
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
	}catch(err){
		alert(err);
	}
}