$(function() {
	$('#total_take').number(true);
	$('#electric_fee').number( true);
  $('#water_fee').number( true);
  $('#clean_fee').number( true);
  $('#internet_fee').number( true);
  $('#tv_fee').number( true);
  $('#other_fee').number( true);
  $('#total_expenditure').number( true);
  $('#receive').number( true);

  $('#apartment-tab2-content').hide();
  $('#choosen_date').focusout(function() {
  if($('#choosen_date').val()!="");
    $('#showStatistic').prop('disabled', false);      
  });
 
  $('#apartment-tab2-search-form').on('submit', function (e) {
    e.preventDefault();      
    // Reset data
    $('#total_take').val(0);
    $('#electric_fee').val(0);
    $('#water_fee').val(0);
    $('#clean_fee').val(0);
    $('#other_fee').val(0);
    $('#internet_fee').val(0);
    $('#tv_fee').val(0);
    $('#total_expenditure').val(0);
    $('#receive').val(0);
    $('#note').val("");
    $('#btn_save').prop('disabled', false);
     $('#btn_final').prop('disabled', false);

    var data = {};
    data.choosen_date = $('#choosen_date').val();
    if (data.choosen_date == "") {
      alert('Nhập ngày');
      return;
    }        
    $.ajax({
        type: 'POST',    
        data: JSON.stringify(data),        
        url: '/temporary',
        contentType: 'application/json',
        dataType: 'json'    		
    }).done(function(response) {
      if (response.length == 0) { // Chua co du lieu cho tháng đó.
        $.ajax({
          type: 'POST',    
          data: JSON.stringify(data),        
          url: '/temporary1',
          contentType: 'application/json',
          dataType: 'json'        
        }).done(function(response) {
          var total = 0;          
          $.each(response, function(index, element){
              if (element.status != null & element.status == "1")
                total += element.total_fee
          });          
          $('#total_take').val(total);
        });
      }
      else {                        
          var obj = JSON.parse(JSON.stringify(response));
          $('#electric_fee').val(obj.electric_fee);
          $('#water_fee').val(obj.water_fee);
          $('#clean_fee').val(obj.clean_fee);
          $('#other_fee').val(obj.other_fee);
          $('#internet_fee').val(obj.internet_fee);
          $('#tv_fee').val(obj.tv_fee);
          $('#total_expenditure').val(obj.total_expenditure);
          $('#receive').val(obj.total_receive);
          $('#note').val(obj.note);

          if (obj.isFinal != null && obj.isFinal == "0") { // Chưa chốt thì vẫn lấy tổng từ phòng trọ
            $.ajax({
              type: 'POST',    
              data: JSON.stringify(data),        
              url: '/temporary1',
              contentType: 'application/json',
              dataType: 'json'        
            }).done(function(response) {
              var total = 0;          
              $.each(response, function(index, element){
                  if (element.status != null & element.status == "1")
                    total += element.total_fee
              });          
              $('#total_take').val(total);
              $('#receive').val(total-obj.total_expenditure)
            });   
          }
          if (obj.isFinal != null && obj.isFinal == "1") { // Chốt rồi thì lấy từ DB.
            $('#total_take').val(obj.total_take);                     
            $('#btn_save').prop('disabled', true);
            $('#btn_final').prop('disabled', true);
          }
      }

			$('#apartment-tab2-content').show();
      $('#title_info').empty();
      $('#title_info').append("Thông tin thu chi tháng " + $('#choosen_date').val());
      $('#detail_div').hide();
      $('#alert').hide();
      });  
  });      
 
  $('#apartment-tab2-content').on('submit', function (e) {
    e.preventDefault();
    $('#alert').hide();
    if (e.originalEvent.explicitOriginalTarget.id =="btn_forgive")
    {
      $('#btn_save').prop('disabled', false);
      $('#btn_final').prop('disabled', false);
      return;
    }
    var data= {};
    var choosen_date = $('#choosen_date').val().split("/");
    data.month = choosen_date[0];
    data.year = choosen_date[1];
    data.total_take = $('#total_take').val();
    data.electric_fee = $('#electric_fee').val();
    data.water_fee = $('#water_fee').val();
    data.clean_fee = $('#clean_fee').val();
    data.internet_fee = $('#internet_fee').val();
    data.tv_fee = $('#tv_fee').val();
    data.other_fee = $('#other_fee').val();
    data.note = $('#note').val();
    data.total_expenditure = $('#total_expenditure').val();
    data.total_receive = $('#receive').val();

    if (e.originalEvent.explicitOriginalTarget.id == "btn_final")
      data.isFinal = "1";
    else
      data.isFinal = "0";
    $.ajax({
          type: 'POST',    
          data: JSON.stringify(data),        
          url: '/temporary2',
          contentType: 'application/json',
          dataType: 'json'        
      }).done(function(response) {
        if (e.originalEvent.explicitOriginalTarget.id == "btn_final") {
          $('#btn_save').prop('disabled', true);
          $('#btn_final').prop('disabled', true);
        }
        $('#alert').empty();
        $('#alert').append("<strong>Ok!</strong> Lưu lại thành công.");
        $('#alert').show();
      }).error(function(response){alert('error');});  
  });

  $("#detail_link").click(function(event) {
    event.preventDefault();
    var data = {};    
    data.choosen_date = $('#choosen_date').val();
    
    $.ajax({
          type: 'POST',    
          data: JSON.stringify(data),        
          url: '/temporary1',
          contentType: 'application/json',
          dataType: 'json'
      
      }).done(function(response) {
        var total = 0;
        $("#detail_table tbody tr").remove();
        $.each(response, function(index, element){
          if (element.status == "0")                
            $('#detail_table').find('tbody').append($('<tr class = "tr_warning"><td>' + element.apartmentId + '</td><td id= ' + 'fee_' + index + '>' + element.total_fee + '</td></tr>'));
          else
            $('#detail_table').find('tbody').append($('<tr class = "tr_close"><td>' + element.apartmentId + '</td><td id= ' + 'fee_' + index + '>' + element.total_fee + '</td></tr>'));  
          $("[id^=fee]").number(true);
          total += element.total_fee;
        });
        $('#detail_table').find('tbody').append($('<tr><td>Tổng' + '</td><td id= ' + 'fee_total' + '>' + total + '</td></tr>'));            
        $("[id^=fee_total]").number(true);
      }); 


    if($('#detail_div').css('display') == 'none')
      $('#detail_div').show();
    else
      $('#detail_div').hide();
  });

   $('#electric_fee, #water_fee, #clean_fee, #other_fee, #internet_fee, #tv_fee').focusout(function(){
    var water_fee = parseInt($('#water_fee').val());
    var electric_fee = parseInt($('#electric_fee').val());
    var clean_fee = parseInt($('#clean_fee').val());
    var internet_fee = parseInt($('#internet_fee').val());
    var tv_fee = parseInt($('#tv_fee').val());
    var other_fee = parseInt($('#other_fee').val());

    var total_take = parseInt($('#total_take').val());

    var total_expenditure = water_fee + electric_fee + clean_fee + internet_fee + tv_fee + other_fee;
    $('#total_expenditure').val(total_expenditure);
    var receive = total_take - total_expenditure;
    $('#receive').val(receive);
   });

  $('#apartment-tab3-content').on('submit', function (e) {
    e.preventDefault();    
    var year = $('#year_statistical').find(":selected").val();
    var input = {};
    input.choosen_year = $('#year_statistical').find(":selected").val();
    //alert(JSON.stringify(input));
    $.ajax({
          type: 'POST',    
          data: JSON.stringify(input),        
          url: '/temporary3',
          contentType: 'application/json',
          dataType: 'json'
      
      }).done(function(response) {        
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
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Năm');
            data.addColumn('number', 'Thu');
            data.addColumn('number', 'Chi');
            data.addColumn('number', 'Thực thu');
            $.each(response, function(index, element){
              data.addRow([element.month.toString(), element.total_take, element.total_expenditure, element.total_receive]);              
            });           

            var options = {
            chart: {
              title: 'Thống kê thu chi',
              subtitle: 'Thu, Chi, Thực thu năm' //+ year;           
            },
            backgroundColor: 'none',
            chartArea:{
              backgroundColor: 'none'
             }
            };

            //var chart = new google.visualization.PieChart(document.getElementById('columnchart_material'));//new google.charts.Bar(document.getElementById('columnchart_material'));
            //chart.draw(data, options);
            var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
            
          }
        }
      });
  });
});