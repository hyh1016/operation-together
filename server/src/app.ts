import express from 'express';
import config from './config';

const app = express();

const PORT = config.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listen http://localhost:${PORT}`);
});
