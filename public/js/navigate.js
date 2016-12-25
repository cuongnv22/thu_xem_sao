// $(window).scroll(function() {
//         sessionStorage.scrollTop = $('#leftmenu').scrollTop();
// });

 $(function() {
    
    // if (sessionStorage.scrollTop != "undefined") {
    //     $(window).scrollTop(sessionStorage.scrollTop);
    // }

     $("[id^=edit]").click(function() {
         var rawId = ($(this).attr("id")).toString();
         var items = rawId.split("_");
         var year = items[1];
         var month = items[2];
         var id = items[3];
         var pageName = items[4];
         window.location.href = '/' +  pageName + '/' + year + '/' + month + '/' + id;
     });
    if ($('#baby-grid')!= null) {
     	$('#baby-grid').DataTable({
         	paging: true
     	});
 	}
     // $('#apartment-grid').DataTable({
     //     paging: true
     // });

     $('#attendance-grid td.clickable').click(function() {
        
        $("[data-toggle^=tooltip]").tooltip();
        $(this).prop('title', 'Học sinh nghỉ cả ngày và không có lý do xác đáng.');
        $("#myModal").modal();
        $(this).append('X');
     });
 });