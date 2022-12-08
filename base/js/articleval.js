// Article Creation Validator

const ArtErr = document.getElementById('art-err');
const TytErr = document.getElementById('tyt-err');
const PicErr = document.getElementById('pic-err');
const postErr = document.getElementById('post-err');
const thmPic = document.getElementById('thmpic');
const titleBlock = document.getElementById('titleblock');
const storyBlock = document.getElementById('editor1');

function validThumb() {
  const thumb = thmPic.value;

  if (!thumb) {
    PicErr.textContent = 'Please, Upload Thumbnail.';
    return false;
  }
  PicErr.innerHTML = '&#10004;';
  return true;
}

function validHead() {
  const title = titleBlock.value;
  const mini = 18;
  let left = mini - title.length;

  if (left > 0) {
    TytErr.textContent = left + ' or more characters needed.';
    return false;
  }

  TytErr.innerHTML = '&#10004;';
  return true;
}

function validArticle() {
  const story = CKEDITOR.instances.editor1.getData();
  const minim = 70;
  let leftOver = minim - story.length;

  if (leftOver > 0) {
    ArtErr.textContent = leftOver + ' or more characters needed.';
    return false;
  }

  ArtErr.innerHTML = '&#10004;';
  return true;
}

function validPostForm() {
  if (!validThumb() || !validHead() || !validArticle()) {
    postErr.style.display = 'block';
    postErr.textContent = 'Fix Error To Post';
    setTimeout(function () {
      postErr.style.display = 'none';
    }, 3000);
    return false;
  }
}

const postBtn = document.getElementById('post');
let allBlogs = [];

let blogsFormLocalStorage = localStorage.getItem('allBlogs');
if (blogsFormLocalStorage) {
  allBlogs = JSON.parse(blogsFormLocalStorage);
}

const renderBlogInAdmin = (nuBlog, index, allBlogs) => {
  const articlesDiv = document.querySelector('.articles');
  const readBtn = document.createElement('img');
  const updateBtn = document.createElement('img');
  const deleteBtn = document.createElement('img');

  updateBtn.setAttribute('src', './icons/dashicons_update.svg');
  deleteBtn.setAttribute('src', './icons/fluent_delete-24-regular.svg');
  readBtn.setAttribute('src', './icons/mdi_file-eye-outline.svg');

  const subArticleDiv = document.createElement('div');
  const optionsDiv = document.createElement('div');
  const blogDiv = document.createElement('div');
  const thumbDiv = document.createElement('div');
  const storyDiv = document.createElement('div');
  const headEl = document.createElement('h2');
  const shortEl = document.createElement('p');

  subArticleDiv.classList.add('sub-article');
  optionsDiv.classList.add('options');
  blogDiv.classList.add('blog');
  thumbDiv.classList.add('thumb');
  storyDiv.classList.add('story');

  deleteBtn.addEventListener('click', () => deleteBlog(allBlogs, index));
  updateBtn.addEventListener('click', () => updateBlog(allBlogs, index));
  readBtn.addEventListener('click', () => readBlog(allBlogs, index));

  let iMgDat = document.createElement('img');
  iMgDat.src = nuBlog.photo;
  let iMg = iMgDat;

  iMg.classList.add('picPrev');

  let toShort = nuBlog.story;
  thumbDiv.appendChild(iMg);
  headEl.textContent = nuBlog.headline;
  shortEl.textContent = toShort.substring(0, 109);

  articlesDiv.appendChild(subArticleDiv);
  subArticleDiv.appendChild(optionsDiv);
  optionsDiv.appendChild(readBtn);
  optionsDiv.appendChild(updateBtn);
  optionsDiv.appendChild(deleteBtn);
  subArticleDiv.appendChild(blogDiv);
  blogDiv.appendChild(thumbDiv);
  blogDiv.appendChild(storyDiv);
  storyDiv.appendChild(headEl);
  storyDiv.appendChild(shortEl);
};

const renderAllBlogs = (allBlogs) => {
  const articlesDiv = document.querySelector('.articles');
  if (articlesDiv) {
    articlesDiv.remove();
  }

  const grad = document.querySelector('.grad');
  const blogsContainer = document.createElement('div');
  blogsContainer.classList.add('articles');
  const title = document.createElement('h1');
  title.textContent = 'Articles';
  blogsContainer.appendChild(title);
  grad.appendChild(blogsContainer);
  allBlogs.forEach((blog, index) => {
    renderBlogInAdmin(blog, index, allBlogs);
  });
};

const updateLocalStorageBlogs = (allBlogs) => {
  localStorage.setItem('allBlogs', JSON.stringify(allBlogs));
};

renderAllBlogs(allBlogs);

thmPic.addEventListener('change', () => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    let url = reader.result;
    // console.log(url);
    localStorage.setItem('ThumbnailPic', url);
    // allBlogs[0].photo = url;
    // document.querySelector('#test').src = url;
    // posts[a].image = url;
  });
  reader.readAsDataURL(thmPic.files[0]);
});

function submitaftersetdata() {
  this.updateElement();
}

let updateIndex = 0;
let isUpdating = false;

const updateBlog = (allBlogs, index) => {
  const formUpdate = document.querySelector('.container-article');
  const picUpdate = document.querySelector('#test');
  const fileUpdate = document.querySelector('#thmpic');
  const tytUpdate = document.querySelector('#titleblock');
  const strUpdate = document.querySelector('#editor1');
  formUpdate.classList.add('poppedup');
  picUpdate.setAttribute('src', allBlogs[index].photo);
  // fileUpdate.value = allBlogs[index].photo;
  tytUpdate.value = allBlogs[index].headline;
  strUpdate.textContent = CKEDITOR.instances.editor1.setData(
    allBlogs[index].story,
    submitaftersetdata
  );
  updateIndex = index;
  isUpdating = true;
};

const regEx = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

postBtn.addEventListener('click', () => {

  let blog = {
    photo: localStorage.getItem('ThumbnailPic'),
    headline: titleBlock.value,
    story: CKEDITOR.instances.editor1.getData().replace(regEx, ''),
    likes: [],
    comments: [],
  };

  if (!isUpdating) {
    allBlogs.push(blog);
  } else {
    allBlogs.splice(updateIndex, 1, blog);
    console.log('After updating', allBlogs, blog);
  }

  renderAllBlogs(allBlogs);
  updateLocalStorageBlogs(allBlogs);
});

const deleteBlog = (allBlogs, index) => {
  allBlogs.splice(index, 1);
  renderAllBlogs(allBlogs);
  updateLocalStorageBlogs(allBlogs);
};
