import LRU from 'lru-cache';

const cache = new LRU({ max: 10 });

export default cache;
