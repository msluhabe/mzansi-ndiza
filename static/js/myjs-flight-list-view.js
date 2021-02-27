

jQuery(document).ready(function($){
    var extras_total = 0;
    var extras_refund = 0;
    var extras_cancell = 0;
    var extras_change = 0;
    var extras_bags = 0;
    var extras_seat = 0;
    
    var return_flt;
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

    $('#dummy').css('color','white');//dummy color

    function url_redirect(options){
        var $form = $("<form />");
        
        $form.attr("action",options.url);
        $form.attr("method",options.method);
        
        for (var data in options.data)
        $form.append('<input type="hidden" name="'+data+'" value="'+options.data[data]+'" />');
         
        $("body").append($form);
        $form.submit();
   }

    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars(urlString){

        var vars = [], hash;
        var hashes = urlString.slice(urlString.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
        return vars;
    }

    // Read a page's GET URL variables and return them as an associative array.
    (window.onpopstate = function () {
        //var match,
            urlString = window.location,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = urlString.search.substring(1);
    
        //urlParams = {};
        //while (match = search.exec(query))
        //   urlParams[decode(match[1])] = decode(match[2]);
        return query;
    })();
    
    //Select base booking for outbound flight by itering through list of flights
    $('div#outbound-details-wrapper').each(function(index){

    //Action for a flight that is selected
        $("a#select-base-booking-out-"+index).click(function(){

        var match;
        var urlParams = {};
        var q;
        q = window.onpopstate();
        while (match = search.exec(q))
           urlParams[decode(match[1])] = decode(match[2]);
        
       
       
        pax_totals_adult = parseInt(urlParams["adults"]);
        pax_totals_kids = parseInt(urlParams["kids"]);
        pax_totals_infant = parseInt(urlParams["infants"]);
        
        pax_totals_pax = pax_totals_adult + pax_totals_kids + pax_totals_infant;

        outbound = true;
        inbound = false;

        //var myData = getUrlVars();
        
        //console.log(urlParams);
        //alert("adults: " + urlParams["adults"]);

        //Open Extras Options
        //$("#inflight-experience")
            //.removeClass('collapsed');
            //.attr('data-toggle','collapse')
            //.attr('aria-expanded','true');

        $("#inflight-experience-filter").collapse("show");
        $("#outbound-extras").collapse("show");
    
            //.removeClass('panel-collapse collapse')
            //.addClass('in')
            //.attr('aria-expanded','true');
            //.attr('data-toggle','collapse');

        //Reset Extras selected
        $("#extras-menu ul li").each(function( index ) {
             $(this).removeClass('active');
             extras=[];
            });
        
        
         //Retrieve flight id
        var bkng_id = $("#select-base-booking-out-"+index).data('value');
        //alert("Bkng Id:"+bkng_id);


        //Send flight id and return full record
        $.ajax({

            type:   'POST',
            async:  false,
            url:    '/home-index/create-booking', //send ajax query to this view
            data:   {'bkng_id':bkng_id},
            success:    function (response) {

                var new_bkng = JSON.parse(response.new_bkng);
                var obj = new_bkng[0];
                fields = obj.fields;

                //console.log(response.new_bkng);

                $("#flight-details").show(1000);

                $("#out-pax-summary").show();

                orig1 = fields["orig"];
                dest1 = fields["dest"];
                fltno1 = fields["flt_no"];

                $("h4#box-tittle-summary-out").text(orig1+" - "+dest1)
                .append("<br>")
                .append("<small style='color:#2d3e52'>Return flight</small>")
                .append("<br>");
                
                $("div#table-cell-flight-no1").children("label").text("Flight No - " + fltno1);

                weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

                date_out1 = new Date(fields["dep_date"]);
               
                dep_day1 = weekday[date_out1.getDay()];
                dep_date1 = date_out1.getDate();
                dep_month1 = month[date_out1.getMonth()];
                dep_year1 = date_out1.getFullYear();
                dep_time1 = fields["dep_date"].substring(11,16);
                dep_ampm1 = date_out1.getHours() >= 12 ? 'pm' : 'am';
 
                date_in1 = new Date(fields["arr_date"]);

                arr_day1 = weekday[date_in1.getDay()];
                arr_date1 = date_in1.getDate();
                arr_month1 = month[date_in1.getMonth()];
                arr_year1 = date_in1.getFullYear();
                arr_time1 = fields["arr_date"].substring(11,16);
                arr_ampm1 = date_in1.getHours() >= 12 ? 'pm' : 'am';

                duration1 = Math.abs(date_in1 - date_out1); //diff is in miliseconds
                duration_hrs1 = Math.floor(duration1/3600000);
                duration_mins1 = Math.floor(((duration1/3600000)-Math.floor(duration1/3600000))*60);
                
                $("div#check-in-time1").children("span").text(dep_day1 + "," + dep_date1 + " " + dep_month1 + " " + dep_year1)
                .append("<br>")
                .append(dep_time1 + dep_ampm1);

                $("div#check-out-time1").children("span").text(arr_day1 + "," + arr_date1 + " " + arr_month1 + " " + arr_year1)
                .append("<br>")
                .append(arr_time1 + arr_ampm1);

                $("div#duration-time1").children("span").text(duration_hrs1 + "H " + duration_mins1 + "M");
                
                $("td#bkng-base-fare-price1a").text("R"+ 0.95*(pax_totals_adult*fields["flt_price"]));

                $("td#bkng-base-fare-price1b").text("R"+ 0.95*(pax_totals_kids*0.5*fields["flt_price"]));

                $("td#bkng-base-fare-price1c").text("R"+ 0.95*(pax_totals_infant*0.25*fields["flt_price"]));

                var total = (pax_totals_adult*fields["flt_price"]) + (pax_totals_kids*0.5*fields["flt_price"]) + (pax_totals_infant*0.25*fields["flt_price"]);

                //bkng_total1 = total + extras_total;
                bkng_total1 = total ;

                $("td#bkng-base-taxes-price1").text("R"+ 0.05*(total));

                $("td#bkng-total-price").text("R"+ (bkng_total1 + bkng_total2 + extras_total));

                    bkngData["dep_date1"]= date_out1; 
                    bkngData["arr_date1"]= date_in1;
                    bkngData["dep_time1"]= dep_time1 + dep_ampm1;
                    bkngData["arr_time1"]= arr_time1 + arr_ampm1;
                    bkngData["ret_date"]= urlParams["ret_date"];
                    bkngData["orig1"]= orig1;
                    bkngData["dest1"]= dest1;
                    bkngData["fltno1"]= fltno1;
                    bkngData["return_trip"]= urlParams["return_trip"];
                    bkngData["promo_code"]= urlParams["promo_code"];
            
                    bkngData["adults_out"]= { 
                        total:parseInt(urlParams["adults"]),
                        names:{}
                    };
                    bkngData["kids_out"]= { 
                        total:parseInt(urlParams["kids"]),
                        names:{}
                    };
                    bkngData["infants_out"]= {
                        total:parseInt(urlParams["infants"]),
                        names:{}
                    };
                    bkngData["adults_in"]= {
                        total:parseInt(urlParams["adults"]),
                        names:{}
                    };
                    bkngData["kids_in"]= { 
                        total:parseInt(urlParams["kids"]),
                        names:{}
                    };
                    bkngData["infants_in"]= {
                        total:parseInt(urlParams["infants"]),
                        names:{}
                    };

                    bkngData["bkng_total1"]= bkng_total1;

                    bkngData["extras_total"] = 0;
                
            },

            error: function (response) {
                alert(response["responseJSON"]["error"]);
            }


        });

        var i;
        for(i=1;i<=bkngData['adults_out']['total'];i++){
            bkngData['adults_out']['names']["Adult "+i] = {
                refund: 0,
                cancell: 0,
                change: 0,
                extrab: 0,
                seatp: 0
            };
            bkngData['adults_in']['names']["Adult "+i] = {
                refund: 0,
                cancell: 0,
                change: 0,
                extrab: 0,
                seatp: 0
            }
        }

        for(i=1;i<=bkngData['kids_out']['total'];i++){
            bkngData['kids_out']['names']["Kid "+i] = {
                refund: 0,
                cancell: 0,
                change: 0,
                extrab: 0,
                seatp: 0
            };
            bkngData['kids_in']['names']["Kid "+i] = {
                refund: 0,
                cancell: 0,
                change: 0,
                extrab: 0,
                seatp: 0
            }
        }

        for(i=1;i<=bkngData['infants_out']['total'];i++){
            bkngData['infants_out']['names']["Infant "+i] = {
                refund: 0,
                cancell: 0,
                change: 0,
                extrab: 0,
                seatp: 0
            };
            bkngData['infants_in']['names']["Infant "+i] = {
                refund: 0,
                cancell: 0,
                change: 0,
                extrab: 0,
                seatp: 0
            } 
        }

        
        console.log(bkngData);
        

        $('#flt-list').find("article.outbound-list").hide(1000);

        //Populate extras table

        var x;
        var y;
        var z;

        var ymin;
        var zmin;

        var ymax;
        var zmax;

        var count = 0;

        if(pax_totals_adult>0){
            for(x = 1; x <= pax_totals_adult; x++){
                $("#out-table-cell-flight-no-"+x).text('Adult '+x);
            }
            count = x - 1;
        }

        
        if(pax_totals_kids>0){

            ymin = count + 1;
            ymax = count + parseInt(pax_totals_kids);

            for(y = ymin; y <= ymax; y++){
                $("#out-table-cell-flight-no-"+y).text('Kid '+(y-count));
            }
            count = y - 1;
        }


        if(pax_totals_infant>0){
            
            zmin = count + 1;
            zmax = count + pax_totals_infant;
  
            for(z = zmin; z <= zmax; z++){
                $("#out-table-cell-flight-no-"+(z)).text('Infant '+(z-count));
            }
        }
        

        });

    });


    //Select base booking for inbound flight by itering through list of flights
    $('div#inbound-details-wrapper').each(function(index){

    //Action for a flight that is selected
    $("a#select-base-booking-in-"+index).click(function(){

        var match;
        var urlParams = {};
        var q;
        q = window.onpopstate();
        while (match = search.exec(q))
           urlParams[decode(match[1])] = decode(match[2]);

        inbound = true;
        outbound = false;

        //var adult_pax = $("#adults_no").val();
        //var kids_pax = $("#kids_no").val();
        //var infant_pax = $("#infants_no").val();

        //var pax = parseInt(adult_pax) + parseInt(kids_pax) + parseInt(infant_pax);  

        $("#inbound-header").show();

        //Open Extras Options
        //$("#inflight-experience")
            //.removeClass('collapsed')
            //.attr('data-toggle','collapse')
            //.attr('aria-expanded','true');

        $("#inflight-experience-filter").collapse("show");
        $("#inbound-extras").collapse("show");
            //.removeClass('panel-collapse collapse')
            //.addClass('in')
            //.attr('aria-expanded','true');
            //.attr('data-toggle','collapse');

        //Reset Extras selected
        $("#extras-menu ul li").each(function( index ) {
            $(this).removeClass('active');
            extras=[];
           });
          
           //Retrieve flight id
            var bkng_id = $("#select-base-booking-in-"+index).data('value');
            //alert("Bkng Id:"+bkng_id);

  
        //Send flight id and return full record
        $.ajax({
  
              type:   'POST',
              async:  false,
              url:    '/home-index/create-booking', //send ajax query to this view
              data:    {'bkng_id':bkng_id},
              success:    function (response) {
  
                  var new_bkng = JSON.parse(response.new_bkng);
                  var obj = new_bkng[0];
                  fields = obj.fields;
                  //console.log(response.new_bkng);
                  //alert("new_bkng:"+fields["flt_no"]);
                  //bkng_total = bkng_total + fields["flt_price"];

                  $("#in-pax-summ1").show(1000);
                  $("#in-pax-summ2").show(1000);  
                
                
                var i ;
                for(i= 1;i<=pax_totals_pax;i++){
                    $("#in-pax-summary-"+i).show();
                }
                

                orig2 = fields["orig"];
                dest2 = fields["dest"];
                fltno2 = fields["flt_no"];

                $("h4#box-tittle-summary-out").text(dest2+" - "+orig2+" - "+dest2)
                .append("<br>")
                .append("<small style='color:#2d3e52'>Return flight</small>")
                .append("<br>");

                $("#return-summary").show();
            
                $("div#table-cell-flight-no2").children("label").text("Flight No - " + fltno2);

                weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

                date_out2 = new Date(fields["dep_date"]);
               
                dep_day2 = weekday[date_out2.getDay()];
                dep_date2 = date_out2.getDate();
                dep_month2 = month[date_out2.getMonth()];
                dep_year2 = date_out2.getFullYear();
                dep_time2 = fields["dep_date"].substring(11,16);
                dep_ampm2 = date_out2.getHours() >= 12 ? 'pm' : 'am';
 
                date_in2 = new Date(fields["arr_date"]);

                arr_day2 = weekday[date_in2.getDay()];
                arr_date2 = date_in2.getDate();
                arr_month2 = month[date_in2.getMonth()];
                arr_year2 = date_in2.getFullYear();
                arr_time2 = fields["arr_date"].substring(11,16);
                arr_ampm2 = date_in2.getHours() >= 12 ? 'pm' : 'am';

                duration2 = Math.abs(date_in2 - date_out2); //diff is in miliseconds
                duration_hrs2 = Math.floor(duration2/3600000);
                duration_mins2 = Math.floor(((duration2/3600000)-Math.floor(duration2/3600000))*60);
                
                $("div#check-in-time2").children("span").text(dep_day2 + "," + dep_date2 + " " + dep_month2 + " " + dep_year2)
                .append("<br>")
                .append(dep_time2 + dep_ampm2);

                $("div#check-out-time2").children("span").text(arr_day2 + "," + arr_date2 + " " + arr_month2 + " " + arr_year2)
                .append("<br>")
                .append(arr_time2 + arr_ampm2);

                $("div#duration-time2").children("span").text(duration_hrs2 + "H " + duration_mins2 + "M");

                  //$("#bkng-base-fare2").show();
                  //$("#bkng-base-taxes2").show();
                  $("#inbound-summary").show();

                  $("td#bkng-base-fare-price2a").text("R"+ 0.95*(pax_totals_adult*fields["flt_price"]));

                  $("td#bkng-base-fare-price2b").text("R"+ 0.95*(pax_totals_kids*0.5*fields["flt_price"]));
  
                  $("td#bkng-base-fare-price2c").text("R"+ 0.95*(pax_totals_infant*0.25*fields["flt_price"]));
  
                  var total = (pax_totals_adult*fields["flt_price"]) + (pax_totals_kids*0.5*fields["flt_price"]) + (pax_totals_infant*0.25*fields["flt_price"]);

                  //bkng_total2 = total + extras_total;
                  bkng_total2 = total;
  
                  $("td#bkng-base-taxes-price2").text("R"+ 0.05*(total));
  
                  $("td#bkng-total-price").text("R"+ (bkng_total1 + bkng_total2 + extras_total));

            
                    
                    bkngData["dep_date2"] =  date_out2;
                    bkngData["arr_date2"]= date_in2, 
                    bkngData["dep_time2"] = dep_time2 + dep_ampm2;
                    bkngData["arr_time2"] = arr_time2 + arr_ampm2;
                    bkngData["orig2"] = orig2;
                    bkngData["dest2"] = dest2;
                    bkngData["fltno2"] = fltno2;
  
                    bkngData["bkng_total2"] = bkng_total2;
                    

              },
  
              error: function (response) {
                  alert(response["responseJSON"]["error"]);
              }
  
        });

        $('#flt-list').find("article.inbound-list").hide(1000);

        //console.log(bkngData);

       // alert($(this).data('value'));
       //$("#flight-details").show(1000);

          //Populate extras table

          var x;
          var y;
          var z;
  
          var ymin;
          var zmin;
  
          var ymax;
          var zmax;
  
          var count = 0;
  
          if(pax_totals_adult>0){
              for(x = 1; x <= pax_totals_adult; x++){
                  $("#in-table-cell-flight-no-"+x).text('Adult '+x);
              }
              count = x - 1;
          }
  
          
          if(pax_totals_kids>0){
  
              ymin = count + 1;
              ymax = count + parseInt(pax_totals_kids);
  
              for(y = ymin; y <= ymax; y++){
                  $("#in-table-cell-flight-no-"+y).text('Kid '+(y-count));
              }
              count = y - 1;
          }
  
  
          if(pax_totals_infant>0){
              
              zmin = count + 1;
              zmax = count + parseInt(pax_totals_infant);
    
              for(z = zmin; z <= zmax; z++){
                  $("#in-table-cell-flight-no-"+(z)).append('Infant '+(z-count));
              }
          }


    });
    });

    //Exit Extras Menu
    $('#select-extras-done').click(function(){

        //Collapse Extras Options
            //$("#inflight-experience")
                //.addClass('collapsed')
                //.attr('data-toggle','collapse')
                //.attr('aria-expanded','false');

        $("#inflight-experience-filter").collapse("hide");
        $("#outbound-extras").collapse("hide");
        $("#inbound-extras").collapse("hide");
                //.removeClass('in')
                //.attr('aria-expanded','false');
                //.attr('style','height: 0px')
                //.addClass('panel-collapse collapse');
                //.attr('data-toggle','collapse');

        //Reset Extras selected
        $("#extras-menu ul li").each(function( index ) {

            $(this).removeClass('active');
            //extras_total = 0;
            extras_refund = 0;
            extras_cancell = 0;
            extras_change = 0;
            extras_bags = 0;
            extras_seat = 0;

           });

        $('div#inbound-details-wrapper').each(function(index){
            //enable return flight selection
            $('a#select-base-booking-in-'+index).css('pointer-events','');

        });

        //console.log(bkngData);

    });

    //Edit booking
    $("#edit-bkng").click(function(){

        var i ;
        var x;
        var y;
        var z;

        var ymin;
        var zmin;

        var ymax;
        var zmax;

        var count = 0;

        $("#flight-details").hide(1000);
        $('#flt-list').find("article.outbound-list").show(1000);
        $('#flt-list').find("article.inbound-list").show(1000);
        
        //Reset Extras selected

        $("#extras-menu ul li").each(function( index ) {
            $(this).removeClass('active');
        });

        $('div#inbound-details-wrapper').each(function(index){

            //enable return flight selection
            $('a#select-base-booking-in-'+index).css('pointer-events','none');

            $("#inbound-summary").hide();

            //var adult_pax = $("#adults_no").val();
            //var kids_pax = $("#kids_no").val();
            //var infant_pax = $("#infants_no").val();

            //var pax = parseInt(pax_totals_adult) + parseInt(pax_totals_kids) + parseInt(pax_totals_infant);

            $("#in-pax-summ1").hide();
            $("#in-pax-summ2").hide();

        
            for(i= 1;i<=pax_totals_pax;i++){
            
                $("#in-pax-summary-"+i).hide();
            }

            //Unpopulate extras table
        
            if(pax_totals_adult>0){
                for(x = 1; x <= pax_totals_adult; x++){
                    $("#out-table-cell-flight-no-"+x).empty(); // empty() method removes the child elements of the selected element(s).
                    $("#in-table-cell-flight-no-"+x).empty();
                }

                count = x - 1;
            }

        
            if(pax_totals_kids>0){

                ymin = count + 1;
                ymax = count + parseInt(pax_totals_kids);

                for(y = ymin; y <= ymax; y++){
                    $("#out-table-cell-flight-no-"+y).empty(); // empty() method removes the child elements of the selected element(s).
                    $("#in-table-cell-flight-no-"+y).empty();
                }

                count = y - 1;
            }


            if(pax_totals_infant>0){
            
                zmin = count + 1;
                zmax = count + parseInt(pax_totals_infant);
  
                for(z = zmin; z <= zmax; z++){
                    $("#out-table-cell-flight-no-"+(z)).empty(); // empty() method removes the child elements of the selected element(s).
                    $("#in-table-cell-flight-no-"+(z)).empty();
                }
            }

            for(i=1;i<=pax_totals_pax;i++){
                
                //Remove from extras list
                $("#out-refund-"+i).text("");
                $("#out-cancell-"+i).text("");
                $("#out-change-"+i).text("");
                $("#out-extrab-"+i).text("");
                $("#out-seatp-"+i).text("");
            
                $("#in-refund-"+i).text("");
                $("#in-cancell-"+i).text("");
                $("#in-change-"+i).text("");
                $("#in-extrab-"+i).text("");
                $("#in-seatp-"+i).text("");
            }

            $.each(arr,function(i,val1){ 

                var colmns = ["A","B","C","D","E","F","G"];
                var seat;
        
                $.each(colmns,function(j,val2){ 

                    $("#grid-item-"+i+val2).css({"color":"black"});
                    $("#grid-item-"+i+val2).removeClass('active');

                });
            });
        
            bkng_total1 = 0;
            bkng_total2 = 0;

            extras_total = 0;
            extras_refund = 0;
            extras_cancell = 0;
            extras_change = 0;
            extras_bags = 0;
            extras_seat = 0;

        });

        //Collapse Extras Options
        //$("#inflight-experience")
        //.addClass('collapsed')
        //.attr('data-toggle','collapse')
        //.attr('aria-expanded','false');

        $("#inflight-experience-filter").collapse("hide");
        $("#outbound-extras").collapse("hide");
        $("#inbound-extras").collapse("hide");
        //.removeClass('in')
        //.attr('aria-expanded','false');
        //.attr('style','height: 0px')
        //.addClass('panel-collapse collapse');
        //.attr('data-toggle','collapse');

        //Hide extras price list

        $("#bkng-refundable1").hide();
        $("#bkng-cancellable1").hide();
        $("#bkng-changeable1").hide();
        $("#bkng-extra-bag1").hide();
        $("#bkng-seat-prior1").hide();

        $("#bkng-refundable2").hide();
        $("#bkng-cancellable2").hide();
        $("#bkng-changeable2").hide();
        $("#bkng-extra-bag2").hide();
        $("#bkng-seat-prior2").hide();

        $("td#bkng-base-fare-price2").text("---");
        $("td#bkng-base-taxes-price2").text("---");


        $("td#bkng-base-fare-price1").text("---");
        $("td#bkng-base-taxes-price1").text("---");
        $("td#bkng-total-price").text("---");

        $('#refund').removeAttr('checked');
        $('#cancell').removeAttr('checked');
        $('#change').removeAttr('checked');
        $('#bags').removeAttr('checked');


    });

    //Check out button
    $("#proceed-to-chck-out").click(function(){

        var return_f;

        if($("#flt-list").find("#no-flight").length==1){
            return_f = false;
            bkngData["return_trip"] = "false";
        }else{
            return_f = true;
            bkngData["return_trip"] = "true";
        };

        var p = $.param(bkngData);

        var match;
        var urlParams = {};
        var q;
        
        q = window.onpopstate();
        while (match = search.exec(q))
           urlParams[decode(match[1])] = decode(match[2]);

        //alert("adults: " + urlParams['adults']);
        /*
        $.ajax({
            type:   'POST',
            url:    'home-index/chck-out', //send ajax query to this view
            data:    {'adults':urlParams['adults'],'kids':urlParams['kids'],'infants':urlParams['infants']},
            success:    function (response) {
                url_redirect({url:"/flight-booking?"+p,
                                      method:"POST",
                                      data:{'from': $("#flt_leave_from").val(),'to':$("#flt_go_to").val(),
                                            'outbound_date':$("#flt_outbound_date").val(),'inbound_date':$("#flt_inbound_date").val(),
                                            'return_flt':true,'adult_pax':$("#adults_no").val(),'kids_pax':$("#kids_no").val(),'infant_pax':$("#infants_no").val()}
                                    });                
            },
            error:  function (response) {
                alert(response["responseJSON"]["error"]);
            }
        
        })
        */

        if(!$("#return-summary").is(":hidden") || !return_f){
            
            url_redirect({url:'home-index/chck-out',
                                      method:"POST",
                                      data:{'adults':bkngData['adults_out']['total'],'kids':bkngData['kids_out']['total'],'infants':bkngData['infants_out']['total'],'return':return_f,'urlData':p}
                                    });                
            //window.location.replace("/flight-booking?"+p);
            //hidden form data
            /*
            var url = 'home-index/chck-out';
            var form = '<form action="' + url + '" method="post">';
            form += '<input type="hidden" name="ab[]" value="' + p + '" />'
            form += '</form>'
            var form_element = $(form);
            $('body').append(form_element);
            form_element.submit();
            */

        }else{
            //alert("Please select the return trip")
            var modal = document.getElementById("myModal2");
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close1")[0];

            modal.style.display = "block";
            document.getElementById("p1").innerHTML = "Please select a return flight.";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }
        }

    });

    //RefundTicket Collapse
    $("#select-refund-ticket").click(function(){
      
        $("#refund-ticket-options").collapse("hide");
        //.removeClass('in')
        //.attr('aria-expanded','false');
        var count = 0;

        var ext_arr = [];

        var i;
        var j;
        var check;

        $("#refund-ticket-options ul li").each(function(item){
            if($(this).hasClass('active')){
                count = count + 1;
                ext_arr.push($(this).text());
            }
        });


        extras_refund = count*fields["refundable_price"];
        
        extras_total  = extras_refund + extras_cancell + extras_change + extras_bags + extras_seat;

        bkng_total = bkng_total1 + bkng_total2 + extras_total;

        bkngData["extras_total"] = extras_total;

        if(count == 0){

            if(outbound){
                $("#bkng-refundable1").hide();
                for(i=1;i<=pax_totals_pax;i++){
                
                    //Remove from extras list
                    $("#out-refund-"+i).text("");
                    
                }
            }
            if(inbound){
                $("#bkng-refundable2").hide();
                for(i=1;i<=pax_totals_pax;i++){
                
                    //Remove from extras list
                    $("#in-refund-"+i).text("");
                    
                }
            }

            $("td#bkng-total-price").text("R"+(bkng_total));

           
        }else{
                 
            if(outbound){

                $("#bkng-refundable1").show();

                $("td#bkng-refundable-price1").text("R"+ extras_refund).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-refundable-price1").text("R"+ extras_refund).animate({
                    fontSize: "10px"
                }, 1000);
                
                for(i=1;i<=pax_totals_pax;i++){
                
                    check = jQuery.inArray($('#out-table-cell-flight-no-'+i).text(),ext_arr);
                    
                    if(check !== -1){
                        if(!($("#out-refund-"+i).children().hasClass("fa"))){
                            $("#out-refund-"+i).append('<i class="fa fa-check-circle"></i>');  
                        }
                    }else{
                        //Remove from extras list
                        $("#out-refund-"+i).text("");
                    }
                }

            }
            if(inbound){

                $("#bkng-refundable2").show();
                
                $("td#bkng-refundable-price2").text("R"+ extras_refund).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-refundable-price2").text("R"+ extras_refund).animate({
                    fontSize: "10px"
                }, 1000);

                //Add extras list 

                for(i=1;i<=pax_totals_pax;i++){
                
                    for(j=0;j<=ext_arr.length-1;j++){

                        check = jQuery.inArray($('#in-table-cell-flight-no-'+i).text(),ext_arr);

                        if(check !== -1){
                            if(!($("#in-refund-"+i).children().hasClass("fa"))){
                                $("#in-refund-"+i).append('<i class="fa fa-check-circle"></i>');  
                            }
                        }else{
                            //Remove from extras list
                            $("#in-refund-"+i).text("");
                        }
                    }
                }

            }

            $("td#bkng-total-price").text("R"+(bkng_total));

        }

        //Add or subtract extras bkngData

        if(outbound){

            var adults_arr = [];
            var kids_arr = [];
            var infants_arr = [];

            adults_arr = Object.keys(bkngData['adults_out']['names']);
            kids_arr = Object.keys(bkngData['kids_out']['names']);
            infants_arr = Object.keys(bkngData['infants_out']['names']);

            if(adults_arr.length>0){
                for(j=0;j<=adults_arr.length-1;j++){
                    check = jQuery.inArray(adults_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['adults_out']['names'][adults_arr[j]]['refund'] = 0;
                    }else{
                        bkngData['adults_out']['names'][adults_arr[j]]['refund'] = 1;
                    }
                }
            }
        
            if(kids_arr.length>0){
                for(j=0;j<=kids_arr.length-1;j++){
                    check = jQuery.inArray(kids_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['kids_out']['names'][kids_arr[j]]['refund'] = 0;
                    }else{
                        bkngData['kids_out']['names'][kids_arr[j]]['refund'] = 1;
                    }
                }
            }
        
            if(infants_arr.length>0){
                for(j=0;j<=infants_arr.length-1;j++){
                    check = jQuery.inArray(infants_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['infants_out']['names'][infants_arr[j]]['refund'] = 0;
                    }else{
                        bkngData['infants_out']['names'][infants_arr[j]]['refund'] = 1;
                    }
                }
            }

        }

        if(inbound){

            var adults_arr = [];
            var kids_arr = [];
            var infants_arr = [];

            adults_arr = Object.keys(bkngData['adults_in']['names']);
            kids_arr = Object.keys(bkngData['kids_in']['names']);
            infants_arr = Object.keys(bkngData['infants_in']['names']);

            if(adults_arr.length>0){
                for(j=0;j<=adults_arr.length-1;j++){
                    check = jQuery.inArray(adults_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['adults_in']['names'][adults_arr[j]]['refund'] = 0;
                    }else{
                        bkngData['adults_in']['names'][adults_arr[j]]['refund'] = 1;
                    }
                }
            }
        
            if(kids_arr.length>0){
                for(j=0;j<=kids_arr.length-1;j++){
                    check = jQuery.inArray(kids_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['kids_in']['names'][kids_arr[j]]['refund'] = 0;
                    }else{
                        bkngData['kids_in']['names'][kids_arr[j]]['refund'] = 1;
                    }
                }
            }
        
            if(infants_arr.length>0){
                for(j=0;j<=infants_arr.length-1;j++){
                    check = jQuery.inArray(infants_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['infants_in']['names'][infants_arr[j]]['refund'] = 0;
                    }else{
                        bkngData['infants_in']['names'][infants_arr[j]]['refund'] = 1;
                    }
                }
            }

        }

    });

    //CancellTicket Collapse
    $("#select-cancell-ticket").click(function(){
       
        $("#cancell-ticket-options").collapse("hide");
        //.removeClass('in')
        //.attr('aria-expanded','false');
        var count = 0;

        var ext_arr = [];

        var i;
        var j;
        var check;

        $("#cancell-ticket-options ul li").each(function(item){
            if($(this).hasClass('active')){
                count = count + 1;
                ext_arr.push($(this).text());
            }
        });

        extras_cancell = count*fields["cancellable_price"];

        extras_total  = extras_refund + extras_cancell + extras_change + extras_bags + extras_seat;

        bkng_total = bkng_total1 + bkng_total2 + extras_total;

        bkngData["extras_total"] = extras_total;

        if(count == 0){

            if(outbound){
                $("#bkng-cancellable1").hide();
                for(i=1;i<=pax_totals_pax;i++){
                
                    //Remove from extras list
                    $("#out-cancell-"+i).text("");
                    
                }
            }
            if(inbound){
                $("#bkng-cancellable2").hide();
                for(i=1;i<=pax_totals_pax;i++){
                
                    //Remove from extras list
                    $("#in-cancell-"+i).text("");
                    
                }
            }

            
            $("td#bkng-total-price").text("R"+(bkng_total));
            
            
        }else{


            if(outbound){

                $("#bkng-cancellable1").show();

                $("td#bkng-cancellable-price1").text("R"+ extras_cancell).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-cancellable-price1").text("R"+ extras_cancell).animate({
                    fontSize: "10px"
                }, 1000);

                for(i=1;i<=pax_totals_pax;i++){
                
                    for(j=0;j<=ext_arr.length-1;j++){

                        check = jQuery.inArray($('#out-table-cell-flight-no-'+i).text(),ext_arr);

                        if(check !== -1){
                            if(!($("#out-cancell-"+i).children().hasClass("fa"))){
                                $("#out-cancell-"+i).append('<i class="fa fa-check-circle"></i>');  
                            }
                        }else{
                            //Remove from extras list
                            $("#out-cancell-"+i).text("");
                        }
                    }
                }
            }
            if(inbound){

                $("#bkng-cancellable2").show();
                
                $("td#bkng-cancellable-price2").text("R"+ extras_cancell).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-cancellable-price2").text("R"+ extras_cancell).animate({
                    fontSize: "10px"
                }, 1000);

                //Add extras list 

                for(i=1;i<=pax_totals_pax;i++){
                
                    for(j=0;j<=ext_arr.length-1;j++){

                        check = jQuery.inArray($('#in-table-cell-flight-no-'+i).text(),ext_arr);

                        if(check !== -1){
                            if(!($("#in-cancell-"+i).children().hasClass("fa"))){
                                $("#in-cancell-"+i).append('<i class="fa fa-check-circle"></i>');  
                            }
                        }else{
                            //Remove from extras list
                            $("#in-cancell-"+i).text("");
                        }
                    }
                }
            }

            $("td#bkng-total-price").text("R"+(bkng_total));

        }

        //Add or subtract extras bkngData

        if(outbound){

            var adults_arr = [];
            var kids_arr = [];
            var infants_arr = [];

            adults_arr = Object.keys(bkngData['adults_out']['names']);
            kids_arr = Object.keys(bkngData['kids_out']['names']);
            infants_arr = Object.keys(bkngData['infants_out']['names']);

            if(adults_arr.length>0){
                for(j=0;j<=adults_arr.length-1;j++){
                    check = jQuery.inArray(adults_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['adults_out']['names'][adults_arr[j]]['cancell'] = 0;
                    }else{
                        bkngData['adults_out']['names'][adults_arr[j]]['cancell'] = 1;
                    }
                }
            }
        
            if(kids_arr.length>0){
                for(j=0;j<=kids_arr.length-1;j++){
                    check = jQuery.inArray(kids_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['kids_out']['names'][kids_arr[j]]['cancell'] = 0;
                    }else{
                        bkngData['kids_out']['names'][kids_arr[j]]['cancell'] = 1;
                    }
                }
            }
        
            if(infants_arr.length>0){
                for(j=0;j<=infants_arr.length-1;j++){
                    check = jQuery.inArray(infants_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['infants_out']['names'][infants_arr[j]]['cancell'] = 0;
                    }else{
                        bkngData['infants_out']['names'][infants_arr[j]]['cancell'] = 1;
                    }
                }
            }

        }

        if(inbound){

            var adults_arr = [];
            var kids_arr = [];
            var infants_arr = [];

            adults_arr = Object.keys(bkngData['adults_in']['names']);
            kids_arr = Object.keys(bkngData['kids_in']['names']);
            infants_arr = Object.keys(bkngData['infants_in']['names']);

            if(adults_arr.length>0){
                for(j=0;j<=adults_arr.length-1;j++){
                    check = jQuery.inArray(adults_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['adults_in']['names'][adults_arr[j]]['cancell'] = 0;
                    }else{
                        bkngData['adults_in']['names'][adults_arr[j]]['cancell'] = 1;
                    }
                }
            }
        
            if(kids_arr.length>0){
                for(j=0;j<=kids_arr.length-1;j++){
                    check = jQuery.inArray(kids_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['kids_in']['names'][kids_arr[j]]['cancell'] = 0;
                    }else{
                        bkngData['kids_in']['names'][kids_arr[j]]['cancell'] = 1;
                    }
                }
            }
        
            if(infants_arr.length>0){
                for(j=0;j<=infants_arr.length-1;j++){
                    check = jQuery.inArray(infants_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['infants_in']['names'][infants_arr[j]]['cancell'] = 0;
                    }else{
                        bkngData['infants_in']['names'][infants_arr[j]]['cancell'] = 1;
                    }
                }
            }

        }

    });


    //Change Ticket Collapse
    $("#select-change-ticket").click(function(){
      
        $("#change-ticket-options").collapse("hide");
        //.removeClass('in')
        //.attr('aria-expanded','false');
        var count = 0;
        var ext_arr = [];

        var i;
        var j;
        var check;

        $("#change-ticket-options ul li").each(function(item){
            if($(this).hasClass('active')){
                count = count + 1;
                ext_arr.push($(this).text());
            }
        });

        extras_change = count*fields["changeable_price"];

        extras_total  = extras_refund + extras_cancell + extras_change + extras_bags + extras_seat;

        bkng_total = bkng_total1 + bkng_total2 + extras_total;

        bkngData["extras_total"] = extras_total;

        if(count == 0){

            if(outbound){
                $("#bkng-changeable1").hide();
                for(i=1;i<=pax_totals_pax;i++){
                
                    //Remove from extras list
                    $("#out-change-"+i).text("");
                    
                }
            }
            if(inbound){
                $("#bkng-changeable2").hide();
                for(i=1;i<=pax_totals_pax;i++){
                
                    //Remove from extras list
                    $("#in-change-"+i).text("");
                    
                }
            }

            $("td#bkng-total-price").text("R"+(bkng_total));
            
        }else{

            if(outbound){

                $("#bkng-changeable1").show();

                $("td#bkng-changeable-price1").text("R"+ extras_change).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-changeable-price1").text("R"+ extras_change).animate({
                    fontSize: "10px"
                }, 1000);

                //Add into extras list

                for(i=1;i<=pax_totals_pax;i++){
                
                    for(j=0;j<=ext_arr.length-1;j++){

                        check = jQuery.inArray($('#out-table-cell-flight-no-'+i).text(),ext_arr);

                        if(check !== -1){
                            if(!($("#out-change-"+i).children().hasClass("fa"))){
                                $("#out-change-"+i).append('<i class="fa fa-check-circle"></i>');  
                            }
                        }else{
                            //Remove from extras list
                            $("#out-change-"+i).text("");
                        }
                    }
                }
            }
            if(inbound){

                $("#bkng-changeable2").show();
                
                $("td#bkng-changeable-price2").text("R"+ extras_change).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-changeable-price2").text("R"+ extras_change).animate({
                    fontSize: "10px"
                }, 1000);

                //Add extras list 

                for(i=1;i<=pax_totals_pax;i++){
                
                    for(j=0;j<=ext_arr.length-1;j++){

                        check = jQuery.inArray($('#in-table-cell-flight-no-'+i).text(),ext_arr);

                        if(check !== -1){
                            if(!($("#in-change-"+i).children().hasClass("fa"))){
                                $("#in-change-"+i).append('<i class="fa fa-check-circle"></i>');  
                            }
                        }else{
                            //Remove from extras list
                            $("#in-change-"+i).text("");
                        }
                    }
                }
            }

            $("td#bkng-total-price").text("R"+(bkng_total));

        }

        //Add or subtract extras bkngData

        if(outbound){

            var adults_arr = [];
            var kids_arr = [];
            var infants_arr = [];

            adults_arr = Object.keys(bkngData['adults_out']['names']);
            kids_arr = Object.keys(bkngData['kids_out']['names']);
            infants_arr = Object.keys(bkngData['infants_out']['names']);

            if(adults_arr.length>0){
                for(j=0;j<=adults_arr.length-1;j++){
                    check = jQuery.inArray(adults_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['adults_out']['names'][adults_arr[j]]['change'] = 0;
                    }else{
                        bkngData['adults_out']['names'][adults_arr[j]]['change'] = 1;
                    }
                }
            }
        
            if(kids_arr.length>0){
                for(j=0;j<=kids_arr.length-1;j++){
                    check = jQuery.inArray(kids_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['kids_out']['names'][kids_arr[j]]['change'] = 0;
                    }else{
                        bkngData['kids_out']['names'][kids_arr[j]]['change'] = 1;
                    }
                }
            }
        
            if(infants_arr.length>0){
                for(j=0;j<=infants_arr.length-1;j++){
                    check = jQuery.inArray(infants_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['infants_out']['names'][infants_arr[j]]['change'] = 0;
                    }else{
                        bkngData['infants_out']['names'][infants_arr[j]]['change'] = 1;
                    }
                }
            }

        }

        if(inbound){

            var adults_arr = [];
            var kids_arr = [];
            var infants_arr = [];

            adults_arr = Object.keys(bkngData['adults_in']['names']);
            kids_arr = Object.keys(bkngData['kids_in']['names']);
            infants_arr = Object.keys(bkngData['infants_in']['names']);

            if(adults_arr.length>0){
                for(j=0;j<=adults_arr.length-1;j++){
                    check = jQuery.inArray(adults_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['adults_in']['names'][adults_arr[j]]['change'] = 0;
                    }else{
                        bkngData['adults_in']['names'][adults_arr[j]]['change'] = 1;
                    }
                }
            }
        
            if(kids_arr.length>0){
                for(j=0;j<=kids_arr.length-1;j++){
                    check = jQuery.inArray(kids_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['kids_in']['names'][kids_arr[j]]['change'] = 0;
                    }else{
                        bkngData['kids_in']['names'][kids_arr[j]]['change'] = 1;
                    }
                }
            }
        
            if(infants_arr.length>0){
                for(j=0;j<=infants_arr.length-1;j++){
                    check = jQuery.inArray(infants_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['infants_in']['names'][infants_arr[j]]['change'] = 0;
                    }else{
                        bkngData['infants_in']['names'][infants_arr[j]]['change'] = 1;
                    }
                }
            }

        }

    });


    //Extra Bag Collapse
    $("#select-extra-bag").click(function(){
      
        
        $("#extra-bag-options").collapse("hide");
        //.removeClass('in')
        //.attr('aria-expanded','false');
        var count = 0;
        var ext_arr = [];

        var i;
        var j;
        var check;

        $("#extra-bag-options ul li").each(function(item){
            if($(this).hasClass('active')){
                count = count + 1;
                ext_arr.push($(this).text());
            }
        });

        extras_bags = count*fields["extrabag_price"];

        extras_total  = extras_refund + extras_cancell + extras_change + extras_bags + extras_seat;

        bkng_total = bkng_total1 + bkng_total2 + extras_total;

        bkngData["extras_total"] = extras_total;

        if(count == 0){

            if(outbound){
                $("#bkng-extra-bag1").hide();
                for(i=1;i<=pax_totals_pax;i++){
                
                    //Remove from extras list
                    $("#out-extrab-"+i).text("");
                    
                }
            }
            if(inbound){
                $("#bkng-extra-bag2").hide();
                for(i=1;i<=pax_totals_pax;i++){
                
                    //Remove from extras list
                    $("#in-extrab-"+i).text("");
                    
                }
            }

            $("td#bkng-total-price").text("R"+(bkng_total));
            
        }else{

            if(outbound){

                $("#bkng-extra-bag1").show();

                $("td#bkng-extra-bag-price1").text("R"+ extras_bags).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-extra-bag-price1").text("R"+ extras_bags).animate({
                    fontSize: "10px"
                }, 1000);

                //Add into extras list

                for(i=1;i<=pax_totals_pax;i++){
                
                    for(j=0;j<=ext_arr.length-1;j++){

                        check = jQuery.inArray($('#out-table-cell-flight-no-'+i).text(),ext_arr);

                        if(check !== -1){
                            if(!($("#out-extrab-"+i).children().hasClass("fa"))){
                                $("#out-extrab-"+i).append('<i class="fa fa-check-circle"></i>');  
                            }
                        }else{
                            //Remove from extras list
                            $("#out-extrab-"+i).text("");
                        }
                    }
                }
            }
            if(inbound){

                $("#bkng-extra-bag2").show();
                
                $("td#bkng-extra-bag-price2").text("R"+ extras_bags).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-extra-bag-price2").text("R"+ extras_bags).animate({
                    fontSize: "10px"
                }, 1000);

                //Add extras list 

                for(i=1;i<=pax_totals_pax;i++){
                
                    for(j=0;j<=ext_arr.length-1;j++){

                        check = jQuery.inArray($('#in-table-cell-flight-no-'+i).text(),ext_arr);

                        if(check !== -1){
                            if(!($("#in-extrab-"+i).children().hasClass("fa"))){
                                $("#in-extrab-"+i).append('<i class="fa fa-check-circle"></i>');  
                            }
                        }else{
                            //Remove from extras list
                            $("#in-extrab-"+i).text("");
                        }
                    }
                }
            }

            $("td#bkng-total-price").text("R"+(bkng_total));

            //alert(bkngData['extras_total']);

        }

        //Add or subtract extras bkngData

        if(outbound){

            var adults_arr = [];
            var kids_arr = [];
            var infants_arr = [];

            adults_arr = Object.keys(bkngData['adults_out']['names']);
            kids_arr = Object.keys(bkngData['kids_out']['names']);
            infants_arr = Object.keys(bkngData['infants_out']['names']);

            if(adults_arr.length>0){
                for(j=0;j<=adults_arr.length-1;j++){
                    check = jQuery.inArray(adults_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['adults_out']['names'][adults_arr[j]]['extrab'] = 0;
                    }else{
                        bkngData['adults_out']['names'][adults_arr[j]]['extrab'] = 1;
                    }
                }
            }
        
            if(kids_arr.length>0){
                for(j=0;j<=kids_arr.length-1;j++){
                    check = jQuery.inArray(kids_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['kids_out']['names'][kids_arr[j]]['extrab'] = 0;
                    }else{
                        bkngData['kids_out']['names'][kids_arr[j]]['extrab'] = 1;
                    }
                }
            }
        
            if(infants_arr.length>0){
                for(j=0;j<=infants_arr.length-1;j++){
                    check = jQuery.inArray(infants_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['infants_out']['names'][infants_arr[j]]['extrab'] = 0;
                    }else{
                        bkngData['infants_out']['names'][infants_arr[j]]['extrab'] = 1;
                    }
                }
            }

        }

        if(inbound){

            var adults_arr = [];
            var kids_arr = [];
            var infants_arr = [];

            adults_arr = Object.keys(bkngData['adults_in']['names']);
            kids_arr = Object.keys(bkngData['kids_in']['names']);
            infants_arr = Object.keys(bkngData['infants_in']['names']);

            if(adults_arr.length>0){
                for(j=0;j<=adults_arr.length-1;j++){
                    check = jQuery.inArray(adults_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['adults_in']['names'][adults_arr[j]]['extrab'] = 0;
                    }else{
                        bkngData['adults_in']['names'][adults_arr[j]]['extrab'] = 1;
                    }
                }
            }
        
            if(kids_arr.length>0){
                for(j=0;j<=kids_arr.length-1;j++){
                    check = jQuery.inArray(kids_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['kids_in']['names'][kids_arr[j]]['extrab'] = 0;
                    }else{
                        bkngData['kids_in']['names'][kids_arr[j]]['extrab'] = 1;
                    }
                }
            }
        
            if(infants_arr.length>0){
                for(j=0;j<=infants_arr.length-1;j++){
                    check = jQuery.inArray(infants_arr[j],ext_arr);
                    if(check == -1){
                        bkngData['infants_in']['names'][infants_arr[j]]['extrab'] = 0;
                    }else{
                        bkngData['infants_in']['names'][infants_arr[j]]['extrab'] = 1;
                    }
                }
            }

        }

    });

    //Cabin Seat Collapse
    $("#select-prior-seat").click(function(){
     
        var count = 0;

        $("#cabin-seat-map").collapse("hide");
        //.removeClass('in')
        //.attr('aria-expanded','false');

        var i;
        var j;
        var check;

        //console.log(seatp_arr);

        //Reset Extras selected
        $("#cabin-seat-map").each(function( index ) {
            count = $(this).find('.active').length;
        });

            extras_seat = count*fields["seatprior_price"];

            extras_total  = extras_refund + extras_cancell + extras_change + extras_bags + extras_seat;

            bkng_total = bkng_total1 + bkng_total2 + extras_total;

            bkngData["extras_total"] = extras_total;

            if(outbound){
                $("#bkng-seat-prior1").show();
                
                $("td#bkng-seat-prior-price1").text("R" + extras_seat).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-seat-prior-price1").text("R" + extras_seat).animate({
                    fontSize: "10px"
                }, 1000);

                //Add into extras list

                var adults_arr = [];
                var kids_arr = [];
                var infants_arr = [];
                var all_arr = [];
                var pax_arr = [];

                adults_arr = Object.keys(bkngData['adults_out']['names']);
                kids_arr = Object.keys(bkngData['kids_out']['names']);
                infants_arr = Object.keys(bkngData['infants_out']['names']);

                all_arr = [adults_arr,kids_arr,infants_arr];

                pax_arr = [].concat.apply([],all_arr);

                for(i=1;i<=pax_totals_pax;i++){


                    //$("#out-seatp-"+i).show();
                    var seatno;
                    
                    if(typeof seatp_arr[i-1] === 'undefined'){
                        seatno = "";
                        if(pax_arr[i-1].substring(0,5) == "Adult"){
                            bkngData['adults_out']['names'][pax_arr[i-1]]['seatp'] = 0;
                        }else if(pax_arr[i-1].substring(0,3) == "Kid"){
                            bkngData['kids_out']['names'][pax_arr[i-1]]['seatp'] = 0;
                        }else if(pax_arr[i-1].substring(0,6) == "Infant"){
                            bkngData['infants_out']['names'][pax_arr[i-1]]['seatp'] = 0;
                        }

                    }else{
                        seatno = seatp_arr[i-1];
                        if(pax_arr[i-1].substring(0,5) == "Adult"){
                            bkngData['adults_out']['names'][pax_arr[i-1]]['seatp'] = 1;
                        }else if(pax_arr[i-1].substring(0,3) == "Kid"){
                            bkngData['kids_out']['names'][pax_arr[i-1]]['seatp'] = 1;
                        }else if(pax_arr[i-1].substring(0,6) == "Infant"){
                            bkngData['infants_out']['names'][pax_arr[i-1]]['seatp'] = 1;
                        }
                    }
                    
                    $("#out-seatp-"+i).text(seatno);

                }

                
            }
            if(inbound){
                $("#bkng-seat-prior2").show();
                
                $("td#bkng-seat-prior-price2").text("R" + extras_seat).animate({
                    fontSize: "60px"
                }, 1000);
                $("td#bkng-seat-prior-price2").text("R" + extras_seat).animate({
                    fontSize: "10px"
                }, 1000);

                //Add into extras list

                var adults_arr = [];
                var kids_arr = [];
                var infants_arr = [];
                var all_arr = [];
                var pax_arr = [];

                adults_arr = Object.keys(bkngData['adults_in']['names']);
                kids_arr = Object.keys(bkngData['kids_in']['names']);
                infants_arr = Object.keys(bkngData['infants_in']['names']);

                all_arr = [adults_arr,kids_arr,infants_arr];

                pax_arr = [].concat.apply([],all_arr);

                //console.log(pax_arr);

                for(i=1;i<=pax_totals_pax;i++){

                    //$("#in-seatp-"+i).show();
                    var seatno;
                    
                    if(typeof seatp_arr[i-1] === 'undefined'){
                        seatno = "";
                        if(pax_arr[i-1].substring(0,5) == "Adult"){
                            bkngData['adults_in']['names'][pax_arr[i-1]]['seatp'] = 0;
                        }else if(pax_arr[i-1].substring(0,3) == "Kid"){
                            bkngData['kids_in']['names'][pax_arr[i-1]]['seatp'] = 0;
                        }else if(pax_arr[i-1].substring(0,6) == "Infant"){
                            bkngData['infants_in']['names'][pax_arr[i-1]]['seatp'] = 0;
                        }
                    }else{
                        seatno = seatp_arr[i-1];
                        if(pax_arr[i-1].substring(0,5) == "Adult"){
                            bkngData['adults_in']['names'][pax_arr[i-1]]['seatp'] = 1;
                        }else if(pax_arr[i-1].substring(0,3) == "Kid"){
                            bkngData['kids_in']['names'][pax_arr[i-1]]['seatp'] = 1;
                        }else if(pax_arr[i-1].substring(0,6) == "Infant"){
                            bkngData['infants_in']['names'][pax_arr[i-1]]['seatp'] = 1;
                        }
                    }
                    
                    $("#in-seatp-"+i).text(seatno);
        
                }

                
            }
            
            $("td#bkng-total-price").text("R"+(bkng_total));


            //console.log(bkngData);
        
    });

    //Clickable cabin selector

    $.each(arr,function(i,val1){ 

        var colmns = ["A","B","C","D","E","F","G"];
        var seat;

        $.each(colmns,function(j,val2){ 

        $("#grid-item-"+i+val2).toggle(function() {

            if(seat_count<pax_totals_pax){
                $(this).css({"color":"white"});
                $(this).addClass('active');
                seat_count  = seat_count + 1;
                seat = $(this).text();
                //seat = "Seat Priority ("+seat+")";
                seatp_arr.push(seat);
                //alert("seat-add:"+seat);
            }else{
                $(this).css({"color":"black"});
                $(this).removeClass('active');
            }

            },function() {

                if($(this).css('color') === $('#dummy').css('color')){
                    seat_count  = seat_count - 1;
                    seat = $(this).text();
                    //seat = "Seat Priority ("+seat+")";
                    //alert("seat-remove:"+seat);
                    seatp_arr = jQuery.grep(seatp_arr, function(value) {
                    return value != seat;
                  });
                }

                $(this).css({"color":"black"});
                $(this).removeClass('active');
                
                if(outbound){
                    $("#bkng-seat-prior1").hide();
                }
                if(inbound){
                    $("#bkng-seat-prior2").hide();
                }

            });

        });
    });

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
                        url_redirect({url:'/flight-list?' + p,
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
                        url_redirect({url:'/flight-list?' + p,
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
        bkngData["return_trip"] = "false";
    });

    $("#return-btn").on("click",function(){
        $('#depart-date-panel').addClass('w3-center w3-animate-top').show();
        $("#return-date-panel").addClass('w3-center w3-animate-top').show();
        $("#one-way-btn").css('color', 'white');
        $("#return-btn").css('color', 'green');
        return_flt = true;
        bkngData["return_trip"] = "true";
    });


});