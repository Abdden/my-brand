 const months = {
        0: 'JAN',
        1: 'FEB',
        2: 'MAR',
        3: 'APR',
        4: 'MAY',
        5: 'JUN',
        6: 'JUL',
        7: 'AUG',
        8: 'SEP',
        9: 'OCT',
        10: 'NOV',
        11: 'DEC',
      };

 const days = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
      };

const ArtErr = document.getElementById('art-err');
const TytErr = document.getElementById('tyt-err');
const PicErr = document.getElementById('pic-err');
const postErr = document.getElementById('post-err');
const thmPic = document.getElementById('thmpic');
const titleBlock = document.getElementById('titleblock');
const storyBlock = document.getElementById('editor1');
const postBtn = document.getElementById('post');

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
  if (!validHead() || !validArticle()) {
    postErr.style.display = 'block';
    postErr.textContent = 'Fix Error To Post';
    setTimeout(function () {
      postErr.style.display = 'none';
    }, 3000);
    return false;
  } else {
    return true;
  }
}

// function resetForm() {
//   thmPic.value = ''
//   titleBlock.value = ''
//   let storyBlock = CKEDITOR.instances.editor1.getData();
//   storyBlock = '';
// }

fetch('https://herestohope.onrender.com/blogs')
.then((res) => res.json())
.then((result) => {
  const renderBlogInAdmin = index => {
    let nuBlog;
    let allBlogs;
    nuBlog = result
    const articlesDiv = document.querySelector('.articles');
    const readBtn = document.createElement('img');
    const updateBtn = document.createElement('img');
    const deleteBtn = document.createElement('img');
    let spanId = document.createElement('span');
    spanId.textContent = nuBlog.blogs[index]._id
    spanId.style.display = 'none'
  
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
  
    deleteBtn.addEventListener('click', () => {
      loadingScreen.showModal()
      const id = deleteBtn.parentElement.parentElement.children[1].textContent
      fetch(`https://herestohope.onrender.com/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('guru')}`
        }
      })
      .then(res => {
        loadingScreen.close()
        if(res.status === 204){
          location.reload();
        }
      })
    });
    updateBtn.addEventListener('click', () => {
      localStorage.setItem('prop', 'update')
      const id = deleteBtn.parentElement.parentElement.children[1].textContent
      const blog = result.blogs.find(blog => {
        if(blog._id == id){
        
        localStorage.setItem('blogId', blog._id)
        const formUpdate = document.querySelector('.container-article');
        const picUpdate = document.querySelector('#test');
        const tytUpdate = document.querySelector('#titleblock');
        const strUpdate = document.querySelector('#editor1');
        formUpdate.classList.add('poppedup');
        picUpdate.className = 'upload'
        picUpdate.setAttribute('src', blog.image);
        tytUpdate.value = blog.title;
        strUpdate.innerHTML = CKEDITOR.instances.editor1.setData(
        blog.content,
        submitaftersetdata
        )}
      })

    });
    readBtn.addEventListener('click', () => {
      const id = deleteBtn.parentElement.parentElement.children[1].textContent
      const blog = result.blogs.find(blog => {
        if(blog._id == id){
          window.location.href = `./blog-view.html?index=${id}`
        }
      })
  });
  
    let iMgDat = document.createElement('img');
    iMgDat.src = nuBlog.blogs[index].image;
    let iMg = iMgDat;
  
    iMg.classList.add('picPrev');
  
    let toShort = nuBlog.blogs[index].content;
    thumbDiv.appendChild(iMg);
    headEl.textContent = nuBlog.blogs[index].title;
    shortEl.textContent = toShort.substring(0, 109).replace(regEx, '');
  

    articlesDiv.appendChild(subArticleDiv);
    subArticleDiv.appendChild(optionsDiv);
    subArticleDiv.appendChild(spanId);
    optionsDiv.appendChild(readBtn);
    optionsDiv.appendChild(updateBtn);
    optionsDiv.appendChild(deleteBtn);
    subArticleDiv.appendChild(blogDiv);
    blogDiv.appendChild(thumbDiv);
    blogDiv.appendChild(storyDiv);
    storyDiv.appendChild(headEl);
    storyDiv.appendChild(shortEl);
  };
  
  for(let i = 0; i < result.blogs.length; i++){
    renderBlogInAdmin(i)
  }

})


