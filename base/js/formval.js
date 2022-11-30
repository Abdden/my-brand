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

const toDash = document.querySelector('#todash');

function author(e) {
  e.preventDefault();
  if (!validAdminMail() || !validAdminPass()) {
    adLogErr.textContent = 'Access Denied';
    return false;
  }
  window.location.href = 'admin.html';
}

toDash.addEventListener('click', (e) => {
  validAdminPass();
  author(e);
});

// form.addEventListener('submit', author);
// comMsg.addEventListener('change', validMsg);
