// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const withImages = require("next-images");
const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");
const path = require("path");
const loaderUtils = require('loader-utils');

const assetsCacheMaxAge = process.env.NEXT_PUBLIC_ASSETS_CACHE_MAX_AGE || 31536000

const hashOnlyIdent = (context, _, exportName) => {
  const result = loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, '/')}#className:${exportName}`
      ),
      'md4',
      'base64',
      6
    )
    .replace(/^(-?\d|--)/, '_$1')
    .replaceAll('+', '_')
    .replaceAll('/', '_')

  return result
}

const assetsHeaders = [
  "/fonts/:slug*",
  "/images/:slug*",
].map((source) => ({
  source: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${source}`,
  headers: [{ key: "cache-control", value: `public; max-age=${assetsCacheMaxAge}` }]
}))

const isUseTranscript = process.env.NEXT_PUBLIC_IS_USE_TRANSCRIPT === "true"
let locales = ["vi"];
if (!isUseTranscript) {
  locales.push("en")
}
module.exports = async (phase) => {
  /** @type {import("next").NextConfig} */
  const nextConfig = {
    webpack: (config, { dev, isServer }) => {
      // https://github.com/webpack-contrib/mini-css-extract-plugin#recommended
      // For production builds it's recommended to extract the CSS from your bundle being able to use parallel loading of CSS/JS resources later on.
      // For development mode, using style-loader because it injects CSS into the DOM using multiple <style></style> and works faster.
      // if (!dev) {
      //   config.plugins.push(new MiniCssExtractPlugin({
      //     filename: 'static/chunks/[name].[fullhash].css',
      //     ignoreOrder: true
      //   }));
      // }
      // config.module.rules.push(
      //   {
      //     test: /\.(sa|sc|c)ss$/,
      //     use: [
      //       isServer ? { loader: 'file-loader' } : (dev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader }),
      //       { loader: 'css-loader' },
      //       { loader: 'sass-loader' }
      //     ]
      //   }
      // );
      const rules = config.module.rules
        .find((rule) => typeof rule.oneOf === 'object')
        .oneOf.filter((rule) => Array.isArray(rule.use))

      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader?.includes('css-loader') &&
            !moduleLoader.loader?.includes('postcss-loader')
          )
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent
        })
      })

      config.module.rules.forEach((rule) => {
        if (!rule.oneOf) return;
        rule.oneOf.forEach((el) => {
          if (!`${el.issuer?.and}`.includes('_app')) return;
          el.issuer.and = [path.resolve(__dirname)];
        })
      })

      return config;
    },
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    typescript: {
      ignoreBuildErrors: false
    },
    swcMinify: true,
    poweredByHeader: false,
    output: "standalone",
    compiler: {
      styledComponents: true,
    },
    reactStrictMode: false,
    images: {
      domains: [
        'storage.googleapis.com',
        'images.dmca.com',
        'platform-lookaside.fbsbx.com'
      ]
    },
    async rewrites() {
      return [
        {
          source: "/page-sitemap.xml",
          destination: "/api/_next/page-sitemap"
        },
        {
          source: "/robots.txt",
          destination: "/api/_next/robots"
        },
        ...(["news", "honor", "events"].flatMap((type) => {
          return [
            { source: `/${type}`, destination: `/_pageNews/${type}` },
            { source: `/${type}/:slug`, destination: `/_pageNews/${type}/:slug` },
            { source: `/${type}/:slug/:categoryPage`, destination: `/_pageNews/${type}/:slug/:categoryPage` },
          ]
        }))
      ]
    },
    async headers() {
      return [
        ...assetsHeaders
      ]
    },
    i18n: {
      locales: locales,
      defaultLocale: "vi",
      localeDetection: false,
    },
    env: {
      REVALIDATE_SECRET: process.env.REVALIDATE_SECRET
    },
    experimental: {
      scrollRestoration: true
    }
  }
  return withPlugins([withImages, withFonts], nextConfig)(phase, { defaultConfig: {} })
}
