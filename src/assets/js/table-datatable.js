$(function() {
	"use strict";

    $(document).ready(function() {
        table = $('#example').DataTable( {
            retrieve: true,
            paging: false
        } );
         
        table.destroy();
         
        table = $('#example').DataTable( {
            searching: false,
            destroy: true
        } );
      } );

      $(document).ready(function() {
        var table = $('#example2').DataTable( {
            lengthChange: false,
            retrieve: true,
            buttons: [ 'copy', 'excel', 'pdf', 'print']
        } );
     
        table.buttons().container()
            .appendTo( '#example2_wrapper .col-md-6:eq(0)' );
    } );


});