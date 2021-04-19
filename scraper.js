const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");
const path = require("path");

async function wikiSnippets(searchTerm) {
   let query = searchTerm.replace(/ /g, "+").trim();

   let request = await fetch(
      `https://en.wikipedia.org/w/index.php?search=${query}&title=Special%3ASearch&go=Go&ns0=1`
   );
   let html = await request.text();
   let { document } = new JSDOM(html).window;

   let paragraphs = document.querySelectorAll("p");
   let snippet;

   for (let i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].textContent.length > 200) {
         snippet = paragraphs[i].textContent;
         break;
      }
   }

   let images = document.querySelectorAll("img");
   let image;

   for (let i = 0; i < images.length; i++) {
      let url = images[i].src;
      let ext = path.extname(url);
      if (ext === ".jpg" || ext === ".jpeg") {
         image = url;
         break;
      }
   }

   if (!snippet)
      return { status: "error", message: "Refine Search", image: "" };

   return { status: "ok", snippet, image };
}

async function wikiPage(searchTerm) {
   let query = searchTerm.replace(/ /g, "+").trim();
   let request = await fetch(
      `https://en.wikipedia.org/w/index.php?search=${query}&title=Special%3ASearch&go=Go&ns0=1`
   );
   let html = await request.text();
   let { document } = new JSDOM(html).window;

   let paragraphs = document.querySelectorAll("p");

   let firstParaIndex = 0;

   for (let i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].textContent.length > 200) {
         firstParaIndex = i;
         break;
      }
   }

   let parsedNodeList = Array.from(paragraphs);

   let allParagraphNodes = parsedNodeList.slice(firstParaIndex);
   let allParagraphs = allParagraphNodes.map(node => node.textContent);

   let images = document.querySelectorAll("img");
   let image;

   for (let i = 0; i < images.length; i++) {
      let url = images[i].src;
      let ext = path.extname(url);
      if (ext === ".jpg" || ext === ".jpeg") {
         image = url;
         break;
      }
   }

   if (!allParagraphs.length > 0)
      return { status: "error", message: "Refine Search", image: "" };

   return { status: "ok", allParagraphs, image };
}

module.exports = { scraper: wikiSnippets, scraperFull: wikiPage };
