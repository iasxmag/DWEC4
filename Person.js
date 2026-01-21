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
    set name(nombre) {
        if (!nombre) { //Validación para que el campo no quede vacío
            throw new Error('El campo nombre no puede estar vacío');
        }
        this.#name = nombre;
    }

    set lastname1(apellido1) {
        if (!apellido1) {
            throw new Error('El campo primer apellido no puede estar vacío');
        }
        this.#lastname1 = apellido1;
    }   

    set lastname2(apellido2) {
        this.#lastname2 = apellido2;
    }

    set born(fNacimiento) {
        if (!fNacimienti) {
            throw new Error('El campo fecha de nacimiento no puede estar vacío');
        }
        this.#born = fNacimiento;
    }

    set picture(imagen) {
        this.#picture = imagen;
    }

    //Método toString
    toString() {
        return `${this.#name} ${this.#lastname1} ${this.#lastname2}, born on ${this.#born}`;
    }

}