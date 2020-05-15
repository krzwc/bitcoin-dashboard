import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import Controller from './src/common/interfaces/Controller';
import errorMiddleware from './src/common/middleware/errorMiddleware';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  }

  public listen() {
    const port = process.env.PORT || 8082;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
    this.app.use(cors());
  }

  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
