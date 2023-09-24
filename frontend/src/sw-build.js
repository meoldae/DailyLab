const workboxBuild = require('workbox-build');

const buildSW = () => {
    return workboxBuild
    .injectManifest({
        globDirectory: 'dist',
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
        swDest: 'dist/sw.js',
        swSrc: 'src/sw-custom.js'
    })
    .then(({ count, size, warnings }) => {
        console.log("workbox-build를 통해 빌드!!");
    });
};

buildSW();''