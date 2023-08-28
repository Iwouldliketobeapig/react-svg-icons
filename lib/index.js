import fs from 'node:fs';
import chalk from 'chalk';
import path from 'node:path';
import { transform } from '@svgr/core';
import cheerio from 'cheerio';
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
    const iconPath = path.resolve(process.cwd(), 'icons', `${name}.tsx`);
    fs.writeFile(iconPath, data, (err) => {
        if (err) {
            console.log(err);
        }
        ;
    });
};
const start = () => {
    // 获取所有svgs目录中的svg图标
    const svgList = fs.readdirSync('./svgs').filter((ele) => ele.endsWith('.svg'));
    const iconList = fs.readdirSync('./icons').map(ele => ele.split('.')[0].toLocaleLowerCase());
    svgList.forEach((ele) => {
        const fullPath = path.resolve(process.cwd(), 'svgs', ele);
        const iconName = (ele.substring(0, 1).toLocaleUpperCase() + ele.substring(1, Infinity)).split('.')[0];
        if (iconList.includes(iconName.toLocaleLowerCase())) {
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
            writeIcon(res, iconName);
        });
    });
};
start();
// const svgCode = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1688914603063" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1648" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M618.666667 288a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h298.666667zM704 480a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h384zM533.333333 672a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h213.333333z" fill="#111111" p-id="1649"></path><path d="M768 85.333333a128 128 0 0 1 128 128v597.333334a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V213.333333a128 128 0 0 1 128-128h512z m0 64H256a64 64 0 0 0-64 64v597.333334a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V213.333333a64 64 0 0 0-64-64z" fill="#111111" p-id="1650"></path></svg>'
// const jsCode = await transform(svgCode,
//   {
//     plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
//     icon: true,
//     typescript: true,
//     replaceAttrValues: {
//       '#111': 'currentColor',
//     }
//   }, 
//   {
//     componentName: 'MyComponent'
//   });
// console.log(jsCode, 11111111111)
