const axios = require("axios");

exports.getNews = async (req, res, next) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) return res.status(500).json({ message: "NEWS_API_KEY is missing in .env" });

    const query = req.query.query || "gaming";
    const page = Number(req.query.page || 1);
    const pageSize = Math.min(Number(req.query.pageSize || 10), 20);

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        language: "en",
        sortBy: "publishedAt",
        page,
        pageSize,
        apiKey
      }
    });

    const data = response.data;

    res.json({
      query,
      page,
      pageSize,
      totalResults: data.totalResults,
      articles: (data.articles || []).map(a => ({
        title: a.title,
        source: a.source?.name,
        author: a.author,
        publishedAt: a.publishedAt,
        url: a.url,
        imageUrl: a.urlToImage,
        description: a.description
      }))
    });
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        message: err.response.data?.message || "External API error"
      });
    }
    next(err);
  }
};
