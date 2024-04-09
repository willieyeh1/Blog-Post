const loginToast = document.querySelector('.login-error-toast');

function showToast() {
	const toast = new bootstrap.Toast(loginToast);
	toast.show();
}

const loginFormHandler = async (event) => {
	event.preventDefault();

	console.log('hello world');
	const username = document.querySelector('#usernameInput').value.trim();
	const password = document.querySelector('#passwordInput').value.trim();

	if (username && password) {
		const response = await fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// console.log('hello world');
			document.location.replace('/');
		} else {
			// alert('Failed to log in.');
			showToast();
		}
	}
};

document
	.querySelector('.login-form')
	.addEventListener('submit', loginFormHandler);
