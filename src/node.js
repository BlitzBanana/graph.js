class Node {
  constructor(graph, id, config = {}) {
    this._graph = graph;
    this.id = id;
    Object
      .keys(config)
      .forEach(key => {
        this[key] = config[key];
      });
  }

  get edges() {
    return this._graph.getConnections(this);
  }

  disconnect() {
    this._graph.disconnect(this);
  }

  delete() {
    this._graph.remove(this);
  }
}

export default Node;
