// Creates New Cache Object
import { LRUCache } from 'lru-cache';

const options = {
	max: 100
};

const r6Cache = new LRUCache(options);

export default r6Cache;
