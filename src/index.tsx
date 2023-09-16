import React from "react";
import { render } from 'react-dom';
import Demo from './Demo';
import './index.less';

const App = () => {
  return (
    <div className="box">
      <h1>已有图标</h1>
      <Demo />
    </div>
  )
}

const root = document.getElementById('root');
render(<App />, root);