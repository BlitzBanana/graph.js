import _ from 'lazy.js';
import Node from './node';
import Edge from './edge';
import Dictionary from './collections/dictionary';

let ID = -1;

class Graph {
  constructor() {
    this.nodes = new Dictionary();
    this.edges = new Dictionary();
  }

  add(config) {
    const id = ++ID;
    const node = new Node(this, id, config);
    this.nodes.add(id, node);
    return node;
  }

  remove(node) {
    this.disconnect(node);
    this.nodes.remove(node.id);
  }

  connect(origin, destination, config) {
    const id = ++ID;
    const edge = new Edge(this, id, origin, destination, config);
    this.edges.add(id, edge);
    return edge;
  }

  disconnect(origin, destination) {
    if (origin && destination) {
      this.edges = new Dictionary(_(this.edges.values)
                    .filter(x => !(x.from.id === origin.id && x.to.id === destination.id))
                    .map(x => [x.id, x])
                    .toObject());
    } else if (origin) {
      this.edges = new Dictionary(_(this.edges.values)
                    .filter(x => !(x.from.id === origin.id || x.to.id === origin.id))
                    .map(x => [x.id, x])
                    .toObject());
    }
  }

  getConnections(nodeA, nodeB) {
    if (nodeA && nodeB) {
      return _(this.edges.values)
                    .filter(x => ((x.from.id === nodeA.id && x.to.id === nodeB.id) || (x.from.id === nodeB.id && x.to.id === nodeA.id)))
                    .toArray();
    } else if (nodeA) {
      return _(this.edges.values)
                    .filter(x => (x.from.id === nodeA.id || x.to.id === nodeA.id))
                    .toArray();
    }
  }
}

export default Graph;
