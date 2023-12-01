import { github, linkedIn, codewars, stackoverflow, codepen, reddit } from "../../assets"; // Importing GitHub icon

export default function social() {
    const socialLinks = [
        { icon: github, link: 'https://github.com/ClementBobin' },
        { icon: codewars, link: 'https://www.codewars.com/users/ClementBobin' },
        { icon: linkedIn, link: 'https://www.linkedin.com/in/cl%C3%A9ment-bobin-958559293/' },
        { icon: stackoverflow, link: 'https://stackoverflow.com/users/RelateMirage' },
        { icon: reddit, link: 'https://reddit.com/user/KernelKoder' },
        { icon: codepen, link: 'https://codepen.io/RelateMirage' },
    ];

  return (
    <aside className="fixed z-50 bottom-1 right-1 w-[4.25rem] h-[6.75rem]"> 
      <div className="flex flex-wrap gap-1">
        {socialLinks.map((social, index) => (
          <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8">
            <img src={social.icon} loading="lazy" />
          </a>
        ))}
      </div>
    </aside>
  )
}