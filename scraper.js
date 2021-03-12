const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

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
  if (!snippet) return { status: "error", message: "Refine Search" };
  console.log(snippet);
  return { status: "ok", snippet };
}

module.exports = wikiSnippets;
