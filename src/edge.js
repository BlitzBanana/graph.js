class Edge {
  constructor(originId, desinationId, config) {
    this.from = originId;
    this.to = desinationId;
    this.config = config || {};
  }
}

export default Edge;
