import * as React from "react"
import * as styles from "../styles/blog-post.module.css"
import CodeBlock from "../components/blog/CodeBlock"
import { MDXProvider } from "@mdx-js/react"
import StandardLink from "../components/StandardLink"
import {
  format,
  parseISO,
  formatDistanceToNow,
  differenceInYears,
} from "date-fns"
import { Helmet } from "react-helmet"
import { buildOgImageUrl } from "../utils/ogImage"
import Links from "../components/Links"
import { graphql } from "gatsby"
import { MdxQuery } from "../../graphql-types"
import { MDXRenderer } from "gatsby-plugin-mdx"
import ReadingTime from "../components/ReadingTime"

const InlineCode: React.FC = ({ children }) => (
  <code
    style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}
    className="mx-0.5 px-2 py-0.5 rounded text-base tracking-tight bg-gray-100 dark:bg-gray-700"
  >
    {children}
  </code>
)

const mdxComponents = {
  pre: CodeBlock,
  a: StandardLink,
  inlineCode: InlineCode,
}

export interface BlogPostLayoutProps {
  data: MdxQuery
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ data }) => {
  const date = parseISO(data.mdx.frontmatter.date)
  const showDateWarning = differenceInYears(new Date(), date) >= 2

  const coffeeCount = Math.max(1, Math.floor(data.mdx.timeToRead / 5))

  return (
    <>
      <Helmet>
        <title>{data.mdx.frontmatter.title}</title>

        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.mdx.frontmatter.title} />
        <meta name="description" content="" />
        <meta
          property="article:published_time"
          content={data.mdx.frontmatter.date}
        />
        <meta property="article:author" content="https://veselin.dev" />
        <meta
          property="og:image"
          content={buildOgImageUrl(data.mdx.frontmatter.title)}
        />
        <meta property="og:image:width" content="2048" />
        <meta property="og:image:height" content="1170" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.mdx.frontmatter.title} />
        <meta
          name="twitter:image"
          content={buildOgImageUrl(data.mdx.frontmatter.title)}
        />
      </Helmet>
      <MDXProvider components={mdxComponents}>
        <h1 className="mb-4 text-5xl text-gray-800 font-medium leading-none dark:text-gray-200">
          {data.mdx.frontmatter.title}
        </h1>
        <time dateTime={data.mdx.frontmatter.date}>
          {format(date, "MMMM do, yyyy")}{" "}
          <span className="text-gray-500 dark:text-gray-400">
            ({formatDistanceToNow(date, { addSuffix: true })})
          </span>
        </time>
        <span className="mx-2 text-gray-500 dark:text-gray-400">&middot;</span>
        <ReadingTime minutes={data.mdx.timeToRead} />
        {showDateWarning && (
          <div className="mt-8 py-3 px-4 rounded-xl bg-red-100 text-red-900 dark:bg-red-900 dark:text-white">
            Be careful! This post is{" "}
            <strong className="font-medium">over two years old</strong>. Tech
            can change really fast, so make sure the advice here is still valid
            before using it, especially if the post contains code samples.
          </div>
        )}
        <div className={`${styles.container} mb-12`}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </div>
        <div>
          <p className="mb-4 text-gray-500 dark:text-gray-400">
            Thanks for reading all the way through! 🥰 If you'd like to get in
            touch or check out what else I've worked on, here's some links you
            might be interested in.
          </p>
          <Links />
        </div>
      </MDXProvider>
    </>
  )
}

export default BlogPostLayout

export const query = graphql`
  query MDX($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      timeToRead
      frontmatter {
        title
        date
      }
    }
  }
`
