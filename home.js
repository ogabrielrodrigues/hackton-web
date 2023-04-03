const user = JSON.parse(window.localStorage.getItem("minerva-user"));

async function verifyUserType() {
  if (!!user.administrator) {
    document.querySelector("#page").innerHTML = `<h1 class="title">Filtragem:</h1><br>
        <div class="filter">
            <h5 class="">Unidade</h5>
            <input type="search" id="search"/><button id="search-btn">Procurar</button>
        </div>

        <div class="adm-sugestions">
            <form class="adm-form">
                <h1 class="title">Sugestões: </h1>
                <div id="sugestions"></div>
            </form>
        </div>`;

    // const countries = ["Brasil", "Argentina", "Paraguai"];

    function capitalizeFirstLetter(str) {
      return str.split("")[0].toUpperCase() + str.slice(1);
    }

    document.querySelector("#search").value;
    document
      .querySelector("#search-btn")
      .addEventListener("click", async () => {
        const { data } = await axios.get("http://localhost:3000/sugestion", {
          headers: {
            Authorization: `Bearer ${user.id}`,
          },
        });

        const searchQuery = capitalizeFirstLetter(
          document.querySelector("#search").value
        );

        const pre_content = data.filter(
          (sug) =>
            (sug.user.unit == searchQuery && sug.reply == "") ||
            (sug.user.unit.includes(searchQuery) && sug.reply == "")
        )
        const content = pre_content
          .map(
            (sug) =>
              `<div class="user-sugestion" id="${sug.id}">
              <div class="user-info">
                <span class="user-name">${sug.user.name}</span>
                <p class="user-id">${sug.user.id}</p>
              </div>
              <p class="user-text">
                <span>Sugeriu:</span>
                ${sug.sugestion}
              </p>
              <div class="user-actions">
                <input type="text" id="i-${sug.id}" />
                <button id="btn-${sug.id}">Responder</button>
              </div>
            </div>`
          );

        document.querySelector("#sugestions").innerHTML = content.join('');

        console.log(pre_content)

          pre_content.forEach((sug) => {
            const el = document.querySelector(`#btn-${sug.id}`);
            
            el.addEventListener("click", async (e) => {
              e.preventDefault();

              const reply = document.querySelector(`#i-${sug.id}`).value;

              const res = await axios.put(
                `http://localhost:3000/sugestion/${sug.id}`,
                { reply },
                {
                  headers: {
                    Authorization: `Bearer ${user.id}`,
                  },
                }
              );

              if (res.status == 200) {
                location.reload()
              }
            });
        });
      });
  } else {
    document.querySelector("#page").innerHTML = `<h1 class="title">Suas sugestões</h1>
        <ul class="feedbacks"></ul>

        <br>
        <br>
        
        <p class="edital">Veja o <a href="edital.html">Edital</a> de feedbacks</p>

        <div class="">
            <form class="user-form">
                <h1 class="title">Deixe sua sugestão</h1>
                <label for="">Sugestão:</label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <button>Enviar Sugestão</button>
            </form>
        </div>`;

    getSugestions();

    async function sendSugestion(e) {
      e.preventDefault();

      const sugestion = e.target[0].value;

      const { data } = await axios.post("http://localhost:3000/sugestion", {
        id: user.id,
        name: user.name,
        email: user.email,
        sector: user.sector,
        unit: user.unit,
        sugestion: sugestion,
      });

      e.target[0].value = "";

      getSugestions();
    }

    document.querySelector("form").addEventListener("submit", sendSugestion);
  }
}

async function getSugestions() {
  const { data } = await axios.get(
    `http://localhost:3000/sugestion/${user.id}`
  );

  if (data.length >= 1) {
    document.querySelector(".feedbacks").innerHTML = data
      .map((sg) => `<li class="sugestion">${sg.sugestion}</li>`)
      .join("");
  } else {
    document.querySelector(".feedbacks").innerHTML =
      '<p class="empty">Você ainda não possui feedbacks</p>';
  }
}

verifyUserType();
