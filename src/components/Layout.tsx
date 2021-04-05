import { Link, GatsbyLinkProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import { Helmet } from "react-helmet"
import StandardLink from "./StandardLink"
import { HiArrowNarrowLeft } from "react-icons/hi"
import { useLocation } from "@reach/router"

const NavLink: React.FC<GatsbyLinkProps<any>> = ({ children, ...props }) => {
  const location = useLocation()

  const isCurrent = () => {
    if (props.to === "/") {
      return location.pathname === props.to
    } else {
      return location.pathname.startsWith(props.to)
    }
  }

  return (
    <Link className="flex items-center gap-2 text-xl" {...(props as any)}>
      {children}
      {isCurrent() && (
        <HiArrowNarrowLeft
          aria-label=""
          className="hidden text-gray-400 dark:text-gray-500 2xl:inline"
        />
      )}
    </Link>
  )
}

const Nav: React.FC = () => (
  <nav className="pb-12 flex items-center gap-4 2xl:absolute 2xl:left-8 2xl:flex-col 2xl:items-stretch 2xl:w-48">
    <Link to="/" className="rounded-full">
      <StaticImage
        src="../images/avatar.png"
        alt="Home"
        height={64}
        className="mr-4 rounded-full h-12 w-12 2xl:h-16 2xl:w-16 2xl:mx-0 2xl:mb-4"
      />
    </Link>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/blog">Blog</NavLink>
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
