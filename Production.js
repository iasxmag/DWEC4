//Clase Production
class Production {

    //Propiedades privadas
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    //Constructor
    constructor(title, nationality = '', publication, synopsis = '', image = '') {
        if (!title || !publication) {
            throw new Error('El título y la fecha de publicación son campos obligatorios');
        }
        this.#title = title;
        this.#nationality = nationality;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;
    }

    //Getters
    get title() {
        return this.#title;
    }

    get nationality() {
        return this.#nationality;
    }

    get publication() {
        return this.#publication;
    }

    get synopsis() {
        return this.#synopsis;
    }

    get image() {
        return this.#image;
    }

    //Setters
    set title(title) {
        if (!title) {
            throw new Error('El título es obligatorio');
        }
        this.#title = title;
    }

    set nationality(nationality) {
        this.#nationality = nationality;
    }
    set publication(publication) {
        if (!publication) {
            throw new Error('La fecha de publicación es obligatoria');
        }   
        this.#publication = publication;
    }

    set synopsis(synopsis) {
        this.#synopsis = synopsis;
    }

    set image(image) {
        this.#image = image;
    }

    //Método toString
    toString() {
        return `Título: ${this.#title}, Nacionalidad: ${this.#nationality}, Fecha de publicación: ${this.#publication}, Sinopsis: ${this.#synopsis}, Imagen: ${this.#image}`;
    }

}