import { AnimateSharedLayout } from 'framer-motion'
import FeaturedProject from './featuredProject'
import items from '../../../constants/projects data'

function Projects() {
  const renderFeatured = () => {
    const featured = ['Dracula PRO', 'Clipboard.js', 'Resend', 'React Email']

    return items
      .map(item => {
        return item.projects.filter(project => featured.includes(project.title))
      })
      .filter(item => {
        if (item.length > 0) {
          return item
        }
      })
      .flat()
      .map((item, index) => {
        return <FeaturedProject key={index} project={item} />
      })
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          <ul>
            {item.projects.map((project, pIndex) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
      )
    })
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  return (
    <main>
      <div>
        <div>
          <AnimateSharedLayout>
            <h1 className='project'>What i created</h1>
            <p>I'm obsessed with side projects and <strong>building in public</strong>. Here you can navigate to <strong>${getTotalProjects()} different</strong> websites, apps, and libraries I built. Some projects are still active, others have been discontinued.</p>

            <h2>Featured Projects</h2>
            <div>{renderFeatured()}</div>

            <h2>All Projects</h2>
            {renderAll()}
          </AnimateSharedLayout>
        </div>
      </div>
    </main>
  )
}

function ProjectItem(props) {
  const { project } = props

  return (
    <li>
      <a href={project.url} target="_blank">
        {project.title}
      </a>
    </li>
  )
}

export default Projects
