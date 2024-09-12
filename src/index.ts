const decode = (uint8Array: Uint8Array): string => {
  const textDecoder = new TextDecoder()
  const binaryString = textDecoder.decode(uint8Array)

  if (typeof btoa !== 'undefined') return btoa(binaryString)
  else if (typeof Buffer !== 'undefined')
    return Buffer.from(binaryString, 'binary').toString('base64')
  else throw new ReferenceError('Unsupported environment for decoding')
}

const encode = (base64: string): Uint8Array => {
  if (base64.includes('base64,')) base64 = base64.split('base64,')[1]

  let binaryString
  if (typeof atob !== 'undefined') binaryString = atob(base64)
  else if (typeof Buffer !== 'undefined')
    binaryString = Buffer.from(base64, 'base64').toString('binary')
  else throw new ReferenceError('Unsupported environment for encoding')

  const textEncoder = new TextEncoder()
  return textEncoder.encode(binaryString)
}

export { decode, encode }