thmPic.addEventListener('change', () => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    let url = reader.result;
    localStorage.setItem('ThumbnailPic', url);
    if(url){
      const picUpdate = document.querySelector('#test');
      picUpdate.className = 'upload'
      picUpdate.src = localStorage.getItem('ThumbnailPic')
    }
  });
  reader.readAsDataURL(thmPic.files[0]);
});

function submitaftersetdata() {
  this.updateElement();
}

const regEx = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

const loadingScreen = document.querySelector('.loadingScreen')

const formData = new FormData();
postBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if(validPostForm()){
    loadingScreen.showModal()
    const val = localStorage.getItem('prop')
    formData.append("title", titleBlock.value);
    formData.append("content", CKEDITOR.instances.editor1.getData());
    formData.append("image", thmPic.files[0]);
    if(val == 'create'){
      fetch(`https://herestohope.onrender.com/blogs`, {
        method: 'POST',
        body: formData,
        headers: {
              'Authorization': `Bearer ${localStorage.getItem('guru')}`
        }
      })
      .then(res => {
        loadingScreen.close()
        if(res.status === 200){
          location.reload();
        } else if(res.status === 409){
          postErr.style.display = 'block';
          postErr.textContent = 'Blog Arleady Exists!';
        }
      })
    } else {
      const id = localStorage.getItem('blogId')
      fetch(`https://herestohope.onrender.com/blogs/${id}`, 
      {
          method: 'PATCH',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('guru')}`
          }
        }
        )
        .then(res => {
          if(res.status === 200){
            location.reload();
          }
        })
  
    }
  }
  return false;
});

const deleteQuery = (id) => {
    loadingScreen.showModal()
    fetch(`https://herestohope.onrender.com/contact/${id}`, {
      method: 'DELETE',
      headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('guru')}`
      }
    })
    .then(res => {
      loadingScreen.close()
        if(res.status === 204){
          location.reload();
        }
      })
  }


fetch(`https://herestohope.onrender.com/contacts`, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('guru')}`
  }
})
.then(res => {
  return res.json()
})
.then(data => {

  const allQueriesDiv = document.querySelector('.queries')
  for(let j = 0; j < data.queries.length; j++){
    const queryDiv = document.createElement('div')
    const date = new Date(data.queries[j].createdAt);
    const formattedTime = `${days[date.getDay()]} - ${date.getDate()} - ${months[date.getMonth()]}`;
    queryDiv.className = 'query'
    queryDiv.innerHTML = `
    <div class="avatar"><img src="./icons/fluent_delete-24-regular.svg" onclick="deleteQuery('${data.queries[j]._id}')"></div>
    <div class="details">
    <div class="name-time">
    <h2><span>${data.queries[j].names}</span></h2>
    <p>${formattedTime}</p>
    </div>
    <div class="msg">
    <p>${data.queries[j].message}</p>
    </div>
    </div>`
    
    allQueriesDiv.appendChild(queryDiv)
  }
  
})


fetch(`https://herestohope.onrender.com/users`, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('guru')}`
  }
})
.then(res => {
  return res.json()
})
.then(data => {
  const allUsersDiv = document.querySelector('.users')
  for(let j = 0; j < data.users.length; j++){
    const userDiv = document.createElement('div')
    userDiv.className = 'user'
    userDiv.innerHTML = `<div class="profile"></div>
            <div class="auth">
              <p>Username:<span> ${data.users[j].name}</span> </p>
              <p>Email:<span> ${data.users[j].email}</span> </p>
            </div>`
    
    allUsersDiv.appendChild(userDiv)
  }
})