//Clase Movie
class Movie extends Production {
    
    //Propiedades privadas
    #resource;
    #locations;

    //Constructor
    constructor(title, nationality, publication, synopsis, image, resource = null, locations = []) {
        //Propiedades de la clase padre:
        super(title, nationality, publication, synopsis, image);
        //propias:
        this.#resource = resource;
        this.#locations = locations;
    }

    //Getters
    get resource() {
        return this.#resource;
    }

    get locations() {
        return this.#locations;
    }

    //Setters
    set resource(resource) {
        if (resource && !(resource instanceof Resource)) { 
            throw new Error('Debe ser una instancia de Resource');
        }
        this.#resource = resource;
    }

    set locations(locations) {
        this.#locations = locations;
    }

    //Método toString
    toString() {
        return `${super.toString()} 
        | Recurso: ${this.#resource ? this.#resource.toString() : 'N/A'} 
        | Locaciones: ${this.#locations.length > 0 ? this.#locations.join(', ') : 'N/A'}`;  
    }
        

}
export default Movie;