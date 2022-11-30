const nameErr = document.getElementById('name-err');
const mailErr = document.getElementById('mail-err');
const passErr = document.getElementById('pass-err');
const submitErr = document.getElementById('submit-err');

const nameEl = document.getElementById('user-name');
const emailEl = document.getElementById('user-email');
const passWordEl = document.getElementById('user-password');
const signBtn = document.getElementById('sign');

// VALIDATION

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

// Accessing the DOM

// Data Collection

const toLocalStorage = () => {
  localStorage.setItem(
    'allRegisteredUsers',
    JSON.stringify(allRegisteredUsers)
    );
  };
  
  const resetForm = () => {
    nameEl.value = '';
    emailEl.value = '';
    passWordEl.value = '';
  };

  let allRegisteredUsers = [];
  
  signBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    if (validForm() === false) {
      return;
    }
  
    const userData = {
      name: nameEl.value,
      email: emailEl.value,
      passWord: passWordEl.value,
    };
  
    allRegisteredUsers.push(userData);
  
    toLocalStorage();
  
    resetForm();
  
    // const existingUsers = JSON.parse(localStorage.getItem('allUsers'));
    // console.log('existingUsers -- before', existingUsers);
    // if (existingUsers) {
    //   allUsers = allUsers.concat(JSON.parse(existingUsers));
    // }
    // console.log('existingUsers -- after', existingUsers);
  
    // allUsers.push(userData);
    // console.log('existingUsers -- after pushing', existingUsers);
    // localStorage.setItem('allUsers', JSON.stringify(allUsers));
  });

nameEl.addEventListener('keyup', validName);
emailEl.addEventListener('keyup', validMail);
passWordEl.addEventListener('keyup', validPass);


addCart[i].addEventListener('click', () => {
  // get items from localStorage, or declare new one if not exist
  let menuItems = localStorage.getItem('ProductsInCart') || '[]';
  menuItems = JSON.parse(menuItems);
  // declare and add the new item
  menuItems.push({ name: addCart[i].name, price: addCart[i].value });
  localStorage.setItem('ProductsInCart', JSON.stringify(menuItems));
});