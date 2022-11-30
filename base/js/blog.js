// DATA COLLECTION

const contentDiv = document.querySelector('.content');

const renderBlogInPage = (blog, index) => {
  const boxDiv = document.createElement('div');
  let imgDiv = document.createElement('div');
  const footDiv = document.createElement('div');
  const likesDiv = document.createElement('div');
  const comentsDiv = document.createElement('div');
  const viewsDiv = document.createElement('div');
  const headEl1 = document.createElement('h2');
  const shortEl1 = document.createElement('p');
  const nLikeEl = document.createElement('p');
  const nComentsEl = document.createElement('p');
  const nViewsEl = document.createElement('p');
  const linkEl = document.createElement('a');
  let iMg = document.createElement('img');

  boxDiv.classList.add('box');
  imgDiv.classList.add('image-container');
  shortEl1.classList.add('par');
  footDiv.classList.add('foot');
  likesDiv.classList.add('likes');
  comentsDiv.classList.add('coments');
  viewsDiv.classList.add('views');

  // linkEl.addEventListener('click', () => renderBlogView(blog, index));

  linkEl.setAttribute('href', `./blog-view.html?index=${index}`);

  iMg.setAttribute('src', blog.photo);
  iMg.classList.add('picPrev');
  imgDiv.appendChild(iMg);
  toShort = blog.story;
  headEl1.textContent = blog.headline;
  headEl1.setAttribute('style', 'cursor');
  headEl1.style.cursor = 'pointer';
  shortEl1.textContent = toShort.substring(0, 109);

  contentDiv.appendChild(boxDiv);
  boxDiv.appendChild(imgDiv);
  boxDiv.appendChild(linkEl);
  linkEl.appendChild(headEl1);
  boxDiv.appendChild(shortEl1);
  boxDiv.appendChild(footDiv);
  footDiv.appendChild(likesDiv);
  footDiv.appendChild(comentsDiv);
  footDiv.appendChild(viewsDiv);
};

let dataFromLocalStorageString = localStorage.getItem('allBlogs');
let dataFromLocalStorage = JSON.parse(dataFromLocalStorageString);

dataFromLocalStorage.forEach((blog, index) => {
  renderBlogInPage(blog, index);
});
