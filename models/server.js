const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        // routes path
        this.user_path = '/api/users';

        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
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