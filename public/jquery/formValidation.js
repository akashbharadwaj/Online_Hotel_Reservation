$(document).ready(function() {
    
    $( "<span></span>" ).insertAfter( "#password" ).hide();
    $( "<span></span>" ).insertAfter( "#email" ).hide();
    
  
  //Password focus
  
  $( "#password" ).focus(function() {
  
    if($(this).val() == ""){
      $( "<span>Must be at least 8 characters long and should contain special characters,numbers and alphabets.</span>" ).insertAfter( "#password" );
      $( this ).next( "span" ).removeClass("ok");
      $( this ).next( "span" ).removeClass("error");
      $( this ).next( "span" ).addClass("info");
  
    }
    else{
  
      $( this ).next( "span" ).removeClass("ok");
      $( this ).next( "span" ).removeClass("error");
      $( this ).next( "span" ).addClass("info");
      $( this ).next( "span" ).html("Must be at least 8 characters long and should contain special characters,numbers and alphabets.");
    }
  });
  //password blur
  $( "#password" ).blur(function() {
    //var userName = $(this).val();
    //console.log(userName);
    //var letters = /([a-z])([0-9])/;
    if($(this).val()!="")
    {
      if($(this).val().length>=8)
      {
          $( this ).next( "span" ).removeClass("info");
          $( this ).next( "span" ).removeClass("error");
          $( this ).next( "span" ).addClass("ok");
          $( this ).next( "span" ).html("OK");
      }
      else
      {
          $( this ).next( "span" ).removeClass("info");
          $( this ).next( "span" ).removeClass("ok");
          $( this ).next( "span" ).addClass("error");
          $( this ).next( "span" ).html("ERROR");
        //  $( this ).next( "span" ).innerHTML = "OK";
  
      }
    }
    else{
  
        $( this ).next( "span" ).hide();
    }
  });
  //email focus
  $( "#email" ).focus(function() {
  
    if($(this).val() == ""){
      $( "<span>Eg.abc@def.xyz</span>" ).insertAfter( "#email" );
      $( this ).next( "span" ).removeClass("ok");
      $( this ).next( "span" ).removeClass("error");
      $( this ).next( "span" ).addClass("info");
  }
    else{
      $( this ).next( "span" ).removeClass("ok");
      $( this ).next( "span" ).removeClass("error");
      $( this ).next( "span" ).addClass("info");
      $( this ).next( "span" ).html("Eg.abc@def.xyz");
  
    }
  });
  //email blur
  $( "#email" ).blur(function() {
    var email=$('#email').val();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,3})?$/;
    //var userName = $(this).val();
    //console.log(userName);
    //var letters = /([a-z])([0-9])/;
    if($(this).val()!="")
    {
      if(emailReg.test(email))
      {
          $( this ).next( "span" ).removeClass("info");
          $( this ).next( "span" ).removeClass("error");
          $( this ).next( "span" ).addClass("ok");
          $( this ).next( "span" ).html("OK");
      }
      else
      {
          $( this ).next( "span" ).removeClass("info");
          $( this ).next( "span" ).removeClass("ok");
          $( this ).next( "span" ).addClass("error");
          $( this ).next( "span" ).html("ERROR");
        //  $( this ).next( "span" ).innerHTML = "OK";
  
      }
    }
    else{
  
        $( this ).next( "span" ).hide();
    }
  });
  
  
  
    
  //$( "<span></span>" ).insertAfter( "#foo" );
  
  });
  