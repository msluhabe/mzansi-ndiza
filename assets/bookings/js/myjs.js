$(document).ready(function(){

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
                        msg = "Missing origin or destination";
                        $("#flt_request_result_where").html(`<div class="alert alert-info" style="text-align:center;font-size:15px;">${msg}</div>`);
                    }else{ $("#flt_request_result_where").remove()};

                    if (err_msgs.includes("DD") || err_msgs.includes("AD")){
                        msg = "Missing departure date";
                        $("#flt_request_result_when").html(`<div class="alert alert-info" style="text-align:center;font-size:15px;">${msg}</div>`);
                    }else{ $("#flt_request_result_when").remove()};

                }else{
                //redirect to flight-list view with form data
                $.redirect('/flight-list', {'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),'from_date':$("#flt_dep_on").val(),'to_date':$("#flt_arr_on").val()});
                
                }
            },
            error:  function (response) {
                alert(response["responseJSON"]["error"]);
            }

        });
    });

});

