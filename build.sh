#!/bin/bash

# Sanity Check
if ! command -v wasm-pack &> /dev/null  
then
    echo "wasm-pack is required for this build script, please install" 
    exit 1
fi

if ! command -v npm &> /dev/null  
then
    echo "npm is required for this build script, please install" 
    exit 1
fi

if ! command -v npx &> /dev/null  
then
    echo "npx is required for this build script, please install" 
    exit 1
fi

# The Real Deal
cd wasm-functions
wasm-pack build
cd ../workers
npm i && npx webpack --config webpack.config.js
cd ../target-app
npm i && npm run build
