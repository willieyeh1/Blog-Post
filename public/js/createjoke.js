const createJoke = async (event) => {
	event.preventDefault();

	const setup = document.querySelector('#setupcontent').value.trim();
	const punchline = document.querySelector('#jokecontent').value.trim();

	if (setup.length === 0) {
		alert('The joke setup cannot be empty!');
		return;
	}
	if (punchline.length === 0) {
		alert('The joke punchline cannot be empty!');
		return;
	}

	if (setup && punchline) {
		const response = await fetch('/api/post/', {
			method: 'POST',
			body: JSON.stringify({ setup, punchline }),
			headers: { 'Content-Type': 'application/json' },
		});

		console.log(response);

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to create post.');
		}
	}
};

document.querySelector('#newJokeCard').addEventListener('submit', createJoke);
