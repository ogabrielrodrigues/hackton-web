const user = JSON.parse(window.localStorage.getItem('minerva-user'))

function verifyUserType() {
    if (!!user.administrator) {
        document.querySelector('#page').innerHTML = `<h1>Filtragem:</h1><br>
        <table>
            <th>País</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Unidade</th>
            <tr><td><select name="" id="">
                <option value=""></option>
                <option value="brasil">Brasil</option>
                <option value="argentina">Argentina</option>
                <option value="paraguai">Paraguai</option>
            </select></td>
            <td><select name="" id=""></select></td>
            <td><select name="" id=""></select></td>
            <td><select name="" id=""></select></td></tr>
            
        </table>

        <div class="">
            <form>
                <h1>Sugestões: </h1>
                
            </form>
        </div>`
    } else {
        document.querySelector('#page').innerHTML = `<h1>Seus feedbacks</h1>
        <div class="feedbacks"></div>

        <br>
        <br>

        <div class="">
            <form>
                <h1>Nova sugestão</h1>
                <label for="">Sugestão:</label><br>
                <textarea name="" id="" cols="30" rows="10"></textarea><br><br>
                <button class="w3-btn" style="background-color: rgb(217, 228, 157);">Enviar Sugestão</button>
            </form>
        </div>`

        getSugestions()

        async function sendSugestion(e) {
            e.preventDefault();
        
            const sugestion = e.target[0].value
        
            const {data} = await axios.post('http://localhost:3000/sugestion', {
                id: user.id,
                name: user.name,
                email: user.email,
                sector: user.sector,
                unit: user.unit,
                sugestion: sugestion
            })

            console.log(data)

            getSugestions()
        }

        document.querySelector('form').addEventListener('submit', sendSugestion)
    }
}

console.log(user, user.id)

async function getSugestions() {
    const {data} = await axios.get(`http://localhost:3000/sugestion/${user.id}`)

    console.log(data)

    if (data.length > 1) {
        document.querySelector('.feedbacks').innerHTML = data.map(sg => `<p>${sg.sugestion}</p>`).join('')
    } else {
        document.querySelector('.feedbacks').innerHTML = '<p class="w3-text-gray">Você ainda não possui feedbacks</p>'
    }

}

verifyUserType()

// res.data.forEach(i => {
//     const el = document.createElement('p')
//     el.innerHTML = i.sugestion

//     document.querySelector('.feedbacks').appendChild(el)
// })