const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");
const path = require("path");

async function wikiSnippets(searchTerm) {
  let query = searchTerm.replace(/ /g, "+").trim();
  console.log(query);
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

  if (!snippet) return { status: "error", message: "Refine Search", image: "" };

  return { status: "ok", snippet, image };
}

module.exports = wikiSnippets;
