const REQUEST_URL = location.origin;

const fetchData = async (url, option) => {
    try {
        const res = await fetch(REQUEST_URL + url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("Authorization"),
                },
                ...option,
            });
        const data = await res.json();
        if (res.status !== 200) {
            alert(data.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        alert('데이터를 불러오는 도중 오류가 발생하였습니다.');
    }
}

const getLink = () => {
    return location.pathname.split('/')[2];
}

const hasLastChar = (content) => {
    const lastWord = content[content.length-1];
    const unicode = lastWord.charCodeAt();
    return (unicode - 0xAC00) % 28;
}
