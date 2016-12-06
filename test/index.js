import test from 'ava';
import Graph from '../src/index';

test('Node ID is greater than zero', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  t.is(nodeA.id > 0, true);
});

test('Node IDs are differents', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  t.is(nodeA.id === nodeB.id, false);
});

test('Node configs works', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  t.is(nodeA.config.name, 'A');
});

test('Node connections works', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  const conn = graph.connect(nodeA.id, nodeB.id, {speed: 10});
  t.is(conn.from, nodeA.id);
  t.is(conn.to, nodeB.id);
  t.is(conn.config.speed, 10);
});

test('Node connections retrieval', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA.id, nodeB.id, {speed: 10});
  graph.connect(nodeB.id, nodeA.id, {speed: 5});
  const conns = graph.getConnections(nodeA.id, nodeB.id);
  t.is(conns.length, 2);
});

test('Node disconnection works', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA.id, nodeB.id, {speed: 10});
  graph.connect(nodeB.id, nodeA.id, {speed: 5});
  graph.disconnect(nodeA.id, nodeB.id);
  const conns = graph.getConnections(nodeA.id, nodeB.id);
  t.is(conns.length, 1);
});

test('Single Node disconnection works', t => {
  const graph = new Graph();
  const nodeA = graph.add({name: 'A'});
  const nodeB = graph.add({name: 'B'});
  graph.connect(nodeA.id, nodeB.id, {speed: 10});
  graph.connect(nodeB.id, nodeA.id, {speed: 5});
  graph.disconnect(nodeA.id);
  const conns = graph.getConnections(nodeA.id, nodeB.id);
  t.is(conns.length, 0);
});
