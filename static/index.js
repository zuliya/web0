$(document).ready(() => {

  // This worked perfect
    $('#searchEvents').click(() => {
      const search = $('#name').val()
      const date = $('#date').val()

          $.ajax({
              url: `/events2017/events/search?search=${search}&date=${date}`,


              success(data) {
                  events = data
                  counter = 0
                  console.log(data)
                   for (i=0; i < events.length ;i++){
                     console.log(events[i])
                     counter +=1
                     $('#eventRow').append('<div class="col-sm-4">\
                     <div class="panel panel-default">\
                      <p> <br> <span style="font-weight:bold"> Event ' + counter + '</span></p>\
                      <p> Event ID: ' + events[i].event_id + '</p>\
                      <p> Title: <br>' + events[i].title + '</p>\
                      <p> Date: <br>' + events[i].date + '</p>\
                      <p> URL: <br> ' + events[i].url + '</p>\
                      <p> Town: <br> ' + events[i].town + '</p>\
                      <p> Postcode: <br> ' + events[i].postcode + '</p>\
                      <br> \
                      </div>\
                      </div>')}
              }
          })
        //
        // $.ajax({
        //
        //     success(data) {
        //         url: "http://api.eventful.com/json/events/search",
        //             type: 'GET',
        //             crossDomain: true,
        //             dataType: 'jsonp',
        //             data: {app_key: "PzX3bL8MMqK6GB7n", category:"music", location: "United Kingdom", keywords: $('#search').val(), date: new Date($('#date').val())}
        //     }).done(function(data) {
        //     for(i = 0; i < data.events.event.length; i++){
        //             console.log(events[i])
        //             counter +=1
        //             $('#eventRow').append('<div class="col-sm-4">\
        //                      <div class="panel panel-default">\
        //                       <p> <br> <span style="font-weight:bold"> Event ' + counter + '</span></p>\
        //                       <p> Title: <br>' + events.events.event.length[i].title + '</p>\
        //                       <p> Date: <br>' + events.events.event[i].start_time[i].date + '</p>\
        //                       <p> url: <br> ' + events[i].url + '</p>\
        //                       <br> \
        //                       </div>\
        //                       </div>')}
        //     }
        // })



     })
})

