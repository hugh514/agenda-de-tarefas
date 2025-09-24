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
        let novaTarefa = { id: contador, titulo: texto, data_limite: parseDateAtual( data) };

        tarefas.push(novaTarefa);

        criarElemento(contador);
        contador++;
    }

}

function parseDateAtual(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const agora = new Date();
    return new Date(year, month - 1, day, agora.getHours() + 1, agora.getMinutes(), agora.getSeconds());
}

function getClasseDias(dias) {
    if (dias < 0) {
        return "bg-gray-200 text-gray-500";
    } else if (dias <= 2) {
        return "bg-red-300 text-red-600";
    } else if (dias <= 7) {
        return "bg-yellow-100 text-yellow-600";
    } else {
        return "bg-blue-100 text-blue-600";
    }
}

function formatarTempoRestante(dataLimite) {
    const hoje = new Date();
    const diffEmMilissegundos = dataLimite.getTime() - hoje.getTime();

    if (diffEmMilissegundos <= 0) {
        const diffAbsolutaEmMilissegundos = Math.abs(diffEmMilissegundos);
        const diasPassados = Math.floor(diffAbsolutaEmMilissegundos / (1000 * 60 * 60 * 24));
        const horasPassadas = Math.floor((diffAbsolutaEmMilissegundos / (1000 * 60 * 60)) % 24);
        return `Vencido faz ${diasPassados} dias e ${horasPassadas} horas`;
    } else {
        const dias = Math.floor(diffEmMilissegundos / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diffEmMilissegundos / (1000 * 60 * 60)) % 24);
        return `${dias} dias e ${horas} horas restantes`;
    }
}


function criarElemento(contador) {
    const tarefaLi = document.createElement("li");

    let valorTarefa = tarefas.find(tarefa => tarefa.id === contador);
    let tempoFormatado = formatarTempoRestante(valorTarefa.data_limite);
    const dias = Math.floor((valorTarefa.data_limite.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    let classe = getClasseDias(dias);

    if (valorTarefa) {
        tarefaLi.className = 'flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow mb-2';
        tarefaLi.innerHTML = `
    <div>
      <p class="font-semibold text-gray-800">${valorTarefa.titulo}</p>
      <p class="text-sm text-gray-500">Prazo: ${valorTarefa.data_limite.toLocaleDateString()}</p>
    </div>

    <span class="text-sm font-medium px-3 py-1 rounded-full ${classe}">
    ${tempoFormatado}
    </span>

    <button class="editar bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-3 py-1 rounded">
      Editar
    </button>

    <button class="excluir bg-red-500 hover:bg-red-900 text-white text-sm font-semibold px-3 py-1 rounded">
      Excluir
    </button>
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