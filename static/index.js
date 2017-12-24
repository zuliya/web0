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
                      <p> Title: <br>' + events[i].title + '</p>\
                      <p> Date: <br>' + events[i].date + '</p>\
                      <p> url: <br> ' + events[i].url + '</p>\
                      <br> \
                      </div>\
                      </div>')}
                }
            })
   })
 })
