const changePassword = async (e) => {
	e.preventDefault();

	const username = document.querySelector('#usernameInput').value.trim();
	const oldPassword = document.querySelector('#passwordInput').value.trim();
	const newPassword = document.querySelector('#newPasswordInput').value.trim();

	if (username && oldPassword) {
		const response = await fetch('/api/user/changepassword', {
			method: 'PUT',
			body: JSON.stringify({ username, oldPassword, newPassword }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to update password');
		}
	} else {
		console.log('error');
	}
};

document
	.querySelector('#change-pass-form')
	.addEventListener('submit', changePassword);
