const eyeIcons = document.querySelectorAll('#eye-icon')

function toggleInputType() {
  const passwordInput = $('#passwordInput')
  const eyeIcon = $('#eye-icon')

  if (passwordInput.attr('type') === 'password') {
    passwordInput.attr('type', 'text')
    eyeIcon.attr('src', '../icons/eye.svg')
  } else {
    passwordInput.attr('type', 'password')
    eyeIcon.attr('src', '../icons/eye_2.svg')
  }
}
eyeIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    toggleInputType()
  })
})
