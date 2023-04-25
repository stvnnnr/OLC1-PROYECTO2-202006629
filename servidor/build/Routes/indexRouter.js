"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../Controllers/indexController");
class IndexRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    ;
    config() {
        this.router.get("/", indexController_1.indexController.prueba);
        this.router.post("/escaneo", indexController_1.indexController.escaneo);
        this.router.get("/ast", indexController_1.indexController.ast);
        this.router.get("/simbolos", indexController_1.indexController.simbolos);
        this.router.get("/errores", indexController_1.indexController.errores);
    }
}
const indexRouter = new IndexRouter();
exports.default = indexRouter.router;
