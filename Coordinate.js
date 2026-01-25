// Clase Coordinate

class Coordinate {
    #latitude;
    #longitude;

    // Constructor
    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    // getters
    get latitude() {
        return this.#latitude;
    }

    get longitude() {
        return this.#longitude;
    }

    // setters
    set latitude(lat) {
        if (isNaN(lat)){
            throw new Error("La latitud debe ser un número");
        }
        this.#latitude = lat;
    }

    set longitude(long) {
        if (isNaN(long)){
            throw new Error("La longitud debe ser un número");
        }
        this.#longitude = long;
    }

    //método tostring
    toString() {    
        return `Latitud: (${this.#latitude}, | Longitud: ${this.#longitude})`;
    }
}

export default Coordinate;