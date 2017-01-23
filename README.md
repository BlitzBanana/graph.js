# graph.js
> Dead simple graph library

[![Build Status](https://travis-ci.org/BlitzBanana/graph.js.svg?branch=master)](https://travis-ci.org/BlitzBanana/graph.js)
[![Coverage Status](https://coveralls.io/repos/github/BlitzBanana/graph.js/badge.svg?branch=master)](https://coveralls.io/github/BlitzBanana/graph.js?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Getting Started

Not published on NPM, I did this to test tools (ava, xo, nyc, travis, coveralls).

### Basic Example

```js
const graph = new Graph();
const nodeA = graph.add({name: 'Paris', country: 'France'});
const nodeB = graph.add({name: 'Berlin', country: 'Germany'});
const nodeC = graph.add({name: 'Brussels', country: 'Belgium'});

console.log(nodeA.name);                      // Paris
console.log(graph.nodes.get(nodeB.id).name);  // Berlin
console.log(graph.nodes.count);               // 3

graph.connect(nodeA, nodeB, {type: 'highway', speedlimit: 130});
graph.connect(nodeB, nodeA, {type: 'highway', speedlimit: Infinity});

graph.connect(nodeB, nodeC, {type: 'highway', speedlimit: 130});
graph.connect(nodeC, nodeB, {type: 'highway', speedlimit: 130});

graph.connect(nodeA, nodeC, {type: 'highway', speedlimit: 130});
graph.connect(nodeC, nodeA, {type: 'highway', speedlimit: 130});

console.log(graph.edges.count, 6);      // 6
console.log(nodeA.edges[0].type);       // highway
console.log(nodeA.edges[0].speedlimit); // 130

graph.disconnect(nodeA, nodeB);         // Deletes only A->B

console.log(graph.edges.count);         // 5

graph.disconnect(nodeC);                // Deletes all C edges (C->B, B->C, C->A, A->C)

console.log(graph.edges.count);         // 1

graph.remove(nodeB);                    // Removes B and B->A

console.log(graph.nodes.count);         // 2
console.log(graph.edges.count);         // 0
```
