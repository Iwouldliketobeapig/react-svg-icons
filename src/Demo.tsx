import React from 'react';
import './demo.less';
import { AddToPerson, Checked, CheckedChecked, Share } from '../icons';

const Demo = () => {
  return (
    <ul className="demo">
        <li className="icon">
          <AddToPerson />
          <span className="icon-desc">AddToPerson</span>
        </li>
        <li className="icon">
          <Checked />
          <span className="icon-desc">Checked</span>
        </li>
        <li className="icon">
          <CheckedChecked />
          <span className="icon-desc">CheckedChecked</span>
        </li>
        <li className="icon">
          <Share />
          <span className="icon-desc">Share</span>
        </li>
    </ul>
  )
}

export default Demo;