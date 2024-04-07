const changePassword = async (e) => {
	e.preventDefault();

	const username = document.querySelector('#usernameInput').value.trim();
	const oldPassword = document.querySelector('#passwordInput').value.trim();
	const newPassword = document.querySelector('#newPasswordInput').value.trim();
	const confNewPassword = document
		.querySelector('#confNewPasswordInput')
		.value.trim();

	const passMatchToast = document.querySelector('.pass-match-toast');
	const userPassToast = document.querySelector('.userpass-error-toast');
	const inputToast = document.querySelector('.input-error-toast');

	function showPassToast() {
		const toast = new bootstrap.Toast(passMatchToast);
		toast.show();
	}

	function showUserPassToast() {
		const toast = new bootstrap.Toast(userPassToast);
		toast.show();
	}

	function showInputToast() {
		const toast = new bootstrap.Toast(inputToast);
		toast.show();
	}

	if (username && oldPassword && newPassword && confNewPassword) {
		if (confNewPassword === newPassword) {
			const response = await fetch('/api/user/changepassword', {
				method: 'PUT',
				body: JSON.stringify({ username, oldPassword, newPassword }),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) {
				document.location.replace('/profile');
			} else {
				// alert(
				// 	'Failed to update password! Username or old password was entered incorrectly!'
				// );
				showUserPassToast();
			}
		} else {
			// alert(
			// 	'Passwords do not match. Please ensure that your new password and confirm new password fields contain the same value.'
			// );
			showPassToast();
		}
	} else {
		// alert('Please enter something in all input fields');
		showInputToast();
	}
};

document
	.querySelector('#change-pass-form')
	.addEventListener('submit', changePassword);
