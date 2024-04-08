const jokeCards = document.querySelectorAll('.container-joke-card')
const searchInput = document.querySelector('#search-bar-input')
const searchBar = document.querySelector('#search-bar')

let allJokes = []

searchInput.addEventListener('input', e => {
    const value = e.target.value.toLowerCase()
    allJokes.forEach(joke => {
        const isVisible = 
            joke.jokeContent.toLowerCase().includes(value) ||
            joke.jokePunchline.toLowerCase().includes(value) ||
            joke.jokeCreator.toLowerCase().includes(value)
        joke.element.classList.toggle('hide', !isVisible)
    })
})

searchBar.addEventListener('submit', e => {
    e.preventDefault()

    const value = searchInput.value.toLowerCase()
    console.log(value)
    allJokes.forEach(joke => {
        const isVisible = 
            joke.jokeContent.toLowerCase().includes(value) ||
            joke.jokePunchline.toLowerCase().includes(value) ||
            joke.jokeCreator.toLowerCase().includes(value)
        joke.element.classList.toggle('hide', !isVisible)
    })
})

const eachJokeCards = jokeCards.forEach((joke) => {
    
    console.log(joke)
    const jokeContent = joke.querySelector("[data-joke-content]").textContent
    const jokePunchline = joke.querySelector("[data-joke-punchline]").textContent
    const jokeCreator = joke.querySelector("[data-joke-creator]").textContent

    const cardInfo = {}
    cardInfo.element = joke
    cardInfo.jokeContent = jokeContent
    cardInfo.jokePunchline = jokePunchline
    cardInfo.jokeCreator = jokeCreator

    allJokes.push(cardInfo)
})
