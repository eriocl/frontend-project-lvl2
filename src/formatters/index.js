import makeJson from './jsonFormat.js';
import makeStylish from './stylishFormat.js';
import makePlain from './plainFormat.js';

export default (diffTree, format) => {
  switch (format) {
    case 'json':
      return makeJson(diffTree);
    case 'stylish':
      return makeStylish(diffTree);
    case 'plain':
      return makePlain(diffTree);
    default:
      throw new Error(`${format} is not unsupported format`);
  }
};
