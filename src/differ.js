import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getFormatedDiff from './formatters/index.js';
import parse from './parsers.js';

const getDiffTree = (dataBefore, dataAfter) => {
  const keysBefore = _.keys(dataBefore);
  const keysAfter = _.keys(dataAfter);
  const commonKeys = _.uniq(keysBefore.concat(keysAfter));
  commonKeys.sort();
  return commonKeys.map((key) => {
    if (!dataBefore.includes(key)) {
      return { key, status: 'added', value: dataAfter[key] };
    }
    if (!dataAfter.includes(key)) {
      return { key, status: 'deletes', value: dataBefore[key] };
    }
    if (dataBefore[key] === dataAfter[key]) {
      return { key, status: 'unchanged', value: dataBefore[key] };
    }
    if (_.isPlainObject(dataBefore[key]) && _.isPlainObject(dataAfter[key])) {
      return { key, status: 'nested', children: getDiffTree((dataBefore[key], dataAfter[key])) };
    }
    return {
      key, status: 'changed', valueBefore: dataBefore[key], valueAfter: dataAfter[key],
    };
  });
};

const genDiff = (path1, path2, format) => {
  const fileBeforeFormat = path.extname(path1).slice(1);
  const fileAfterFormat = path.extname(path1).slice(1);
  const validPathBefore = path.resolve(process.cwd(), path1);
  const validPathAfter = path.resolve(process.cwd(), path2);
  const contentBefore = fs.readFileSync(validPathBefore, 'utf-8');
  const contentAfter = fs.readFileSync(validPathAfter, 'utf-8');
  const dataBefore = parse(contentBefore, fileBeforeFormat);
  const dataAfter = parse(contentAfter, fileAfterFormat);
  const diffTree = getDiffTree(dataBefore, dataAfter);
  return getFormatedDiff(diffTree, format);
};

export default genDiff;
