const config = {
  mode: process.env.MODE,
  build: {
    ssr: true,
    sourcemap: 'inline',
    outDir: 'dist/preload',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/electron/window/preload.ts',
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
