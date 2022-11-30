const subjectErr = document.getElementById('subject-err');
const smsErr = document.getElementById('sms-err');
const sendErr = document.getElementById('send-err');
const nameErr = document.getElementById('name-err');
const mailErr = document.getElementById('mail-err');
const sendBtn = document.getElementById('send');

let nameEl = document.getElementById('user-name');
let mailEl = document.getElementById('user-email');
let subjectEl = document.getElementById('subject');
let messageEl = document.getElementById('sms');

// VALIDATION

function validName() {
  const name = nameEl.value;

  if (name.length === 0) {
    nameErr.textContent = 'Valid Name Requred';
    return false;
  }

  // if (!name.match(/^[A-Za-z][A-Za-z0-9_]{5,29}$/)) {
  //   nameErr.textContent = 'At least 5 characters Required';
  //   return false;
  // }

  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameErr.textContent = 'Write Full Name';
    return false;
  }
  nameErr.innerHTML = '&#10004;';
  return true;
}

function validMail() {
  const email = mailEl.value;

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

function validSub() {
  const subject = subjectEl.value;
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
  const sms = messageEl.value;
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

// Accessing the DOM

// Data Collection
let allUserQueries = [];

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (validSendForm() === false) {
    return;
  }

  const userData = {
    name: nameEl.value,
    mail: mailEl.value,
    subject: subjectEl.value,
    message: messageEl.value,
  };

  allUserQueries.push(userData);

  toLocalStorage();

  resetForm();

  // const existingUsers = JSON.parse(localStorage.getItem('allUserQueries'));
  // console.log('existingUsers -- before', existingUsers);
  // if (existingUsers) {
  //   allUserQueries = allUserQueries.concat(JSON.parse(existingUsers));
  // }
  // console.log('existingUsers -- after', existingUsers);

  // allUserQueries.push(userData);
  // console.log('existingUsers -- after pushing', existingUsers);
  // localStorage.setItem('allUserQueries', JSON.stringify(allUserQueries));
});

const toLocalStorage = () => {
  localStorage.setItem('allUserQueries', JSON.stringify(allUserQueries));
};

const resetForm = () => {
  nameEl.value = '';
  mailEl.value = '';
  subjectEl.value = '';
  messageEl.value = '';
};

nameEl.addEventListener('keyup', validName);
mailEl.addEventListener('keyup', validMail);
subjectEl.addEventListener('keyup', validSub);
messageEl.addEventListener('keyup', validSms);
