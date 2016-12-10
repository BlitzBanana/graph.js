import test from 'ava';
import Graph from './src/index';
import Dictionary from './src/collections/dictionary';

test('Dictionary', t => {
  let dic = new Dictionary();
  t.is(dic.length, 0);

  dic = new Dictionary({France: 'Paris', Germany: 'Berlin'});
  t.is(dic.length, 2);
  t.is(dic.count, 2);

  t.is(dic.keys[0], 'France');
  t.is(dic.keys[1], 'Germany');

  t.is(dic.values[0], 'Paris');
  t.is(dic.values[1], 'Berlin');

  dic.add('Belgium', 'Brussels');

  t.is(dic.length, 3);
  t.is(dic.count, 3);

  t.is(dic.keys[2], 'Belgium');
  t.is(dic.values[2], 'Brussels');

  t.true(dic.containsKey('Belgium'));
  t.false(dic.containsKey('Italy'));

  t.true(dic.containsValue('Paris'));
  t.false(dic.containsValue('Roma'));

  dic.remove('Belgium');

  t.is(dic.length, 2);
  t.is(dic.count, 2);

  t.throws(() => {
    dic.add(undefined, 'London');
  }, 'Key is undefined');

  t.throws(() => {
    dic.remove('Spain');
  }, 'Key does not exists');
});

test('Node ID is equal or greater than zero', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  t.is(nodeA.id >= 0, true);
});

test('Node IDs are differents', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  t.is(nodeA.id === nodeB.id, false);
});

test('Nodes have config', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  t.is(nodeA.name, 'A');
});

test('Edges have configs', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA.id, nodeB.id, {speed: 10});
  const edges = graph.getConnections(nodeA.id, nodeB.id);
  t.is(edges[0].speed, 10);
});

test('Nodes can connect', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  const conn = graph.connect(nodeA, nodeB, {speed: 10});
  t.is(conn.from, nodeA);
  t.is(conn.to, nodeB);
  t.is(conn.speed, 10);
});

test('Graph can get connection between two nodes', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA, nodeB);
  graph.connect(nodeB, nodeA);
  const edges = graph.getConnections(nodeA, nodeB);
  t.is(edges.length, 2);
});

test('Graph can get connection of one node', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA, nodeB);
  graph.connect(nodeB, nodeA);
  const edges = graph.getConnections(nodeA);
  t.is(edges.length, 2);
});

test('Node can get its connections', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA, nodeB);
  graph.connect(nodeB, nodeA);
  const edges = nodeA.edges;
  t.is(edges.length, 2);
});

test('Two nodes can disconnect', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA, nodeB);
  graph.connect(nodeB, nodeA);
  t.is(graph.edges.count, 2);
  graph.disconnect(nodeA, nodeB);
  t.is(graph.edges.count, 1);
});

test('One node can disconnect', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA, nodeB, {speed: 10});
  graph.connect(nodeB, nodeA, {speed: 5});
  t.is(graph.edges.count, 2);
  graph.disconnect(nodeA);
  t.is(graph.edges.count, 0);
});

test('One node can disconnect itself', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA, nodeB, {speed: 10});
  graph.connect(nodeB, nodeA, {speed: 5});
  t.is(graph.edges.count, 2);
  nodeA.disconnect();
  t.is(graph.edges.count, 0);
});

test('One node can delete itself', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA, nodeB, {speed: 10});
  graph.connect(nodeB, nodeA, {speed: 5});
  t.is(graph.edges.count, 2);
  nodeA.delete();
  t.is(graph.edges.count, 0);
});

test('One edge can delete itself', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  const edgeAB = graph.connect(nodeA, nodeB, {speed: 10});
  graph.connect(nodeB, nodeA, {speed: 5});
  t.is(graph.edges.count, 2);
  edgeAB.delete();
  t.is(graph.edges.count, 1);
});

test('Graph can delete a node', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  t.is(graph.nodes.get(nodeA.id), nodeA);
  graph.remove(nodeA);
  t.is(graph.nodes.get(nodeA.id), undefined);
});

test('How Graph API should be', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'Paris', country: 'France'});
  const nodeB = graph.add({name: 'Berlin', country: 'Germany'});
  const nodeC = graph.add({name: 'Brussels', country: 'Belgium'});

  t.is(nodeA.name, 'Paris');
  t.is(graph.nodes.get(nodeB.id).name, 'Berlin');
  t.is(graph.nodes.count, 3);

  graph.connect(nodeA, nodeB, {type: 'highway', speedlimit: 130});
  graph.connect(nodeB, nodeA, {type: 'highway', speedlimit: Infinity});

  graph.connect(nodeB, nodeC, {type: 'highway', speedlimit: 130});
  graph.connect(nodeC, nodeB, {type: 'highway', speedlimit: 130});

  graph.connect(nodeA, nodeC, {type: 'highway', speedlimit: 130});
  graph.connect(nodeC, nodeA, {type: 'highway', speedlimit: 130});

  t.is(graph.edges.count, 6);
  t.is(nodeA.edges[0].type, 'highway');
  t.is(nodeA.edges[0].speedlimit, 130);

  graph.disconnect(nodeA, nodeB); // Deletes only A->B

  t.is(graph.edges.count, 5);

  graph.disconnect(nodeC); // Deletes all C edges (C->B, B->C, C->A, A->C)

  t.is(graph.edges.count, 1);

  graph.remove(nodeB); // Removes B and B->A

  t.is(graph.nodes.count, 2);
  t.is(graph.edges.count, 0);
});
