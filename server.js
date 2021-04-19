const express = require("express");

const { scraper } = require("./scraper");
const { scraperFull } = require("./scraper");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/query", async (req, res) => {
   let { query } = req.body;
   try {
      let snippet = await scraper(query);
      let image = snippet.image || "";
      if (snippet.status === "error") throw snippet.message;
      return res.json({
         status: "ok",
         data: snippet.snippet,
         image,
      });
   } catch (error) {
      return res.status(404).json({ status: "error", data: error, image: "" });
   }
});

app.get("/api/wikisnippet/:query", async (req, res) => {
   let query = req.params.query;
   try {
      let snippet = await scraper(query);
      let image = snippet.image || "";
      if (snippet.status === "error") throw snippet.message;
      return res.json({ status: "ok", data: snippet.snippet, image });
   } catch (error) {
      return res.status(404).json({ status: "error", data: error, image: "" });
   }
});

app.get("/api/wikipage/:query", async (req, res) => {
   let query = req.params.query;
   try {
      let snippet = await scraperFull(query);
      let image = snippet.image || "";
      if (snippet.status === "error") throw snippet.message;
      return res.json({ status: "ok", data: snippet.allParagraphs, image });
   } catch (error) {
      return res.status(404).json({ status: "error", data: error, image: "" });
   }
});

app.get("*", (req, res) => {
   res.status(404).send(
      "<div><div><h1>404</h1></div><div><h3>Not Found</h3></div></div>"
   );
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
