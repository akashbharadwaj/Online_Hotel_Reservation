$(function() {

$("#submit").on("click",function(event){

    event.preventDefault();

    var x = $("#fullName").val();
    var y = $("#email").val();
    var z = $("#password").val();
    var errMsg = $("#displayErrors");
    console.log("x:"+x+"-y:"+y+"-z:"+z);
   // errMsg.classList.add("red");
    if(x=="" || y=="" || z=="")
    {
        errMsg.html("All fields are mandatory");
        //document.getElementById("displayErrors").style.color= "red";
        window.notEmpty = false;
        
    }
    else{
        console.log("ajax");
        var data = {"userName": y ,"password": z, "name": x};
        $.ajax({
           
            url: "http://localhost:3000/api/signUpUnameExists",
            type: "POST",
            //contentType: "urlencoded",
            data: data,
            dataType:"JSON",
            success: function(data) {
                   console.log("Success");
                   
            },
            error: function() { alert("error loading file");  }
        });
        
    }
});
});
/*
var data = {};
					data.title = "title";
					data.message = "message";
					
					$.ajax({
						type: 'POST',
						data: JSON.stringify(data),
				        contentType: 'application/json',
                        url: 'http://localhost:3000/endpoint',						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });

/*
document.getElementById("subBtn").addEventListener("click", function(event){
    var x = document.getElementById("charValidationUname").value;
    var y = document.getElementById("charValidationPass").value;
    var z = document.getElementById("onlyNumbers").value;
    var errMsg = document.getElementById("displayErrors");
    errMsg.classList.add("red");
    if(x=="" || y=="" || z=="")
    {
        errMsg.innerHTML = "All fields are mandatory";
        //document.getElementById("displayErrors").style.color= "red";
        
        
    }
    else
    {   
        var err="";
        if(x.length< 6 || y.length<6){

        
            err= "UserName and Password fields should be at least 6 characters.<br/>";
        
        }

        if(isNaN(z)){

            err+= "Phone number should be a number."
        }
        if(err=="")
        {   
            errMsg.classList.remove("red");
            errMsg.classList.add("green");
            errMsg.innerHTML = "Success!";
           
           // document.getElementById("displayErrors").style.color= "green";
        }
        else
        {
            errMsg.innerHTML = err;
           // document.getElementById("displayErrors").style.color= "red";
        }

        
    }


});
*/