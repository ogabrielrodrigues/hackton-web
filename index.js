async function loginUser(e) {
    e.preventDefault()

    const id = e.target[0].value

    const response = await axios.get(`http://localhost:3000/sugestion/user/${id}`)

    if (response.data == "Erro") {
        alert('erro ao se logar')
        return
    } else {
        window.localStorage.setItem('minerva-user', JSON.stringify(response.data))

        window.location.href = '/home.html'
    }
}

document.querySelector('form').addEventListener('submit', loginUser)