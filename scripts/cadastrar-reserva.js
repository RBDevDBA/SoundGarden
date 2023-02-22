const nomeInput = document.querySelector("#nome");
const atracoesInput = document.querySelector("#atracoes");
const descricaoInput = document.querySelector("#descricao");
const dataInput = document.querySelector("#data");
const lotacaoInput = document.querySelector("#lotacao");
const linkImgInput = document.querySelector("#poster");
const form = document.querySelector("form");

const BASE_URL = "https://soundgarden-api.vercel.app/";

form.onsubmit = async (evento) => {
  evento.preventDefault();
  try {
    const novoEvento = {
      name: nomeInput.value,
      poster: linkImgInput.value,
      attractions: atracoesInput.value.split(","),
      description: descricaoInput.value,
      scheduled: dataInput.value,
      number_tickets: lotacaoInput.value,
    };

    const opcoes = {
      method: "POST",
      body: JSON.stringify(novoEvento),
      headers: {
        "content-type": "application/json",
      },
      redirect: "follow",
    };

    const resposta = await fetch(`${BASE_URL}/events`, opcoes);
    const conteudoResposta = await resposta.json();
    console.log(conteudoResposta);

    if (resposta.status != 400) {
      alert("Evento cadastrado com sucesso");
      window.location.replace("./admin.html");
    }
    if (resposta.status == 400) {
      alert("Cadastro negado. Preencha os campos corretamente.");
    }
  } catch (error) {
    console.log(error);
  }
};