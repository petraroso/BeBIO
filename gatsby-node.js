/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
 
exports.createPages = async ({ graphql, actions }) => {
  const raw = await graphql(`query {
    allContentfulBlogPost {
      nodes {
        summary {
          internal {
            content
          }
        }
        body {
          raw
        }
        title
        slug
        tags
        updatedAt
        coverImage {
          fluid(quality: 90, maxWidth: 1920){
            src
            srcSet
            srcSetWebp
            srcWebp
            base64
            aspectRatio
          }
        }
      }
    }
    allContentfulCarousel(limit: 6) {
      nodes {
        body {
          raw
        }
        title
        slug
        tags
        authorsName
        coverImage {
          fluid(quality: 90, maxWidth: 1920) {
            src
            srcSet
            srcSetWebp
            srcWebp
            base64
            aspectRatio
          }
        }
      }
    }
  
    allContentfulBlogFeed(limit:20) {
    nodes {
      summary {
        internal {
          content
        }
      }
      body {
        raw
      }
      title
      slug
      tags
      authorsName
      updatedAt
      coverImage {
        fluid(quality: 90, maxWidth: 1920){
          src
          srcSet
          srcSetWebp
          srcWebp
          base64
          aspectRatio
        }
      }
    }
  }

}`)
 
  const res = raw.data.allContentfulBlogPost.nodes
 
  res.forEach((e, index, array) => actions.createPage({
    component: path.resolve(`./src/layouts/profile.js`),
    context: {
      ...e,
      next: index < array.length ? array[index + 1] : null,
      prev: index > 0 ? array[index - 1] : null
    },
    path: `profilePosts/${e.slug}`,
    slug: `profilePosts/${e.slug}`
  }))

  const res1 = raw.data.allContentfulCarousel.nodes
 
  res1.forEach((e, index, array) => actions.createPage({
    component: path.resolve(`./src/layouts/index.js`),
    context: {
      ...e,
      next: index < array.length ? array[index + 1] : null,
      prev: index > 0 ? array[index - 1] : null
    },
    path: `hottestPosts/${e.slug}`,
    slug: `hottestPosts/${e.slug}`
  }))

  const res2 = raw.data.allContentfulBlogFeed.nodes
 
  res2.forEach((e, index, array) => actions.createPage({
    component: path.resolve(`./src/layouts/blog.js`),
    context: {
      ...e,
      next: index < array.length ? array[index + 1] : null,
      prev: index > 0 ? array[index - 1] : null
    },
    path: `blogPosts/${e.slug}`,
    slug: `blogPosts/${e.slug}`
  }))

  const res3 = raw.data.allContentfulBlogFeed.nodes
 
  res3.forEach((e, index, array) => actions.createPage({
    component: path.resolve(`./src/layouts/bookmarks.js`),
    context: {
      ...e,
      next: index < array.length ? array[index + 1] : null,
      prev: index > 0 ? array[index - 1] : null
    },
    path: `bookmarkPosts/${e.slug}`,
    slug: `bookmarkPosts/${e.slug}`
  }))
}