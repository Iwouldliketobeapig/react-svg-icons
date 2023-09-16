import React from 'react';
import './demo.less';
import { AddToPerson, Share } from '../packages/es';

const Demo = () => {
  return (
    <div className="demo">
        <li className="icon">
          <AddToPerson />
          <span>AddToPerson</span>
        </li>
        <li className="icon">
          <Share />
          <span>Share</span>
        </li>
    </div>
  )
}

export default Demo;