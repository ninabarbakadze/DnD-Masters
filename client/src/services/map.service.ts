const baseUrl = 'http://localhost:3001/';

const headers = new Headers({ 'Content-Type': 'application/json' });

interface iData {
  mapName: string;
  mapUrl: string;
  locationData?: string;
}

export async function getAllMaps(username: string) {
  try {
    const maps = await fetch(`${baseUrl}${username}/maps`);
    return maps.json();
  } catch (err) {
    return console.error(err);
  }
}

export async function getMap(username: string, mapId: string) {
  try {
    const map = await fetch(`${baseUrl}${username}/maps/${mapId}`);
    return map.json();
  } catch (err) {
    return console.error(err);
  }
}

export async function updateMap(username: string, mapId: string, data: iData) {
  try {
    const updatedMap = await fetch(`${baseUrl}${username}/maps/${mapId}`, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return updatedMap.json();
  } catch (err) {
    return console.error(err);
  }
}

export async function deleteMap(username: string, mapId: string) {
  try {
    const response = await fetch(`${baseUrl}${username}/maps/${mapId}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  } catch (err) {
    return console.error(err);
  }
}

export async function saveMap(username: string, data: iData) {
  try {
    const createdMap = await fetch(`${baseUrl}${username}/map/new`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return createdMap.json();
  } catch (err) {
    return console.error(err);
  }
}
