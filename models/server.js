const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
    constructor() {
        // routes path
        this.user_path = '/api/users';

        //Express instance
        this.app = express();

        //Port
        this.port = process.env.PORT;

        //Connect to database
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Read and parse body
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.user_path, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;