const deleteBookmark = document.querySelectorAll('#remove-bookmark-btn');

const deleteFromBookmark = async (e) => {
	const postId = e.target.getAttribute('post-id');

		fetch(`/api/post/${postId}/usersaves`, {
			method: 'DELETE',
		}).then((res) => {
			if (res.ok) {
				location.reload();
			} else {
				alert('ERROR, couldn\'t remove bookmark.');
			}
		});
	
};

deleteBookmark.forEach((btn) => {
	btn.addEventListener('click', deleteFromBookmark);
});
