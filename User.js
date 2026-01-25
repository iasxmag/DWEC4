const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Para validar el formato del email

// Clase User

class User {

    // Propiedades privadas
    #username;
    #email;
    #password;

    // Constructor
    constructor(username, email, password) {
        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    // Getters
    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }   

    // Setters
    set username(username) {
        if (!username) {
            throw new Error('El nombre de usuario no puede estar vacío');
        }
        this.#username = username;
    }

    set email(email) {
        //Condcion para validar que el email no esté vacío y que tenga el formato indicado
        if (!email || !regEx.test(email)) {
            throw new Error('El formato del email es inválido');                
        }
        this.#email = email;
    }

    set password(password) {
        if (!password) {
            throw new Error('La contraseña no puede estar vacía');
        }
        const contrEspacios = password.trim();
        if (contrEspacios.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        this.#password = password;
    }

    // Método toString
    toString() {
        return `Usuario: ${this.username} | Email: ${this.email}`;
    }

}

export default User;