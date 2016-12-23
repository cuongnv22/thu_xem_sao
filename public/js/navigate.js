 $(function() {
     $("[id^=edit]").click(function() {
         var rawId = ($(this).attr("id")).toString();
         var firstUnderScoreIndex = rawId.indexOf("_");
         var secondUnderScoreIndex = rawId.indexOf("_", firstUnderScoreIndex + 1);
         var id = rawId.substring(firstUnderScoreIndex + 1, secondUnderScoreIndex);
         var pageName = rawId.substring(secondUnderScoreIndex + 1, rawId.length);         
         window.location.href = '/' + pageName + '/' + id;
     });
     $('#baby-grid').DataTable({
         paging: true
     });
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