import * as React from "react"
import Layout from "./Layout"
import * as styles from "../styles/blog-post.module.css"
import CodeBlock from "./blog/CodeBlock"
import { MDXProvider } from "@mdx-js/react"
import StandardLink from "./StandardLink"
import {
  format,
  parseISO,
  formatDistanceToNow,
  differenceInYears,
} from "date-fns"

const InlineCode: React.FC = ({ children }) => (
  <code
    style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}
    className="mx-0.5 px-2 py-0.5 rounded text-base tracking-tight dark:bg-gray-700"
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
  pageContext: {
    frontmatter: {
      title: string
      date: string
    }
  }
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({
  children,
  pageContext,
}) => {
  const date = parseISO(pageContext.frontmatter.date)
  const showDateWarning = differenceInYears(new Date(), date) >= 2

  return (
    <MDXProvider components={mdxComponents}>
      <Layout>
        <h1 className="mb-4 text-5xl text-gray-800 font-medium leading-none dark:text-gray-200">
          {pageContext.frontmatter.title}
        </h1>
        <time
          className="text-gray-800 dark:text-gray-200"
          dateTime={pageContext.frontmatter.date}
        >
          {format(date, "MMMM do, yyyy")}{" "}
          <span className="dark:text-gray-400">
            ({formatDistanceToNow(date, { addSuffix: true })})
          </span>
        </time>
        {showDateWarning && (
          <div className="mt-8 py-3 px-4 bg-red-900 rounded-xl">
            Be careful! This post is{" "}
            <strong className="font-medium">over two years old</strong>. Tech
            can change really fast, so make sure the advice here is still valid
            before using it, especially if the post contains code samples.
          </div>
        )}
        <div className={styles.container}>{children}</div>
      </Layout>
    </MDXProvider>
  )
}

export default BlogPostLayout