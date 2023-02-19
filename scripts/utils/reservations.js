const urlApiRes = "https://soundgarden-api.vercel.app/bookings/";
const urlApiResID = "https://soundgarden-api.vercel.app/bookings/event/";

export const displayModal = function () {
    const btnOpenModal = document.querySelectorAll("#open-modal-admin");
    const btnCloseModal = document.querySelector("#close-modal-admin");
    const modalAdmin = document.querySelector("#modal-admin");
    const fadeAdmin = document.querySelector("#fade-admin");
    let idEvent;

    const toggleModalAdmin = () => {
        [modalAdmin, fadeAdmin].forEach((el) => el.classList.toggle("hide-admin"));

    };

    [btnCloseModal, fadeAdmin].forEach((el) => {
        el.addEventListener("click", function () {
            toggleModalAdmin();
            window.location.reload();
        });
    });


    const showReservations = function (data) {
        const tBodyReservations = document.querySelector("#tbody-reservations");

        for (let i = 0; i < data.length; i++) {
            const reservation = dara[i];

            const reservationsEvents = document.createElement("tr");
            reservationsEvents.innerHTML =
                `<th scope="row">${i + 1}</th>
            <td>${reservation.owner_name}</td>
            <td>${reservation.owner_email}</td>
            <td>${reservation.number_tickets}</td>
            <td>
            <a class="btn btn-danger" id="btn-delete-reservation" 
            name="${reserva._id}" >excluir</a></td>`;

            tBodyReservations.appendChild(reservationsEvents);
        }

        deleteReservationId();
    };

    const searchReservation = function (idEvent) {
        fetch(urlApiResID + idEvent,
            { method: "GET", redirect: "follow", })

            .then((response) => response.json())
            .then((data) => {
                showReservations(data);
            })

            .catch((error) => {
                console.error("Erro noa processamento: ", error)
            });
    };

    btnOpenModal.forEach((button) => {
        button.addEventListener("click", (e) => {
            idEvent = e.target.getAttribute("name");
            toggleModalAdmin();
            searchReservation(idEvent);
        })
    })
};

const deleteReservationId = function(){
    const btnDeleteReservation = document.querySelectorAll("btn-delete-reservation");
    btnDeleteReservation.forEach((button) => {
        button.addEventListener("click", (event) =>{
            let idReservation = event.target.getAttribute("name");
            console.log(idReservation);
            deleteReservation(idReservation);
        })
    })
    const deleteReservation = function(idReservation){
        fetch(urlApiRes + idReservation, {method: "DELETE", 
        redirect: "follow", headers: 
        {"Content-Type": "application/json",}
    })
    .then((response) => response.text())
    .then(() => {
        alert("Deletado com sucesso!!!")
        window.location.reload()
    })
    .catch((error) => console.log("error", error))
    }
}