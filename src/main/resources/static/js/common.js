const REQUEST_URL = 'http://localhost:8080';

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
        return await res.json();
    } catch (error) {
        console.error(error);
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
