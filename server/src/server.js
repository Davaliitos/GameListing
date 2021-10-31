const express = require('express')

const PORT = process.env.PORT || 8000;

async function startServer(){

    const app = express();

    //CORS Should be restricted
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
    
    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })
}

startServer();