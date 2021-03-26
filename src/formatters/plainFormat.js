import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

export default (diffTree) => {
  const iter = (tree, path = []) => {
    const plainData = tree.reduce((acc, node) => {
      const { key, status } = node;
      let newPath = path.concat(key);
      if (status !== 'nested') {
        newPath = newPath.join('.');
      }
      switch (status) {
        case 'added':
          acc.push(`Property '${newPath}' was added with value: ${stringify(node.value)}`);
          break;
        case 'deleted':
          acc(`Property '${newPath}' was removed`);
          break;
        case 'unchanged':
          break;
        case 'changed':
          acc.push(`Property '${newPath}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`);
          break;
        case 'nested':
          acc.push(iter(node.children, newPath));
          break;
        default:
          throw new Error(`Unsupported <${status}> status in diffTree`);
      }
      return acc;
    }, []);
    return plainData.join('\n');
  };
  return iter(diffTree);
};
