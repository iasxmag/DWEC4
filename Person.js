//Clase Person
class Person {
    
    //Propiedades privadas
   #name;
   #lastname1;
   #lastname2;
   #born;
   #picture;

   //Constructor
    constructor(name, lastname1, lastname2 = '', born, picture = '') {
        if (!name || !lastname1 || !born) {
            throw new Error('El nombre, primer apellido y fecha de nacimiento son campos obligatorios');
        }
        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;
    }

    //Getters
    get name() {
        return this.#name; 
    }

    get lastname1() {
        return this.#lastname1;
    }

    get lastname2() {
        return this.#lastname2;
    }

    get born() {
        return this.#born;
    }

    get picture() {
        return this.#picture;
    }

    //Setters
    set name(name) {
        if (!name) { //Validación para que el campo no quede vacío
            throw new Error('El campo nombre no puede estar vacío');
        }
        this.#name = name;
    }

    set lastname1(lastname1) {
        if (!lastname1) {
            throw new Error('El campo primer apellido no puede estar vacío');
        }
        this.#lastname1 = lastname1;
    }   

    set lastname2(lastname2) {
        this.#lastname2 = lastname2;
    }

    set born(born) {
        if (!born) {
            throw new Error('El campo fecha de nacimiento no puede estar vacío');
        }
        this.#born = born;
    }

    set picture(picture) {
        this.#picture = picture;
    }

    //Método toString
    toString() {
        return `${this.#name} ${this.#lastname1} ${this.#lastname2}, born on ${this.#born}`;
    }

}
export default Person;