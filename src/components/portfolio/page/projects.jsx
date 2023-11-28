import FeaturedProject from './featuredProject'
import items from '../../../constants/projects data'

function Projects() {
  const renderFeatured = () => {
    const featured = ['coffe','dark']

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
        <div className='block mt-5' key={index}>
          <h3>{item.year}</h3>
          <ul className='ml-12'>
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
    <main className='sec'>
      <div className='blockCustom'>
        <div className='tile'>
            <h1 className='project'>What i created</h1>
            <p className='text-[#8f9ba8]'>I'm obsessed with side projects and <strong>building in public</strong>. Here you can navigate to <strong>{getTotalProjects()} different</strong> websites, apps, and libraries I built. Some projects are still active, others have been discontinued.</p>

            <h2 className='mt-14'>Featured Projects</h2>
            <div className='flex-row'>{renderFeatured()}</div>

            <h2 className='mt-14'>All Projects</h2>
            {renderAll()}
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
