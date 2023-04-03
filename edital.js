const user = JSON.parse(window.localStorage.getItem("minerva-user"));

async function verifyUserType() {
  if (!!user.administrator) {
    const { data } = await axios.get(
      "http://localhost:3000/sugestions/replies"
    );

    document.querySelector("#selected-segestions").innerHTML = data
      .map(
        (reply) => `<div class="sugestion">
      <h2>
        <strong>${reply.user.name}</strong> - ${reply.sugestion}
      </h2>
      <p>
        <span>Resposta:</span> ${reply.reply}
      </p>
    </div>`
      )
      .join("");
  } else {
    const { data } = await axios.get(
      "http://localhost:3000/sugestions/replies"
    );

    document.querySelector("#selected-segestions").innerHTML = data
      .map(
        (reply) => `<div class="sugestion">
      <h2>
        <strong>${reply.user.name}</strong> - ${reply.sugestion}
      </h2>
      <p>
        <span>Resposta:</span> ${reply.reply}
      </p>
    </div>`
      )
      .join("");

    document.querySelector("#selected-segestions").innerHTML = data
      .map(
        (reply) => `<div class="sugestion">
      <h2>
        <strong>${reply.user.name}</strong> - ${reply.sugestion}
      </h2>
      <p>
        <span>Resposta:</span> ${reply.reply}
      </p>
    </div>`
      )
      .join("");
  }
}

verifyUserType();
