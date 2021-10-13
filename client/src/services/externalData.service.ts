import { iResourceList } from './../interfaces/externalData.interfaces';

const DnDUrl = 'https://www.dnd5eapi.co/api/';
const headers = new Headers({ 'Content-Type': 'application/json' });

const json = (response: Response) => response.json();

export function getResourceList(
  resourceType: string,
): Promise<iResourceList[]> {
  return fetch(`${DnDUrl}${resourceType}`, { headers })
    .then(json)
    .catch(console.log);
}

export function getResource(resourceType: string, resource: string) {
  return fetch(`${DnDUrl}${resourceType}/${resource}`, { headers })
    .then(json)
    .catch(console.log);
}

export async function getAllInList(resourceType: string): Promise<any> {
  try {
    const list = await getResourceList(resourceType);
    const resources: any[] = [];

    list.forEach(async (resource) => {
      const { index } = resource;
      const resourceData: Promise<any> = await getResource(resourceType, index);
      resources.push(resourceData);
    });
    return resources;
  } catch (err) {
    return console.log(err);
  }
}

export default {};
