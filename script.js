#!/usr/bin/env node

import axios from "axios";
import * as cheerio from "cheerio";
import chalk from "chalk";
import wrapAnsi from "wrap-ansi";

const AXIOS_CFG = { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 8000 };

async function searchMetaTUI(keyword, max = 10, mode = "chalk") {
    const { data } = await axios.get(`https://duckduckgo.com/html/?q=${encodeURIComponent(keyword)}`, AXIOS_CFG);

    if (!data) {
        console.log("Error: Could not get results from duck duck go.");
        process.exit(1);
    }

    const $ = cheerio.load(data);
    const results = [];

    $(".result").each((_, el) => {
        const title = $(el).find(".result__a").text().trim();
        const rawHref = $(el).find(".result__a").attr("href");

        let url = null;
        if (rawHref?.includes("uddg=")) {
            const u = new URL("https:" + rawHref);
            url = decodeURIComponent(u.searchParams.get("uddg"));
        }

        const description = $(el).find(".result__snippet").text().trim();

        if (title && url) {
            results.push({ title, url, description });
        }
    });

    const terminalWidth = process.stdout.columns || 80;
    const paddingLeft = 4;
    const paddingRight = 4;

    function padAndWrap(text) {
        const innerWidth = terminalWidth - paddingLeft - paddingRight;
        const wrapped = wrapAnsi(text, innerWidth, { hard: true });
        const pad = " ".repeat(paddingLeft);
        return wrapped.split("\n").map(line => pad + line + " ".repeat(paddingRight)).join("\n");
    }

    const slicedResults = results.slice(0, max);

    if (mode === "json") {
        console.log(JSON.stringify(slicedResults, null, 2));
        return;
    }

    console.log("\n");

    slicedResults.forEach((r, i) => {
        if (mode === "text") {
            console.log(`${r.title}\n${r.url}\n${r.description}\n`);
        } else {
            const mainTitle = `${chalk.green.bold((i + 1).toString().padStart(2, "0"))}. ${chalk.yellow.bold(r.title)} [${chalk.blue.bold(r.url)}]`;
            console.log(padAndWrap(mainTitle));
            console.log(padAndWrap(r.description));
            console.log("\n");
        }
    });
}

const args = process.argv.slice(2);

// Determine mode
const mode = args.includes("-j") && args.includes("-t") ? null : args.includes("-j") ? "json" : args.includes("-t") ? "text" : "chalk";

if (mode === null) {
    console.log("Error: -j and -t cannot be used together.");
    process.exit(1);
}

// Determine number of results with -r flag
let maxResults = 10;
const rIndex = args.indexOf("-r");
if (rIndex !== -1 && args[rIndex + 1] && !isNaN(args[rIndex + 1])) {
    maxResults = parseInt(args[rIndex + 1], 10);
}

if (rIndex !== -1 && (maxResults < 1 || maxResults > 10)) {
    console.log("Error: -r must be between 1 and 10.");
    process.exit(1);
}

// Combine all other args as keyword
const keyword = args.filter((arg, i) => !arg.startsWith("-") && (rIndex === -1 || i !== rIndex + 1)).join(" ");

if (!keyword) {
    console.log("Usage: node script.js <search keyword> [-j|-t] [-r number]");
    process.exit(1);
}

searchMetaTUI(keyword, maxResults, mode);