const addOperationEvent = () => {
    const modal = document.getElementById('result-modal');
    const input = document.getElementById('operation-password');
    modal.addEventListener('shown.bs.modal', () => {
        input.focus();
    });

    const inputButton = document.getElementById('btn-input');
    inputButton.addEventListener('click', redirectInput);

    const passwordButton = document.getElementById('btn-password');
    passwordButton.addEventListener('click', checkPassword);
}

const redirectInput = () => {
    location.href = location.origin + `/operations/${getLink()}/input`;
}

const checkPassword = async () => {
    const password = document.getElementById('operation-password').value;
    const passwordDto = {
        password,
    };
    const header = {
        method: 'POST',
        body: JSON.stringify(passwordDto),
    };
    const link = getLink();
    await fetchData(`/api/operations/${link}`, header);
    location.href = location.origin + `/operations/${link}/result`;
}

addOperationEvent();
