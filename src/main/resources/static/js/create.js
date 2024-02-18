const addCreateEvent = () => {
    document.getElementById('operation-date').value = new Date().toISOString().slice(0, 10);

    const operationFormSubmit = document.getElementById('operation-form-submit');
    operationFormSubmit.addEventListener('click', createOperation);
};

const createOperation = async (event) => {
    event.preventDefault();
    const operationSaveDto = {
        name: document.getElementById('name').value,
        password: document.getElementById('password').value,
        operationDate: document.getElementById('operation-date').value,
    };
    if (!checkValidation(operationSaveDto)) return;
    const header = {
        method: 'POST',
        body: JSON.stringify(operationSaveDto)
    }
    const response = await fetchData("/api/operations", header);
    const data = await response.json();
    if (response.status !== 200) {
        alert('작전 생성 중 오류가 발생하였습니다.');
        console.error(data.message);
        return;
    }
    const link = data.link;
    location.href = location.origin + `/operations/${link}`;
};

const checkValidation = (dto) => {
    const errorMessage = document.getElementById('error-message');
    if (!isValidName(dto.name)) errorMessage.innerHTML = '유효하지 않은 이름입니다. (이름: 1~8자)';
    else if (!isValidPassword(dto.password)) errorMessage.innerHTML = '유효하지 않은 비밀번호입니다. (비밀번호: 4~12자)';
    else if (!isEqualPasswordCheck(dto.password, document.getElementById('password-check').value))
        errorMessage.innerHTML = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
    else if (!isValidDate(dto.operationDate)) errorMessage.innerHTML = '작전 날짜가 유효하지 않습니다.';
    else {
        errorMessage.innerHTML = '';
        return true;
    }
};

const isValidName = (name) => {
    if (!name || name[0] === ' ') return false;
    if (name.length < 1 || name.length > 8) return false;
    return true;
};

const isValidPassword = (password) => {
    if (!password || password.length < 4 || password.length > 12) return false;
    if (/[^\w]/.test(password)) return false;
    return true;
};

const isEqualPasswordCheck = (password, passwordCheck) => {
    return password === passwordCheck;
}

const isValidDate = (date) => {
    if (!date) return false;
    const current = new Date().toISOString().slice(0, 10);
    if (new Date(date) < new Date(current)) return false;
    return true;
};

addCreateEvent();
