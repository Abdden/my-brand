// Admin Validation

const adMailErr = document.getElementById('admail-err');
const adPassErr = document.getElementById('adpass-err');
const adLogErr = document.getElementById('adlog-err');

function validAdminMail() {
  const adEmail = document.getElementById('admin-email').value;

  if (!adEmail.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    adMailErr.textContent = 'Email Required';
    return false;
  }

  adMailErr.innerHTML = '&#10004;';
  return true;
}

function validAdminPass() {
  const adPassWord = document.getElementById('admin-password').value;

  if (adPassWord.length == '') {
    adPassErr.textContent = 'Password Required';
    return false;
  }

  adPassErr.innerHTML = '&#10004;';
  return true;
}

const toDash = document.querySelector('#todash');

function author(e) {
  e.preventDefault()
  if (!validAdminMail() || !validAdminPass()) {
    adLogErr.textContent = 'Access Denied';
    return false;
  }
}


toDash.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('admin-email').value
  const pass = document.getElementById('admin-password').value
  author(e);

  const validateMail = validAdminMail()
  const validatePassword = validAdminPass()

  if(validateMail && validatePassword){

    // fetch(`http://localhost:5000/users`, {
    //     headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('guru')}`
    //     }
    //   })
    //   .then(res => {
    //     if(!res.status == 401){
    //       fetch('http://localhost:5000/login', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         email:email,
    //         password:pass,
    //       }),
    //       headers: {
    //         Accept: 'application.json',
    //         'Content-Type': 'application/json'
    //       }})
    //       .then(res => {
    //         if( res.status == 401 ){
    //           adLogErr.textContent = 'No Credentials Found, Sign Up.'
    //         } else{
    //           window.location.href = 'admin.html';
    //         }
    //       })
    //       .then(data => {
    //         localStorage.setItem('guru', data.usertoken)
    //       })
    //     }
    //   })

    const loadingScreen = document.querySelector('.loadingScreen')

    const key = localStorage.getItem('guru');
     if (key) {
       fetch(`https://herestohope.onrender.com/users`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('guru')}`
        }
      })
      .then(res => {
            if( res.status == 401 ){
              return res.status
            } else{
              return res.json()
            }
          })
          .then(data => {
            loadingScreen.showModal()
            if(data == 401){
               fetch('https://herestohope.onrender.com/login', {
          method: 'POST',
          body: JSON.stringify({
            email:email,
            password:pass,
          }),
          headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          }})
          .then(res => {
            loadingScreen.close()
            if( res.status == 200 ){
              return res.json();
            } else {
              return ('failed')
            }
          })
          .then(data => {
            if(data == 'failed'){
            adLogErr.textContent = 'No Credentials Found, Sign Up.'
            } else {
            localStorage.setItem('guru', data.usertoken)
              window.location.href = '../../index.html';
            }
          })
            } else {
              window.location.href = 'admin.html';
            }
            // localStorage.setItem('guru', data.usertoken)
          })
     } 
    //  else {
    //    fetch('http://localhost:5000/login', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         email:email,
    //         password:pass,
    //       }),
    //       headers: {
    //         Accept: 'application.json',
    //         'Content-Type': 'application/json'
    //       }})
    //       .then(res => {
    //         if( res.status != 200 ){
    //           adLogErr.textContent = 'No Credentials Found, Sign Up.'
    //         } else {
    //           window.location.href = '../../index.html';
    //           return res.json();
    //         }
    //       })
          // .then(data => {
          //   localStorage.setItem('guru', data.usertoken)
          // })
    //  }
  }

});


