const addResultEvent = () => {

    const resultButton = document.getElementById('btn-get-result');
    resultButton.addEventListener('click', renderResultWithToggle);

    const inputsButton = document.getElementById('btn-get-inputs');
    inputsButton.addEventListener('click', renderInputs);

    const retryButton = document.getElementById('btn-retry');
    retryButton.addEventListener('click', renderResult);

    const returnButton = document.getElementById('btn-return-operation');
    returnButton.addEventListener('click', returnToOperation);
};

const renderResultWithToggle = async () => {
    const result = await renderResult();
    if (result) toggleVisibility();
};

const renderResult = async () => {
    const resultContainer = document.getElementById('operation-result');
    const result = await getResult();
    if (!result) {
        alert('입력된 작전이 없습니다.');
        return;
    }
    resultContainer.innerHTML = `
        <span class="text-primary">${result[0].content}</span>${hasLastChar(result[0].content) ? '과' : '와'}
        <span class="text-primary">${result[1].content}</span>에서
        <span class="text-primary">${result[2].content}</span>
    `;
    return true;
}

const toggleVisibility = () => {
    const ids = ['btn-get-result', 'btn-get-inputs', 'btn-retry'];

    ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) element.classList.toggle('d-none');
    });
};

const getResult = async () => {
    const header = {
        method: 'GET'
    };
    const response = await fetchData(`/api/auth/operations/${getLink()}/result`, header);
    if (response) return response.result;
};

const renderInputs = async () => {
    const inputs = await getInputs();
    if (!inputs || !inputs.length) {
        alert('입력된 작전이 없습니다.');
        return;
    }
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

const returnToOperation = () => {
    location.replace(location.href.replace('/result', ''));
};

addResultEvent();
