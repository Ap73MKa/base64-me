const decode = (uint8Array: Uint8Array): string => {
  const binaryString = Array.from(uint8Array, (byte) =>
    String.fromCharCode(byte)
  ).join('')
  if (typeof btoa !== 'undefined') return btoa(binaryString)
  else if (typeof Buffer !== 'undefined')
    return Buffer.from(binaryString, 'binary').toString('base64')
  else throw new Error('Unsupported environment for decoding')
}

const encode = (base64: string): Uint8Array => {
  if (base64.includes(',')) base64 = base64.split(',')[0]

  let binaryString
  if (typeof atob !== 'undefined') binaryString = atob(base64)
  else if (typeof Buffer !== 'undefined')
    binaryString = Buffer.from(base64, 'base64').toString('binary')
  else throw new Error('Unsupported environment for encoding')

  return Uint8Array.from(binaryString, (char) => char.charCodeAt(0))
}

export { decode, encode }
