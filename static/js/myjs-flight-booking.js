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

    var urlData = "&"+$("#urlData").val();
        //alert(urlData);

        var match;
        var urlParams = {};
        var q;
  
        var urlString = window.location + "?" + urlData;
        var pl     = /\+/g;  // Regex for replacing addition symbol with a space
        var search = /([^&=]+)=?([^&]*)/g;
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        var q  = urlString;

        while (match = search.exec(q))
           urlParams[decode(match[1])] = decode(match[2]);

        console.log(urlParams);
        //Adults
        if(parseInt(urlParams['adults_out[total]'])>0){

            for( var i = 1 ; i <= parseInt(urlParams['adults_out[total]']) ; i++) {

                //Out Refund
                if(urlParams['adults_out[names][Adult '+i+'][refund]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-refund-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-refund-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Refund
                if(urlParams['adults_in[names][Adult '+i+'][refund]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-refund-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-refund-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Cancell
                if(urlParams['adults_out[names][Adult '+i+'][cancell]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-cancell-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-cancell-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Cancell
                if(urlParams['adults_in[names][Adult '+i+'][refund]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-cancell-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-cancell-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Change
                if(urlParams['adults_out[names][Adult '+i+'][change]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-change-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-change-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Change
                if(urlParams['adults_in[names][Adult '+i+'][change]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-change-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-change-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Extrab
                if(urlParams['adults_out[names][Adult '+i+'][extrab]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-extrab-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-extrab-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Extrab
                if(urlParams['adults_in[names][Adult '+i+'][extrab]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-extrab-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-extrab-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Seatp
                if(urlParams['adults_out[names][Adult '+i+'][seatp]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-seatp-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-seatp-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Cancell
                if(urlParams['adults_in[names][Adult '+i+'][seatp]'] == "1"){
                    //alert("out-Adult "+i+"-refund");
                    $("#Adult"+i+"-seatp-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Adult"+i+"-seatp-in").append('<i class="fa fa-times-circle"></i>');
                }

            }
        }

        //Kids
        if(parseInt(urlParams['kids_out[total]'])>0){

            for( var i = 1 ; i <= parseInt(urlParams['kids_out[total]']) ; i++) {

                //Out Refund
                if(urlParams['kids_out[names][Kid '+i+'][refund]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-refund-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-refund-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Refund
                if(urlParams['kids_in[names][Kid '+i+'][refund]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-refund-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-refund-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Cancell
                if(urlParams['kids_out[names][Kid '+i+'][cancell]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-cancell-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-cancell-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Cancell
                if(urlParams['kids_in[names][Kid '+i+'][refund]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-cancell-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-cancell-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Change
                if(urlParams['kids_out[names][Kid '+i+'][change]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-change-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-change-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Change
                if(urlParams['kids_in[names][Kid '+i+'][change]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-change-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-change-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Extrab
                if(urlParams['kids_out[names][Kid '+i+'][extrab]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-extrab-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-extrab-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Extrab
                if(urlParams['kids_in[names][Kid '+i+'][extrab]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-extrab-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-extrab-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Seatp
                if(urlParams['kids_out[names][Kid '+i+'][seatp]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-seatp-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-seatp-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Cancell
                if(urlParams['kids_in[names][Kid '+i+'][seatp]'] == "1"){
                    //alert("out-Kid "+i+"-refund");
                    $("#Kid"+i+"-seatp-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Kid"+i+"-seatp-in").append('<i class="fa fa-times-circle"></i>');
                }

            }
        }

        //Infants
        if(parseInt(urlParams['infants_out[total]'])>0){

            for( var i = 1 ; i <= parseInt(urlParams['infants_out[total]']) ; i++) {

                //Out Refund
                if(urlParams['infants_out[names][Infant '+i+'][refund]'] == "1"){
                    alert("Infant"+i+"-refund-out");
                    $("#Infant"+i+"-refund-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-refund-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Refund
                if(urlParams['infants_in[names][Infant '+i+'][refund]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-refund-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-refund-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Cancell
                if(urlParams['infants_out[names][Infant '+i+'][cancell]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-cancell-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-cancell-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Cancell
                if(urlParams['infants_in[names][Infant '+i+'][refund]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-cancell-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-cancell-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Change
                if(urlParams['infants_out[names][Infant '+i+'][change]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-change-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-change-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Change
                if(urlParams['infants_in[names][Infant '+i+'][change]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-change-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-change-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Extrab
                if(urlParams['infants_out[names][Infant '+i+'][extrab]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-extrab-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-extrab-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Extrab
                if(urlParams['infants_in[names][Infant '+i+'][extrab]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-extrab-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-extrab-in").append('<i class="fa fa-times-circle"></i>');
                }

                //Out Seatp
                if(urlParams['infants_out[names][Infant '+i+'][seatp]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-seatp-out").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-seatp-out").append('<i class="fa fa-times-circle"></i>');
                }
                //In Cancell
                if(urlParams['infants_in[names][Infant '+i+'][seatp]'] == "1"){
                    //alert("out-Infant "+i+"-refund");
                    $("#Infant"+i+"-seatp-in").append('<i class="fa fa-check-circle"></i>');
                }else{
                    $("#Infant"+i+"-seatp-in").append('<i class="fa fa-times-circle"></i>');
                }

            }
        }

        //Populate booking summary
        var dep_date1 = urlParams['dep_date1'].split("GMT");
        dep_date1 = dep_date1[0].split(" ");

        var arr_date1 = urlParams['arr_date1'].split("GMT");
        arr_date1 = arr_date1[0].split(" ");

        var dep_time1 = new Date("01/01/2007 " + urlParams['dep_time1'].replace(/am|pm/,""));
        var arr_time1 = new Date("01/01/2007 " + urlParams['arr_time1'].replace(/am|pm/,""));

        var diff1 = arr_time1 - dep_time1;

        var diffSeconds1 = diff1/1000;
        var HH1 = Math.floor(diffSeconds1/3600);
        var MM1 = Math.floor(diffSeconds1%3600)/60;

        var formatted1 = ((HH1 < 10)?("0" + HH1):HH1) + ":" + ((MM1 < 10)?("0" + MM1):MM1)

        
        if(urlParams['return_trip'] == "true"){

            var dep_date2 = urlParams['dep_date2'].split("GMT");
            dep_date2 = dep_date2[0].split(" ");

            var arr_date2 = urlParams['arr_date2'].split("GMT");
            arr_date2 = arr_date2[0].split(" ");
            
            var dep_time2 = new Date("01/01/2007 " + urlParams['dep_time2'].replace(/am|pm/,""));
            var arr_time2 = new Date("01/01/2007 " + urlParams['arr_time2'].replace(/am|pm/,""));

            var diff2 = arr_time2 - dep_time2;

            var diffSeconds2 = diff2/1000;
            var HH2 = Math.floor(diffSeconds2/3600);
            var MM2 = Math.floor(diffSeconds2%3600)/60;

            var formatted2 = ((HH2 < 10)?("0" + HH2):HH2) + ":" + ((MM2 < 10)?("0" + MM2):MM2)


            $("#trip-type").append("Return Trip");
            $("#origdest1").append(urlParams['orig1'] + " - " + urlParams['dest1'] + " - " + urlParams['dest2'] );

            $("#dep_date1").append(dep_date1[0] + "<br />" + dep_date1[2] + " " + dep_date1[1] + " " + dep_date1[3] + "<br />" + dep_date1[4]);
            $("#arr_date1").append(arr_date1[0] + "<br />" + arr_date1[2] + " " + arr_date1[1] + " " + arr_date1[3] + "<br />" + arr_date1[4]);
            $("#duration1").append(formatted1);

            $("#fltno1").append(urlParams['fltno1']);
            $("#basef1").append("R " + urlParams['bkng_total1']);

            $("#dep_date2").append(dep_date2[0] + "<br />" + dep_date2[2] + " " + dep_date2[1] + " " + dep_date2[3] + "<br />" + dep_date2[4]);
            $("#arr_date2").append(arr_date2[0] + "<br />" + arr_date2[2] + " " + arr_date2[1] + " " + arr_date2[3] + "<br />" + arr_date2[4]);
            $("#duration2").append(formatted2);

            $("#fltno2").append(urlParams['fltno2']);
            $("#basef2").append("R " + urlParams['bkng_total2']);

            var bkng_total = parseInt(urlParams['bkng_total1']) + parseInt(urlParams['bkng_total2']) + parseInt(urlParams['extras_total']);

            $("#extras-total").append("R " + parseInt(urlParams['extras_total']));

            $("#bkng-total").append("R " + bkng_total);


        }else{

            $("#trip-type").append("OneWay Trip");
            $("#origdest1").append(urlParams['orig1'] + " - " + urlParams['dest1']);

            $("#dep_date1").append(dep_date1[0] + "<br />" + dep_date1[2] + " " + dep_date1[1] + " " + dep_date1[3] + "<br />" + dep_date1[4]);
            $("#arr_date1").append(arr_date1[0] + "<br />" + arr_date1[2] + " " + arr_date1[1] + " " + arr_date1[3] + "<br />" + arr_date1[4]);
            $("#duration1").append(formatted1);

            $("#fltno1").append(urlParams['fltno1']);
            $("#basef1").append("R " + urlParams['bkng_total1']);

            var bkng_total = parseInt(urlParams['bkng_total1']) + parseInt(urlParams['extras_total']);

            $("#extras-total").append("R " + parseInt(urlParams['extras_total']));

            $("#bkng-total").append("R " + parseInt(urlParams['bkng_total1']));

        }
        

    //Confirm booking button
    $("#confirm_booking").click(function(){
        
        var urlData = "&"+$("#urlData").val();
        //alert(urlData);

        var match;
        var urlParams = {};
        var q;
  
        var urlString = window.location + "?" + urlData;
        var pl     = /\+/g;  // Regex for replacing addition symbol with a space
        var search = /([^&=]+)=?([^&]*)/g;
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        var q  = urlString;

        while (match = search.exec(q))
           urlParams[decode(match[1])] = decode(match[2]);

        console.log(urlParams);
        //alert(urlParams['dep_date1']);
        $("#payment_form").show(1000);

    });

});