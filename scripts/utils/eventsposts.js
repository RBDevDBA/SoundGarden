const urlApi = "https://soundgarden-api.vercel.app/events";
export const eventPost = function (event) {
    fetch(urlApi, {
        method: "POST", headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert("Evento criado");
        })
        .catch((error) => { console.error(error); });
};