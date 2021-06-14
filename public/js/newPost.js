const createPost = async (event) => {
    console.log("fired")
    console.log(event)
    console.log('createPost')
    event.preventDefault();

    const newTitle = document.querySelector('#newTitle').value;
    const newPost = document.querySelector('#newPost').value;
    if (newTitle && newPost) {
        const response = await fetch('/api/post/create', {

            method: 'POST',
            body: JSON.stringify({
                title: newTitle,
                content: newPost
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/dashbord')

        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#addNewPost').addEventListener('click', createPost)