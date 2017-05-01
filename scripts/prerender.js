const prerenderer = require('simple-react-prerender')

require('babel-register')({
    plugins: [
        'transform-es2015-modules-commonjs',
        'syntax-object-rest-spread',
        'transform-object-rest-spread',
    ],
})

window = {}

const {initStore} = require('../src/redux/init')
const store = initStore()

prerenderer({
    html: '/home/beac0n/dev/velocity-manager/build/index.html',
    app: '/home/beac0n/dev/velocity-manager/src/providerApp.js',
    props: {store},
    dry: true
})



