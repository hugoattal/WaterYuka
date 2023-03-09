import axios from "axios";

export async function fetchCities() {

    const cookieRequest = await axios({
        url: "https://orobnat.sante.gouv.fr/orobnat/afficherPage.do?methode=menu&usd=AEP&idRegion=11"
    });

    const cookies = cookieRequest.headers["set-cookie"];

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
                Cookie: cookies?.join(";")
            }
        }
    );

    //const result = await searchRequest.text();


    //console.log(result);
}

/*
methode=rechercher
idRegion=11
usd=AEP
posPLV=0
departement=091
communeDepartement=91001
reseau=091000569_091

methode=rechercher
idRegion=11
usd=AEP
posPLV=1
departement=091
communeDepartement=91001
reseau=091000569_091



 */




