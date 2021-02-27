
var extras_total = 0;
var extras_refund = 0;
var extras_cancell = 0;
var extras_change = 0;
var extras_bags = 0;
var extras_seat = 0;

var return_flt = false;
var redirect1 = false;
var redirect2 = false;
 
    
var bkng_total1 = 0;
var bkng_total2 = 0;
var outbound = false;
var inbound = false;
var flt_selected = false;

var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
var seat_count = 0;

var pax_totals_adult = 0;
var pax_totals_kids = 0;
var pax_totals_infant = 0;
var pax_totals_pax = 0;

var seatp_arr = [];


jQuery(document).ready(function($){

    //alert("/" + extras_refund + "/" + extras_cancell + "/" + extras_change + "/" + extras_bags + "/" + extras_seat);

    var fields = $();

    var test = 0;

    var weekday;
    var month;
    
    var date_out1;
    var dep_day1;
    var dep_date1;
    var dep_month1;
    var dep_year1;
    var dep_time1;
    var dep_ampm1;
    var date_in1;
    var arr_day1;
    var arr_date1;
    var arr_month1;
    var arr_year1;
    var arr_time1;
    var arr_ampm1;
    var duration1;
    var duration_hrs1;
    var duration_mins1;
    var orig1;
    var dest1;
    var fltno1;
    
    var date_out2;
    var dep_day2;
    var dep_date2;
    var dep_month2;
    var dep_year2;
    var dep_time2;
    var dep_ampm2;
    var date_in2;
    var arr_day2;
    var arr_date2;
    var arr_month2;
    var arr_year2;
    var arr_time2;
    var arr_ampm2;
    var duration2;
    var duration_hrs2;
    var duration_mins2;
    var orig2;
    var dest2;
    var fltno2;
    
    var bkngData = {};
    
    //$('.carousel').carousel('pause');

    function url_redirect(options){
        var $form = $("<form />");
        
        $form.attr("action",options.url);
        $form.attr("method",options.method);
        
        for (var data in options.data)
        $form.append('<input type="hidden" name="'+data+'" value="'+options.data[data]+'" />');
         
        $("body").append($form);
        $form.submit();
   };
    
    $("#flt_request_form").on('submit',function(e){

        e.preventDefault();
        var serializedData = $("#flt_request_form").serialize();

        /*
        var myData = {
            name: "John Doe",
            age: 23,
            children: [{
               name: "Jane Doe",
               age: 13,
               children: []
               },
               {
               name: "John Doe Jr.",
               age: 16,
               children: []
               }
            ],
         }
        */

        $.ajax({
            type:   'POST',
            url:    '/home-index/validate', //send ajax query to this view
            data:    serializedData,
            success:    function (response) {
                
                var err_msgs = response["err_msgs"];
                var msg = "";

                //console.log(err_msgs);

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

                    if (err_msgs.includes("PN")){
                        msg = "No passengers selected";
                        $("#flt_request_result_pax").show();
                        redirect3 = false; 
                    }else{ 
                        $("#flt_request_result_pax").hide();
                        redirect3 = true;
                    }



                }else{
                    $("#flt_request_result_where").hide();
                    $("#flt_request_result_when").hide();
                    redirect1 = true;
                    redirect2 = true;
                    redirect3 = true;
                }

                var bkngData ={
                    dep_date: $("#flt_outbound_date").val(), 
                    ret_date: $("#flt_inbound_date").val(),
                    orig: $("#flt_leave_from").val(),
                    dest: $("#flt_go_to").val(),
                    return_trip: return_flt,
                    promo_code: $("#promo").val(),
                    adults: parseInt($("#adults_no").val()),
                    kids: parseInt($("#kids_no").val()),
                    infants: parseInt($("#infants_no").val())
                }
                
                var p = $.param(bkngData)

                //redirect to flight-list view with form data
                if (redirect1 && redirect2 && redirect3){
                    if (return_flt){
                        //alert("Inbound Present");
                        url_redirect({url:'/flight-list?'+p,
                                      method:"POST",
                                      data:{'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),
                                            'outbound_date':$("#flt_outbound_date").val(),'inbound_date':$("#flt_inbound_date").val(),
                                            'return_flt':true,'adult_pax':$("#adults_no").val(),'kids_pax':$("#kids_no").val(),'infant_pax':$("#infants_no").val()}
                                    });
                        //$.redirect('/flight-list', {'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),'outbound_date':$("#flt_outbound_date").val(),'inbound_date':$("#flt_inbound_date").val(),'return_flt':true},"POST");
                        //alert("Post sent");
                    }else{
                        //alert("Inbound Not Present");
                        //alert($("#flt_leave_from").val());
                        //alert($("#flt_go_to").val());
                        //alert($("#flt_outbound_date").val());
                        url_redirect({url:'/flight-list?'+p,
                                      method:"POST",
                                      data:{'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),'outbound_date':$("#flt_outbound_date").val(),
                                      'return_flt':false,'adult_pax':$("#adults_no").val(),'kids_pax':$("#kids_no").val(),'infant_pax':$("#infants_no").val()}
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

    
    //One way or Return
    $("#one-way-btn").on("click",function(){
        $('#depart-date-panel').addClass('w3-center w3-animate-top').show();
        $("#return-date-panel").hide();
        $("#one-way-btn").css('color', 'green');
        $("#return-btn").css('color', 'white');
        return_flt = false;
    });

    $("#return-btn").on("click",function(){
        $('#depart-date-panel').addClass('w3-center w3-animate-top').show();
        $("#return-date-panel").addClass('w3-center w3-animate-top').show();
        $("#one-way-btn").css('color', 'white');
        $("#return-btn").css('color', 'green');
        return_flt = true;
    });


});

