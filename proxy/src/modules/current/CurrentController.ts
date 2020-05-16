import * as express from 'express';
import axios from 'axios';
import Controller from '../../common/interfaces/Controller';
import { URLS } from '../../common/consts/targetUrls';

class NewsController implements Controller {
  public router = express.Router();

  public path = '/current';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const path = `${this.path}`;

    this.router.get(path, this.fetchNews);
  }

  private fetchNews = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      axios.get(URLS.CURRENT)
                .then((data) => {
                  return response.status(200).send(data.data)
                })
                .catch(err => response.send(err));
    } catch (err) {
      console.error('GG', err);
    }
  };
}

export default NewsController;
