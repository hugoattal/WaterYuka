import axios from "axios";

let cookiesHeaders = "";

export async function initCookies() {
    const cookieRequest = await axios({
        url: "https://orobnat.sante.gouv.fr/orobnat/afficherPage.do?methode=menu&usd=AEP&idRegion=11"
    });

    const cookies = cookieRequest.headers["set-cookie"];
    cookiesHeaders = cookies?.map((cookies) => cookies.split(";")[0]).join("; ");
}

export async function fetchCities() {
    const searchRequest = await axios(
        {
            url: "https://orobnat.sante.gouv.fr/orobnat/rechercherResultatQualite.do",
            method: "POST",
            data: {
                methode: "rechercher",
                idRegion: 11,
                usd: "AEP",
                posPLV: 0,
                departement: "091",
                communeDepartement: 91001,
                reseau: "091000569_091"
            },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "fr,en-US;q=0.7,en;q=0.3",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                Cookie: cookiesHeaders
            },
            withCredentials: true
        }
    );

    const result = await searchRequest.data;
    console.log(result);
}
