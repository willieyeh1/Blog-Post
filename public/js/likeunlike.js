// This seems to be the only way to add event listeners to each button
// Other option is to use jquery

const likeBtn = document.querySelectorAll('.post-btns');
const toastElement = document.querySelector('.toast');

function showToast() {
	const toast = new bootstrap.Toast(toastElement);
	toast.show();
}

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
				alert('ERROR, something went wrong');
			}
		});
	} else {
		fetch(`/api/post/${postId}/user`, {
			method: 'PUT',
		}).then((res) => {
			if (res.ok) {
				location.reload();
			} else {
				// alert('ERROR, must be logged in to like a joke!');
				showToast();
			}
		});
	}
};

likeBtn.forEach(function (button) {
	button.addEventListener('click', likeUnlike);
});
