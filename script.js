
const lista = document.getElementById('listaTarefas'); // LISTA DE TAREFAS NO HTML //
const tarefaValor = document.getElementById('tarefaValor'); // QUANTIDADE VISUAL DE TAREFAS //
const tarefaCat = document.getElementById('tarefaCat'); // VALOR RETIRADO DO SELECTED //

let tarefasArray = [ // ARRAY PRINCIPAL DE TAREFAS //
    {id: 1, texto: 'exemplo', feita: false},
];

function addTarefa(){   // ADICIONA UMA TAREFA //

const tarefaNome = document.getElementById('tarefaNome');    

    if (tarefaNome.value === '' ) {
        console.log('ERROR... nome invalido');
        window.alert('Erro! digite o nome da tarefa')

    }else{

        const novaTarefa = { // CRIA O OBJETO DA TAREFA //
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
};

function renderizarTela(){ // CRIAR A LISTA VISUAL NO HTML //
    lista.innerHTML = '';
    tarefaValor.innerHTML = '0';

        const categoria =  String(tarefaCat.value);
        let arrayFiltrado = tarefasArray;

        if(categoria === 'feitas'){ // VERIFICA A CATEGORIA SELECIONADA // 
        arrayFiltrado = tarefasArray.filter(tarefa => tarefa.feita === true);

        }else if(categoria === 'pendentes'){
        arrayFiltrado = tarefasArray.filter(tarefa => tarefa.feita === false);

        }else{
        
        }

    arrayFiltrado.forEach(tarefa => { // CRIA O ELEMNTO DA LISTA UM POR UM //

        if(tarefa.feita === true){ // TAREFA CONCLUIDA //
            lista.innerHTML+= `
            <li>
            <p> ${tarefa.texto} /Tarefa Concluida</p>
            <button onclick="deletar(${tarefa.id})" >Deletar</button> 
            </li>
            `;

        }else{ // TAREFA PENDENTE //
            lista.innerHTML+= `
            <li onclick="concluirTarefa(${tarefa.id})" >
            <p> ${tarefa.texto} </p>
            <button onclick="deletar(${tarefa.id})" >Deletar</button> 
            </li>
            `;
        };

    });

    tarefaValor.innerHTML = ` ${arrayFiltrado.length} `; // MOSTRA A QUANTIDADE DE TAREFAS NA TELA //
    console.log(tarefasArray);
    
};

function salvarTarefas(){ // SALVA A TAREFA NO LOCALSTORE //
    localStorage.setItem('tarefas', JSON.stringify(tarefasArray));
    console.log('tarefa salva com sucesso');
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

function deletar(tarefaID){ // DELETAR A TAREFA ESCOLHIDA //
    tarefasArray = tarefasArray.filter(tarefa => tarefa.id !== tarefaID);
    salvarTarefas();
    renderizarTela();
};

function concluirTarefa(tarefaId){ // MUDA O VALOR DA TAREFA PARA CONCLUIR //

    tarefasArray.forEach(tarefa => {
        if(tarefa.id === tarefaId){
            tarefa.feita = true;
        }
    });

    salvarTarefas();
    renderizarTela();
};
    
carregarTarefas();
