import React from 'react';
import './demo.less';
import { AddToPerson, Share } from '../icons';

const Demo = () => {
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