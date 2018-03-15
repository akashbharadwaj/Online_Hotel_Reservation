
$("#submit").on("submit",function(event){

    event.preventDefault();
    var x = $("fullName").val();
    var y = $("email").val();
    var z = $("password").val();
    var errMsg = $("displayErrors");
    errMsg.classList.add("red");
    if(x=="" || y=="" || z=="")
    {
        errMsg.innerHTML = "All fields are mandatory";
        //document.getElementById("displayErrors").style.color= "red";
        
        
    }
    else
    {

	$.ajax({

        url: "/api/signUpUnameExists",
        method: POST,
        contentType: "application/json",
        data: JSON.stringify({userName: y }),
        success: function(response) {
               
               
        },
        error: function() { alert("error loading file");  }
    });
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