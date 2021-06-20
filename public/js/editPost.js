const editPost = async (event) => {
    // console.log(event.target.attributes[0].value)
    
    event.preventDefault();
    const title = document.querySelector('#newTitle').value;
    const content = document.querySelector('#newPost').value;
    const id = event.target.getAttribute("data-post")
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      fetch('/dashbord')
        .then(
          document.location.replace('/dashbord')
        )
    } else {
      alert(response.statusText);
    }
  
  };
  
  document.querySelector('#addNewPost').addEventListener('click', editPost);