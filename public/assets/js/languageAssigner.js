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
        Object.keys(locale['querySelectorAll']).forEach(elementKey => {
            let elements = document.querySelector(elementKey);
            elements.forEach(element => {
                element.innerHTML = locale['querySelectorAll'][elementKey];
            })
            console.log(elements);
        });
    }
}