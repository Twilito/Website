/*
    Twilito 2021
    GitHub: https://github.com/Twilito
    */
    class Loader{
        loaderTitles ={
            "loading": ["Náčítání","Loading"],
            "error": ["Došlo k problému", "Error occured"],
            "":[""]
        };
        currentTitles = "";
        constructor(elementId,titleId){
            this.element = document.getElementById(elementId);
            this.title = document.getElementById(titleId);
        }
        loaderShow(message=""){
            clearInterval(this.changeInterval);
            this.element.style.display = "flex";
            this.currentTitles = message;
            this.element.style.transition = "0.6s";
            this.element.style.opacity = "1";
            this.title.style.transition = "0.3s";
            this.title.style.opacity = "0";
            let wordIndex = 0;
            setTimeout(() => {
                this.title.innerHTML = this.loaderTitles[this.currentTitles][wordIndex];
                this.title.style.opacity = "1";
            }, 300);

            this.changeInterval = setInterval(() => {
                this.title.style.opacity = "0";
                setTimeout(() => {
                    this.title.innerHTML = this.loaderTitles[this.currentTitles][wordIndex];
                }, 500);
                setTimeout(() => {
                    this.title.style.opacity = "1";
                }, 1000);
                if(wordIndex >= this.loaderTitles[this.currentTitles].length-1){
                    wordIndex = 0;
                }else{
                    wordIndex += 1;
                };
            }, 5000);
        }
        loaderHide(){
            clearInterval(this.changeInterval);
            this.title.style.transition = "0s";
            this.element.style.transition = "0.6s";
            this.element.style.opacity = "0";
            this.element.style.display = "none";
        }
    }

let navbar = document.getElementById("navbar");
const supportedLanguages = ["en","cs"];
let loader = new Loader("Loader","LoaderTitle");
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
    if(locale["loaderTitles"]){
        loader.loaderTitles = locale["loaderTitles"];
    }
    if(locale['getElementById']){
        Object.keys(locale['getElementById']).forEach(elementKey => {
            document.getElementById(elementKey).innerHTML = locale['getElementById'][elementKey];
        });
    }
    loader.loaderHide();
}


function load() {
    loader.loaderShow("loading");
    languageAssign(navigator.language);
}

document.body.onload = () =>(load());