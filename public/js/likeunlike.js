// This seems to be the only way to add event listeners to each button
// Other option is to use jquery

const likeBtn = document.querySelectorAll('.post-btns');

const likeUnlike = async (e) => {
	const isLiked = e.target.getAttribute('isLiked');
	const postId = e.target.getAttribute('post-id');

	if (isLiked) {
		fetch(`/api/post/${postId}/user`, {
			method: 'DELETE',
		}).then((res) => {
			if (res.ok) {
				location.reload();
			} else {
				alert('ERROR');
			}
		});
	} else {
		fetch(`/api/post/${postId}/user`, {
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

likeBtn.forEach(function (button) {
	button.addEventListener('click', likeUnlike);
});
