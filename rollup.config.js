import typescript from '@rollup/plugin-typescript';
import resolve from  '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';




export default [
  {
    input: 'src/load.ts',
    output: {
      dir: 'dist',
      format: 'es'
    },
    external: ['k6/http', 'k6', 'k6/execution', 'k6/data'],
    plugins: [typescript(),commonjs(),resolve()]
  },
  {
    input: 'src/smoke.ts',
    output: {
      dir: 'dist',
      format: 'es'
    },
    external: ['k6/http', 'k6', 'k6/execution', 'k6/data'],
    plugins: [typescript(),commonjs(),resolve()]
  },
  {
    input: 'src/endurance.ts',
    output: {
      dir: 'dist',
      format: 'es'
    },
    external: ['k6/http', 'k6', 'k6/execution', 'k6/data'],
    plugins: [typescript(),commonjs(),resolve()]
  },
];