import { iElement } from '../interfaces/map.interface';

const baseUrl = 'http://localhost:3001/';

const headers = new Headers({ 'Content-Type': 'application/json' });

interface iData {
  mapName: string;
  mapUrl: string;
  locationData?: string;
}

export async function getAllMaps(username: string) {
  const maps = await fetch(`${baseUrl}${username}/maps`);
  return maps.json();
}

export async function getMap(username: string, mapId: string) {
  const map = await fetch(`${baseUrl}${username}/maps/${mapId}`);
  return map.json();
}

export async function updateMap(
  username: string,
  mapId: string,
  data: iElement,
) {
  const updatedMap = await fetch(`${baseUrl}${username}/maps/${mapId}`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return updatedMap.json();
}

export async function deleteMap(username: string, mapId: string) {
  const response = await fetch(`${baseUrl}${username}/maps/${mapId}`, {
    method: 'DELETE',
    headers,
  });
  return response.json();
}

export async function saveMap(username: string, data: iData) {
  try {
    const createdMap = await fetch(`${baseUrl}${username}/map/new`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    console.log(createdMap);
    return createdMap.json();
  } catch (err) {
    return console.error(err);
  }
}
