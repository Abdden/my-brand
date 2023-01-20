const comErr = document.getElementById('com-err');
const comMsg = document.getElementById('com-msg');
const addCom = document.getElementById('add');

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


fetch('https://herestohope.onrender.com/blogs')
.then(res => res.json())
.then(result => {
  const blogId = location.href.split('=')[1]
  // const index = result.blogs.indexOf(result.blogs.find((b) => {
  //   b._id == blogId.split("=")[1]
  //   return b._id == blogId.split("=")[1]
  // }))
  // const id = result.blogs[index]
  fetch(`https://herestohope.onrender.com/blogs/${blogId}`)
  .then(res => res.json())
  .then(result => {
    const renderBlogView = () => {
      const container = document.querySelector('.forcontent');
      const likesDiv = document.querySelector('.liking');
      const commenP = document.querySelector('.comments');
      let likesP = document.querySelector('.likes');
      const blogDiv = document.createElement('div');
      let picDiv = document.createElement('div');
      const bHeadEl = document.createElement('h1');
      const bParagraph = document.createElement('p');
      const img = document.createElement('img');
    
      likesDiv.addEventListener('click', () => {
        fetch(`https://herestohope.onrender.com/blogs/${blogId}/stats`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('guru')}`
          }
        })
        .then(() => {
          location.reload()
        })
      })
      
      const loadingScreen = document.querySelector('.loadingScreen')

      addCom.addEventListener('click', (e) => {
        e.preventDefault()
        if(!validMsg()){
          comErr.textContent = 'Provide Valid Content';
        } else {
            loadingScreen.showModal()
            fetch(`https://herestohope.onrender.com/blogs/${blogId}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                  comment:comMsg.value,
                  }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('guru')}`
            }
          })
          .then(res => {
            if(res.status == 200){
              loadingScreen.close()
              location.reload()
            }
            console.log(res.status);
          })
        }
      })

      bHeadEl.textContent = result.title;
      bParagraph.innerHTML = result.content;
    
      blogDiv.classList.add('blog');
      img.setAttribute('src', result.image);
    
      img.classList.add('picPrev');
      picDiv.classList.add('thumb');
      picDiv.appendChild(img);

      blogDiv.appendChild(bHeadEl);
      blogDiv.appendChild(picDiv);
      blogDiv.appendChild(bParagraph);
      container.appendChild(blogDiv);

      likesP.textContent += result.stats.likes
      commenP.textContent += result.comments.length
    
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

      const wholeSecDive = document.querySelector('.comented');
      const allComsDiv = document.createElement('div');
      wholeSecDive.appendChild(allComsDiv);
      
      const blogId = location.href.split('=')[1]
      fetch(`https://herestohope.onrender.com/blogs/${blogId}/comments`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        const renderComments = (i) => {
          const wholeComDiv = document.createElement('div');
          const ppDiv = document.createElement('div');
          const name_comDiv = document.createElement('div');
          const nameDiv = document.createElement('div');
          const comentDiv = document.createElement('div');
          let h4El = document.createElement('h4');
          let paragraph = document.createElement('p');
          let paragraphTime = document.createElement('p');
      
          h4El.textContent = data.Comment[i].name;
          // paragraphTime.textContent = formattedTime;
          paragraph.textContent = data.Comment[i].comment;
      
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
        };
        if(blogId){
          for(let i = 0; i < data.Comment.length; i++){
            renderComments(i)
          }
        }
      })
    };
    renderBlogView();
  })
})


comMsg.addEventListener('keyup', validMsg);
