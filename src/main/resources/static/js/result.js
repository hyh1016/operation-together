const addResultEvent = () => {

    const resultButton = document.getElementById('btn-get-result');
    resultButton.addEventListener('click', renderResultWithToggle);

    const inputsButton = document.getElementById('btn-get-inputs');
    inputsButton.addEventListener('click', () => renderInputs(0));

    const retryButton = document.getElementById('btn-retry');
    retryButton.addEventListener('click', renderResult);

    const returnButton = document.getElementById('btn-return-operation');
    returnButton.addEventListener('click', returnToOperation);

    const prevButton = document.getElementById('btn-prev-page');
    prevButton.addEventListener('click', movePrevPage);

    const nextButton = document.getElementById('btn-next-page');
    nextButton.addEventListener('click', moveNextPage);
};

const renderResultWithToggle = async () => {
    const result = await renderResult();
    if (result) toggleVisibility();
};

const renderResult = async () => {
    const resultContainer = document.getElementById('operation-result');
    const result = await getResult();
    if (!result || !result.length) {
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
    return await fetchData(`/api/operations/${getLink()}/inputs/result`, header);
};

const movePrevPage = async () => {
    const currentPage = parseInt(document.getElementById('current-page').innerText) - 1;
    if (currentPage <= 0) {
        alert('첫 페이지입니다.');
        return;
    }
    const prevPage = currentPage - 1;
    await renderInputs(prevPage);
}

const moveNextPage = async () => {
    const currentPage = parseInt(document.getElementById('current-page').innerText) - 1;
    const totalPages = parseInt(document.getElementById('total-pages').innerText) - 1;
    if (currentPage === totalPages) {
        alert('마지막 페이지입니다.');
        return;
    }
    const nextPage = currentPage + 1;
    await renderInputs(nextPage);
}

const renderInputs = async (page) => {
    const data = await getInputs(page);
    const inputList = data.inputList;
    if (inputList === 0) {
        alert('입력된 작전이 없습니다.');
        return;
    }
    const inputModalBody = document.getElementById('inputs-modal-body');
    inputModalBody.innerHTML = inputList.map((v) => {
        return (`<p>
            <span class="badge bg-primary fw-normal">${v.name + ' '}</span>
            ${v.contents[0].content}${hasLastChar(v.contents[0].content) ? '과' : '와'} ${v.contents[1].content}에서 ${v.contents[2].content}
        </p>`);
    }).join('');
    document.getElementById('current-page').innerText = data.currentPage + 1;
    document.getElementById('total-pages').innerText = data.totalPages;
};

const getInputs = async (page) => {
    const header = {
        method: 'GET',
        // params: {
        //     page,
        //     size: 10
        // }
    };
    return await fetchData(`/api/operations/${getLink()}/inputs?page=${page}&size=10`, header);
};

const returnToOperation = () => {
    location.replace(location.href.replace('/result', ''));
};

addResultEvent();
