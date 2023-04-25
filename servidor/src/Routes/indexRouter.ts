import { Router } from "express";
import { indexController } from "../Controllers/indexController";

class IndexRouter {
    public router: Router= Router();;
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", indexController.prueba);
        this.router.post("/escaneo", indexController.escaneo);
        this.router.get("/ast", indexController.ast);
        this.router.get("/simbolos", indexController.simbolos);
        this.router.get("/errores", indexController.errores);
    }
}

const indexRouter=new IndexRouter();
export default indexRouter.router;