import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())


const buildFolder = './dist'
const srcFolder = './src'


export const path = {
    build: {
        html:`${buildFolder}/`,
        files: `${buildFolder}/files`
    },
    src: {
        html:`${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        scss:`${srcFolder}/scss/*.scss`
    },
    watch: {
        html:`${srcFolder}/**/*.html`,
        files:`${srcFolder}/files/**/*.*`,
        scss:`${srcFolder}/scss/*.scss`,
        js:`${srcFolder}/js/*.js`,
        img:`${srcFolder}/img/**/*.*`,
        fonts:`${srcFolder}/fonts/**/*.*`
    },
    clean: buildFolder,
    buildFolder,
    srcFolder,
    rootFolder,
    ftp: ``
}