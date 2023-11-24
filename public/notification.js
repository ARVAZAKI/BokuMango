const alertTrigger = document.getElementById('notifButton')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Mangga anda telah ditambahkan ke cart...', 'success')
  })
}
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}


document.getElementById('reloadButton').addEventListener('click', () => {
  location.reload()
})
