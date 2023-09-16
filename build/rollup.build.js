import typescript from '@rollup/plugin-typescript';
import inputFun from './iconsInput.js';

export default {
  input: {
    ...inputFun(),
  },
  output: [
    {
      dir: 'packages/es',
      sourcemap: false,
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