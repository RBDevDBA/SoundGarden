import { dateISO8601 } from "./date.js";

export const readForm = function (inputs, newEvent) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== "submit") {
            if (!inputs[i].value) {
                alert("Preencha todos os campos para cadastrar");
                throw new Error("Preencha todos os campos para cadastrar");                
            }

            switch (inputs[i].name) {
                case "attractions":
                    newEvent[inputs[i].name] = inputs[i].value.split(/\s*,\s*/);

                    break;
                case "number_tickets":
                    newEvent[inputs[i].name] = parseInt(inputs[i].value);
                    break;

                case "scheduled":
                    let eventDate = inputs[i].value;
                    let rule = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;

                    if (!eventDate.match(rule)) {
                        alert("formato de data e hora aceitos 00/00/0000 00:00.");
                        throw new Error("formato de data e hora aceitos 00/00/0000 00:00.");
                    }

                    newEvent[inputs[i].name] = dateISO8601(eventDate);

                    break;

                default: newEvent[inputs[i].name] = inputs[i].value;
            }
        }
    }
    return newEvent;
}