import 'dotenv/config';
import App from './App';

import NewsController from './src/modules/news/NewsController';
import HistoricalController from './src/modules/historical/HistoricalController';
import CurrentController from './src/modules/current/CurrentController';

const controllersCollection = [
  new NewsController(),
  new HistoricalController(),
  new CurrentController(),
];

const app = new App(controllersCollection);

app.listen();
