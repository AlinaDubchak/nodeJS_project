let register = $('#link_sign_up');
let reset = $('#test_reset');
let link_reg = $('#link_reg');
let btn = $('#btn');
let text = $('#text');

function toggleInputType() {
  let passwordInput = $('#passwordInput');
  let eyeIcon = $('#eye-icon');

  if (passwordInput.attr('type') === 'password') {
    passwordInput.attr('type', 'text');
    eyeIcon.attr('src', './icons/eye.svg');
  } else {
    passwordInput.attr('type', 'password');
    eyeIcon.attr('src', './icons/eye_2.svg');
  }
}

function login() {
  let username = $('#usernameInput').val();
  let password = $('#passwordInput').val();

  let formData = {
    username: username,
    password: password,
  };

  $.ajax({
    // fetch('http://localhost:3000/login'
    type: 'POST',
    url: 'http://localhost:3000/login',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function (data) {
      console.log('Success:', data, formData);
    },
    error: function (error) {
      console.error('Error:', error);
    },
  });
}

function registerFetch() {
  let username = $('#usernameInput').val();
  let password = $('#passwordInput').val();
  let mail = $('#mailInput').val();

  let status;
  if ($('#inlineCheckbox1').is(':checked')) {
    status = 'Worker';
  } else if ($('#inlineCheckbox2').is(':checked')) {
    status = 'User';
  } else {
    status = 'Undefined';
  }

  let formData = {
    username: username,
    password: password,
    mail: mail,
    status: status,
  };

  $.ajax({
    // fetch('http://localhost:3000/register'
    type: 'POST',
    url: 'http://localhost:3000/register',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function (data) {
      console.log('Success:', data, formData);
    },
    error: function (error) {
      console.error('Error:', error);
    },
  });
}

function addSignUpField() {
  const register = $('<div>').html(`
                         <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">
                      <img src="./icons/mail.svg" alt="" />
                    </span>
                    <input 
                    type='email'
                    id="mailInput"
                    class='form-control' 
                    placeholder='Email'
                    aria-label='Password' 
                    aria-describedby='addon-wrapping'
                     />
                  </div>
                  <div id="checkBoxs">
                    <input type="checkbox" class='form-check-input' id='inlineCheckbox1' value='option1'/>
                    <label class="form-check-label"
                        for="inlineCheckbox1" id="worker">Worker</label>
                    <input type="checkbox" class='form-check-input'
                      id='inlineCheckbox2' value='option2' />
                    <label class="form-check-label"
                        for="inlineCheckbox2">User</label>
                  </div>
    `);

  $('#SignUpFieldsContainer').append(register);
}

register.on('click', function () {
  link_reg.remove();
  reset.remove();
  btn.html('Sign Up');
  btn.off('click');
  btn.on('click', registerFetch);
  text.html('Get Started Now!');
});
