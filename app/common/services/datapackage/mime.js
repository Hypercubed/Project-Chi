import MimeLookup from 'mime-lookup';

// mime types supported by dataservices
export const MimeDb = {
  'text/tab-separated-values': {
    source: 'iana',
    compressible: true,
    extensions: ['tsv']
  },
  'text/csv': {
    source: 'iana',
    compressible: true,
    extensions: ['csv']
  },
  'text/plain': {
    source: 'iana',
    compressible: true,
    extensions: ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini']
  },
  'text/yaml': {
    extensions: ['yaml', 'yml']
  },
  'text/matrix': {
    source: 'custom',
    extensions: ['matrix', 'expression', 'osc']
  },
  'application/json': {
    source: 'iana',
    charset: 'UTF-8',
    compressible: true,
    extensions: ['json', 'map', 'json5']
  }
};

export const mime = new MimeLookup(MimeDb);
export default mime;
