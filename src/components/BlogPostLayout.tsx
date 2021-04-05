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

const mdxComponents = {
  pre: CodeBlock,
  a: StandardLink,
  inlineCode: ({ children }) => (
    <code className="text-yellow-400">{children}</code>
  ),
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
        <h1 className={styles.title}>{pageContext.frontmatter.title}</h1>
        <time dateTime={pageContext.frontmatter.date}>
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
