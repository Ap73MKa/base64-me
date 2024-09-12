import { describe, it, expect } from 'vitest'
import { decode, encode } from '../src/index'

describe('Base64 Encode and Decode', () => {
  it('should encode a base64 string into Uint8Array', () => {
    const base64 = 'SGVsbG8gd29ybGQ=' // "Hello world"
    const expectedArray = new Uint8Array([
      72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
    ])

    const result = encode(base64)
    expect(result).toEqual(expectedArray)
  })

  it('should decode a Uint8Array into a base64 string', () => {
    const uint8Array = new Uint8Array([
      72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
    ]) // "Hello world"
    const expectedBase64 = 'SGVsbG8gd29ybGQ='

    const result = decode(uint8Array)
    expect(result).toEqual(expectedBase64)
  })

  it('should throw an error if an unsupported environment for decoding is used', () => {
    // Mocking an environment without btoa or Buffer
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111])

    const originalBtoa = globalThis.btoa
    //@ts-expect-error
    globalThis.btoa = undefined

    const originalBuffer = globalThis.Buffer
    //@ts-expect-error
    globalThis.Buffer = undefined

    expect(() => decode(uint8Array)).toThrow(ReferenceError)

    // Restore original environment
    globalThis.btoa = originalBtoa
    globalThis.Buffer = originalBuffer
  })

  it('should throw an error if an unsupported environment for encoding is used', () => {
    const base64 = 'SGVsbG8gd29ybGQ='

    const originalAtob = globalThis.atob
    //@ts-expect-error
    globalThis.atob = undefined

    const originalBuffer = globalThis.Buffer
    //@ts-expect-error
    globalThis.Buffer = undefined

    expect(() => encode(base64)).toThrow(ReferenceError)

    // Restore original environment
    globalThis.atob = originalAtob
    globalThis.Buffer = originalBuffer
  })

  it('should handle base64 strings with initial metadata', () => {
    const base64WithComma = 'data:image/png;base64,SGVsbG8gd29ybGQ='
    const expectedArray = new Uint8Array([
      72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
    ])

    const result = encode(base64WithComma)
    expect(result).toEqual(expectedArray)
  })
})
