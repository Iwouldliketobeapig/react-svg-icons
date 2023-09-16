import iconsInput from "./iconsInput.js";
import ejs from 'ejs';
import fs from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';

const cwdPath = cwd();

function generateDemo () {
  const iconsObj = iconsInput();
  delete iconsObj.index;
  const icons = Object.keys(iconsObj);
  fs.readFile(path.resolve(cwdPath, 'src/Demo.ejs'), 'utf8', function(err, data) {
    if (err) {
      throw(err);
    }
    console.log('测试-----', data);
    const tsx = ejs.render(data, { icons });
    console.log(tsx);
    fs.writeFileSync(path.resolve(cwdPath, 'src/Demo.tsx'), tsx);
  })
}

generateDemo();