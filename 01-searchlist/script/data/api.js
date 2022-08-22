const url = 'https://gik2f8-labs.herokuapp.com/books';

function getAllJSON() {
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return result;
}

function getById(id) {
  const result = fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return result;
}
