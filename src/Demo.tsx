import React, { useRef, useState } from 'react';
import './demo.less';
import { AddToPerson, Checked, CheckedChecked, Share } from '../icons';
import { message, Popover, Button } from 'antd';
import packageInfo from '../package.json';

const Demo = () => {
  const copyRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>();

  const onIcon = (text: string) => {
    setValue(text);
    setTimeout(() => {
      copyRef.current?.select();
      document.execCommand("copy");
      message.success(`复制${text}成功`);
    }, 0);
  }

  const content = (name: string) => {
    return (
      <div>
        <Button onClick={() => onIcon(name)}>复制图标</Button>
        <Button onClick={() => onIcon(`import { ${name} } from '${packageInfo.name}'`)}>复制引入</Button>
      </div>
    );
  };

  return (
    <>
      <input 
        style={{ position: "fixed", left: -100000 }}
        ref={copyRef}
        value={value}
      />
      <ul className="demo">
          <Popover content={content("AddToPerson")}>
            <li className="icon">
              <AddToPerson />
              <span className="icon-desc">AddToPerson</span>
            </li>
          </Popover>
          <Popover content={content("Checked")}>
            <li className="icon">
              <Checked />
              <span className="icon-desc">Checked</span>
            </li>
          </Popover>
          <Popover content={content("CheckedChecked")}>
            <li className="icon">
              <CheckedChecked />
              <span className="icon-desc">CheckedChecked</span>
            </li>
          </Popover>
          <Popover content={content("Share")}>
            <li className="icon">
              <Share />
              <span className="icon-desc">Share</span>
            </li>
          </Popover>
      </ul>
    </>
  )
}

export default Demo;