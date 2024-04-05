const commentForm = document.querySelectorAll('#newJokeCard')

const addComment = async (e) => {
    e.preventDefault()

    const content = document.querySelector('#jokecontent').value.trim();
    const postId = parseInt(e.target.getAttribute('post-id'))
    console.log(typeof postId)
    console.log(e.target)


    if (content) {
      const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({ content, postId}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create an account.');
      }
    }
}

commentForm.forEach(function (button) {
	button.addEventListener('submit', addComment);
});
