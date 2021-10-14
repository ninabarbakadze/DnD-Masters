import { iResourceListItem } from '../interfaces/externalData.interfaces';

const DnDUrl = 'https://www.dnd5eapi.co/api/';
const headers = new Headers({ 'Content-Type': 'application/json' });

const json = (response: Response) => response.json();

export function getResourceList(
  resourceType: string,
): Promise<iResourceListItem[]> {
  return fetch(`${DnDUrl}${resourceType}`, { headers })
    .then(json)
    .then((list) => list.results)
    .catch(console.log);
}

export function getResource(resourceType: string, resource: string) {
  return fetch(`${DnDUrl}${resourceType}/${resource}`, { headers })
    .then(json)
    .catch(console.log);
}

export async function getAllInList<T>(resourceType: string): Promise<T[]> {
  const list = await getResourceList(resourceType);
  // const resources: T[] = [];
  // console.log(list);

  // list.forEach(async ({ index }) => {
  //   const resourceData = await getResource(resourceType, index);
  //   resources.push(resourceData);
  // });
  const promises = list.map(({ index }) => getResource(resourceType, index));
  const resources = await Promise.all(promises);
  return resources;
}
