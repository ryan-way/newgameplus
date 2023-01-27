import path from 'path';
const port = process.env.PORT || 5173;

export const LOCALHOST = `http://localhost:${port}`;
export const PRELOAD_PATH = path.join(__dirname, '..', 'preload', 'preload.cjs');
export const COMPUTE_INDEX_PATH = path.join('..', 'compute', 'index.html');
