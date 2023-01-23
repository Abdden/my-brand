// Admin Validation

const adMailErr = document.getElementById('admail-err');
const adPassErr = document.getElementById('adpass-err');
const adLogErr = document.getElementById('adlog-err');

function validAdminMail() {
  const adEmail = document.getElementById('admin-email').value;

  if (!adEmail.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    adMailErr.textContent = 'Valid Email Required';
    return false;
  }

  adMailErr.innerHTML = '&#10004;';
  return true;
}

function validAdminPass() {
  const adPassWord = document.getElementById('admin-password').value;

  if (!adPassWord.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
    adPassErr.textContent = 'Valid Password Required';
    return false;
  }

  adPassErr.innerHTML = '&#10004;';
  return true;
}

const toDash = document.querySelector('#todash');

function author(e) {
  e.preventDefault()
  if (!validAdminMail() || !validAdminPass()) {
    adLogErr.style.display = 'block';
    adLogErr.textContent = 'Fix Error To Log In.';
    setTimeout(function () {
      adLogErr.style.display = 'none';
    }, 3000);
    return false;
  }
  return true
}

const loadingScreen = document.querySelector('.loadingScreen')

toDash.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('admin-email').value
  const pass = document.getElementById('admin-password').value

  if(author(e)){
    loadingScreen.showModal()
    fetch('https://herestohope.onrender.com/login', {
          method: 'POST',
          body: JSON.stringify({
            email:email,
            password:pass,
          }),
          headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            loadingScreen.close()
            if( res.status == 404 ){
              adLogErr.textContent = 'Email Or Password Is Wrong'
            } else {
              return res.json()
            }
          })
          .then(data => {
            localStorage.setItem('guru', data.usertoken)
            fetch(`https://herestohope.onrender.com/users`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('guru')}`
              }
            })
            .then(res => {
              if(res.status == 200){
                window.location.href = 'admin.html';
              } else if (res.status == 401){
                window.location.href = './../index.html';
              }
            })
            .catch(Error => {
              console.log(Error);
              adLogErr.style.display = 'block';
              adLogErr.textContent = 'Something Went Wrong, Reload Required.';
            })
          })
  }

});


