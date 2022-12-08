const popUp = document.querySelector('.container-article');
const create = document.getElementById('create');

// const open = document.getElementById('open');

function openPopUp() {
  popUp.classList.add('poppedup');
}

function closePopUp() {
  popUp.classList.remove('poppedup');
}

// ClassicEditor.create(document.querySelector('#storyblock'));
CKEDITOR.replace('editor1');