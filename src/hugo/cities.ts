
const url = "https://orobnat.sante.gouv.fr/orobnat/rechercherResultatQualite.do";

export async function fetchCities() {
    const response = await fetch(url, {
        method: "post",
        body: JSON.stringify({
            methode:"rechercher",
            idRegion:11,
            usd:"AEP",
            posPLV:0,
            departement:"091",
            communeDepartement:91001,
            reseau:"091000569_091"
        })
    })

    const result = await response.text();

    console.log(result);
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
