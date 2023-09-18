import fs from 'node:fs';
import chalk from 'chalk';
import path from 'node:path';
import { transform } from '@svgr/core';
import cheerio from 'cheerio';
import iconsInput from '../build/iconsInput.js';
import ejs from 'ejs';

// 构建完成完成后生成icons目录下index.tsx
const generaterIndex =  () => {
    const icons = iconsInput();
    fs.readFile('./index.ejs', 'utf8', (err, data) => {
        if (err) {
          return  console.log(err);
        } 
        fs.writeFile(ejs.render(data, { icons }));
    })
}

// 处理颜色，处理为跟随父元素的颜色，只适用纯色
const dealColorToCurrentColor = (cheerioDom) => {
    const fillList = cheerioDom('*[fill]');
    [...fillList].forEach(ele => {
        if (cheerioDom(ele).attr('fill') === 'none')
            return;
        cheerioDom(ele).attr('fill', 'currentColor');
    });
    return cheerioDom.html();
};
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
    const processedCount = 0;
    svgList.forEach((ele, index) => {
        const fullPath = path.resolve(process.cwd(), 'svgs', ele);
        const iconName = (ele.substring(0, 1).toLocaleUpperCase() + ele.substring(1, Infinity)).split('.')[0];
        if (iconList.includes(iconName.toLocaleLowerCase())) {
            processedCount++;
            return console.log(chalk.yellow(`${ele}已经有${iconName}了`));
        }
        fs.readFile(fullPath, 'utf-8', async (err, data) => {
            if (err) {
                return console.log(err);
            }
            const html = dealColorToCurrentColor(cheerio.load(data, null, false));
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
            } finally {
                processedCount++;
                if (processedCount === index + 1) {
                    afterDealSvgs();
                }
            }
        });
    });
};
start();
