// hides/shows the punchline
const showButton = document.querySelectorAll('.show-punchline');

function showPunchline() {
    const button = this;
    const punchlineDiv = button.parentElement.previousElementSibling;

    if (punchlineDiv.style.display === 'none') {
        punchlineDiv.style.display = 'block';
        showButton.textContent = 'Hide Punchline';
    } else {
        punchlineDiv.style.display = 'none';
        showButton.textContent = 'Show Punchline'
    }
}
showButton.forEach(function(button) {
    button.addEventListener('click', showPunchline);
});


