console.log("Loaded")


//TODO ask steven about cookies

// do not try and access part of the document untill it has completed loading
$(document).ready(function() {
  // using JQuery to attach the handler
    $("#btnSearchEvents").click(function(event) {
        console.log("Button clicked");
        // get json and the run this function on the data the server returns
        $.getJSON ("events", function(data){
          // go through data and generate some html elemets lements to represent the data
          console.log(data);


          //get a text into the variable
          var greeting = data.greeting;
          // created the html element and puts the greeting text inside of it
          // <> create ""finds it
          var header = $("<h1>").text(greeting);
          //put in the end of body
          //.empty and then add "
          $("body").append(header);

          //Crazy Mike TODO understand
          // object has an array of tokens
          var topics = data.topics;
          var topicContainer = $("#topic-list-div");

          if (topics.length > 0) {
              topicContainer.empty();
              topicContainer.removeClass(); // this removes ALL classes (ie. no parameters intended)
              topicContainer.addClass("list-group").removeAttr("role");

              for (var i = 0; i < topics.length; i++) {
                  var toAppend = $("<a>") // ".red" "#btn" "<a>"
                  .attr("href", "#")
                  .attr("id", i)
                  .attr("onClick", "selectedTopic(this.id)")
                  .addClass("list-group-item list-group-item-action")
                  .text(topics[i]);

                  topicContainer.append(toAppend);
              }
          } else {
              console.log("Woops! No topics were returned");
          }
        })
    });
});

function searchVenues(){
  console.log("Search Venues Button is activated ");
}
// only for admins
function postNewVenue() {
    // TODO get form variables
    $.post("/venues",{
        // Data to send to server with post request
        // venueName port (post it to venues)
        // post request to server
        venueName: venueNameFromForm
    },function( data ) {
        $( ".result" ).html( data );
    });
}
