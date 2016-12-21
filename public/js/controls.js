$( function() {
		  	// $(".datecontrol").datepicker();
	    // 		$( ".datecontrol" ).datepicker("option","dateFormat","dd/mm/yy")
	 $('.input-group.date').datepicker({
        todayBtn: "linked",
        format: "dd/mm/yyyy",
        todayHighlight: true,
        language: "vi"
    });   
});