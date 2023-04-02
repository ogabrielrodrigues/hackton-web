async function loginUser(e) {
    e.preventDefault()

    const id = e.target[0].value

    const {data, status} = await axios.get(`http://localhost:3000/sugestion/user/${id}`)

    console.log(status)

    if (status == 400) {
        alert('n foi!!')
        return
    } 

    window.localStorage.setItem('minerva-user', JSON.parse(data))
}

document.querySelector('form').addEventListener('submit', loginUser)