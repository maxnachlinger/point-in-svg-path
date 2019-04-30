## point-in-svg-path

> Determines if a point is in a SVG path - code cribbed from [Snap.svg - path.js](https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js)

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://travis-ci.org/maxnachlinger/point-in-svg-path.svg?branch=master
[travis-url]: https://travis-ci.org/maxnachlinger/point-in-svg-path
[npm-image]: https://img.shields.io/npm/v/point-in-svg-path.svg?style=flat
[npm-url]: https://npmjs.org/package/point-in-svg-path


### Examples
Check if a single point is inside a single closed path:
```javascript
const { pointInSvgPath } = require('point-in-svg-path')

pointInSvgPath('M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', 100, 100) // true
pointInSvgPath('M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z', 115, 200) // false
```
Check which points intersect which paths:
```javascript
const { getPointsAndIntersectingPaths } = require('point-in-svg-path')

const results = getPointsAndIntersectingPaths(
  [{ id: 'test-path', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z' }], 
  [{ id: 'test-point', x: 100, y: 100 }, { id: 'test-point', x:750, y: 500 }]
)

console.log(results)
/*
[ { pointId: 'test-point',
    x: 100,
    y: 100,
    intersectingPathIds: [ 'test-path' ] },
  { pointId: 'test-point', x: 750, y: 500, intersectingPathIds: [] } ]
*/
```
