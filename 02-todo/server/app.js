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
const app = express();

//globalt i node.
const fs = require('fs/promises');

const PORT = process.env.PORT || 5000;
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    console.log(req.params, req.body, req.method);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    next();
  });

app.get('/task', async (req, res) => {
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

app.post('/task', async (req, res) => {
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

app.patch('/task', async (req, res) => {
  try {
    const updatedData = req.body;
    const data = await fs.readFile('./data.json');
    const currentList = JSON.parse(data);
    const updatedList = currentList.map((task) =>
      task.id == updatedData.id ? { ...task, completed: updatedData.completed } : task
    );
    await fs.writeFile('./data.json', JSON.stringify(updatedList));
    res.send({ status: 'success', data: { message: 'Item updated' } });
  } catch (error) {
    res.send({ status: 'error', data: { message: error.message, stack: error.stack } });
  }
});

app.delete('/task/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile('./data.json');
    const currentList = JSON.parse(data);
    if (data.length > 0) {
      await fs.writeFile(
        './data.json',
        currentList.filter((task) => task.id != id)
      );
      res.send({ status: 'success', data: { message: 'Item deleted' } });
    } else {
      res.send({ status: 'error', data: { message: 'No post to delete' } });
    }
  } catch (error) {
    res.send({ status: 'error', data: { message: error.message, stack: error.stack } });
  }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
