const url = 'http://localhost:5000/todo';

function getAll() {
  //first response returns data stream, needs to be converted to json.
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return result;
}

function create(data) {
  const JSONData = JSON.stringify(data);
  console.log(JSONData);
  return (result = fetch(url, {
    method: 'POST',
    body: JSONData,
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((result) => result.json())
    .then((data) => data));
}

function setCompleted(id, completed) {
  const JSONData = JSON.stringify({ id, completed });

  fetch(url, {
    method: 'PATCH',
    body: JSONData,
    headers: {
      'content-type': 'application/json'
    }
  });
}
