module.exports = (api) => {
  const env = process.env.NODE_ENV || 'development';

  // invalidate the cache for this config when env changes
  api.cache.using(() => env);

  return {
    exclude: ['/node_modules/'],
    presets: ['@babel/preset-env'],
  };
};
