const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputIngressos = document.querySelector("#ingressos");
const form = document.querySelector("form");
const BASE_URL = "https://soundgarden-api.vercel.app/events/:id";
const urlParams = new URLSearchParams(window.location.search);
const nomeParam = urlParams.get("_id");
const botaoDeletar = document.querySelector("button");

// Busca as informações do evento e preenche o formulário com elas
const carregarEvento = async () => {
  try {
    const resposta = await fetch("https://soundgarden-api.vercel.app/events/bookings/${nomeParam}");
    if (!resposta.ok) {
      throw new Error("Não foi possível carregar dados da página.");
    }
    const conteudoResposta = await resposta.json();
    inputNome.value = conteudoResposta.owner_name;
    inputEmail.value = conteudoResposta.owner_email;
    inputIngressos.value = conteudoResposta.number_tickets;
    botaoDeletar.setAttribute("event-id", conteudoResposta.event._id);
  } catch (error) {
    console.log(error);
    alert("Não foi possível carregar dados da página.");
  }
};

carregarEvento();

// Exclui o evento após a confirmação do usuário
form.onsubmit = async (evento) => {
  evento.preventDefault();
  if (confirm("Tem certeza que deseja excluir esse evento?")) {
    try {
      const opcoes = {
        method: "DELETE",
        redirect: "follow",
      };
      const resposta = await fetch(`${BASE_URL}/bookings/${nomeParam}`, opcoes);
      if (!resposta.ok) {
        throw new Error("Não foi possível deletar evento.");
      }
      alert("Evento excluído com sucesso");
      window.location.replace(
        `./reservas.html?_id=${botaoDeletar.getAttribute("event-id")}`
      );
    } catch (error) {
      console.log(error);
      alert("Não foi possível deletar evento.");
    }
  }
};
