$(document).ready(() => {
  // This works perfect
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
                 counter +=1
                 $('#eventRow').append('<div class="col-sm-4">\
                  <p> <br> <span style="font-weight:bold"> Event ' + counter + '</span></p>\
                  <p> Title: <br>' + events[i].title + '</p>\
                  <p> Date: <br>' + events[i].date + '</p>\
                  <p> url: <br> ' + events[i].url + '</p>\
                  <br> \
                  </div>')}
            }
        })

        // This shows not authenticated
        $('#btnLogin').click(() => {
            const username = $('#username').val()
            const date = $('#password').val()
              $.ajax({
                url: `/login/login?username=${username}&date=${password}`,
                success(data) {
                console.log(data)
                var login = data
                $('#btnLogin').remove()
                $('#username').remove()
                $('#password').remove()
                $('#signInTxt').append("<div> SUCCESS </div>")
                // Redirect
                window.location.href = "/events/static/admin.html"

                }
              })
          })

          $('#btnSubminEvents').click(() => {
            console.log("Here");
              const username = $('#title').val()
              const event_id = $('#event_id').val()
              const venue_id = $('#venue_id').val()
              const date = $('#date').val()
              const blurb = $('#blurb').val()
              const url = $('#url').val()
                $.ajax({
                  url: `/events/add?title=${title}&event_id=${event_id}&venue_id=${venue_id}&date=${date}&blurb=${blurb}&url=${url}`,
                  success(data) {
                  console.log(data)
                  var login = data
                  $('#btnSubminEvents').append('<div> Your event' + title + 'Have been added </div>')
                  window.location.href = "/events/static/admin.html"
                  }
                })
            })

            $('#btnSubminVenues').click(() => {
              console.log("Here");
                const name = $('#venueName').val()
                const postcode = $('#postcode').val()
                const town = $('#town').val()
                const url = $('#url').val()
                const icon = $('#icon').val()
                  $.ajax({
                    url: `/venues/add?name=${name}&postcode=${postcode}&town=${town}&url=${url}&icon=${icon}`,
                    success(data) {
                    console.log(data)
                    var login = data
                    $('#btnSubminEvents').append('<div> Your venue' + name + 'Have been added </div>')
                    window.location.href = "/events/static/admin.html"

                    }
                  })
              })
   })
 })
