const addComments = async () => {
  console.log(true)
  // console.log(post_id)
  const comments = document.getElementById('newComm').value
  const post_id = event.target.getAttribute("data-post")
  if (true) {
      // const comments = document.querySelector(`#newcomment-${post_id}`).value;
      const postId = ({ post_id: post_id, comments_text: comments })
      console.log(postId)
  
      const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify(postId),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload()
      } else {
        alert(response.statusText);
      }
    }
  
  };

  document.getElementById ("addComment").addEventListener("click", addComments) 
