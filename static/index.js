$(document).ready(() => {
  $('#searchEvents').click(() => {
    const name = $('#name').val()
    const date = $('#date').val()
    const url = `http://localhost:8090/events/search?search=${name}&date=${date}`
    console.log(url)
    $.ajax({
      url,
      success(data) {
        let html = ''
      }
    })
  })
})
