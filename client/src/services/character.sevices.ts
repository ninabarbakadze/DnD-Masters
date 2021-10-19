const headers = new Headers({ 'Content-Type': 'application/json' });
const host = 'http://localhost:3002/';

// @ts-ignore
const saveCharacter = (username, character) => {
  fetch(`${host}/${username}/character/new`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(character),
  }).then((res) => res.json())
    .then((res) => console.log(res));
};
// @ts-ignore

const getCharacter = (username, characterId) => {
  fetch(`${host}/${username}/character/${characterId}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((res) => res.json())
    .then((res) => console.log(res));
};
// @ts-ignore

const updateCharacter = (username, characterId, character) => (
  fetch(`${host}/${username}/character/${characterId}`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: character,
  }).then((res) => res.json())
    .then((res) => res)
);
// @ts-ignore

const deleteCharacter = (username, characterId) => (
  fetch(`${host}/${username}/character/${characterId}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  }).then((res) => res.json())
    .then((res) => res)
);
// @ts-ignore

const getAllCharacter = (username) => (
  fetch(`${host}/${username}/character/characters`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((res) => res.json())
    .then((res) => res)
);
export {
  getCharacter, saveCharacter, updateCharacter, deleteCharacter, getAllCharacter,
};
