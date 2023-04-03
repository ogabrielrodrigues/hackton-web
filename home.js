const user = JSON.parse(window.localStorage.getItem("minerva-user"));

async function verifyUserType() {
  if (!!user.administrator) {
    document.querySelector("#page").innerHTML = `<h1>Filtragem:</h1><br>
        <table>
            <h5>Unidade</h5>
            <input type="search" id="search"/><button id="search-btn">Procurar</button>
            
        </table>

        <div class="">
            <form>
                <h1>Sugestões: </h1>
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

        console.log(data);

        // const units = data.map((sug) => sug.user.unit);

        const searchQuery = capitalizeFirstLetter(
          document.querySelector("#search").value
        );

        const content = data
          .filter(
            (sug) =>
              (sug.user.unit == searchQuery && sug.reply == "") ||
              (sug.user.unit.includes(searchQuery) && sug.reply == "")
          )
          .map(
            (sug) =>
              `<div id="${sug.id}" style="display: flex;">
              <span>${sug.user.name}</span>
              <p>Sugeriu: ${sug.sugestion}</p>
              <input type="text" id="i-${sug.id}" />
              <button id="btn-${sug.id}">Responder</button>
            </div>`
          );

        document.querySelector("#sugestions").innerHTML = content;

        data
          .filter((sug) => sug.reply == "")
          .forEach((sug) => {
            document
              .querySelector(`#btn-${sug.id}`)
              .addEventListener("click", async (e) => {
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
              });
          });
      });

    // countries.forEach((country) => {
    //   const opt = document.createElement("option");
    //   opt.value = country;
    //   opt.innerText = country;

    //   document.querySelector("#country").appendChild(opt);
    // });
  } else {
    document.querySelector("#page").innerHTML = `<h1>Seus feedbacks</h1>
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
      .map((sg) => `<p>${sg.sugestion}</p>`)
      .join("");
  } else {
    document.querySelector(".feedbacks").innerHTML =
      '<p class="w3-text-gray">Você ainda não possui feedbacks</p>';
  }
}

verifyUserType();
