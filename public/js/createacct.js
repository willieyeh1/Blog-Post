const createAcct = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#usernameInput').value.trim();
    const email = document.querySelector('#emailInput').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();
    const passwordconf = document.querySelector('#confirmpasswordInput').value.trim();

    if (password !== passwordconf) {
        alert('Your passwords don\'t match')
        return
    }
  
    if (username && email && password) {
      const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create an account.');
      }
    }
}


document.querySelector('#create-account-form').addEventListener('submit', createAcct)