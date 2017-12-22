$(document).ready(() => {
  $('#searchEvents').click(() => {
    const search = $('#name').val()
    const date = $('#date').val()
    $.ajax({
      url: `/events/search?search=${search}&date=${date}`,
      success(data) {
        console.log(data)
         var events = data
         for (i=0; i<events.length;i++){
           // Shows underfined :(
           // console.log(events.title);

            $('#col-sm-4').append( document.createTextNode( "Hello" ) )
         }
       }
     })
      })
    })
