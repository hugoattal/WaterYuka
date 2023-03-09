import { describe, test } from "vitest";
import fs from "fs";
import { JSDOM } from "jsdom";

const result = "";

describe("test", () => {
    test("test", () => {
        const result = fs.readFileSync(__dirname + "/temp.html");

        const document = (new JSDOM(result)).window.document;

        const department = document.querySelector("select[name=departement] [selected=selected]").textContent.trim();
        const city = document.querySelector("select[name=communeDepartement] [selected=selected]").textContent.trim();
        const network = document.querySelector("select[name=reseau] [selected=selected]").textContent.trim();


        const target = document.querySelector("form[name=rechercherResultatQualiteForm] p:nth-of-type(4) > span").textContent
            .split("\n")
            .map((element) => element.trim().substring(2).replace("<br>", ""))
            .filter((element) => !!element);

        const conformity = [...document.querySelector(".block-content:nth-of-type(4) table").querySelectorAll("tr")].map((line) => ({
            key: line.querySelector("th").textContent,
            value: line.querySelector("td").textContent
        }));

        const results = [...document.querySelector(".block-content:nth-of-type(5) table").querySelectorAll("tr")].map((line) => ({
            key: line.querySelector("th")?.textContent,
            value: line.querySelector("td")?.textContent.replaceAll("\t", "").replaceAll("\n", "")
        })).filter((line)=>!!line.key);

        const analysis = [...document.querySelector(".block-content:nth-of-type(6) table").querySelectorAll("tr")].map((line) => ({
            key: line.querySelector("td:nth-of-type(1)")?.textContent,
            value: line.querySelector("td:nth-of-type(2)")?.textContent,
            limit: line.querySelector("td:nth-of-type(3)")?.textContent,
            ref: line.querySelector("td:nth-of-type(4)")?.textContent
        })).filter((line)=>!!line.key);

        const data = {
            department,
            city,
            network,
            target,
            info: {
                conformity,
                results,
                analysis
            }
        }

        console.log(JSON.stringify(data, null, 2));
    });
});
