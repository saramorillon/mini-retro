import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 4000, proxy: { '/api': 'http://localhost:3000' } },
  test: {
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.test.ts*'],
    exclude: ['dist'],
    coverage: {
      exclude: ['mocks'],
    },
  },
})
