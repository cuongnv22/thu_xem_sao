$(function() {
	$('#electric_fee').number( true);
    $('#water_fee').number( true);
    $('#clean_fee').number( true);
    $('#other_fee').number( true);

    $('form').on('submit', function (e) {
          e.preventDefault();
          alert('here');
    });

    $('#showStatistic').click(function(){
    	$('#apartment-tab2-content').style.visibility = 'visible';
    });
});