import config from './vite.config.mjs';
export default {...config,test:{include:['*.test.ts'],environment:'node'}};
