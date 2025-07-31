import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // vite.config.js
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    iconsSpritesheet({
      withTypes: true,
      inputDir: 'src/assets/icons',
      outputDir: 'public/icons',
      typesOutputFile: 'src/types.ts/icons.ts',
      formatter: 'biome',
      iconNameTransformer: (iconName) => iconName,
    }),
  ],
});
