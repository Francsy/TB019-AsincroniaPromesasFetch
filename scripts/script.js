// 1. Quiero un perrito, pero no se qué raza escoger, ¿me ayudas?
// En este ejercicio utilizaremos la API de https://dog.ceo/dog-api/. Leyendo su documentación, deberás hacer lo siguiente:

// Imprimir por consola la lista de razas de todos los perros.
// Imprimir por consola una imagen random de una raza.
// Imprimir por consola todas las imágenes de una raza concreta.
// ¿Y si ahora te pidieramos que podamos poner otra raza en la url para que nos busque otras imágenes? Adapta las urls que ya tenías para que puedas pasarle argumentos.

// Recuerda que para estos ejercicios deberás utilizar fetch. Al haber conseguido que se imprima por consola, el siguiente paso será que se muestren en pantalla con las herramientas que nos ofrece el arbol DOM.


fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(razas => console.log(razas.message))



fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then(razaRandom => console.log(razaRandom.message))

fetch('https://dog.ceo/api/breed/akita/images')
    .then(res => res.json())
    .then(imagesRaza => console.log(imagesRaza.message))



function dogBreedBrowser() {
    const raza = prompt("Elige tu raza favorita");
    return fetch(`https://dog.ceo/api/breed/${raza}/images`)
        .then(res => res.json())
        .then(raza => console.log(raza.message))
}

/* NOTA !!! >

function dogBreedBrowser3(){
    const raza = prompt("Elige tu raza favorita");
    return fetch("https://dog.ceo/api/breed/" + raza + "/images")
                .then(res=>res.json())
                .then(json=>console.log(json.message))
}

*/


/* 2. ¿Quieres saber mi información? Aquí la tienes.
Para este ejercicio vamos a utilizar la API de usuarios de GitHub, la cual tiene esta URL: {username}. {username} es el nombre del usuario en GitHub, por lo que si quieres buscar a cualquier usuario, solo tienes que ponerlo en la url. Por ejemplo, https://api.github.com/users/Guille-Rubio. Si ponéis esta URL en una nueva pestaña del navegador podréis observar qué datos nos devuelve el API.

Lo primero que haremos será crear un input de tipo texto y un botón para buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después crearemos una función que se ejecute cuando se pulse el botón buscar y que contenga una petición a la API para obtener información de ese usuario y así mostrarla en nuestra página:

Lo que queremos que se imprima por consola será:

> nombre
> numero de repositorios
> avatar (imagen)
Si ya has obtenido toda la informacion, utiliza las herramientas del arbol DOM para que esta informacion aparezca en la pantalla. */

document.querySelector("#busqueda").addEventListener("submit", function (event) {
    event.preventDefault()
    fetch(`https://api.github.com/users/${event.target.datos.value}`)
        .then(result => result.json())
        .then(user => {
            if (user.public_repos != undefined) {
                let divCard = document.querySelector("#card");
                divCard.style.display = "block";
                let cardInformation = document.createElement("p");
                divCard.appendChild(cardInformation);
                // const {a = "No tiene nombre"} = {json.name};
                cardInformation.innerHTML = `Nombre: ${user.name}<br><br>Nº repositorios: ${user.public_repos}<br><img src="${user.avatar_url}"></img>`;
            } else {
                alert("Lo siento, este usuario no existe");
            }
        }
        )
})

/*3. Promesas, promesas y más promesas.
Dada una lista de usuarios de github guardada en una array, utiliza 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.

> Objetivo: Usar Promise.all()
> Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
> Pregunta. ¿cuántas promesas tendremos?
Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

Pasos:

Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
Cuando Promise.all() haya terminado:
Consigue que se imprima por consola la url del repositorio de cada usuario.
Consigue que se imprima por consola el nombre de cada usuario.*/


const listaDeUsuarios = ["TheBridge-FullStackDeveloper", "Guille-Rubio", "francsy"];

let requestNames = listaDeUsuarios.map(usuario => {
    return fetch(`https://api.github.com/users/${usuario}`)
    .then(res => res.json())
    .then(user => user.name)
})

Promise.all(requestNames)
    .then(names => {
        console.log(names);
});


let requestUrl = listaDeUsuarios.map(usuario => {
    return fetch(`https://api.github.com/users/${usuario}`)
    .then(res => res.json())
    .then(user => user.url)
})

Promise.all(requestUrl)
    .then(repos => {
        console.log(repos);
});
    
    
    
