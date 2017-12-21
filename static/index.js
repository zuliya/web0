$(document).ready(() => {

  $('#searchEvents').click(() => {
    const search = $('#name').val()
    const date = $('#date').val()
    let url = `http://localhost:8090/events/search?search=${name}&date=${date}`

    console.log(url)
    console.log("Button clicked")
          }
        }
    $.ajax({
      url,
      success(data) {
        $('#searchEvents').html("");
        var events = JSON.parse(data).events;
        for(i = 0; i < events.length; i++){
        $('#col-sm-4').append("<div>\
                          <strong>"+  search + "</strong></br>\
                  </div>")
      }
    })
  }

    // // $.getJSON("venues",function(data){
    // //   console.log(data);
    //   var test = data.test;
    //   var header = $("<h2>").text(test);
    //   $("body").append(header);
    // // }
    // //
    // //
    // //


  })
})
