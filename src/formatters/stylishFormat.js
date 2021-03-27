import _ from 'lodash';

const convertValueToPrettyString = (value, key, depth) => {
  const tab = '    '.repeat(depth);
  if (!_.isObject(value)) {
    return `${key}: ${value}`;
  }
  const newKeys = _.keys(value);
  const formatedValue = newKeys.map((newKey) => {
    const tab = '    '.repeat(depth + 1);
    return `${tab}${convertValueToPrettyString(value[newKey], newKey, depth + 1)}`;
  });
  return `${key}: {\n${formatedValue.join('\n')}\n${tab}}`;
};

export default (diffTree) => {
  const statusOperators = { deleted: '-', unchanged: ' ', added: '+' };
  const iter = (tree, depth = 0) => {
    const tab = '    '.repeat(depth);
    const formatedTree = tree.map((node) => {
      const { key, status } = node;
      switch (status) {
        case 'deleted':
        case 'unchanged':
        case 'added': {
          const value = convertValueToPrettyString(node.value, key, depth + 1);
          return `${tab}  ${statusOperators[status]} ${value}`;
        }
        case 'changed': {
          const valueBefore = convertValueToPrettyString(node.valueBefore, key, depth + 1);
          const valueAfter = convertValueToPrettyString(node.valueAfter, key, depth + 1);
          return `${tab}  - ${valueBefore}\n${tab}  + ${valueAfter}`;
        }
        case 'nested': {
          const { children } = node;
          return `    ${tab}${key}: {\n${iter(children, depth + 1)}\n    ${tab}}`;
        }
        default:
          throw new Error(`Unsupported <${status}> status in diffTree`);
      }
    });
    return formatedTree.join('\n');
  };
  return `{\n${iter(diffTree)}\n}`;
};
