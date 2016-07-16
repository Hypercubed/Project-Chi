import uRIjs from 'URIjs';
import {mime} from './mime';

export function normalizePackage (uri, datapackage) {
  datapackage.base = datapackage.base || uRIjs(uri).normalizePathname().directory();
  datapackage.base = `${datapackage.base}/`;

  if (datapackage.resources) {
    datapackage.resources = datapackage.resources.map(resource => normalizeResource(datapackage, resource));
  } else {
    datapackage.resources = [];
  }

  if (datapackage.image) {
    datapackage.image = uRIjs(datapackage.image, datapackage.base).href();
  }

  if (datapackage.readme) {
    datapackage.readme = uRIjs(datapackage.readme, datapackage.base).href();
  }

  datapackage.homepage = datapackage.homepage || datapackage.base;
  datapackage.description = datapackage.description || '';

  return datapackage;
}

export function normalizeResource (datapackage, resource) {
  if (typeof resource === 'string') {
    resource = {path: resource};
  }

  if (resource.path || resource.url) {
    const uri = uRIjs(resource.path || resource.url);

    resource.format = resource.format || uri.suffix();
    resource.name = resource.name || uri.filename();

    resource.url = resource.url || uri.absoluteTo(datapackage.base).href();
    resource.mediatype = resource.mediatype || mime.lookup(resource.format);
  }

  if (resource.schema && typeof resource.schema === 'string') {
    resource.schema = datapackage.schemas[resource.schema]; // TODO: check for URLS, catch missing schemas
  }

  return resource;
}
