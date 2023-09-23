import fs from 'node:fs';
import chalk from 'chalk';
import path from 'node:path';
import { transform } from '@svgr/core';
import cheerio from 'cheerio';
import iconsInput from '../build/iconsInput.js';
import ejs from 'ejs';
import { cwd } from 'node:process';
import { compose } from './util.js';

// 构建完成完成后生成icons目录下index.tsx
const generaterIndex =  () => {
    const icons = iconsInput();
    delete icons.index;
    fs.readFile(path.resolve(cwd(), './lib/index.ejs') , 'utf8', (err, data) => {
        if (err) {
          return  console.log(err);
        }
        fs.writeFileSync(path.resolve(cwd(), 'icons/index.tsx'), ejs.render(data, { icons: Object.keys(icons) }));
    })
}

// 处理fill颜色，处理为跟随父元素的颜色
const dealSvgFill= (cheerioDom) => {
    const fillList = cheerioDom('*[fill]');
    [...fillList].forEach(ele => {
        if (cheerioDom(ele).attr('fill') === 'none')
            return;
        cheerioDom(ele).attr('fill', 'currentColor');
    });
    return cheerioDom;
};

// 处理stroke颜色，处理为跟随父元素的颜色
const dealSvgStroke = (cheerioDom) => {
    const strokeList = cheerioDom('*[stroke]');
    [...strokeList].forEach(ele => {
        if (cheerioDom(ele).attr('stroke') === 'none') return;
        cheerioDom.attr('stroke', 'currentColor')
    });
    return cheerioDom;
}

// 往icons中写入图标
const writeIcon = (data, name) => {
    return new Promise((resolve, reject) => {
        const iconPath = path.resolve(process.cwd(), 'icons', `${name}.tsx`);
        fs.writeFile(iconPath, data, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            };
            resolve(true);
        });
    })
};

const afterDealSvgs = () => {
    generaterIndex();
}

const start = () => {
    // 获取所有svgs目录中的svg图标
    const svgList = fs.readdirSync('./svgs').filter((ele) => ele.endsWith('.svg'));
    const iconList = fs.readdirSync('./icons').map(ele => ele.split('.')[0].toLocaleLowerCase());
    // 用来记录处理了多少svg
    let processedCount = 0;
    svgList.forEach((ele, index) => {
        const fullPath = path.resolve(process.cwd(), 'svgs', ele);
        const iconName = (ele.substring(0, 1).toLocaleUpperCase() + ele.substring(1, Infinity)).split('.')[0];
        if (iconList.includes(iconName.toLocaleLowerCase())) {
            processedCount++;
            if (processedCount === svgList.length) {
                afterDealSvgs();
            }
            return console.log(chalk.yellow(`${ele}已经有${iconName}了`));
        }
        fs.readFile(fullPath, 'utf-8', async (err, data) => {
            if (err) {
                return console.log(err);
            }
            const html = compose(dealSvgFill, dealSvgStroke)(cheerio.load(data, null, false)).html();
            const res = await transform(html, {
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
                icon: true,
                typescript: true,
                replaceAttrValues: {
                    '#111': 'currentColor',
                }
            }, {
                componentName: iconName
            });
            try {
               await writeIcon(res, iconName);
            } catch(err) {
                console.log(err);
            } finally {
                processedCount++;
                if (processedCount === svgList.length) {
                    afterDealSvgs();
                }
            }
        });
    });
};
start();
