/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { readFileSync, writeFileSync } from "fs";
import { createServer } from "http";
import { GlobalStateStore } from "./src/store";

writeFileSync("./store.json", JSON.stringify(new GlobalStateStore()));

/** The server for sync */
const server = createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === "GET") {
        res.write(readFileSync("./store.json"));
    } else if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk: Buffer) => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on("end", () => {
            console.log(body);

            writeFileSync("./store.json", body);
        });
    } else {
        res.write("INVALID OP");
    }
    res.end();
});

server.listen(6969);
console.log("Server started on port 6969");