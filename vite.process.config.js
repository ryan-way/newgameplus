const config = {
  mode: process.env.MODE,
  ssr: true,
  publicDir: 'src/compute/static',
  build: {
    sourcemap: 'inline',
    outDir: 'dist/index/',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/compute/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
};

export default config;
