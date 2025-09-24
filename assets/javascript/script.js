const textoInput = document.querySelector(".input-text");
const dataInput = document.querySelector(".input-date");
const adicionar = document.querySelector(".adicionar");

let tarefas = [];

let contador = 1;

function adicionarTarefa() {
    const texto = textoInput.value;
    const data = dataInput.value;
    if (texto === '' || data === '') {
        alert('Preencha todos os campos!')
    } else {
        let novaTarefa = { id: contador, titulo: texto, data_limite: data };

        tarefas.push(novaTarefa);

        criarElemento(contador);
        contador++;
    }

}

function getClasseDias(dias) {
    if (dias < 0) {
        return "bg-gray-200 text-gray-500";
    } else if (dias <= 2) {
        return "bg-red-100 text-red-600";
    } else if (dias <= 7) {
        return "bg-yellow-100 text-yellow-600";
    } else {
        return "bg-blue-100 text-blue-600";
    }
}

function diasRestantes(dataLimite) {
    const hoje = new Date();
    const prazo = new Date(dataLimite);

    const diff = prazo - hoje;
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return dias;
}


function criarElemento(contador) {
    const tarefaLi = document.createElement("li");

    let valorTarefa = tarefas.find(tarefa => tarefa.id === contador);
    let dias = diasRestantes(valorTarefa.data_limite);
    let classe = getClasseDias(dias);

    if (valorTarefa) {
        tarefaLi.className = 'flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow mb-2';
        tarefaLi.innerHTML = `
    <div>
      <p class="font-semibold text-gray-800">${valorTarefa.titulo}</p>
      <p class="text-sm text-gray-500">Prazo: ${valorTarefa.data_limite}</p>
    </div>
    <span class="text-sm font-medium px-3 py-1 rounded-full ${classe}">
    ${dias < 0 ? "Vencido" : dias + " dias restantes"}
    </span>
    `;
        document.querySelector(".lista").appendChild(tarefaLi);

       textoInput.value = "";
       dataInput.value = "";
       textoInput.focus();

    } else {
        console.error(`Tarefa com ID ${contador} não encontrada.`);
    }

}

adicionar.addEventListener('click', adicionarTarefa);