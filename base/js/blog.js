// DATA COLLECTION

const contentDiv = document.querySelector('.content');

fetch('https://herestohope.onrender.com/blogs')
.then((res) => res.json())
.then(result => {
  const renderBlogInPage = (index) => {
    let blog;
    blog = result
    const id = blog.blogs[index]._id
    const boxDiv = document.createElement('div');
    let imgDiv = document.createElement('div');
    const footDiv = document.createElement('div');
    const likesDiv = document.createElement('div');
    const comentsDiv = document.createElement('div');
    const viewsDiv = document.createElement('div');
    const headEl1 = document.createElement('h2');
    const shortEl1 = document.createElement('p');
    const linkEl = document.createElement('a');
    let iMg = document.createElement('img');
  
    boxDiv.classList.add('box');
    imgDiv.classList.add('image-container');
    shortEl1.classList.add('par');
    footDiv.classList.add('foot');
    likesDiv.classList.add('likes');
    comentsDiv.classList.add('coments');
    viewsDiv.classList.add('views');
  
    linkEl.setAttribute('href', `./blog-view.html?index=${id}`);
  
    iMg.setAttribute('src', blog.blogs[index].image);
    iMg.classList.add('picPrev');
    imgDiv.appendChild(iMg);
    toShort = blog.blogs[index].content;
    headEl1.textContent = blog.blogs[index].title;
    headEl1.setAttribute('style', 'cursor');
    headEl1.style.cursor = 'pointer';
    shortEl1.innerHTML = toShort.substring(0, 100);
  
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

  for(let i = 0; i < result.blogs.length; i++){
    renderBlogInPage(i)
  }
  
})
