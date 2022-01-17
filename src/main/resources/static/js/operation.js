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
    window.location.href = window.location.href + "/input";
}

const checkPassword = () => {
    const password = document.getElementById('operation-password').value;
    // TODO: check password
}

addOperationEvent();