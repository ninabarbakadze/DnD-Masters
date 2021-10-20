/* eslint-disable arrow-body-style */
import { iCharacter } from '../interfaces/character.interface';

const headers = new Headers({ 'Content-Type': 'application/json' });

const json = (response: Response) => response.json();

export const saveCharacter = (username: string, character: iCharacter) => {
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/${username}/characters/new`,
    {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(character),
    },
  )
    .then(json)
    .catch(console.log);
};

export const getCharacter = (
  username: string,
  characterId: string,
): Promise<iCharacter> => {
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/${username}/characters/${characterId}`,
    {
      method: 'GET',
      headers,
      credentials: 'include',
    },
  )
    .then(json)
    .catch(console.log);
};

export const updateCharacter = (
  username: string,
  characterId: string,
  character: iCharacter,
) => {
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/${username}/characters/${characterId}`,
    {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(character),
    },
  )
    .then(json)
    .catch(console.log);
};

export const deleteCharacter = (username: string, characterId: string) => {
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/${username}/characters/${characterId}`,
    {
      method: 'DELETE',
      headers,
      credentials: 'include',
    },
  )
    .then(json)
    .catch(console.log);
};

export const getAllCharacter = (username: string): Promise<any[]> => {
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/${username}/characters/`,
    {
      method: 'GET',
      headers,
      credentials: 'include',
    },
  )
    .then(json)
    .catch(console.log);
};
