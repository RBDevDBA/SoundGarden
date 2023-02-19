const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");
const BASE_URL = "https://soundgarden-api.vercel.app//events/:id";
const urlParams = new URLSearchParams(window.location.search);
const nomeParam = urlParams.get("_id");

const formatNumber = (numero) => {
  if (numero < 10) {
    return "0" + numero;
  }
  return numero;
};

const preencherFormulario = async () => {
  try {
    const resposta = await fetch("https://soundgarden-api.vercel.app//events/:id");
    const conteudoResposta = await resposta.json();
    const newDate = new Date(conteudoResposta.scheduled);

    inputNome.value = conteudoResposta.name;
    inputBanner.value = conteudoResposta.poster;
    inputAtracoes.value = conteudoResposta.attractions;
    inputDescricao.value = conteudoResposta.description;
    inputData.value = conteudoResposta.scheduled.split("").slice(0, 16).join("");
    inputLotacao.value = conteudoResposta.number_tickets;
  } catch (error) {
    console.log(error);
    alert("Não foi possível carregar dados da página.");
  }
};

preencherFormulario();

form.onsubmit = async (evento) => {
  evento.preventDefault();

  // Validar o formulário antes de enviar a requisição DELETE
  if (!inputNome.value || !inputData.value || !inputLotacao.value) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (window.confirm("Tem certeza que deseja excluir este evento?")) {
    try {
      const opcoes = {
        method: "DELETE",
        redirect: "follow",
      };

      const resposta = await fetch(`${BASE_URL}/events/${nomeParam}`, opcoes);

      alert("Evento excluído com sucesso");
      window.location.replace("./admin.html");
    } catch (error) {
      console.log(error);
      alert("Não foi possível deletar evento.");
    }
  }
};