//TESTS PARA LA CLASE VIDEOSYSTEM - TAREA UT04 - OBJETOS LISTAS
import VideoSystem from "./VideoSystem.js";

function testVideoSystem() {
    console.log("------------------ TESTS DE VIDEOSYSTEM ----------------");

    try {
        // PRUEBA DE SINGLETON
        console.log("- Prueba de Singleton:");
        const vs = new VideoSystem("Tarea 4");
        console.log("Sistema creado: " + vs.name);
        const vs2 = new VideoSystem("Otro Sistema");
        console.log("Intento de crear otro sistema: " + vs2.name);
        console.log("¿Mismo sistema? " + (vs === vs2));

        // PRUEBA DE CATEGORÍAS
        console.log("- Pruebas de categorías:");
        const crearCat = vs.createCategory("Aventura");
        vs.addCategory(crearCat);
        console.log("Categoría nueva añadida: " + crearCat.name);
        // Añadir categoría duplicada
        try {
            vs.addCategory(crearCat);
        } catch (e) {
            console.log("Error al añadir categoría duplicada: " + e.message);
        }

        // PRUEBA DE PRODUCCIONES
        console.log("- Pruebas de producciones:");
        const peli1 = vs.createProduction("Avatar", new Date(2009, 11, 18), 120, "Sinopsis de Avatar");
        vs.addProduction(peli1);
        console.log("Producción añadida: " + peli1.title);
        // Añadir producción duplicada
        try {
            vs.addProduction(peli1);
        } catch (e) {
            console.log("Error al añadir producción duplicada: " + e.message);
        }

        // PRUEBA DE PERSONAS (ACTORES Y DIRECTORES)
        console.log("- Pruebas de personas (actores y directores):");
        const actor1 = vs.createPerson("Sam", "Worthington", "W.", new Date(1976, 8, 2));
        const director1 = vs.createPerson("James", "Cameron", "C.", new Date(1954, 8, 16));
        
        vs.addActor(actor1);
        vs.addDirector(director1);
        console.log("Actor (" + actor1.name + ") y Director (" + director1.name + ") registrados correctamente.");

        // PRUEBA DE ASIGNACIONES
        console.log("- Pruebas de asignaciones:");

        //Asignar categoría a produccion
        vs.assignCategory(peli1, crearCat);
        
        //Asignar director y actor a produccion
        vs.assignDirector(director1, peli1);
        vs.assignActor(actor1, peli1);
        console.log("Categoría '" + crearCat.name + "' asignada a producción '" + peli1.title + "'.");
        console.log("Director '" + director1.name + "' asignado a producción '" + peli1.title + "'.");
        console.log("Actor '" + actor1.name + "' asignado a producción '" + peli1.title + "'.");

        // CONSULTAS E ITERADORES
        console.log("- Consulta datos:");
        const cast = [...vs.getCast(peli1)];
        console.log("Actores en " + peli1.title + ": " + cast.length);

        // Obtener producciones de un actor
        const actorProds = [...vs.getProductionsActor(actor1)];
        console.log("Producciones del actor " + actor1.name + ": " + actorProds.length);
        
        // Obtener producciones de un director
        const directorsProds = [...vs.getProductionsDirector(director1)];
        console.log("Producciones del director " + director1.name + ": " + directorsProds.length);

        // ELIMINACIONES
        console.log("- Pruebas de eliminaciones:");
        vs.removeProduction(peli1);
        console.log("Producción '" + peli1.title + "' eliminada.");
        
        const prodsActor = [...vs.getProductionsActor(actor1)].length;
        console.log("Relaciones del actor tras borrar peli: " + prodsActor);
        const prodsDirector = [...vs.getProductionsDirector(director1)].length;
        console.log("Relaciones del director tras borrar peli: " + prodsDirector);

        //Eliminar director
        vs.removeDirector(director1);
        console.log("Director '" + director1.name + "' eliminado.");

        // Eliminar actor
        vs.removeActor(actor1);
        console.log("Actor '" + actor1.name + "' eliminado.");

        // Buscar actor eliminado
        try {
            vs.removeActor(actor1);
        } catch (e) {
            console.log("Error al eliminar actor ya eliminado: " + e.message);
        }

        // Eliminar director eliminado
        try {
            vs.removeDirector(director1);
        } catch (e) {
            console.log("Error al eliminar director ya eliminado: " + e.message);
        }
        // Buscar produccion eliminada
        try {
            vs.removeProduction(peli1);
        } catch (e) {
            console.log("Error al eliminar producción ya eliminada: " + e.message);
        }

        // Eliminar categoría
        vs.removeCategory(crearCat);
        console.log("Categoría '" + crearCat.name + "' eliminada.");

        // Buscar categoria eliminada
        try {
            vs.removeCategory(crearCat);
        } catch (e) {
            console.log("Error al eliminar categoría ya eliminada: " + e.message);
        }

    } catch (error) {
        console.error("--- ERROR EN EL TEST ---");
    }
}

// Ejecución automática
testVideoSystem();