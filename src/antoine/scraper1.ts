let entry_link: string = "https://sante.gouv.fr/sante-et-environnement/eaux/eau";

//Retournes le code html de la page
function getHtmlFromUrl(url: string): Promise<string> {
    return fetch(url).then((response) => response.text());
}

//Dans la balise map d'un code html, retourns les liens des départements

//PAS FINI
function getDepartementsLinks(html: string): string[] {
    let links: string[] = [];
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    let map = doc.querySelector("map") as HTMLMapElement;
    let areas = map.querySelectorAll("area");
    areas.forEach((area) => {
        links.push(area.getAttribute("href"));
    });
    return links;
}

