// Creates New Cache Object for Rainbow Six Siege API fetch chaching
import { LRUCache } from 'lru-cache';

const options = {
	max: 100
};

const r6Cache = new LRUCache(options);

export default r6Cache;
