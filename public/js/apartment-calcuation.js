$(function() {
    var electricCal = function(){
    	var currentElectricNo = $('#c_electric_no').val();
    	var previousElectricNo = $('#p_electric_no').val();
    	var electricUnit = $('#electric_unit').val();
    	var totalElectric = (currentElectricNo - previousElectricNo) * electricUnit ;    	    	
    	$('#total_electric').val(totalElectric);
    };

    var waterCal = function(){
    	var currentWaterNo = $('#c_water_no').val();
    	var previousWaterNo = $('#p_water_no').val();
    	var waterUnit = $('#water_unit').val();
    	var totalWater = (currentWaterNo - previousWaterNo) * waterUnit ;    	    	
    	$('#total_water').val(totalWater);
    };

    var totalCal = function() {
    	var totalWater = parseInt($('#total_water').val());
    	var totalElectric = parseInt($('#total_electric').val());
    	var roomFee = parseInt($('#room_fee').val());
    	var otherFee = parseInt($('#other_fee').val());
    	var totalFee = totalWater + totalElectric + roomFee + otherFee;
    	$('#total_fee').val(totalFee);
    }

    // electricCal();
    // waterCal();
    // totalCal();
    $('#c_water_no').focusout(function() {
    	waterCal();
    	totalCal();
	});

    $('#c_electric_no').focusout(function() {
    	electricCal();
    	totalCal();
	});

	$('#other_fee, #clean_fee, #room_fee').focusout(function() {    	
    	totalCal();
	});

	$('#total_fee').number( true);
    $('#total_electric').number( true);
    $('#total_water').number( true);
    $('#clean_fee').number( true);
    $('#other_fee').number( true);
    $('#room_fee').number( true);
    $('#p_electric_no').number( true);
    $('#c_electric_no').number( true);
    $('#p_water_no').number( true);
    $('#c_water_no').number( true);
    $('#electric_unit').number( true);
    $('#water_unit').number( true);
});




