// Import app
import app from "./app.js";

//Port Inisilize
const PORT = process.env.PORT || 8080;

// Server listning
app.listen(PORT, () => {
    console.log(`BattelLink is listning on port ${PORT}`)
});