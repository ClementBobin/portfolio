import { github, linkedIn } from "../../../assets"; // Importing GitHub icon

export default function social() {
    const socialLinks = [
        { icon: github, link: 'https://github.com/ClementBobin' },
        { icon: 'https://www.codewars.com/packs/assets/logo.f607a0fb.svg', link: 'https://www.codewars.com/users/ClementBobin' },
        { icon: linkedIn, link: 'https://www.linkedin.com/in/cl%C3%A9ment-bobin-958559293/'},
    ];

  return (
    <aside className="fixed z-50 bottom-1 right-1 w-12">
      <div className="flex flex-col items-center gap-1">
        {socialLinks.map((social, index) => (
          <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="min-w-12 min-h-12">
            <img src={social.icon} />
          </a>
        ))}
      </div>
    </aside>
  )
}