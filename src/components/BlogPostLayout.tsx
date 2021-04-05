import * as React from "react"
import Layout from "./Layout"
import * as styles from "../styles/blog-post.module.css"

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
    <Layout>
      <h1 className={styles.title}>{pageContext.frontmatter.title}</h1>
      <time dateTime={pageContext.frontmatter.date}>
        {pageContext.frontmatter.date}
      </time>
      <div className={styles.container}>{children}</div>
    </Layout>
  )
}

export default BlogPostLayout
