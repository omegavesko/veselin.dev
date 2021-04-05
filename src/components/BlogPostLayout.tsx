import * as React from "react"
import Layout from "./Layout"
import * as styles from "../styles/blog-post.module.css"
import CodeBlock from "./blog/CodeBlock"
import { MDXProvider } from "@mdx-js/react"
import StandardLink from "./StandardLink"

const mdxComponents = {
  pre: CodeBlock,
  a: StandardLink,
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
  return (
    <MDXProvider components={mdxComponents}>
      <Layout>
        <h1 className={styles.title}>{pageContext.frontmatter.title}</h1>
        <time dateTime={pageContext.frontmatter.date}>
          {pageContext.frontmatter.date}
        </time>
        <div className={styles.container}>{children}</div>
      </Layout>
    </MDXProvider>
  )
}

export default BlogPostLayout
