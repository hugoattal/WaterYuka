import * as mongoose from "mongoose";
import { fetchCities, initCookies } from "@/hugo/cities";

async function main() {
    //await mongoose.connect("mongodb://127.0.0.1:27017/wateryuka");

    await initCookies();
    await fetchCities();
}

main().catch(err => console.log(err));
