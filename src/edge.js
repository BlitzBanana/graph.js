class Edge {
  constructor(graph, id, origin, desination, config = {}) {
    if (!origin) {
      throw new Error('Origin is null');
    }
    if (!desination) {
      throw new Error('Desination is null');
    }
    this._graph = graph;
    this.id = id;
    this.from = origin;
    this.to = desination;
    Object
      .keys(config)
      .forEach(key => {
        this[key] = config[key];
      });
  }

  delete() {
    this._graph.edges.remove(this.id);
  }
}

export default Edge;
