import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import { Helmet } from "react-helmet"
import StandardLink from "./StandardLink"

const Nav: React.FC = () => (
  <nav className="pb-12 2xl:absolute 2xl:left-8">
    <Link to="/">
      <StaticImage
        src="../images/avatar.png"
        alt="Home"
        height={64}
        className="rounded-full h-12 w-12 2xl:h-16 2xl:w-16"
      />
    </Link>
  </nav>
)

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Helmet
        titleTemplate="%s | veselin.dev"
        htmlAttributes={{
          lang: "en",
        }}
      >
        <title>Veselin Romić</title>
        <meta name="description" content="Turning ☕ into 💾 since 19XX" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-8 pt-8 pb-28 2xl:pt-12">
        <Nav />
        {children}
      </div>
      <footer className="flex items-center justify-center py-6 text-gray-500 dark:text-gray-400">
        <span>
          Built with ❤ using{" "}
          <StandardLink className="text-gray-600" href="https://reactjs.org/">
            React
          </StandardLink>{" "}
          and{" "}
          <StandardLink
            className="text-gray-600"
            href="https://www.gatsbyjs.com/"
          >
            Gatsby
          </StandardLink>
          .
        </span>
      </footer>
    </>
  )
}

export default Layout
