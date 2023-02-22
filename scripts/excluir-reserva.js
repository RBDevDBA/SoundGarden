const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputIngressos = document.querySelector("#ingressos");
const form = document.querySelector("form");
const BASE_URL = "https://soundgarden-api.vercel.app";
const urlParams = new URLSearchParams(window.location.search);
const nomeParam = urlParams.get("_id");
const botaoDeletar = document.querySelector("button");

const resposta = async () => {
  const resposta = await fetch(`${BASE_URL}/bookings/${nomeParam}`);
  const conteudoResposta = await resposta.json();

  inputNome.value = conteudoResposta.owner_name;
  inputEmail.value = conteudoResposta.owner_email;
  inputIngressos.value = conteudoResposta.number_tickets;
  botaoDeletar.setAttribute("event-id", conteudoResposta.event._id);
};

resposta().catch((error) => {
  console.log(error);
  alert("Não foi possível carregar dados da página.");
});

form.onsubmit = async (evento) => {
  evento.preventDefault();
  try {
    const opcoes = {
      method: "DELETE",
      redirect: "follow",
    };

    const resposta = await fetch(`${BASE_URL}/bookings/${nomeParam}`, opcoes);

    alert("Evento excluído com sucesso");
    window.location.replace(
      `./reservas.html?_id=${botaoDeletar.getAttribute("event-id")}`
    );
  } catch (error) {
    console.log(error);
    alert("Não foi possível deletar evento.");
  }
};
