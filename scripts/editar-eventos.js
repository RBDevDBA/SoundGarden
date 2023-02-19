const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");
const BASE_URL = "https://soundgarden-api.vercel.app/events/:id";
const urlParams = new URLSearchParams(window.location.search);
const nomeParam = urlParams.get("_id");

const formatNumber = (numero) => {
  if (numero < 10) {
    return "0" + numero;
  }
  return numero;
};

const resposta = async () => {
  try {
    const resposta = await fetch("https://soundgarden-api.vercel.app/events/:id");
    if (resposta.ok) {
      const conteudoResposta = await resposta.json();
      inputNome.value = conteudoResposta.name;
      inputBanner.value = conteudoResposta.poster;
      inputAtracoes.value = conteudoResposta.attractions.join(",");
      inputDescricao.value = conteudoResposta.description;
      inputData.value = conteudoResposta.scheduled.substring(0, 16);
      inputLotacao.value = conteudoResposta.number_tickets;
    } else {
      throw new Error("Não foi possível carregar dados da página.");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

resposta();

form.onsubmit = async (evento) => {
  evento.preventDefault();
  const novoEvento = {
    name: inputNome.value,
    poster: inputBanner.value,
    attractions: inputAtracoes.value.split(","),
    description: inputDescricao.value,
    scheduled: inputData.value,
    number_tickets: inputLotacao.value,
  };
  try {
    const opcoes = {
      method: "PUT",
      body: JSON.stringify(novoEvento),
      headers: {
        "content-type": "application/json",
      },
      redirect: "follow",
    };

    const resposta = await fetch(`${BASE_URL}/events/${nomeParam}`, opcoes);
    const conteudoResposta = await resposta.json();
    console.log(conteudoResposta);

    if (resposta.ok) {
      alert("Alteração realizada com sucesso");
      window.location.replace("./admin.html");
    } else {
      throw new Error("Alteração negada. Preencha os campos corretamente.");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};