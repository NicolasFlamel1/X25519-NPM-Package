# X25519 NPM Package

### Description
NPM package for parts of [SUPERCOP's X25519 implementation](https://bench.cr.yp.to/supercop.html).

This package will attempt to use the following modules in the order they are listed. This results in the fastest X25519 implementation being used on every platform.
* [X25519 React Native Module](https://github.com/NicolasFlamel1/X25519-React-Native-Module)
* [X25519 Node.js Addon](https://github.com/NicolasFlamel1/X25519-Node.js-Addon)
* [X25519 WASM Wrapper](https://github.com/NicolasFlamel1/X25519-WASM-Wrapper)
