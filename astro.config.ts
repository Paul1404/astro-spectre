import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

const {
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  GISCUS_MAPPING,
  GISCUS_STRICT,
  GISCUS_REACTIONS_ENABLED,
  GISCUS_EMIT_METADATA,
  GISCUS_LANG
} = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
const config = defineConfig({
  site: 'https://spectre.lou.gg',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: "Spectre",
      openGraph: {
        home: {
          title: "Spectre",
          description: "A minimalistic theme for Astro.",
        },
        blog: {
          title: "Blog",
          description: "News and guides for Spectre.",
        },
        projects: {
          title: "Projects",
        },
      },
      giscus: {
        repository: GISCUS_REPO || "Paul1404/astro-spectre",
        repositoryId: GISCUS_REPO_ID || "R_kgDOP03HBA",
        category: GISCUS_CATEGORY || "General",
        categoryId: GISCUS_CATEGORY_ID || "DIC_kwDOP03HBM4CvxDh",
        mapping: (GISCUS_MAPPING as any) || "pathname",
        strict: GISCUS_STRICT === "true" || false,
        reactionsEnabled: GISCUS_REACTIONS_ENABLED === "true" || true,
        emitMetadata: GISCUS_EMIT_METADATA === "true" || false,
        lang: GISCUS_LANG || "en",
      },
    })
  ],
  adapter: node({
    mode: 'standalone'
  })
});

export default config;
