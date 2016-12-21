 $( function() {
    	 $("[id^=edit]").click(function(){
  	 	var id = ($(this).attr("id")).toString();  	 	
  	 	var babyId = id.substring(id.indexOf("_") + 1, id.length);
   		window.location.href = '/babyList/' + babyId;
   });
    	 $('#baby-grid').DataTable( {
    		paging: true
	} );

  });

