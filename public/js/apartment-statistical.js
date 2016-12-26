$(function() {
	$('#total_take').number(true);
	$('#electric_fee').number( true);
    $('#water_fee').number( true);
    $('#clean_fee').number( true);
    $('#other_fee').number( true);
    $('#apartment-tab2-content').hide();

    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',    
            data: $('#choosen_date').val(),        
            url: '/temporary',
            contentType: 'application/javascript',
            dataType: 'json'
    		
        }).done(function(response) {
        	var total = 0;					
			$.each(response, function(index, element)
				{
					total += element.total_fee
				});
			$('#total_take').val(total);
			$('#apartment-tab2-content').show();  
        }); 
    });

    $('#load_chart').click(function(){
    	// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Năm', 'Thu', 'Chi', 'Lãi'],
          ['2014', 1000, 400, 200],
          ['2015', 1170, 460, 250],
          ['2016', 660, 1120, 300],
          ['2017', 1030, 540, 350],
          ['2018', 660, 1120, 300],
          ['2019', 660, 1120, 300],
          ['2020', 660, 1120, 300],
          ['2021', 660, 1120, 300],
          ['2022', 660, 1120, 300],
          ['2023', 660, 1120, 300],
          ['2024', 660, 1120, 300],
          ['2025', 660, 1120, 300],
        ]);

        var options = {
          chart: {
            title: 'Thống kê thu chi',
            subtitle: 'Thu, Chi, Lãi: 2014-2025'            
          },
          chartArea:{
      			backgroundColor: 'black'
  			}
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }
  	}
    });
   	
});