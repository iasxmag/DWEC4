//Clase Resource
class Resource {

    //Propiedades privadas
    #duration;
    #link;

    //Constructor
    constructor(duration, link) {
        if (!duration || !link) {
            throw new Error('La duración y el enlace son campos obligatorios');
        }
        this.#duration = duration;
        this.#link = link;
    }

    //Getters
    get duration() {
        return this.#duration;
    }

    get link() {
        return this.#link;
    }

    //Setters
    set duration(duration) {
        if (!duration) {
            throw new Error('El campo duración no puede estar vacío');
        }
        this.#duration = duration;
    }

    set link(link) {
        if (!link) {
            throw new Error('El campo enlace no puede estar vacío');
        }
        this.#link = link;
    }

    //Método toString
    toString() {
        return `Duración: ${this.#duration}, Enlace: ${this.#link}`;
    }
}

export default Resource;