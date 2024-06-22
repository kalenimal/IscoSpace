export default {
    root: 'src',
    publicDir: '../public',
    build:
    {
        outDir: '../build', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    assetsInclude: ['**/*.hdr']
}