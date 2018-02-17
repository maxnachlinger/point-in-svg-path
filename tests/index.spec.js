'use strict'

const pointInSvgPath = require('../')

describe('lib', () => {
  it('correctly identifies a point inside a path', () => {
    [{
      input: ['M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', 100, 100],
      expected: true
    }, {
      input: ['M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z', 220, 100],
      expected: true
    }, {
      input: ['M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z', 115, 235],
      expected: true
    }, {
      input: ['M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z', 300, 235],
      expected: true
    }].forEach(({input, expected}) => {
      expect(pointInSvgPath(...input)).toBe(expected)
    })
  })

  it('correctly identifies a point outside a path', () => {
    [{
      input: ['M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', 200, 100],
      expected: false
    }, {
      input: ['M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z', 220, 50],
      expected: false
    }, {
      input: ['M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z', 115, 200],
      expected: false
    }, {
      input: ['M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z', 250, 235],
      expected: false
    }].forEach(({input, expected}) => {
      expect(pointInSvgPath(...input)).toBe(expected)
    })
  })
})
