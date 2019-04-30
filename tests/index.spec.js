'use strict'

const {pointInSvgPath, getPointsAndIntersectingPaths} = require('../')

describe('pointInSvgPath tests', () => {
  it('correctly identifies a point inside a path', () => {
    [{
      input: ['M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', 100, 100],
      expected: true,
    }, {
      input: ['M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z', 220, 100],
      expected: true,
    }, {
      input: ['M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z', 115, 235],
      expected: true,
    }, {
      input: ['M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z', 300, 235],
      expected: true,
    }].forEach(({input, expected}) => {
      expect(pointInSvgPath(...input)).toBe(expected)
    })
  })

  it('correctly identifies a point outside a path', () => {
    [{
      input: ['M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', 200, 100],
      expected: false,
    }, {
      input: ['M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z', 220, 50],
      expected: false,
    }, {
      input: ['M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z', 115, 200],
      expected: false,
    }, {
      input: ['M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z', 250, 235],
      expected: false,
    }].forEach(({input, expected}) => {
      expect(pointInSvgPath(...input)).toBe(expected)
    })
  })
})

describe('getPointsAndIntersectingPaths tests', () => {
  it('correctly identifies a point inside a path', () => {
    [{
      input: [
        [{id: 'path-0', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z'}],
        [{id: 'point-0', x: 100, y: 100}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0', x: 100, y: 100}],
    }, {
      input: [
        [{id: 'path-0', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z'}],
        [{id: 'point-0', x: 100.1, y: 100.1}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0', x: 100.1, y: 100.1}],
    }, {
      input: [
        [{id: 'path-0', data: 'M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z'}],
        [{id: 'point-0', x: 220, y: 100}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0', x: 220, y: 100}],
    }, {
      input: [
        [{id: 'path-0', data: 'M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z'}],
        [{id: 'point-0', x: 115, y: 235}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0', x: 115, y: 235}],
    }, {
      input: [
        [{id: 'path-0', data: 'M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z'}],
        [{id: 'point-0', x: 300, y: 235}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0', x: 300, y: 235}],
    }].forEach(({input, expected}) => {
      expect(getPointsAndIntersectingPaths(...input)).toEqual(expected)
    })
  })

  it('correctly identifies a point outside a path', () => {
    [{
      input: [
        [{id: 'path-0', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z'}],
        [{id: 'point-0', x: 200, y: 100}],
      ],
      expected: [{intersectingPathIds: [], pointId: 'point-0', x: 200, y: 100}],
    }, {
      input: [
        [{id: 'path-0', data: 'M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z'}],
        [{id: 'point-0', x: 220, y: 50}],
      ],
      expected: [{intersectingPathIds: [], pointId: 'point-0', x: 220, y: 50}],
    }, {
      input: [
        [{id: 'path-0', data: 'M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z'}],
        [{id: 'point-0', x: 115, y: 200}],
      ],
      expected: [{intersectingPathIds: [], pointId: 'point-0', x: 115, y: 200}],
    }, {
      input: [
        [{id: 'path-0', data: 'M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z'}],
        [{id: 'point-0', x: 250, y: 235}],
      ],
      expected: [{intersectingPathIds: [], pointId: 'point-0', x: 250, y: 235}],
    }].forEach(({input, expected}) => {
      expect(getPointsAndIntersectingPaths(...input)).toEqual(expected)
    })
  })
})
