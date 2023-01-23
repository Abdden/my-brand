const popUp = document.querySelector('.container-article');
const create = document.getElementById('create');

function openPopUp() {
  popUp.classList.add('poppedup');
  localStorage.setItem('prop', 'create')
}

function closePopUp() {
  popUp.classList.remove('poppedup');
  location.reload()
}

CKEDITOR.replace('editor1');