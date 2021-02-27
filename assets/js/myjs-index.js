
$(document).ready(function(){

    function url_redirect(options){
        var $form = $("<form />");
        
        $form.attr("action",options.url);
        $form.attr("method",options.method);
        
        for (var data in options.data)
        $form.append('<input type="hidden" name="'+data+'" value="'+options.data[data]+'" />');
         
        $("body").append($form);
        $form.submit();
   }

    var return_flt = false;
    var redirect1 = false;
    var redirect2 = false;
    var extras = [];

    $("#flt_request_form").on('submit',function(e){

        e.preventDefault();
        var serializedData = $("#flt_request_form").serialize();

        $.ajax({
            type:   'POST',
            url:    '/home-index/validate', //send ajax query to this view
            data:    serializedData,
            success:    function (response) {
                
                var err_msgs = response["err_msgs"];
                var msg = "";

                if (err_msgs.length > 0){
                
                    if (err_msgs.includes("O") || err_msgs.includes("D")){
                        msg = "Missing origin/destination";
                        $("#flt_request_result_where").show();
                        redirect1 = false;
                    }else{ 
                        $("#flt_request_result_where").hide();
                        redirect1 = true;                 
                    }

                    if (err_msgs.includes("DD") || (err_msgs.includes("AD") && return_flt)){
                        msg = "Missing departure/arrival date";
                        $("#flt_request_result_when").show();
                        redirect2 = false; 
                    }else{ 
                        $("#flt_request_result_when").hide();
                        redirect2 = true;
                    }

                }else{
                    $("#flt_request_result_where").hide();
                    $("#flt_request_result_when").hide();
                    redirect1 = true;
                    redirect2 = true;
                }

                //redirect to flight-list view with form data
                if (redirect1 && redirect2){
                    if (return_flt){
                        //alert("Inbound Present");
                        url_redirect({url:'/flight-list',
                                      method:"POST",
                                      data:{'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),'outbound_date':$("#flt_outbound_date").val(),'inbound_date':$("#flt_inbound_date").val(),'return_flt':true}
                                    });
                        //$.redirect('/flight-list', {'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),'outbound_date':$("#flt_outbound_date").val(),'inbound_date':$("#flt_inbound_date").val(),'return_flt':true},"POST");
                        //alert("Post sent");
                    }else{
                        //alert("Inbound Not Present");
                        //alert($("#flt_leave_from").val());
                        //alert($("#flt_go_to").val());
                        //alert($("#flt_outbound_date").val());
                        url_redirect({url:'/flight-list',
                                      method:"POST",
                                      data:{'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),'outbound_date':$("#flt_outbound_date").val(),'return_flt':false}
                                    });
                        //$.redirect('/flight-list', {'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),'outbound_date':$("#flt_outbound_date").val(),'return_flt':false},"POST");
                        //alert("Redirect")
                        }
                }
            },
            error:  function (response) {
                //alert(response["responseJSON"]["error"]);
            }

        });
        

    });


    $('ul#Extras').on("click",function(e) {

        e.preventDefault();

        $("li.flight-extra").each(function( index ) {
        
            if($(this).hasClass('active')){
                extras[index] = $(this).data('value');
                //alert(extras[index]);
            }
        
        $.ajax({

            type:   'POST',
            url:    '/flight-list', //send ajax query to this view
            data:    extras,
            success:    function (response) {
            },

            error: function (response) {
                //alert(response["responseJSON"]["error"]);
            }

            });



        
        });
        
      });
    

    $("#one-way-btn").on("click",function(){
        return_flt = false;
        $('#depart-date-panel').addClass('w3-center w3-animate-top').show();
        $("#return-date-panel").hide();
        $("#one-way-btn").css('color', 'green');
        $("#return-btn").css('color', 'white');

    });

    $("#return-btn").on("click",function(){
        return_flt = true;
        $('#depart-date-panel').addClass('w3-center w3-animate-top').show();
        $("#return-date-panel").addClass('w3-center w3-animate-top').show();
        $("#one-way-btn").css('color', 'white');
        $("#return-btn").css('color', 'green');
    });

    $("#select-base-booking-out1").on("click",function(){
        alert("Test");
        $("#flight-itenary").addClass('w3-center w3-animate-top').show();

    });

});

