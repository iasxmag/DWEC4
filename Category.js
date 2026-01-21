//Clase Category
class Category {
    //Propiedades privadas
    #name;
    #description;

    constructor(name, description = '') {
        if (!name) {
            throw new Error('El nombre de la categoría es obligatorio');
        }
        this.#name = name;
        this.#description = description;
    }

    //Getters
    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    //Setters
    set name(name) {
        if (!name) {
            throw new Error('El nombre de la categoría no puede estar vacío');
        }
        this.#name = name;
    }

    set description(description) {
        this.#description = description;
    }

    //Método toString
    toString() {
        return `${this.#name}: ${this.#description}`;
    }

}