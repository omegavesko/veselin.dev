import { format, formatDistanceToNow, parseISO } from "date-fns"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { BlogPostsQuery } from "../../../graphql-types"
import AccessibleLink from "../../components/AccessibleLink"

export interface BlogIndexPageProps {}

const BlogIndexPage: React.FC<BlogIndexPageProps> = () => {
  const { posts } = useStaticQuery<BlogPostsQuery>(graphql`
    query BlogPosts {
      posts: allMdx(
        filter: { fileAbsolutePath: { glob: "**/pages/blog/*.mdx" } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          slug
          excerpt
          frontmatter {
            title
            date
          }
        }
      }
    }
  `)

  return (
    <>
      <h1 className="mb-16 text-5xl font-medium">Blog</h1>
      <div className="flex flex-col gap-8">
        {posts.nodes.map(post => (
          <div className="relative flex flex-col">
            <AccessibleLink to={`/blog/${post.slug}`}>
              <h2 className="mb-3 text-3xl font-medium">
                {post.frontmatter.title}
              </h2>
            </AccessibleLink>
            <time className="mb-1 text-sm" dateTime={post.frontmatter.date}>
              {format(parseISO(post.frontmatter.date), "MMMM do, yyyy")}{" "}
              <span className="text-gray-500 dark:text-gray-400">
                (
                {formatDistanceToNow(parseISO(post.frontmatter.date), {
                  addSuffix: true,
                })}
                )
              </span>
            </time>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogIndexPage
