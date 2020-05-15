import 'dotenv/config';
import App from './App';

import NewsController from './src/modules/news/NewsController';

const controllersCollection = [
  new NewsController(),
];

const app = new App(controllersCollection);

app.listen();
