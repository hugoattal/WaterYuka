import * as mongoose from "mongoose";
import { fetchCities, initCookies } from "@/hugo/cities";
import fs from "fs";

async function main() {
    //await mongoose.connect("mongodb://127.0.0.1:27017/wateryuka");

    await initCookies();
    const result = await fetchCities();
    fs.writeFileSync(__dirname + "/temp.html", result);
}

main().catch(err => console.log(err));
