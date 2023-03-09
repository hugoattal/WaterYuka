const jsdom = require("jsdom");

//Retournes le code html de la page
function getHtmlFromUrl(url: string): Promise<string> {
    return fetch(url).then((response) => response.text());
}

//Dans la balise map d'un code html, retourns les liens des départements

//PAS FINI
function getRegionID(html: string): any {

    let doc = new jsdom.JSDOM(html).window.document;
    let map = doc.querySelector("map") as HTMLMapElement;
    let areas = map.querySelectorAll("area");
    let dict: any = {};
    areas.forEach((area) => {
            dict[parseInt(area.getAttribute("href")?.slice(-2) as string)] = area.getAttribute("title");
    });

    return dict;
}

async function main() {
    let entry_link: string = "https://sante.gouv.fr/sante-et-environnement/eaux/eau";
    let html = await getHtmlFromUrl(entry_link);
    let answer = getRegionID(html);
    console.log("Answer : ");
    console.log(answer);
}

main().catch(err => console.log(err));