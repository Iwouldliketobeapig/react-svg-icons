import fs from 'node:fs'
import chalk from 'chalk';
import path from 'node:path';
import { transform } from '@svgr/core';
import cheerio, { CheerioAPI } from 'cheerio';

// 处理颜色，处理为跟随父元素的颜色，只适用纯色
const dealColorToCurrentColor = (cheerioDom: CheerioAPI) => {
  const fillList = cheerioDom('*[fill]');
  [...fillList].forEach(ele => {
    if (cheerioDom(ele).attr('fill') === 'none') return;
    cheerioDom(ele).attr('fill', 'currentColor');
  })
  return cheerioDom.html();
} 

// 往icons中写入图标
const writeIcon = (data: string, name: string) => {
  const iconPath = path.resolve(process.cwd(), 'icons', `${name}.tsx`);
  fs.writeFile(iconPath, data, (err: any) => {
    if (err) {
      console.log(err);
    };
  })
} 

const start = () => {
  // 获取所有svgs目录中的svg图标
  const svgList = fs.readdirSync('./svgs').filter((ele) => ele.endsWith('.svg'));
  const iconList = fs.readdirSync('./icons').map(ele => ele.split('.')[0].toLocaleLowerCase());
  svgList.forEach((ele: string) => {
    const fullPath = path.resolve(process.cwd(), 'svgs', ele);
    const iconName = (ele.substring(0, 1).toLocaleUpperCase() + ele.substring(1, Infinity)).split('.')[0];
    if (iconList.includes(iconName.toLocaleLowerCase())) {
      return console.log(chalk.yellow(`${ele}已经有${iconName}了`));
    }
    fs.readFile(fullPath, 'utf-8', async (err: NodeJS.ErrnoException, data: string) => {
      if (err) {
        return console.log(err);
      }
      const html = dealColorToCurrentColor(cheerio.load(data, null, false));
      const res = await transform(html,
        {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
          icon: true,
          typescript: true,
          replaceAttrValues: {
            '#111': 'currentColor',
          }
        }, 
        {
          componentName: iconName
        }
      );
      writeIcon(res, iconName);
    })
  })
}

start();