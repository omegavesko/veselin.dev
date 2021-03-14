module.exports = {
  siteMetadata: {
    title: `Veselin Romić`,
    description: `Turning ☕ into 💾 since 19XX`,
    author: `@omegavesko`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`
  ]
}
