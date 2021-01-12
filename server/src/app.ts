import express from 'express';

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listen http://localhost:${PORT}`);
});
