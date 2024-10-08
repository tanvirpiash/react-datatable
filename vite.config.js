import rollupReplace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      rollupReplace({
         preventAssignment: true,
         values: {
            __DEV__: JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify('development'),
         },
      }),
      react({
         babel: {
            plugins: [
               [
                  '@emotion/babel-plugin-jsx-pragmatic',
                  {
                     export: 'jsx',
                     import: '__cssprop',
                     module: '@emotion/react',
                  },
               ],
               '@emotion/babel-plugin',
            ],
         },
      }),
   ],
   resolve: process.env.USE_SOURCE
      ? {
           alias: {
              'react-table': path.resolve(__dirname, '../../../src/index.ts'),
           },
        }
      : {},
});
