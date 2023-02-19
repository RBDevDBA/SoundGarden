const BASE_URL = "https://soundgarden-api.vercel.app/events";
const listaEventos = document.querySelector("#todos-eventos");
let outputEventos = "";

const formatarData = (data) => {
  const data2 = data.split("-");

  const dataFormatada =
    data2.slice(2, 3).join("") +
    "/" +
    data2.slice(1, 2).join("") +
    "/" +
    data2.slice(0, 1).join("");

  return dataFormatada;
};

fetch(`${BASE_URL}/events`)
  .then((value) => {
    return value.json();
  })
  .then((value) => {
    value.forEach((evento) => {
      outputEventos += `<article class="evento card p-5 m-3 card-evento">
      <h2>${evento.name} - ${formatarData(evento.scheduled)}</h2>
      <h4>${evento.attractions}</h4>
      <p>
      ${evento.description}
      </p>
      <a href="#" id="botao-reservar" class="btn btn-primary" event-name="${
        evento.name
      }" event-id="${evento._id}" event-tickets="${
        evento.number_tickets
      }">reservar ingresso</a>
    </article>`;
    });
    listaEventos.innerHTML = outputEventos;
    click();
  })
  .catch((error) => {
    console.log(error);
    alert("Não foi possível carregar dados da página.");
  });

let botaoAbrirModal = document.querySelectorAll("#botao-reservar");
const modalCadastrar = document.querySelector(".modal-cadastrar");
const eventosDiv = document.querySelector("#div-eventos");
const botaoDiv = document.querySelector("#div-finalizar-reserva");
const form = document.querySelector("form");
const ingressos = document.querySelector("#ingressos");
const ingressosDisponiveis = document.querySelector("#ingressos-disponiveis");
const nomeEvento = document.querySelector(".h4-modal");

function click() {
  botaoAbrirModal = document.querySelectorAll("#botao-reservar");
  botaoAbrirModal.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      modalCadastrar.style.display = "block";
      nomeEvento.innerHTML = e.target.getAttribute("event-name");
      form.setAttribute("event-id", e.target.getAttribute("event-id"));
      ingressosDisponiveis.innerHTML = `Ingressos disponíveis: ${e.target.getAttribute(
        "event-tickets"
      )}`;
      ingressos.setAttribute("max", e.target.getAttribute("event-tickets"));
      click2();
    });
  });
}

const botaoFecharModal = document.querySelector(".fechar-modal");

botaoFecharModal.addEventListener("click", (e) => {
  e.preventDefault();
  modalCadastrar.style.display = "none";
  nomeInput.value = "";
  emailInput.value = "";
  ingressosInput.value = "";
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    modalCadastrar.style.display = "none";
    nomeInput.value = "";
    emailInput.value = "";
    ingressosInput.value = "";
  }
});
