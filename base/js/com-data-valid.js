const comErr = document.getElementById('com-err');
const comMsg = document.getElementById('com-msg');
const addCom = document.getElementById('add');

// VALIDATION

function validMsg() {
  const words = comMsg.value;
  const require = 15;
  let charcat = require - words.length;

  if (charcat > 0) {
    comErr.textContent = charcat + ' or more characters needed.';
    return false;
  }

  comErr.innerHTML = '&#10004;';
  return true;
}

const resetForm = () => {
  comMsg.value = '';
};

// RENDERING DATA TO THE VIEWPORT

const indexStr = window.location.search;
const index = JSON.parse(indexStr[indexStr.length - 1]);

const renderBlogView = () => {
  const inLocalStorageString = localStorage.getItem('allBlogs');
  const inLocalStorage = JSON.parse(inLocalStorageString);
  const blog = inLocalStorage[index];
  //FOR BLOG

  const container = document.querySelector('.forcontent');
  const blogDiv = document.createElement('div');
  let picDiv = document.createElement('div');
  const bHeadEl = document.createElement('h1');
  const bParagraph = document.createElement('p');
  const img = document.createElement('img');
  // const bComP = document.createElement('p');
  // const bLikesP = document.createElement('p');
  // const bViewP = document.createElement('p');
  // const statDiv = document.createElement('div');
  // const nComDiv = document.createElement('div');
  // const nLikeDiv = document.createElement('div');
  // const nViewDiv = document.createElement('div');

  bHeadEl.textContent = blog.headline;
  bParagraph.textContent = blog.story;

  blogDiv.classList.add('blog');
  img.setAttribute('src', blog.photo);

  img.classList.add('picPrev');
  picDiv.classList.add('thumb');
  picDiv.appendChild(img);

  blogDiv.appendChild(bHeadEl);
  blogDiv.appendChild(picDiv);
  blogDiv.appendChild(bParagraph);
  container.appendChild(blogDiv);

  //FOR COM

  const likeBtn = document.createElement('img');
  const comentBtn = document.createElement('img');
  const viewBtn = document.createElement('img');

  likeBtn.setAttribute('src', './icons/icon-park-outline_like.svg');
  comentBtn.setAttribute('src', './icons/uil_comment-lines.svg');
  viewBtn.setAttribute('src', './icons/mdi_eye-outline.svg');

  // const allComDiv = document.createElement('div');

  const days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };

  const date = new Date();
  const formattedTime = `${days[date.getDay()]} - ${date.toLocaleTimeString()}`;

  // const comments = [
  //   { user: 'Murdock', com: 'Wellllllllllll!' },
  //   { user: 'Naslaa', com: 'Wellllllllllll!' },
  //   { user: 'Newman', com: 'Wellllllllllll!' },
  // ];
  const wholeSecDive = document.querySelector('.comented');
  const allComsDiv = document.createElement('div');
  wholeSecDive.appendChild(allComsDiv);

  blog.comments.forEach((comment) => {
    const wholeComDiv = document.createElement('div');
    const ppDiv = document.createElement('div');
    const name_comDiv = document.createElement('div');
    const nameDiv = document.createElement('div');
    const comentDiv = document.createElement('div');
    let h4El = document.createElement('h4');
    let paragraph = document.createElement('p');
    let paragraphTime = document.createElement('p');

    h4El.textContent = comment.user;
    paragraphTime.textContent = formattedTime;
    paragraph.textContent = comment.comment;

    allComsDiv.appendChild(wholeComDiv);
    wholeComDiv.appendChild(ppDiv);
    wholeComDiv.appendChild(name_comDiv);
    name_comDiv.appendChild(nameDiv);
    name_comDiv.appendChild(comentDiv);
    nameDiv.appendChild(h4El);
    nameDiv.appendChild(paragraphTime);
    comentDiv.appendChild(paragraph);

    allComsDiv.classList.add('coms-cont');
    wholeComDiv.classList.add('single-com');
    ppDiv.classList.add('pic');
    name_comDiv.classList.add('name-coment');
    nameDiv.classList.add('name');
    comentDiv.classList.add('coment');
  });
};

renderBlogView();

comMsg.addEventListener('keyup', validMsg);

addCom.addEventListener('click', (e) => {
  e.preventDefault();

  if (validMsg() === false) {
    return;
  }
  const containerDiv = document.querySelector('.blog');
  if (containerDiv) {
    containerDiv.remove();
  }
  const comsContDiv = document.querySelector('.coms-cont');
  if (comsContDiv) {
    comsContDiv.remove();
  }

  const uName = document.querySelector('#com-name');

  const inLocalStorageString = localStorage.getItem('allBlogs');
  const inLocalStorage = JSON.parse(inLocalStorageString);

  inLocalStorage.splice(index, 1, {
    ...inLocalStorage[index],
    comments: [
      ...inLocalStorage[index].comments,
      { user: uName.value, comment: comMsg.value },
    ],
  });

  localStorage.setItem('allBlogs', JSON.stringify(inLocalStorage));

  renderBlogView();
  resetForm();
});
