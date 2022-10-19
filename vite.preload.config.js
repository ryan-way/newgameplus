const config = {
  mode: process.env.MODE,
  build: {
    ssr: true,
    sourcemap: 'inline',
    outDir: 'out/preload',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/electron/preload.ts',
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
