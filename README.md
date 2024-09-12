# base64-me

## Install

```sh
npm install base64-me
```

## Usage

To convert from base64 to Uint8Array

```js
import { encode } from 'base64-me'

const base64 = 'SGVsbG8gd29ybGQ='
const result = encode(base64)
console.log(result)
```

To convert from UInt8Array to base64

```js
import { decode } from 'base64-me'

const uint8Array = new Uint8Array([
  72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
])
const result = decode(base64)
console.log(result)
```