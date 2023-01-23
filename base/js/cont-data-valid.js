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

function validName() {
  const name = nameEl.value;

  if (name.length === 0) {
    nameErr.textContent = 'Valid Name Requred';
    return false;
  }

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

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (validSendForm() === false) {
    return;
  }
  postFetch()

});

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

const loadingScreen = document.querySelector('.loadingScreen')

const postFetch = async () => {
  loadingScreen.showModal()
  const url = 'https://herestohope.onrender.com/contact'
  try {
  const res = await fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    names:nameEl.value,
    email:mailEl.value,
    subject:subjectEl.value,
    message:messageEl.value,
  }),
  headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json'
  }
  })
  .then(res => {
    loadingScreen.close()
    if(res.status == 200){
      location.reload()
      confirm('Thanks For Reaching Out.')
    }
    return res.json()
  })
} catch (error) {
  loadingScreen.close()
  console.log(error);
  sendErr.style.display = 'block';
  sendErr.textContent = 'Something Went Wrong!, Reload Required.';
}
}
