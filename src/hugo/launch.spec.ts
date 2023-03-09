import { describe, test } from "vitest";
import fs from "fs";
import {JSDOM} from "jsdom"

const result = "";

describe("test", () => {
    test("test", () => {
        const result = fs.readFileSync(__dirname + "/temp.html");

        const document = (new JSDOM(result)).window.document;

        const department = document.querySelector("select[name=departement] [selected=selected]").innerHTML.trim();
        const city = document.querySelector("select[name=communeDepartement] [selected=selected]").innerHTML.trim();
        const network = document.querySelector("select[name=reseau] [selected=selected]").innerHTML.trim();


        const target = document.querySelector("form[name=rechercherResultatQualiteForm] p:nth-of-type(4) > span").innerHTML
            .split("\n")
            .map((element)=>element.trim().substring(2).replace("<br>", ""))
            .filter((element)=>!!element)

        console.log({
            department,
            city,
            network,
            target
        });
    });
});
