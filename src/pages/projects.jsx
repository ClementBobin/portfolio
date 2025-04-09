import FeaturedProject from './featuredProject';
import items from '../constants/projects';
import PageWrapper from '../hoc/PageWrapper';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant } from '../utils/motion';
import { Tilt } from "react-tilt";
import { github, githubFallback } from "../assets";

// Component to display the projects section
function Projects() {
  const { t } = useTranslation()
  const [allProjects, setAllProjects] = useState([]);
  const [orgProjects, setOrgProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        // Fetch personal repositories
        const personalResponse = await fetch('https://api.github.com/users/clementbobin/repos?sort=updated&direction=desc', {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        // Fetch repositories where user has contributed
        const contributorResponse = await fetch('https://api.github.com/search/repositories?q=user:Latitude-OpenDATA-SIO-Saintbe', {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (!personalResponse.ok || !contributorResponse.ok) {
          throw new Error(`Failed to fetch GitHub projects: ${personalResponse.status} ${contributorResponse.status}`);
        }
        
        const personalData = await personalResponse.json();
        const contributorData = await contributorResponse.json();
        
        setAllProjects(personalData);
        setOrgProjects(contributorData.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  const groupProjectsByYearAndMonth = (projects) => {
    const grouped = {};
    projects.forEach(project => {
      const date = new Date(project.created_at);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      
      if (!grouped[year]) {
        grouped[year] = {};
      }
      if (!grouped[year][month]) {
        grouped[year][month] = [];
      }
      grouped[year][month].push(project);
    });
    return grouped;
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const updated = new Date(date);
    const diffTime = Math.abs(now - updated);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    } else if (diffMonths > 0) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return 'today';
    }
  };

  // Function to render featured projects 
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

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={textVariant()}>
        <h1 className='project'>{t('ProjectSecTitle')}</h1>
        <motion.p variants={fadeIn("up", "spring", 0.1, 1)}>
          {t('ProjectSecDescription1')}<strong>{t('ProjectSecDescription2')}</strong>.
          {t('ProjectSecDescription3')}<strong>{allProjects.length + orgProjects.length}{t('ProjectSecDescription4')}</strong>
          {t('ProjectSecDescription5')}
        </motion.p>
      </motion.div>

      {/* Featured Projects section */}
      <h2 className='mt-14'>{t('ProjectSecSubTitle1')}</h2>
      <motion.div 
        className="flex-row flex flex-wrap"
        variants={fadeIn("up", "spring", 0.2, 1)}
      >
        {renderFeatured()}
      </motion.div>

      {/* Latest GitHub Projects section */}
      <h2 className='mt-14'>Latest GitHub Projects</h2>
      {loading ? (
        <motion.div 
          className="mt-14"
          variants={fadeIn("up", "spring", 0.2, 1)}
        >
          Loading projects...
        </motion.div>
      ) : error ? (
        <motion.div 
          className="mt-14 text-red-500"
          variants={fadeIn("up", "spring", 0.2, 1)}
        >
          Error: {error}
        </motion.div>
      ) : (
        <>
          {/* Personal Projects */}
          <motion.div 
            className="mt-14"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.h2 
              className="text-2xl font-bold mb-6"
              variants={fadeIn("up", "spring", 0.1, 1)}
            >
              Personal Projects
            </motion.h2>
            {Object.entries(groupProjectsByYearAndMonth(allProjects))
              .sort(([yearA], [yearB]) => yearB - yearA)
              .map(([year, months], yearIndex) => (
                <motion.div 
                  key={year} 
                  className='mb-8'
                  variants={fadeIn("up", "spring", yearIndex * 0.2, 1)}
                  initial="hidden"
                  animate="show"
                >
                  <motion.h3 
                    className="text-xl font-bold mb-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {year}
                  </motion.h3>
                  
                  {Object.entries(months)
                    .sort(([monthA], [monthB]) => 
                      new Date(`${monthA} 1, ${year}`).getTime() - 
                      new Date(`${monthB} 1, ${year}`).getTime()
                    )
                    .map(([month, projects], monthIndex) => (
                      <motion.div 
                        key={month}
                        className="ml-6 mb-6"
                        variants={fadeIn("up", "spring", monthIndex * 0.1, 1)}
                        initial="hidden"
                        animate="show"
                      >
                        <motion.h4 
                          className="text-lg font-semibold mb-2"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          {month}
                        </motion.h4>
                        
                        <motion.ul 
                          className="ml-6"
                          variants={staggerContainer(0.05, 0.05)}
                          initial="hidden"
                          animate="show"
                        >
                          {projects.map((project, projectIndex) => (
                            <motion.li 
                              key={project.id}
                              className="mb-2"
                              variants={fadeIn("up", "spring", projectIndex * 0.05, 1)}
                              initial="hidden"
                              animate="show"
                            >
                              <div className="flex items-center">
                                <motion.a 
                                  href={project.html_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                  whileHover={{ x: 5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {project.name}
                                </motion.a>
                                {project.description && (
                                  <span className="ml-2 text-blue-400 text-sm">
                                    - {project.description}
                                  </span>
                                )}
                                <div className="ml-2 text-gray-500 text-xs">
                                  <span>Updated {getRelativeTime(project.updated_at)}</span>
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    ))}
                </motion.div>
              ))}
          </motion.div>

          {/* Organization Projects */}
          <motion.div 
            className="mt-14"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.h2 
              className="text-2xl font-bold mb-6"
              variants={fadeIn("up", "spring", 0.1, 1)}
            >
              Organization Contributions
            </motion.h2>
            <motion.div 
              className="ml-6"
              variants={staggerContainer(0.05, 0.05)}
              initial="hidden"
              animate="show"
            >
              {orgProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="mb-2"
                  variants={fadeIn("up", "spring", index * 0.05, 1)}
                  initial="hidden"
                  animate="show"
                >
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <motion.a 
                      href={project.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.name}
                    </motion.a>
                    {project.description && (
                      <span className="ml-2 text-blue-400 text-sm">
                        - {project.description}
                      </span>
                    )}
                    <div className="ml-2 text-gray-500 text-xs">
                      <span>Updated {getRelativeTime(project.updated_at)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default PageWrapper(Projects);