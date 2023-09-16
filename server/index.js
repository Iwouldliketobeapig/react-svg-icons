import express from 'express';
import path from 'node:path';
import { cwd } from 'node:process';

const app = express();

app.use(express.static(path.resolve(cwd(), 'dist')));

app.listen(8080, function() {
  console.log('当前demo在8080端口上');
});