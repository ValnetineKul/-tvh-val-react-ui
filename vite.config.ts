import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";
import svgLoader from 'vite-svg-loader'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { UserConfigExport } from 'vite'
import { name } from './package.json'
import tsconfigPaths from 'vite-tsconfig-paths';
import commonjs from '@rollup/plugin-commonjs';

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [
      react(),
      svgr(),
      svgLoader({
        defaultImport: 'url'
      }),
      visualizer(),
      commonjs(),
      tsconfigPaths(),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name,
        formats: ['es', 'umd'],
        fileName: (format) => `${name}.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          format: 'cjs',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  })
}
// https://vitejs.dev/config/
export default app