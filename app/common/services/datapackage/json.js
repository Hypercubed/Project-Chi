import {parse} from 'json5';

export default function fromJson (json) {
  if (typeof json === 'string') {
    try {
      json = parse(json);
    } catch (err) {
      json = {};
    }
  }
  return json;
}
