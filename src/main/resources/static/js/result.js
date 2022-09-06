const addResultEvent = () => {

    const resultButton = document.getElementById('btn-get-result');
    resultButton.addEventListener('click', renderResultWithToggle);

    const inputsButton = document.getElementById('btn-get-inputs');
    inputsButton.addEventListener('click', renderInputs);

    const retryButton = document.getElementById('btn-retry');
    retryButton.addEventListener('click', renderResult);
};

const renderResultWithToggle = async () => {
    await renderResult();
    toggleButton();
};

const renderResult = async () => {
    const resultContainer = document.getElementById('operation-result');
    const result = await getResult();
    resultContainer.innerHTML = `
        <span class="text-primary">${result[0].content}</span>${hasLastChar(result[0].content) ? '과' : '와'}
        <span class="text-primary">${result[1].content}</span>에서
        <span class="text-primary">${result[2].content}</span>
    `;
}

const toggleButton = () => {
    const resultButton = document.getElementById('btn-get-result');
    resultButton.classList.toggle('d-none');

    const inputsButton = document.getElementById('btn-get-inputs');
    inputsButton.classList.toggle('d-none');

    const retryButton = document.getElementById('btn-retry');
    retryButton.classList.toggle('d-none');
};

const getResult = async () => {
    const header = {
        method: 'GET'
    };
    const response = await fetchData(`/api/auth/operations/${getLink()}/result`, header);
    return response.result;
};

const renderInputs = async () => {
    const inputs = await getInputs();
    const inputModalBody = document.getElementById('inputs-modal-body');
    inputModalBody.innerHTML = inputs.map((v) => {
        return (`<p>
            <span class="badge bg-primary fw-normal">${v.name + ' '}</span>
            ${v.contents[0]}${hasLastChar(v.contents[0]) ? '과' : '와'} ${v.contents[1]}에서 ${v.contents[2]}
        </p>`);
    }).join('');
};

const getInputs = async () => {
    const header = {
        method: 'GET'
    };
    const response = await fetchData(`/api/auth/operations/${getLink()}/inputs`, header);
    return response.inputs;
};

addResultEvent();
