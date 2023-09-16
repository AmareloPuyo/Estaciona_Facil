const model = document.querySelector("#car-model");
const plate = document.querySelector("#car-plate");
const color = document.querySelector("#car-color");
const owner = document.querySelector("#car-owner");
const space = document.querySelector("#car-space");
const bntEnv = document.querySelector("#btn-env");
const carTable = document.querySelector(".car-table tbody");

//botoes das abas
const btnLista = document.querySelector("#lista");
const btnVagas = document.querySelector("#vagas");

const insertCont = document.querySelector(".insert-container");
const parkCont = document.querySelector(".park-container");
const vagasCont = document.querySelector(".position-park-container");

btnVagas.addEventListener("click", () => {
    insertCont.classList.add('hide');
    parkCont.classList.add('hide');
    vagasCont.classList.add('active');
    btnVagas.classList.add('border-botom')
    btnLista.classList.remove('border-botom')
})
btnLista.addEventListener("click", () => {
    insertCont.classList.remove('hide');
    parkCont.classList.remove('hide')
    vagasCont.classList.remove('active');
    btnVagas.classList.remove('border-botom')
    btnLista.classList.add('border-botom')
})

//escuta o botão enviar e salva as informações no localStorage
bntEnv.addEventListener("click", () => {

    const modelo = model.value;
    const placa = plate.value;
    const cor = color.value;
    const proprietario = owner.value;
    const vaga = space.value.toString().padStart(2, 0);

    //validando a entrada de dados no input
    if (!modelo || !placa || !vaga) return;

    //formatando a hora
    const keyDate = new Date();
    const hora = keyDate.getHours().toString().padStart(2, 0);
    const minuto = keyDate.getMinutes().toString().padStart(2, 0);
    const seconds = keyDate.getSeconds().toString().padStart(2, 0);

    //usando a hora para gerar um ID
    const id = `${hora}${minuto}${seconds}` * 2;

    //criado um objeto com os valores dos input, hora e ID
    const car = {
        modelo: modelo,
        placa: placa,
        cor: cor,
        proprietario: proprietario,
        vaga: vaga,
        hora: `${hora}:${minuto}`,
        id: id
    };

    //salvar o objeto no localStorage com um id
    localStorage.setItem((id), JSON.stringify(car));

})

//busca a informação no localStorage e mostra na tela
function buscaStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const chave = (localStorage.key(i));
        const carroJSON = (localStorage.getItem(chave));
        const carroObj = (JSON.parse(carroJSON));

        if (carroObj !== null) {

            //html que vai ser gerado em cada nova chave
            const newCar = `

                    <table>
                    <tr>
                        <td>${carroObj.modelo}</td>
                        <td>${carroObj.placa}</td>
                        <td>${carroObj.cor}</td>
                        <td>${carroObj.proprietario}</td>
                        <td>${carroObj.vaga}</td>
                        <td>${carroObj.hora}</td>
                        <td><span>Finalizar</span></td>
                    </tr>
                    </table>
                    
            `
            //convertendo o texto para html e adicionando como filho
            const parser = new DOMParser();
            const htmlTemplate = parser.parseFromString(newCar, "text/html");
            const newRow = htmlTemplate.querySelector("tr")
            carTable.appendChild(newRow)

            //removendo o item do local storage
            const btnfinal = newRow.querySelector("span")
            const deletCard = btnfinal.addEventListener("click", () => {
                localStorage.removeItem(carroObj.id)
                window.location.reload()
            })

        }

        //adiciona as informações do carro na vaga

            const cardRed = document.querySelector(`.vaga#vaga${carroObj.vaga}`)

            cardRed.innerHTML = `<p>${carroObj.modelo} / ${carroObj.placa}</p><span class="material-symbols-outlined">directions_car</span><p>Vaga ${carroObj.vaga}</p>`
            cardRed.style.backgroundColor = 'red'
        


    }
}

//troca o fundo dos cardRed
const cardColor = document.querySelectorAll(".vaga")
cardColor.forEach((card) => {
    card.addEventListener("click", () => {

        if (card.innerHTML.includes("Disponível")) {

            card.style.backgroundColor = "grey";
            card.innerHTML = `<p>Manutenção</p><span class="material-symbols-outlined">handyman</span><p>${card.id}</p>`

        } else if (card.innerHTML.includes("Manutenção")) {
            card.style.backgroundColor = "rgb(154, 196, 154)";
            card.innerHTML = `<p>Disponível</p><span class="material-symbols-outlined">home</span><p>${card.id}</p>`

        }
    })
})


buscaStorage()



