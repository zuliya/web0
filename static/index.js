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
           var template = ['<div class="col-sm-4">\
            <p> Event 1 </p>\
            <img src="birds1.jpg" class="img-responsive margin" style="width:100%" alt="Image">\
            </div>')].join("\n")
            $('#row').append(template)
         }
       }
     })
      })
    })
