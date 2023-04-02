document.querySelector('form').addEventListener('submit', createUser)

async function createUser(e) {
    e.preventDefault()

    const id = e.target[0].value
    const name = e.target[1].value
    const email = e.target[2].value
    const sector = e.target[3].value
    const unit = e.target[4].value

    const user = await axios.post('http://localhost:3000/sugestion/user', {
        id,
        name,
        email,
        sector,
        unit
    })

    window.location.href = '/index.html'
}