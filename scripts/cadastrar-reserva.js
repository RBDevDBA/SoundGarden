const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const ingressosInput = document.querySelector("#ingressos");
const formModal = document.querySelector("form");
const BASE_URL = "https://soundgarden-api.vercel.app/bookings";

function click2() {
  const formsModal = document.querySelectorAll("form");
  formsModal.forEach((form) => {
    form.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      try {
        const novoEvento = {
          owner_name: nomeInput.value,
          owner_email: emailInput.value,
          number_tickets: ingressosInput.value,
          event_id: evento.target.getAttribute("event-id"),
        };

        const opcoes = {
          method: "POST",
          body: JSON.stringify(novoEvento),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const resposta = await fetch(`${BASE_URL}/bookings`, opcoes);
        const conteudoResposta = await resposta.json();

        if (resposta.ok) {
          alert("Ingresso reservado com sucesso");
          formModal.style.display = "none";
          nomeInput.value = "";
          emailInput.value = "";
          ingressosInput.value = "";
        } else {
          alert("Reserva negada. Preencha os campos corretamente.");
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}