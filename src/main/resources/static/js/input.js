const addInputEvent = () => {
    const InputFormSubmit = document.getElementById('input-form-submit');
    InputFormSubmit.addEventListener('click', createInputAll);
};

const createInputAll = async (event) => {
    event.preventDefault();
    const name = document.getElementById("input-name").value;
    const inputs = [1, 2, 3].map((i) => {
        const content = document.getElementById(`p${i}`).value;
        return {
            name,
            position: i,
            content,
        };
    });
    if (!checkValidInputData({name, inputs})) return;

    const header = {
        method: 'POST',
        body: JSON.stringify({inputs})
    };
    const link = location.pathname.split('/')[2];
    const response = await fetchData(`/api/inputs/${link}`, header);
    if (JSON.stringify(response) === '{}') {
        alert('등록되었습니다.');
        return location.href = location.origin + `/operations/${link}`;
    }
    alert('등록 중 오류가 발생하였습니다.');
};

const checkValidInputData = ({name, inputs}) => {
    const errorMsg = document.getElementById('error-message');
    if (!checkValidInputName(name)) {
        errorMsg.innerHTML = '이름을 입력해주세요.';
        return false;
    }
    if (!checkValidInputs(inputs)) {
        errorMsg.innerHTML = '모든 작전 입력칸을 채워주세요.';
        return false;
    }
    errorMsg.innerHTML = '';
    return true;
};

const checkValidInputName = (name) => {
    return name;
};

const checkValidInputs = (inputs) => {
    return inputs.filter((v) => !v.content).length === 0;
};

addInputEvent();
