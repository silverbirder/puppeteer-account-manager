import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

const pkg = require('./package.json');

const entryFile = 'index';
const banner = `
/*!
 * ${pkg.name} v${pkg.version} by ${pkg.author}
 * ${pkg.homepage || `https://github.com/${pkg.repository}`}
 * @license ${pkg.license}
 */
`.trim();

export default {
    input: `src/${entryFile}.ts`,
    output: [
        {
            file: `./dist/${pkg.main}`,
            format: 'cjs',
            sourcemap: true,
            banner
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ],
    watch: {
        include: 'src/**'
    },
    plugins: [
        typescript({useTsconfigDeclarationDir: true}),
        commonjs(),
        resolve(),
        json(),
        sourceMaps(),
    ]
}