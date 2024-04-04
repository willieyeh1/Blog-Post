// hides/shows the punchline
const showButton = document.querySelectorAll('.show-punchline');

function showPunchline() {
    const button = this;
    const punchlineDiv = button.parentElement.previousElementSibling;

    if (punchlineDiv.style.visibility === 'hidden') {
        punchlineDiv.style.visibility = 'visible';
        showButton.textContent = 'Punchline'
    } else {
        punchlineDiv.style.visibility = 'hidden';
        showButton.textContent = 'Punchline'
    }
}
showButton.forEach(function(button) {
    button.addEventListener('click', showPunchline);
});


