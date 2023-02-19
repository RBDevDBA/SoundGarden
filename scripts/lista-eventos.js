const BASE_URL = "https://soundgarden-api.vercel.app/events";
const listaAdmin = document.querySelector(".table-body");
let outputAdmin = "";
const loading = document.querySelector(".carregando");

const formatarData = (data) => {
  const data2 = data.split("-");

  const dataFormatada =
    data2[2] + "/" + data2[1] + "/" + data2[0];

  return dataFormatada;
};

fetch(`${BASE_URL}/events`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Não foi possível carregar dados da página.");
    }
    return response.json();
  })
  .then((data) => {
    let i = 1;
    data.forEach((evento) => {
      outputAdmin += `<tr>
        <th scope="row">${i++}</th>
        <td>${formatarData(evento.scheduled)}</td>
        <td>${evento.name}</td>
        <td>${evento.attractions}</td>
        <td class="botoes-admin">
          <a href="reservas.html?_id=${
            evento._id
          }" class="btn btn-dark"> ver reservas</a>
          <a href="editar-evento.html?_id=${
            evento._id
          }" class="btn btn-secondary" >editar</a>
          <a href="excluir-evento.html?_id=${
            evento._id
          }" class="btn btn-danger">excluir</a>
        </td>
      </tr>`;
    });
    listaAdmin.innerHTML = outputAdmin;
    loading.style.display = "none";
  })
  .catch((error) => {
    console.log(error);
    alert(error.message);
  });
