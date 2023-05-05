"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const consts_1 = require("./consts");
const middlewares_1 = require("./middlewares");
const connection_1 = require("./models/connection");
const routes_1 = require("./routes");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const utils_1 = require("./utils");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.docs();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.set('port', consts_1.consts.port);
        (0, connection_1.conexion)();
    }
    docs() {
        const swaggerDocs = (0, swagger_jsdoc_1.default)(utils_1.swaggerOptions);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    }
    routes() {
        this.app.use(routes_1.router);
        this.app.use(middlewares_1.errorHandler);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`🚀 Server listening on http://localhost:${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();
