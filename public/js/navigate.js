 $(function() {
     $("[id^=edit]").click(function() {
         var id = ($(this).attr("id")).toString();
         var babyId = id.substring(id.indexOf("_") + 1, id.length);
         window.location.href = '/babyList/' + babyId;
     });
     $('#baby-grid').DataTable({
         paging: true
     });

     $('#attendance-grid td.clickable').click(function() {
        
        $("[data-toggle^=tooltip]").tooltip();
        $(this).prop('title', 'Học sinh nghỉ cả ngày và không có lý do xác đáng.');
        $("#myModal").modal();
        $(this).append('X');
     });
 });