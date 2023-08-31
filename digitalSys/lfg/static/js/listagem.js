async function fetchPropostas() {
    const response = await fetch('http://localhost:3001/mongo');
    const propostas = await response.json();
    const propostasList = document.getElementById('propostas-list');
    propostas.forEach(proposta => {
        const divItem = document.createElement('div');
        divItem.classList.add('proposta-item');
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', proposta._id); 
        const keyValuePairs = [];
        for (const chave in proposta) {
            console.log(proposta)
            if (chave !== "_id" && chave != "__v") {
                const valor = proposta[chave];
                keyValuePairs.push(`${chave}: ${valor}`);
            }
        }
        keyValuePairs.forEach(keyValuePair => {
            const keyValueElement = document.createElement('p');
            keyValueElement.textContent = keyValuePair;
            listItem.appendChild(keyValueElement);
        })
        const negarButton = document.createElement('button');
        negarButton.textContent = '✘';
        negarButton.classList.add('negar-button');
        negarButton.addEventListener('click', () => negarProposta(proposta._id));
        const aprovarButton = document.createElement('button');
        aprovarButton.textContent = '✓';
        aprovarButton.classList.add('aprovar-button');
        aprovarButton.addEventListener('click', () => aprovarProposta(proposta._id));
        listItem.appendChild(negarButton);
        listItem.appendChild(aprovarButton);
        propostasList.appendChild(listItem);
    });
};

async function aprovarProposta(_id) {
    const propostaDiv = document.querySelector(`[data-id="${_id}"]`);
    propostaDiv.classList.add('aprovada');
    window.alert('Proposta aprovada');
};

async function negarProposta(_id) {
    const response = await fetch(`http://localhost:3001/mongo/${_id}`, {
        method: 'DELETE',
        headers: {
        },
        body: JSON.stringify({ id: _id })
    });
    if (response.ok) {
        const propostaDiv = document.querySelector(`[data-id="${_id}"]`);
        propostaDiv.remove();
    } else {
        console.error('Erro ao negar proposta:', response.statusText);
    }
};

window.onload = fetchPropostas;