/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { iResourceListItem } from '../interfaces/externalData interfaces/externalData.interfaces';

const DnDUrl = 'https://www.dnd5eapi.co/api/';
const headers = new Headers({ 'Content-Type': 'application/json' });

const json = (response: Response) => response.json();

export function getResourceList(resourceType: string): Promise<iResourceListItem[]> {
  return fetch(`${DnDUrl}${resourceType}`, { headers })
    .then(json)
    .then((list) => list.results)
    .catch((error) => console.error(error));
}

export function getResource(resourceType: string, resource: string) {
  return fetch(`${DnDUrl}${resourceType}/${resource}`, { headers })
    .then(json)
    .catch((error) => console.error(error));
}

export async function getAllInList<T>(resourceType: string, list?: iResourceListItem[]): Promise<T[]> {
  // eslint-disable-next-line no-unneeded-ternary
  const resourceList = list ? list : await getResourceList(resourceType);
  const promises = resourceList.map(({ index }) =>
    getResource(resourceType, index),
  );
  const resources = await Promise.all(promises);
  return resources;
}
