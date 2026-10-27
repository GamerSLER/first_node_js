import promptSync from 'prompt-sync';

const prompt = promptSync();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function main() {
    const num = prompt("Introduce numero de personaje (max: 826): ");
    if (isNaN(num)) {
        console.log("[ERROR] (Not a number)");
    } else if (num < 1 || num > 826) {
        console.log("[ERROR] (Debe ser entre 1 y 826)");
    } else {
        const responseC = await fetch('https://rickandmortyapi.com/api/character/' + num);
        const character = await responseC.json();
        let episodio_random = character["episode"][getRandomInt(character["episode"].length)];
        const episode = await (await fetch(episodio_random)).json();
        let nombre = character["name"];
        let episode_name = episode["name"];
        let episode_date = episode["air_date"];

        console.log("------------ DATOS DE PERSONAJE ------------");
        console.log("Personaje: " + nombre);
        console.log("Episodio aleatorio: " + episodio_random);

        console.log("\n \n");

        console.log("------------ DATOS DE EPISODIO ------------");
        console.log("Nombre de episodio aleatorio: " + episode_name);
        console.log("Fecha de estreno: " + episode_date);
    }
}

main().catch(console.error);
