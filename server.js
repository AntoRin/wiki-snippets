const express = require("express");

const scraper = require("./scraper");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/query", async (req, res) => {
  let { query } = req.body;
  console.log(query);
  try {
    let snippet = await scraper(query);
    if (snippet.status === "error") throw snippet.message;
    return res.json({ status: "ok", data: snippet.snippet });
  } catch (error) {
    return res.status(404).json({ status: "error", data: error });
  }
});

app.get("/api/wikisnippet/:query", async (req, res) => {
  let query = req.params.query;
  console.log(query);
  try {
    let snippet = await scraper(query);
    if (snippet.status === "error") throw snippet.message;
    return res.json({ status: "ok", data: snippet.snippet });
  } catch (error) {
    return res.status(404).json({ status: "error", data: error });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
