import React from 'react';
import './demo.less';
import { AddToPerson, Share } from '../icons';

const Demo = () => {
  const onClick = (name: string) => {
    document.execCommand('Copy');
  }

  return (
    <ul className="demo">
        <li className="icon">
          <AddToPerson />
          <span className="icon-desc">AddToPerson</span>
        </li>
        <li className="icon">
          <Share />
          <span className="icon-desc">Share</span>
        </li>
    </ul>
  )
}

export default Demo;