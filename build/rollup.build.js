import typescript from '@rollup/plugin-typescript';
import inputFun from './iconsInput.js';

inputFun();

export default {
  input: {
    ...inputFun(),
  },
  output: [
    {
      dir: 'packages/es',
      sourcemap: true,
      format: 'es',
    }
  ],
  plugins: [typescript({
    target: 'es5',
    tsconfig: './tsconfig.icon.json',
    declaration: true,
  })],
  external: ['react'],
}