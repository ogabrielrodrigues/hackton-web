const user = JSON.parse(window.localStorage.getItem("minerva-user"));

async function verifyUserType() {
  if (!!user.administrator) {
    const { data } = await axios.get(
      "http://localhost:3000/sugestions/replies",
      {
        headers: {
          Authorization: `Bearer ${user.id}`,
        },
      }
    );

    document.querySelector("#selected-segestions").innerHTML = data
      .map(
        (reply) => `<div style="display: flex;">
      <h2>${reply.user.name} - ${reply.sugestion}</h2>
      <p>${reply.reply}</p>
    </div>`
      )
      .join("");
  } else {
    document.querySelector("#selected-segestions").innerHTML = ``;
  }
}

verifyUserType();
