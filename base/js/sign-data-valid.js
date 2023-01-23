const nameErr = document.getElementById('name-err');
const mailErr = document.getElementById('mail-err');
const passErr = document.getElementById('pass-err');
const submitErr = document.getElementById('submit-err');

const nameEl = document.getElementById('user-name');
const emailEl = document.getElementById('user-email');
const passWordEl = document.getElementById('user-password');
const signBtn = document.getElementById('sign');


function validName() {
  const name = nameEl.value;

  if (name.length === 0) {
    nameErr.textContent = 'Valid Name Requred';
    return false;
  }

  if (!name.match(/^[A-Za-z][A-Za-z0-9_]{5,29}$/)) {
    nameErr.textContent = 'At least 5 characters Required';
    return false;
  }

  nameErr.innerHTML = '&#10004;';
  return true;
}

function validMail() {
  const email = emailEl.value;

  if (email.length === 0) {
    mailErr.textContent = 'Valid Email Requred';
    return false;
  }

  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    mailErr.textContent = 'Invalid Email';
    return false;
  }

  mailErr.innerHTML = '&#10004;';
  return true;
}

function validPass() {
  const passWord = passWordEl.value;

  if (passWord.length === 0) {
    passErr.textContent = 'Valid Password Required';
    return false;
  }

  if (!passWord.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
    passErr.textContent =
      'Password must contain at least 8 characters including a number, spacial character and uppercase letter';
    return false;
  }

  passErr.innerHTML = '&#10004;';
  return true;
}

function validForm() {
  if (!validName() || !validMail() || !validPass()) {
    submitErr.style.display = 'block';
    submitErr.textContent = 'Fix Error To Sign Up';
    setTimeout(function () {
      submitErr.style.display = 'none';
    }, 3000);
    return false;
  }
}
  
  const resetForm = () => {
    nameEl.value = '';
    emailEl.value = '';
    passWordEl.value = '';
  };
  
  const loadingScreen = document.querySelector('.loadingScreen')

  signBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validForm() === false) {
      return;
    } else {
      loadingScreen.showModal()
      fetch('https://herestohope.onrender.com/signup', {
        method: 'POST',
          body: JSON.stringify({
            name:nameEl.value,
            email:emailEl.value,
            password:passWordEl.value,
          }),
          headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
        loadingScreen.close()
        if(res.status === 200){
          window.location.href = '../../base/admin-login.html'
          return res.json()
        } else if(res.status === 409) {
          submitErr.textContent = `Email Already Exists!`;
          return null
        }
      })
      .catch (error => {
        loadingScreen.close()
        console.log(error);
        submitErr.style.display = 'block';
        submitErr.textContent = 'Something Went Wrong!, Reload Required.';
      })
    }
  });

nameEl.addEventListener('keyup', validName);
emailEl.addEventListener('keyup', validMail);
passWordEl.addEventListener('keyup', validPass);
