const inputTexto = document.querySelector('.input-text');
const inputData = document.querySelector('.input-date');
const adicionar = document.querySelector('.adicionar');
const lista = document.querySelector('.lista');

function criarLi() {
    const li = document.createElement('li');
    return li;
}

function adicionarTarefa(texto, data) {
    const li = criarLi();
    li.innerText = `${texto} ${data}`;
    lista.appendChild(li);
}

adicionar.addEventListener('click', function () {
    if(!inputTexto.value && !inputData.value) return;
    console.log(`${inputTexto.value} ${inputData.value}`);
    adicionarTarefa(inputTexto.value, inputData.value);
});