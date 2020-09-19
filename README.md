# Rust -> WebWorker -> Create-React-App Example:

### Motivation
Create React App is awesome, but it does not expose it's webpack loader. React Hooks are awesome, and concurrecy with them is best done through WebWorkers (via paralellism, allowing the browser to finally capitalize the gains of multicore!). WASM is awesome, and since it (currently) can't directly manipulate the DOM, it's a great fit for WebWorkers. Yet none of this works nicely with each other. UNTIL NOW!

### Top-Level Dependencies (i.e. the deps may have deps which may have deps, or if you speak haskell, Deps :: (Deps, Maybe Deps))

[npm by way of nodejs](https://nodejs.org/en/)

[npx by way of npm](https://www.npmjs.com/package/npx)

[wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

### Build the example:
Clone the repo, then:
```
$ cd wasm_webworker_exmaple
$ chmod +x build.sh
$ ./build.sh
```
This will build the whole project, to view it locally:
```
$ cd target-app
$ npm run start
```
And it will run on port `localhost:3000`, unless you have something else running there, then it will politely ask you if it can use another port, but I'll let you cross that bridge when you come to it.

### Is this Evil Magic?
No, just a little convoluted. The key here is pre-building the workers with an exposed webpack config so that all the WASM and WebWorker weirdness is all squared away, before plain-old-CRA imports them via functions.

### I want to make my own!
Well, you could be lazy, just clone this repo, delete the `.git` folder, run `git init`, and tweak as needed. That's what I do. But if you really want to get your hands dirty, here are the key lines of the source. The goal is to create a generator function for usage in React allowing the following usage:
```javascript
const demoWorker = makeDemoWorker();
```
Giving you a plain old WebWorker that can be cleanly used with `useEffect` like so:
```javascript
useEffect(() => {
    demoWorker.onmessage = (msg) => {
        // do something with a reducer / state setter.
    }
}, []);
```
Then you need a second top-level project (in this repo, `workers`) with a proper webpack set up. The worker itself, `workers/src/demo.worker.js` would look like
```javascript
import * as wasmRaw from "../../wasm-functions/pkg/wasm_functions_bg.wasm";

let wasmLib = new WebAssembly.Instance(wasmRaw).exports;
onmessage = (msg) => {
    // do something with wasmLib
}
```
Where `../../wasm-functions` is a third top-level project, built from `wasm-pack` that `workers` imports. The worker is then made accessible to CRA by wrapping it in a regular JS file, in this repo at `workers/workers.js`:
```javascript
import Demo from "./src/demo.worker.js";

function makeDemoWorker() {
    return new Demo();
}

export {makeDemoWorker};
```
Now, this is not the traditional way to import WebWorkers or WASM, so this is how I made it work this way:
`package.json`, the relevant part:
```javascript
{
    ...
    "devDependencies": {
        "@babel/core": "^7.11.6",
        "@babel/preset-env": "^7.11.5",
        "babel-loader": "^8.1.0",
        "eslint": "^7.1.0",
        "webassembly-loader": "^1.1.0",
        "webpack": "^4.44.2",
        "webpack-cli": "^3.3.12",
        "worker-loader": "^3.0.2"
    },
    ...
}
```
`webpack.config.js`, the relevant part:
```javascript
{
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: { 
                    loader: 'worker-loader',
                    options: {inline: 'fallback'}
                },
            },
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.wasm$/,
                type: "javascript/auto",
                use: [{
                    loader: "webassembly-loader",
                    options: {
                        export: "module"
                    }
                }]
            },
        ],
    },
}
```

And now so can you!