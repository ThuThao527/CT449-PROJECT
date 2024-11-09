const app = require('./app');
const config = require('./app/config/index'); // Import config từ file config/index.js

app.listen(config.app.port, () => {
    console.log(`Server is running on port: ${config.app.port}`);
});
