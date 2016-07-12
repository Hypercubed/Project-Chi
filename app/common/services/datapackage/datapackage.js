import uRIjs from 'URIjs';
import {mime} from './mime';

export function normalizePackage (uri, datapackage) {
  datapackage.base = datapackage.base || uRIjs(uri).normalizePathname().directory();
  datapackage.base = `${datapackage.base}/`;

  if (datapackage.resources) {
    datapackage.resources = datapackage.resources.map(resource => normalizeResource(datapackage.base, resource));
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

export function normalizeResource (base, resource) {
  if (typeof resource === 'string') {
    resource = {path: resource};
  }

  if (resource.path) {
    const uri = uRIjs(resource.path);

    resource.format = resource.format || uri.suffix();
    resource.name = resource.name || uri.filename();

    resource.url = resource.url || uri.absoluteTo(base).href();
    resource.mediatype = resource.mediatype || mime.lookup(resource.format);
  }

  return resource;
}
