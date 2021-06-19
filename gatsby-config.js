const plugins = [
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Veselin Romić`,
      short_name: `Veselin Romić`,
      start_url: `/`,
      icon: `src/images/icon.png`,
      background_color: `#ffffff`,
      theme_color: `#ffffff`,
      display: `standalone`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `blog-posts`,
      path: `${__dirname}/src/blog-posts`,
      ignore: [`**/index.tsx`],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-postcss`,
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [`gatsby-remark-smartypants`],
      rehypePlugins: [require("rehype-slug")],
    },
  },
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/components/Layout.tsx`),
    },
  },
  `gatsby-plugin-graphql-codegen`,
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl: `https://veselin.dev`,
      stripQueryString: true,
    },
  },
]

if (process.env.NODE_ENV === "production") {
  plugins.push(`gatsby-plugin-preact`)
}

module.exports = {
  siteMetadata: {
    title: `Veselin Romić`,
    description: `Turning ☕ into 💾 since 19XX`,
    author: `@omegavesko`,
  },
  plugins,
}
