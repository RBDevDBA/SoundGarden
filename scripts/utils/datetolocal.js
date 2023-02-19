export function dataLocal (data){
    return new Date(data).toLocaleDateString("pt-BR") + " " +
    new Date(data).toLocaleTimeString("pt-BR", {
        hour:"2-digit",
        minute:"2-digit",
        hour12: false,
    })
}