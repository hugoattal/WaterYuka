const jsdom = require("jsdom");

//Retournes le code html de la page
function getHtmlFromUrl(url: string): Promise<string> {
    return fetch(url).then((response) => response.text());
}


//A partir de l'html de la page https://sante.gouv.fr/sante-et-environnement/eaux/eau en entrée, retourne un dictionnaire avec les id des régions et leur nom
function getRegionsIDfromHTML(html: string): any {

    let doc = new jsdom.JSDOM(html).window.document;
    let map = doc.querySelector("map") as HTMLMapElement;
    let areas = map.querySelectorAll("area");
    let dict: any = {};
    areas.forEach((area) => {
            dict[parseInt(area.getAttribute("href")?.slice(-2) as string)] = aOrReseaurea.getAttribute("title");
    });

    return dict;
}

//A partir de l'html de la page https://orobnat.sante.gouv.fr/orobnat/afficherPage.do?methode=menu&usd=AEP&idRegion=IDREGION en entrée, retourne un dictionnaire avec les id des départements et leur nom
function getDepartementOrCommuneOrReseau(html: string, entity: string): any {

    if (entity == "commune") {
        entity = "communeDepartement";
    } else if (entity == "departement") {
        entity = "departement";
    } else if (entity == "reseau") {
        entity = "reseau";
    } else {
        throw new Error("entity must be 'departement' or 'commune' or 'reseau'");
    }

    let str: string = "select[name='" + entity + "']"
    let doc = new jsdom.JSDOM(html).window.document;
    let select = doc.querySelector(str) as HTMLSelectElement;
    let options = select.querySelectorAll("option");
    let dict: any = {};
    options.forEach((option) => {
        dict[parseFloat(option.getAttribute("value") as string)] = option.textContent;
    });
    return dict;
}

function getDepartementsIDofARegionfromHTML(html: string, ): any {
    return getDepartementOrCommuneOrReseau(html, "departement");
}

function getCommunesIDofADepartementfromHTML(html: string): any {
    return getDepartementOrCommuneOrReseau(html, "commune");
}

async function main() {
    /* let entry_link: string = "https://sante.gouv.fr/sante-et-environnement/eaux/eau";
    let html = await getHtmlFromUrlFromHTML(entry_link);
    let answer = getRegionsID(html);
    console.log("Answer : ");
    console.log(answer); */
    let id: string = "11";
    let entry_link: string = "https://orobnat.sante.gouv.fr/orobnat/afficherPage.do?methode=menu&usd=AEP&idRegion=" + id;
    let html = await getHtmlFromUrl(entry_link);
    let answer: any = getDepartementOrCommuneOrReseau(html, "reseau");
    console.log("Answer : ");
    console.log(answer);
}

main().catch(err => console.log(err));