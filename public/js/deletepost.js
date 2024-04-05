const deletePost = async (e) => {
    console.log(e.target)
	const postId = e.target.getAttribute('post-id');
    console.log(postId)
	// Fetch requests to save/delete bookmarked posts
	fetch(`/api/post/${postId}`, {
			method: 'DELETE',
		}).then((res) => {
			if (res.ok) {
				location.reload();
			} else {
				alert('ERROR, couldn\'t delete!');
			}
		});
	} 

const deleteBtn = document.querySelectorAll('#post-delete-btn');

deleteBtn.forEach((btn) => {
    btn.addEventListener('click', deletePost);
});