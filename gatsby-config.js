const plugins = [
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-image`,
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
      path: `${__dirname}/src/pages/blog`,
      ignore: [`**/index.tsx`],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-postcss`,
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      defaultLayouts: {
        default: require.resolve("./src/components/BlogPostLayout.tsx"),
      },
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
