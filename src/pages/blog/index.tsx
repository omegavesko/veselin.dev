import {
  differenceInDays,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"
import { BlogPostsQuery } from "../../../graphql-types"
import AccessibleLink from "../../components/AccessibleLink"
import ReadingTime from "../../components/ReadingTime"

export interface BlogIndexPageProps {}

const BlogIndexPage: React.FC<BlogIndexPageProps> = () => {
  const { posts } = useStaticQuery<BlogPostsQuery>(graphql`
    query BlogPosts {
      posts: allMdx(
        filter: { fileAbsolutePath: { glob: "**/blog-posts/*.mdx" } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          slug
          excerpt
          timeToRead
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
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <h1 className="mb-16 text-5xl font-medium">Blog</h1>
      <div className="flex flex-col gap-8">
        {posts.nodes.map(post => {
          const showRelativeTime =
            differenceInDays(new Date(), parseISO(post.frontmatter.date)) >= 1

          return (
            <div className="relative flex flex-col">
              <AccessibleLink to={`/blog/${post.slug}`}>
                <h2 className="mb-3 text-3xl font-medium">
                  {post.frontmatter.title}
                </h2>
              </AccessibleLink>
              <div className="mb-1 text-sm">
                <time dateTime={post.frontmatter.date}>
                  {format(parseISO(post.frontmatter.date), "MMMM do, yyyy")}
                  {showRelativeTime && (
                    <>
                      {" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        (
                        {formatDistanceToNow(parseISO(post.frontmatter.date), {
                          addSuffix: true,
                        })}
                        )
                      </span>
                    </>
                  )}
                </time>
                <span className="mx-2 text-gray-500 dark:text-gray-400">
                  &middot;
                </span>
                <ReadingTime minutes={post.timeToRead} />
              </div>

              <p className="text-base text-gray-500 dark:text-gray-400">
                {post.excerpt}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default BlogIndexPage
