const router = require("express").Router();
const { getNews } = require("../controllers/newsController");

// PUBLIC
router.get("/", getNews);

module.exports = router;
