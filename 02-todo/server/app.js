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
fs = require('fs');

const PORT = process.env.PORT || 5000;
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

app.get('/todo', (req, res) => {
  try {
    fs.readFile('./data.json', (err, data) => {
      res.send(JSON.parse(data));
    });
  } catch (err) {
    console.error(err);
  }
});

app.post('/todo', (req, res) => {
  const task = req.body;
  //fetch current list from file
  fs.readFile('./data.json', (err, data) => {
    //everytning in a try-catch for error handling
    try {
      if (err) {
        res.send({ status: 'error', data: err });
      } else {
        const currentList = JSON.parse(data);

        const updatedTask = { id: currentList.length + 1, ...task };
        const updatedList = [...currentList, updatedTask];

        fs.writeFile('./data.json', JSON.stringify(updatedList), (err) => {
          if (err) {
            res.send({ status: 'error', data: err });
          } else {
            res.send({ status: 'success', data: updatedTask });
          }
        });
      }
    } catch (error) {
      res.send({ status: 'error', data: error });
    }
  });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
