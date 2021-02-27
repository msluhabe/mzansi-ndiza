jQuery(document).ready(function($){

    function url_redirect(options){
        var $form = $("<form />");
        
        $form.attr("action",options.url);
        $form.attr("method",options.method);
        
        for (var data in options.data)
        $form.append('<input type="hidden" name="'+data+'" value="'+options.data[data]+'" />');
         
        $("body").append($form);
        $form.submit();
   };

    $("#login").on("click",function(){

        url_redirect({  url:'login-index',
                        method:"POST",
                        data:{'username':$("#uname").val(),'password': $("#pword").val()}
                    });       
        /*
           //alert("Please select the return trip")
           var modal = document.getElementById("myModal2");
           // Get the <span> element that closes the modal
           var span = document.getElementsByClassName("close1")[0];

           modal.style.display = "block";
           document.getElementById("p1").innerHTML = "Incorrect username or password";

           // When the user clicks on <span> (x), close the modal
           span.onclick = function() {
           modal.style.display = "none";
           }
        */
    });

})