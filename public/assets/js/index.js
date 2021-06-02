/*
    Twilito 2021
    GitHub: https://github.com/Twilito
*/
const supportedLanguages = ["en","cs"];
const pageName = "index";
let locale = {};

async function languageAssign(languageCode) {
    //Supported language?
    if (supportedLanguages.includes(languageCode) === false) {
        languageCode = "en";
    }
    //Fetch from server
    let jsonFile = fetch(`/assets/locale/${languageCode}.json`)
    .then(response => response.json())
    .catch(() => loader.loaderShow("error"));
    locale =  await jsonFile;
    locale = locale[pageName];
    //Assign
    if (locale["title"]) {
        document.title = locale["title"];
    }
    if(locale['getElementById']){
        Object.keys(locale['getElementById']).forEach(elementKey => {
            document.getElementById(elementKey).innerHTML = locale['getElementById'][elementKey];
        });
    }
}


function load() {
    // languageAssign(navigator.language);
    languageAssign("cs");
}

document.body.onload = () =>(load());