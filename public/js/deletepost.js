const deletePost = async (event) => {
   
    event.preventDefault();
  
    const id = event.target.parentElement.getAttribute("data-post")
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        post_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
    if (response.ok) {
      alert('Post is successfuly deleted')
      fetch('/dashboard')
        .then(
          document.location.replace('/dashboard')
        )
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#deletePost').addEventListener('click', deletePost)