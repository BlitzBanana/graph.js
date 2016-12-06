import _ from 'lazy.js';
import Node from './node';
import Edge from './edge';

let ID = 0;

class Graph {
  constructor() {
    this.nodes = {};
    this.edges = [];
  }

  add(config) {
    const id = ++ID;
    this.nodes[id] = new Node(id, config);
    return this.nodes[id];
  }

  remove(nodeId) {
    delete this.nodes[nodeId];
    this.disconnect(nodeId);
  }

  connect(originId, desinationId, config) {
    const edge = new Edge(originId, desinationId, config);
    this.edges.push(edge);
    return edge;
  }

  disconnect(originId, destinationId) {
    if (originId > 0 && destinationId > 0) {
      this.edges = _(this.edges)
                    .filter(x => (x.from !== originId && x.to !== destinationId))
                    .toArray();
    } else if (originId > 0) {
      this.edges = _(this.edges)
                    .filter(x => !(x.from !== originId || x.to !== originId))
                    .toArray();
    }
  }

  getConnections(nodeIdA, nodeIdB) {
    if (nodeIdA > 0 && nodeIdB > 0) {
      return _(this.edges)
                    .filter(x => ((x.from === nodeIdA && x.to === nodeIdB) || (x.from === nodeIdB && x.to === nodeIdA)))
                    .toArray();
    } else if (nodeIdA > 0) {
      return _(this.edges)
                    .filter(x => (x.from === nodeIdA || x.to === nodeIdA))
                    .toArray();
    }
  }
}

export default Graph;
