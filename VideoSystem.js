// Importación de las clases necesarias
import Category from "./Category.js";
import User from "./User.js";
import Production from "./Production.js";
import { act } from "react";

const VideoSystem = (function () {
    let vSys; //Variable para guardar la unica instancia de VideoSystem

    // Clase VideoSystem
    class VideoSystem {
        #name;
        #users = [];
        #productions = [];
        #categories = [];
        #actors = [];
        #directors = [];
        //Relaciones
        #categoryProductions = [];
        #actorProductions = [];
        #directorProductions = [];
        //Categoria por defecto
        #defCategory;

        //Constructor
        constructor(name) {
            if (vSys) return vSys;

            this.#name = name;

            //Crear categoria por defecto
            this.#defCategory = new Category("Sin categoría");
            this.#categories.push(this.#defCategory);

            vSys = this;
        }

        //getter y setter name y defCategory
        get name() {
            return this.#name;
        }

        set name(name) {
            if (!name)
                throw new Error("El nombre no puede estar vacio");
            this.#name = name;
        }

        get defCategory() {
            return this.#defCategory;
        }

        set defCategory(category) {
            this.#defCategory = category;
        }

        //Métodos categoria
        //getter categorias
        get categories() {
            const lista = this.#categories;
            // Devolver un iterador para recorrer las categorías
            return {
                *[Symbol.iterator]() {
                    for (const category of lista) {
                        yield category;
                    }
                },
            };
        }

        //Método añadir categoria
        addCategory(category) {
            if (!category || !(category instanceof Category)) {
                throw new Error("La categoría no puede ser null y debe ser un objeto válido.")
            }
            const existe = this.#categories.find(cat => cat.name === category.name);
            if (existe) {
                throw new Error("La categoría ya existe.");
            }
            this.#categories.push(category);
            return this.#categories.length;
        }

        //Método eliminar categoria
        removeCategory(category) {
            //Buscar la posicion de la categoria para saber si está registrada o no
            const index = this.#categories.findIndex(cat => cat.name === category.name);
            if (index === -1) {
                throw new Error("La categoría no está registrada.");
            }
            //traspasar sus productos si la borramos a la categoria por defecto
            this.#categoryProductions.forEach(rel => {
                if (rel.category.name === category.name) {
                    rel.category = this.#defCategory;
                }
            });
            this.#categories.splice(index, 1); //Eliminar la categoria
            return this.#categories.length;
        }

        //Métodos usuario
        //getter usuarios
        get users() {
            const lista = this.#users;
            // Devolver un iterador para recorrer las categorías
            return {
                *[Symbol.iterator]() {
                    for (const user of lista) {
                        yield user;
                    }
                },
            };
        }

        //Método añadir usuario
        addUser(user){
            if (!user || !(user instanceof User)) {
                throw new Error("El usuario no puede ser null y debe ser un objeto válido.")
            }
            const existeUsu = this.users.find(usu => usu.username === user.username);
            if (existeUsu) {
                throw new Error("El usuario ya existe.");
            }
            const existeEmail = this.users.find(usu => usu.email === user.email);
            if (existeEmail) {
                throw new Error("El email ya está registrado.");
            }  
            this.#users.push(user);
            return this.#users.length;
        }

        //Método eliminar usuario
        removeUser(user){
            if (!user || !(user instanceof User)) {
                throw new Error("El usuario no puede ser null y debe ser un objeto válido.")
            }
            //Buscar la posicion del usuario para saber si está registrado o no
            const index = this.#users.findIndex(usu => usu.username === user.username);
            if (index === -1) {
                throw new Error("El usuario no está registrado.");
            }
            this.#users.splice(index, 1); 
            return this.#users.length;
        }

        //Métodos productions
        get productions() {
            const lista = this.#productions;
            // Devolver un iterador para recorrer las producciones
            return {
                *[Symbol.iterator]() {
                    for (const production of lista) {
                        yield production;
                    }
                },
            };
        }

        //Método añadir producción
        addProduction(production) {
            if (!production || !(production instanceof Production)) {
                throw new Error("La producción no puede ser null o tener un tipo inválido.")
            }
            const existeProd = this.#productions.find(prod => prod.title === production.title);
            if(existeProd){
                throw new Error("La producción ya existe.");
            }
            this.#productions.push(production);
            return this.#productions.length;
        }
        
        //Método eliminar producción
        removeProduction(production) {
            if (!production || !(production instanceof Production)) {
                throw new Error("La producción no puede ser null o tener un tipo inválido.")
            }
            //Buscar la posicion de la producción para saber si está registrada o no
            const index = this.#productions.findIndex(prod => prod.title === production.title);
            if (index === -1) {
                throw new Error("La producción no está registrada.");
            }

            //ELIMINACION DE RELACIONES ASOCIADAS A PRODUCTION
            //Eliminar las relaciones de categoria-producción que involucren esta producción
            this.#categoryProductions = this.#categoryProductions.filter(rel => rel.production.title !== production.title);
            //Eliminar las relaciones de actor-producción que involucren esta producción
            this.#actorProductions = this.#actorProductions.filter(rel => rel.production.title !== production.title);
            //Eliminar las relaciones de director-producción que involucren esta producción
            this.#directorProductions = this.#directorProductions.filter(rel => rel.production.title !== production.title);
            
            this.#productions.splice(index, 1);
            return this.#productions.length;
        }

        //Métodos actors
        //getter actors
        get actors() {
            const lista = this.#actors;
            return {
                *[Symbol.iterator]() {
                    for (const actor of lista) {
                        yield actor;
                    }
                },
            };
        }
        
        //Añadir actor
        addActor(actor) {
            if (!actor || !(actor instanceof Person)) {
                throw new Error("El actor no puede ser null y debe ser un objeto válido.")
            }
            const existeActor = this.#actors.find(act => act.name === actor.name);
            if (existeActor) {
                throw new Error("El actor ya existe.");
            }
            this.#actors.push(actor);
            return this.#actors.length;
        }   

        //eliminar actor
        removeActor(actor) {
            if (!actor || !(actor instanceof Person)) {
                throw new Error("El actor no puede ser null y debe ser un objeto válido.")
            }
            const existeActor = this.#actors.find(act => act.name === actor.name);
            if (!existeActor) {
                throw new Error("El actor no existe en el sistema.");
            }
            //Eliminar las relaciones de actor-producción que involucren a este actor
            this.#actorProductions = this.#actorProductions.filter(rel => rel.actor.name !== actor.name);
            this.#actors.splice(index, 1);
            return this.#actors.length;
        }

        //Métodos directors
        //getter directors
        get directors() {
            const lista = this.#directors;
            return {
                *[Symbol.iterator]() {
                    for (const director of lista) {
                        yield director;
                    }
                },
            };
        }
        
        //Añadir director
        addDirector(director) {
            if (!director || !(director instanceof Person)) {
                throw new Error("El director no puede ser null y debe ser un objeto válido.")
            }
            const existeDirector = this.#directors.find(dir => dir.name === director.name);
            if (existeDirector) {
                throw new Error("El director ya existe.");
            }
            this.#directors.push(director);
            return this.#directors.length;
        }

        //eliminar director
        removeDirector(director) {
            if (!director || !(director instanceof Person)) {
                throw new Error("El director no puede ser null y debe ser un objeto válido.")
            }
            const existeDirector = this.#directors.find(dir => dir.name === director.name);
            if (!existeDirector) {
                throw new Error("El director no existe en el sistema.");
            }
            //Eliminar las relaciones de director-producción
            this.#directorProductions = this.#directorProductions.filter(rel => rel.director.name !== director.name);
            this.#directors.splice(index, 1);
            return this.#directors.length;
        }

        //Método assignCategory
        assignCategory(production, category) {
            if (!production) {
                throw new Error("Production es null.")
            }
            if (!category) {
                throw new Error("Category es null.")
            }
            //Comprobar si la producción y la categoría existen en el sistema
            const prodIndex = this.#productions.findIndex(p => p.title === production.title);
            if (prodIndex === -1) {
            this.addProduction(production); // Añadimos la producción si no existe
            }

            const catIndex = this.#categories.findIndex(c => c.name === category.name);
            if (catIndex === -1) {
            this.addCategory(category); 
            }
            // Crear la relación entre producción y categoría
            const existeRel = this.#categoryProductions.some(rel => rel.category.name === production.title && rel.category.name === production.title);
            if (!existeRel) {
                this.#categoryProductions.push({ production: production, category: category });
            }
            //Devolver el total de las producciones asignadas a esta categoria
            const totalCatAsignadas = this.#categoryProductions.filter(rel => rel.category.name === category.name).length;
            return totalCatAsignadas;   
        }

        //Método deassignCategory
        deassignCategory(production, category) {
            if (!production) {
                throw new Error("Production es null.")
            }
            if (!category) {
                throw new Error("Category es null.")
            }

            const prodIndex = this.#productions.findIndex(p => p.title === production.title);
            if (prodIndex === -1) {
            this.addProduction(production); // Añadimos la producción si no existe
            }

            const catIndex = this.#categories.findIndex(c => c.name === category.name);
            if (catIndex === -1) {
            this.addCategory(category); 
            }

            //Busca y elimina la relacion
            const relIndex = this.#categoryProductions.length;
            this.#categoryProductions = this.#categoryProductions.filter(rel => !(rel.category.name === category.name && rel.production.title === production.title));
            if(this.#categoryProductions.length === relIndex){
                throw new Error("La relación entre la producción y la categoría no existe.");
            }
            //Devolver el total de las producciones asignadas a esta categoria
            const totalCatAsignadas = this.#categoryProductions.filter(rel => rel.category.name === category.name).length;
            return totalCatAsignadas;   
        }

        //Métodos directores y actores
        //ASIGNAR
        assignDirector(director, production) {
            // Implementación similar a assignCategory
            if (!director) {
                throw new Error("Person es null.")
            }
            if (!production) {
                throw new Error("Production es null.")
            }
            const indexDir = this.#directors.findIndex(dir => dir.name === director.name && dir.lastname1 === director.lastname1);
            if (indexDir === -1) {
                this.addDirector(director); 
            }
            const indexProd = this.#productions.findIndex(prod => prod.title === production.title);
            if (indexProd === -1) {
                this.addProduction(production); 
            }
            //Crear relacion entre director y production
            //Ver si ya existe
            const existeRel = this.#directorProductions.some(rel => rel.director.name === director.name &&
                rel.director.lastname1 === director.lastname1 && rel.production.title === production.title);
            if (!existeRel) {
                this.#directorProductions.push({ director: director, production: production });

            }
            const totalDirAsignadas = this.#directorProductions.filter(rel => rel.director.name === director.name &&
                rel.director.lastname1 === director.lastname1).length;
            return totalDirAsignadas;
        }

        assignActor(actor, production) {
            if (!actor) {
                throw new Error("Person es null.")
            }
            if (!production) {
                throw new Error("Production es null.")
            }
            const indexAct = this.#actors.findIndex(act => act.name === actor.name && act.lastname1 === actor.lastname1);
            if (indexAct === -1) {
                this.addActor(actor); 
            }
            const indexProd = this.#productions.findIndex(prod => prod.title === production.title);
            if (indexProd === -1) {
                this.addProduction(production); 
            }
            //Crear relacion entre actor y production
            const existeRel = this.#actorProductions.some(rel => rel.actor.name === actor.name &&
                rel.actor.lastname1 === actor.lastname1 && rel.production.title === production.title);
            if (!existeRel) {
                this.#actorProductions.push({ actor: actor, production: production });
            }
            const totalActAsignadas = this.#actorProductions.filter(rel => rel.actor.name === actor.name &&
                rel.actor.lastname1 === actor.lastname1).length;
            return totalActAsignadas;
        }  

        //DESASIGNAR
        deassignDirector(director, production) {
            if (!director) {
                throw new Error("Person es null.")
            }
            if (!production) {
                throw new Error("Production es null.")
            }
            const indexDir = this.#directors.findIndex(dir => dir.name === director.name && dir.lastname1 === director.lastname1);
            const indexProd = this.#productions.findIndex(prod => prod.title === production.title);
            if (indexDir === -1 || indexProd === -1) {
                throw new Error("El director o la producción no existen en el sistema.");
            }

            return this.#directorProductions.filter(rel => rel.director.name === director.name &&
                rel.director.lastname1 === director.lastname1).length;
        }
            
        deassignActor(actor, production) {
            if (!actor) {
                throw new Error("Person es null.")
            }
            if (!production) {
                throw new Error("Production es null.")
            }
            const indexAct = this.#actors.findIndex(act => act.name === actor.name && act.lastname1 === actor.lastname1);
            const indexProd = this.#productions.findIndex(prod => prod.title === production.title);
            if (indexAct === -1 || indexProd === -1) {
                throw new Error("El actor o la producción no existen en el sistema.");
            }

            return this.#actorProductions.filter(rel => rel.actor.name === actor.name &&
                rel.actor.lastname1 === actor.lastname1).length;
        }

        //Metodos cast
        getCast(production) {
            if (!production) {
                throw new Error("Production es null.")
            }
            const cast = this.#actorProductions.filter(rel => rel.production.title === production.title)

            return {
                *[Symbol.iterator]() {
                    for (const rel of cast) {
                        yield {
                            actor: rel.actor,
                            personaje: rel.personaje
                        };
                    }
                }
            };
        }

        //Métodos getProductionsDirector, getProductionsActor y getProductionsCategory
        getProductionsDirector (director) {
            if (!director) {
                throw new Error("Person es null.")
            }
            //Filtrar las relaciones para obtener cuales son las producciones de un director
            const prodsDir = this.#directorProductions.filter(rel => rel.director.name === director.name &&
                rel.director.lastname1 === director.lastname1);
            //Devolver un iterador con las producciones
            return {
                *[Symbol.iterator]() {
                    for (const rel of prodsDir) {
                        yield rel.production;
                    }
                }
            };  
        }

        getProductionsActor (actor) {
            if (!actor) {
                throw new Error("Person es null.")
            }
            //Filtrar las relaciones para obtener cuales son las producciones 
            const prodsAct = this.#actorProductions.filter(rel => rel.actor.name === actor.name &&
                rel.actor.lastname1 === actor.lastname1);
            //Devolver un iterador con las producciones
            return {
                *[Symbol.iterator]() {
                    for (const item of prodsAct) {
                        yield {
                            production: item.production,
                            personaje: item.personaje
                        };
                    }
                }
            };
        }

        getProductionsCategory (category) {
            if (!category) {
                throw new Error("Category es null.")
            }
            //Filtrar las relaciones para obtener cuales son las producciones de una categoria
            const prodsCat = this.#categoryProductions.filter(rel => rel.category.name === category.name);
            //Devolver un iterador con las producciones
            return {
                *[Symbol.iterator]() {
                    for (const item of prodsCat) {
                        yield item.production;
                    }
                }
            };
        }

        //Métodos create
        createPerson(name, lastname1, lastname2, birthDate) {
            let persona = this.#actors.find(act => act.name === name && act.lastname1 === lastname1) || 
            this.#directors.find(dir => dir.name === name && dir.lastname1 === lastname1);

            if (persona) return persona;
            return new Person(name, lastname1, lastname2, birthDate);
        }

        createProduction(title, releaseDate, duration, synopsis) {
            let production = this.#productions.find(prod => prod.title === title);
            if (production) return production;
            return new Production(title, releaseDate, duration, synopsis);  

        }

        createUser(username, email, password) {
            let user = this.#users.find(usu => usu.username === username || usu.email === email);
            if (user) return user;
            return new User(username, email, password);
        }   

        createCategory(name) {
            let category = this.#categories.find(cat => cat.name === name);
            if (category) return category;
            return new Category(name);
    
    }

}

return VideoSystem; 

})();

// Exportar la clase VideoSystem para que se pueda usar
export default VideoSystem;