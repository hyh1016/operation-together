const addInputEvent = () => {
    const InputFormSubmit = document.getElementById('input-form-submit');
    InputFormSubmit.addEventListener('click', createInput);
};

const createInput = async (event) => {
    event.preventDefault();
    const inputRequestForm = {
        name: document.getElementById("input-name").value,
        contents: [1, 2, 3].map(i => document.getElementById(`p${i}`).value),
    };
    if (!checkValidInputData(inputRequestForm)) return;

    const header = {
        method: 'POST',
        body: JSON.stringify(inputRequestForm),
    };
    const link = getLink();
    const response = await fetchData(`/api/operations/${link}/inputs`, header);
    const data = await response.json();
    if (response.status !== 200) {
        alert('입력 생성 중 오류가 발생하였습니다.');
        console.error(data.message);
        return;
    }
    alert('입력이 등록되었습니다.');
    return location.href = location.origin + `/operations/${link}`;
};

const checkValidInputData = ({name, contents}) => {
    const errorMsg = document.getElementById('error-message');
    if (!checkValidInputName(name)) {
        errorMsg.innerHTML = '이름을 입력해주세요.';
        return false;
    }
    if (!checkValidInputs(contents)) {
        errorMsg.innerHTML = '모든 작전 입력칸을 채워주세요.';
        return false;
    }
    errorMsg.innerHTML = '';
    return true;
};

const checkValidInputName = (name) => {
    return name;
};

const checkValidInputs = (contents) => {
    return contents.filter((v) => !v).length === 0;
};

addInputEvent();
