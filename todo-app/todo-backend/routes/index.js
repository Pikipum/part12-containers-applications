const express = require('express');
const redis = require('../redis')
const router = express.Router();
const { setAsync, getAsync } = require("../redis");

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get("/statistics", async (req, res) => {
  const added = await getAsync("added_todos");
  res.send({ added_todos: parseInt(added || "0", 10) });
});

module.exports = router;
