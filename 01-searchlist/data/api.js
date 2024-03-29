const url = 'https://gik2f8-labs.herokuapp.com/books';

/* async function getAllJSONAsync() {
  const result = await fetch(url);
  return result.json();
} */

function getAllJSON() {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => console.log(e));
}

function getById(id) {
  return (result = fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => console.log(e)));
}
