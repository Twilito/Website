/*
    Twilito 2021
    GitHub: https://github.com/Twilito
*/

let http = require('http');
const port = 3000;

class Route{
    #events = {};
    #noCallback = (emittedPath) =>{
        console.log("hi")
    }
    /**
     * 
     * @param {String} path 
     * @param {Function} Callback 
     */
    on(path, callback){
        this.#events[path] = callback;
    }
    /**
     *  Removes callback and path
     * @param {String} pathToRemove 
     */
    remove(pathToRemove){
        if (this.#events[pathToRemove]) {
            delete this.#events[pathToRemove];
        }
    }
    /**
     * 
     * @param {String} emittedPath 
     */
    emit(emittedPath){
        if (this.#events[emittedPath]) {
            this.#events[emittedPath](emittedPath);
        }else{
            this.#noCallback(emittedPath);
        }
    }
    /**
     * 
     * @param {String} path 
     * @returns {Boolean} true/false if path callback exist
     */
    exist(path){
        return this.#events[path] ? true : false;
    }
    /**
     * Defines what callback is going to be fired when path is not defined
     * Default noCallback is empty function
     * @param {Function} Callback
     * @returns {Error} Error if typeof callback is not "function"
     */
    setNoCallback(callback){
        if(typeof callback !== "function"){
            return new Error(`Callback not set "${callback}" is not function!`);
        }else{
            this.#noCallback = callback;
        }
    }
}

connection(request,response){

}
http.createServer(connection(Request,Response)).listen(port);
console.log(`Listening on ${port}`)