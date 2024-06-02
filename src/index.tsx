import React from "react";
import { createRoot } from 'react-dom/client';
import Demo from './Demo';
import './index.less';
import config from '../package.json';
import 'normalize.css';

const App = () => {
  return (
    <div className="box">
      <h1>使用方法</h1>
      <div className="introduction">
        <h3>安装</h3>
        <span>npm i { config.name }</span>
      </div> 
      <div className="introduction">
        <h3>引入</h3>
        <span>{`import { TestIcon } from '${config.name}'`}</span>
      </div>
      <h1>已有图标</h1>
      <Demo />
      <div className="introduction">
        <h3>添加新图标</h3>
        <span>
          只支持纯色图标的处理
        </span>
        <span>1. 将svg添加到项目目录中的svgs文件</span>
        <span>2. 执行npm run tranfer 然后执行npm run build</span>
        <span>3. 然后修改版本号npm publish就可以了</span>
      </div>
      <div className="introduction">
        <h3>查看demo</h3>
        <span>1. 执行npm run demo，生成demo.tsx</span>
        <span>2. 执行npm run dev就可以本地查看所有图标</span>
        <span>3. npm run build:demo然后执行npm run server即可启动一个文档服务</span>
      </div>
      <div className="power">
        <h1>power</h1>
        <a href="htt">https://github.com/Iwouldliketobeapig/react-svg-icons</a>
      </div>
    </div>
  )
}

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
root.render(<App />);