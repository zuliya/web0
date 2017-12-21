$(document).ready(() => {
  $('#searchEvents').click(() => {
    const search = $('#name').val()
    const date = $('#date').val()
    $.ajax({
      url: `/events/search?search=${search}&date=${date}`, 
      success(data) {
        console.log(data)
      }
    })
  })
})