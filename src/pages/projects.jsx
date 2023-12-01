import FeaturedProject from './featuredProject';
import items from '../constants/projects';
import PageWrapper from '../hoc/PageWrapper';

// Component to display the projects section
function Projects() {
  // Function to render featured projects 
  // experimental not working right now
  const renderFeatured = () => {
    // Titles of featured projects
    const featured = ['noteMarkdown', 'Portfolio', 'RobotCarriste'];

    // Extract and render featured projects
    return items
      .map(item => item.projects.filter(project => featured.includes(project.title)))
      .filter(item => item.length > 0)
      .flat()
      .map((item, index) => <FeaturedProject key={index} project={item} />);
  };

  // Function to render all projects by year
  const renderAll = () => {
    return items.map((item, index) => (
      <div className='block mt-5' key={index}>
        {/* Display the year as a heading */}
        <h3>{item.year}</h3>
        <ul className='ml-12'>
          {/* Map through projects and render each as a link */}
          {item.projects.map((project, pIndex) => (
            <ProjectItem key={pIndex} project={project} />
          ))}
        </ul>
      </div>
    ));
  };

  // Function to calculate the total number of projects
  const getTotalProjects = () => {
    // Use reduce to sum up the number of projects across all years
    return items.reduce((total, item) => total + item.projects.length, 0);
  };

  return (
    <div>
      {/* Title and introductory text */}
      <h1 className='project'>What I Created</h1>
      <p>
        {/* Explanation of the creator's interest and variety of projects */}
        I'm obsessed with side projects and <strong>building in public</strong>.
        Here you can navigate to <strong>{getTotalProjects()} different</strong> websites,
        apps, and libraries I built. Some projects are still active, others have been discontinued.
      </p>

      {/* Featured Projects section */}
      <h2 className='mt-14'>Featured Projects</h2>
      {/* Render featured projects */}
      <div className='flex-row flex flex-wrap'>{renderFeatured()}</div>

      {/* All Projects section */}
      <h2 className='mt-14'>All Projects</h2>
      {/* Render all projects by year */}
      {renderAll()}
    </div>
  );
}

// Component to display an individual project item as a link
function ProjectItem(props) {
  const { project } = props;

  return (
    <li>
      {/* Open project link in a new tab */}
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {project.title}
      </a>
    </li>
  );
}

export default PageWrapper(Projects);