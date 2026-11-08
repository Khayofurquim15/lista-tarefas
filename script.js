
const tarefaRe = document.getElementById('tarefaRe');
const lista = document.getElementById('listaTarefas');
const desc = document.getElementById('desc');

let tarefasArray = [
    {id: 1, texto: 'exemplo', feita: false},
];

function addTarefa(){
const tarefaNome = document.getElementById('tarefaNome');    

    if (tarefaNome.value === '' ) {
        console.log('ERROR... nome invalido');
        window.alert('Erro! digite o nome da tarefa')

    }else{

        const novaTarefa = {
            id: Date.now(),
            texto: String(tarefaNome.value),
            feita: false
        };

        tarefasArray.push(novaTarefa);
        salvarTarefas();
        renderizarTela();

    };

    tarefaNome.value = ' ';
    tarefaNome.focus();
    desc.value = ' ';
};

function renderizarTela(){
    lista.innerHTML = '';

    tarefasArray.forEach(tarefa => {
        const descricao = String(desc.value);
        lista.innerHTML+= `
        <li>
        <div> ${tarefa.texto} </div> <details><summary>Saiba Mais.</summary> ${descricao} </details>
        <button onclick="deletar(${tarefa.id})" >Deletar</button> 
        
        </li>
        `;
    });

    console.log(tarefasArray);
};

function salvarTarefas(){

    localStorage.setItem('tarefas', JSON.stringify(tarefasArray));
};

function carregarTarefas(){
    const tarefasSalvas = localStorage.getItem('tarefas');

    if(tarefasSalvas){
        tarefasArray = JSON.parse(tarefasSalvas);

    }else{
        tarefasArray = [];
    }

    renderizarTela();
};

function deletar(tarefaID){
    tarefasArray = tarefasArray.filter(tarefa => tarefa.id !== tarefaID);
    salvarTarefas();
    renderizarTela();
};
    
carregarTarefas();

// onclick="funcao(id do array)"