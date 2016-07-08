var databaseUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/mac-lipsticks-scraper";

module.exports = {
  database: databaseUrl
};
