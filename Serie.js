//Clase Serie
class Serie extends Production {

    //Propiedades privadas
    #resources;
    #locations;
    #seasons;

    //Constructor
    constructor(title, nationality, publication, synopsis, image, resources = [], locations = [], seasons = 0) {
        //Propiedades de la clase padre:
        super(title, nationality, publication, synopsis, image);
        //Propias:
        this.#resources = resources;
        this.#locations = locations;
        this.#seasons = seasons;
    }

    //Getters
    get resources() {
        return this.#resources;
    }

    get locations() {
        return this.#locations;
    }

    get seasons() {
        return this.#seasons;
    }

    //Setters
    set resources(resources) {
        this.#resources = resources;
    }

    set locations(locations) {
        this.#locations = locations;
    }

    set seasons(seasons) { 
        this.#seasons = seasons;
    }

    //Método toString
    toString() {
        return `${super.toString()} | Serie | Temporadas: ${this.seasons} - Capítulos disponibles: ${this.resources.length}`;
    }


}

export default Serie;