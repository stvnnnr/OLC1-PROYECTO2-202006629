import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRouter from './Routes/indexRouter';
import body_parser from 'body-parser';

class servidor {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        
    }

    config(): void {
        this.app.set('port', process.env.PORT || 4000);
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb' }));
        this.app.use(cors());
        this.app.use(body_parser.urlencoded({ extended: true }))
    }

    routes(): void {
        this.app.use("/",indexRouter)
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server On Port ', this.app.get('port'))
        });
    }
}

export const servidorr =new servidor();
servidorr.start();