const deletePost = async (event) => {
   
    event.preventDefault();
  
    const id = event.target.getAttribute("data-post")
    const response = await fetch(`/api/post/${id}/delete`, {
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
      fetch('/dashbord')
        .then(
          document.location.replace('/dashbord')
        )
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#deletePost').addEventListener('click', deletePost)