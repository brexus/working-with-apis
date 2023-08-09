
const img = document.getElementById("gif");
const searchInput = document.getElementById("search-bar-input");
const searchBtn = document.getElementById("search-btn");
const error = document.getElementById("error");
const refreshBtn = document.getElementById("refresh-btn");

const term = (() => {
    const currentTerm = document.getElementById("current-term");

    let termValue = "cats";

    const getCurrentTermValue = () => termValue;
    const updateCurrentTermValue = (newTerm) => {
        termValue = newTerm;
    };

    const renderCurrentTerm = () => {
        currentTerm.innerText = `Current term: ${termValue}`;
    };

    return { getCurrentTermValue, updateCurrentTermValue, renderCurrentTerm };
})();


async function refreshGif(parameter = "cats") {
    // fetch(`https://api.giphy.com/v1/gifs/translate?api_key=7TcSMtoQvGofAH3yzmzGA74iP8kq0bSk&s=${parameter}`, {mode: 'cors'})
    //     .then((response) => response.json())
    //     .then((response) => {
    //         img.src = response.data.images.original.url;
    //     });

    const promise = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=7TcSMtoQvGofAH3yzmzGA74iP8kq0bSk&s=${parameter}`, {mode: 'cors'});
    const response = await promise.json();
    const imgSource = await response.data.images.original.url;
    img.src = imgSource;
};

const showError = () => {
    error.innerText = "Invalid value";
};

const removeError = () => {
    error.innerText = "";
};

const searchBtnClick = () => {
    const searchInputValue = searchInput.value.trim();
    if(searchInputValue !== "") {
        refreshGif(searchInputValue);
        term.updateCurrentTermValue(searchInputValue);
        term.renderCurrentTerm();
        searchInput.classList = 'valid';
        removeError();
    } else {
        searchInput.classList = 'invalid';
        showError();
    }
};

term.renderCurrentTerm();
refreshGif(term.getCurrentTermValue());
searchBtn.addEventListener("click", searchBtnClick);
refreshBtn.addEventListener('click', () => {
    refreshGif(term.getCurrentTermValue());
});
