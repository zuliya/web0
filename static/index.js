$(document).ready(() => {
  $('#searchEvents').click(() => {
    const search = $('#name').val()
    const date = $('#date').val()
    $.ajax({
      url: `/events/search?search=${search}&date=${date}`,
      success(data) {
        console.log(data)
         var events = data
         var counter = 0
         for (i=0; i<events.length;i++){

           // var template = ['<div class="col-sm-4">\
           //  <p> Event 1 </p>\
           //  <img src="birds1.jpg" class="img-responsive margin" style="width:100%" alt="Image">\
           //  </div>')]
           counter +=1

        //    "event_id": 1,
        // "title": "Test event",
        // "venue_id": 1,
        // "date": "2025-11-19T21:00:00.000Z",
        // "url": "",
        // "blurb": ""
           $('#eventRow').append('<div class="col-sm-4">\
            <p> Event ' + counter + '</p>\
            <p> Venue_id' + events[i].venue_id + '</p>\
            <p> Date ' + events[i].date + '</p>\
            <p> url:  ' + events[i].url + '</p>\
            <p> blurb:  ' + events[i].blurb + '</p>\
            </div>')
          }



       }
     })
      })
    })
