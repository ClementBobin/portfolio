import ListItem from './ListItem.jsx'
import FeaturedArticle from './FeaturedArticle'
import { AnimateSharedLayout } from 'framer-motion'

export async function getStaticProps() {

  return {
    props: {
      featuredPosts,
      allPosts,
    },
  }
}

function Articles(props) {
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
        <p>Here you can find all the <strong>{props.allPosts.length} articles</strong> I wrote. You can read about web development, software engineering, and tech career in both English and Portuguese.</p>

        <h2 className="text-2xl font-bold">Featured Articles</h2>
        <div className="space-y-4 md:flex md:space-x-4 md:space-y-0">{renderFeatured()}</div>

        <h2 className="text-2xl font-bold mt-8">All Articles</h2>
        <div className="space-y-4">{renderAll()}</div>
      </AnimateSharedLayout>
    </>
  )
}

export default Articles