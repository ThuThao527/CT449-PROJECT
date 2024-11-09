const config = {
    app: {
        port : process.env.PORT || 5000,
    },
    db: {
        url: process.env.DATABASE_URL || "mongodb://localhost:27017/book-lending"
    }
};

module.exports = config;