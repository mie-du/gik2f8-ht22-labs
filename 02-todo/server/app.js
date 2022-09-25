/* Setup:
 * NPM
 * Nodemon
 * Vänja oss vid terminal som output.
 */
/* npm init */
/* nodemon */

/* 1. Skriva till output */

/* 2. Skriva till fil */

/* 3. Express */
const express = require('express');

const path = require('path');
const app = express();

//globalt i node.
const fs = require('fs/promises');

const PORT = process.env.PORT || 5000;
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

app.get('/todo', async (req, res) => {
  /* Always assume that data.json exists */
  /* Promise based read file */
  try {
    let data = await fs.readFile('./data.json');

    if (data.length === 0) {
      await fs.writeFile('data.json', '[]');
      data = await fs.readFile('./data.json');
    }
    res.send({ status: 'success', data: JSON.parse(data) });
  } catch (error) {
    res.send({ status: 'error', data: { message: error.message, stack: error.stack } });
  }
});

app.post('/todo', async (req, res) => {
  try {
    const data = await fs.readFile('./data.json');
    const currentList = JSON.parse(data);
    const task = { id: currentList.length + 1, ...req.body };

    await fs.writeFile('./data.json', JSON.stringify([...currentList, task]));
    res.send({ status: 'success', data: task });
  } catch (error) {
    res.send({ status: 'error', data: { message: error.message, stack: error.stack } });
  }
});

app.put('/todo', (req, res) => {
  const task = req.body;
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
