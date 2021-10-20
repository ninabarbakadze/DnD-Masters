const headers = new Headers({ 'Content-Type': 'application/json' });
const host = 'http://localhost:3001';

// @ts-ignore
const saveCharacter = (username, character) => (
  fetch(`${host}/${username}/characters/new`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(character),
  }).then((res) => res.json())
    .then((res) => res)
    .catch((err) => { console.log(err); }));
// @ts-ignore

const getCharacter = (username, characterId) => (
  fetch(`${host}/${username}/characters/${characterId}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((res) => res.json())
    .then((res) => console.log(res))
);
// @ts-ignore

const updateCharacter = (username, characterId, character) => {
  console.log(typeof characterId);
  return fetch(`${host}/${username}/characters/${characterId}`, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(character),
  }).then((res) => res.json())
    .then((res) => res);
};
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
