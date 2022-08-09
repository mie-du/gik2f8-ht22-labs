/* Lektion 3 */
const url = 'https://gik2f8-labs.herokuapp.com/books';
/* const url = 'http://localhost:5000/books'; */

//Get All, converted to JSON for cleanest possible result to work with
function getAllJSON() {
  //first response returns data stream, needs to be converted to json.
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return result;
}

function getById(id) {
  //first response returns data stream, needs to be converted to json.
  const result = fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return result;
}
