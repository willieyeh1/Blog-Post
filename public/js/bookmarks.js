const bookmarkBtn = document.querySelectorAll('.bookmark-btn');

const bookmark = async (e) => {
	const postId = e.target.getAttribute('post-id');
	const isBookmarked = e.target.getAttribute('isBookmarked');

	// Fetch requests to save/delete bookmarked posts
	if (isBookmarked) {
		fetch(`/api/post/${postId}/usersaves`, {
			method: 'DELETE',
		}).then((res) => {
			if (res.ok) {
				location.reload();
			} else {
				alert('ERROR');
			}
		});
	} else {
		fetch(`/api/post/${postId}/usersaves`, {
			method: 'PUT',
		}).then((res) => {
			if (res.ok) {
				location.reload();
			} else {
				alert('ERROR');
			}
		});
	}
};

bookmarkBtn.forEach((btn) => {
	btn.addEventListener('click', bookmark);
});
