import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/differ.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (fileName) => fs.readFileSync((getFixturePath(fileName)), 'utf-8');

const stylishDiff = readFile('stylishFormat');
const plainDiff = readFile('plainFormat');
const jsonDiff = readFile('jsonFormat');

describe.each(['json', 'yml'])('test . %s files', (extension) => {
  const filePath1 = getFixturePath(`before.${extension}`);
  const filePath2 = getFixturePath(`after.${extension}`);

  test.each([
    ['stylish', stylishDiff],
    ['json', jsonDiff],
    ['plain', plainDiff],
  ])('%s formatter', (formatName, expected) => {
    const recieved = genDiff(filePath1, filePath2, formatName);
    expect(recieved).toEqual(expected);
  });
});
