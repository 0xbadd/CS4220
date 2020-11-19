const express = require("express");
const router = express.Router();

const dndspells = require("dnd-spells");

// localhost:8888/api/search
router.post("/search", async (req, res) => {
  const { query } = req.body;

  try {
    const searchResponse = await dndspells.search(query);

    res.json(searchResponse);
  } catch (err) {
    res.json({ err });
  }
});

// localhost:8888/api/fetch
router.post("/fetch", async (req, res) => {
  const { query } = req.body;

  try {
    const fetchResponse = await dndspells.fetch(query);

    res.json(fetchResponse);
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;
