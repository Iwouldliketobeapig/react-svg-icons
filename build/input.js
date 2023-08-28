import { readdirSync } from 'fs';
import path from 'path';

const root = process.cwd();
const iconsPathName = './icons'

const getFileName = (file) => {
  const fileSplit = file.split('.');
  fileSplit.pop();
  return fileSplit.join();
}

export default () => {
  let inputPath = {};
  const iconsFilePath = path.resolve(root, iconsPathName)
  const dataDir = readdirSync(iconsFilePath, { withFileTypes: true });
  dataDir?.forEach(ele => {
    console.log(ele);
    if (ele.isFile()) {
      inputPath[`${getFileName(ele.name)}`] = path.resolve(iconsFilePath, ele.name); 
    }
  })
  return inputPath;
}