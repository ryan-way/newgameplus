const config = {
  mode: process.env.MODE,
  build: {
    ssr: true,
    sourcemap: 'inline',
    outDir: 'dist/compute-preload',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/compute/preload.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
};

export default config;
