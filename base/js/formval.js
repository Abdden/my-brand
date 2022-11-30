// Sign Up Validation

const nameErr = document.getElementById('name-err');
const mailErr = document.getElementById('mail-err');
const passErr = document.getElementById('pass-err');
const submitErr = document.getElementById('submit-err');
const form = document.getElementById('form');

function validName() {
  const name = document.getElementById('user-name').value;

  if (name.length === 0) {
    nameErr.textContent = 'Valid Name Requred';
    return false;
  }

  if (!name.match(/^[A-Za-z][A-Za-z0-9_]{5,29}$/)) {
    nameErr.textContent = 'Atleast 5 characters Required';
    return false;
  }

  // if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
  //   nameErr.textContent = 'Write Full Name';
  //   return false;
  // }
  nameErr.innerHTML = '&#10004;';
  return true;
}

function validMail() {
  const email = document.getElementById('user-email').value;

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
  const passWord = document.getElementById('user-password').value;

  if (passWord.length === 0) {
    passErr.textContent = 'Valid Password Required';
    return false;
  }

  if (!passWord.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
    passErr.textContent =
      'Password must contain atleast 8 characters including a number, spacial character and uppercase letter';
    return false;
  }

  passErr.innerHTML = '&#10004;';
  return true;
}

function validForm() {
  if (!validName() || !validMail() || !validPass()) {
    submitErr.style.display = 'block';
    submitErr.textContent = 'Fix Error To Submit';
    setTimeout(function () {
      submitErr.style.display = 'none';
    }, 3000);
    return false;
  }
}

// Contact Validation

const subjectErr = document.getElementById('subject-err');
const smsErr = document.getElementById('sms-err');
const sendErr = document.getElementById('send-err');

function validSub() {
  const subject = document.getElementById('subject').value;
  const min = 15;
  let char = min - subject.length;

  if (char > 0) {
    subjectErr.textContent = char + ' or more characters needed.';
    return false;
  }

  subjectErr.innerHTML = '&#10004;';
  return true;
}

function validSms() {
  const sms = document.getElementById('sms').value;
  const req = 25;
  let charc = req - sms.length;

  if (charc > 0) {
    smsErr.textContent = charc + ' or more characters needed.';
    return false;
  }

  smsErr.innerHTML = '&#10004;';
  return true;
}

function validSendForm() {
  if (!validName() || !validSub() || !validSms() || !validMail()) {
    sendErr.style.display = 'block';
    sendErr.textContent = 'Fix Error To Send';
    setTimeout(function () {
      sendErr.style.display = 'none';
    }, 3000);
    return false;
  }
}

// Admin Validation

const adMailErr = document.getElementById('admail-err');
const adPassErr = document.getElementById('adpass-err');
const adLogErr = document.getElementById('adlog-err');

function validAdminMail() {
  const adEmail = document.getElementById('admin-email').value;

  if (!adEmail.match('giffrenabdden@gmail.com')) {
    adMailErr.textContent = 'Authorized Admin Required';
    return false;
  }

  adMailErr.innerHTML = '&#10004;';
  return true;
}

function validAdminPass() {
  const adPassWord = document.getElementById('admin-password').value;

  if (!adPassWord.match('MyFirst1')) {
    adPassErr.textContent = 'Unrecognized Password';
    return false;
  }

  adPassErr.innerHTML = '&#10004;';
  return true;
}

function author(e) {
  console.log(e);
  e.preventDefault();
  if (!validAdminMail() || !validAdminPass()) {
    adLogErr.textContent = 'Access Denied';
    return false;
  }

  // adPassErr.innerHTML = '&#10004;';
  // return true;

  // window.location.href('/base/admin.html');
  window.location.assign('/base/admin.html');
}

form.addEventListener('submit', author);
