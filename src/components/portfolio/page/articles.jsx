/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* import ListItem from '../components/ListItem'
import FeaturedArticle from '../components/FeaturedArticle'
import FeaturedArticles from '../..'
import { ListGroup } from '../components/ListGroup'
import { AnimateSharedLayout } from 'framer-motion'

function Articles() {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        )
      }
    })
  }

  return (
    <>
      <AnimateSharedLayout>
        <p>Here you can find all the <strong>${props.allPosts.length} articles</strong> I wrote. You can read about web development, software engineering, and tech career in both English and Portuguese.</p>

        <h2>Featured Articles</h2>
        <FeaturedArticles>{renderFeatured()}</FeaturedArticles>

        <h2>All Articles</h2>
        <ListGroup>{renderAll()}</ListGroup>
      </AnimateSharedLayout>
    </>
  )
}

export default Articles */
import React from 'react'

function articles() {
  return (
    <div>articles</div>
  )
}

export default articles