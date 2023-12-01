import { github, linkedIn, codewars, stackoverflow, codepen, reddit } from "../../assets"; // Importing GitHub icon

// The Social component function that renders a list of social media icons as clickable links
export default function social() {
    // Array of social links with corresponding icons
    const socialLinks = [
        { icon: github, link: 'https://github.com/ClementBobin' }, // GitHub profile link
        { icon: codewars, link: 'https://www.codewars.com/users/ClementBobin' }, // Codewars profile link
        { icon: linkedIn, link: 'https://www.linkedin.com/in/cl%C3%A9ment-bobin-958559293/' }, // LinkedIn profile link
        { icon: stackoverflow, link: 'https://stackoverflow.com/users/RelateMirage' }, // StackOverflow profile link
        { icon: reddit, link: 'https://reddit.com/user/KernelKoder' }, // Reddit profile link
        { icon: codepen, link: 'https://codepen.io/RelateMirage' }, // Codepen profile link
    ];

    // Rendering the social media icons as clickable links
    return (
        <aside className="fixed z-50 bottom-1 right-1 w-[4.25rem] h-[6.75rem]"> 
            <div className="flex flex-wrap gap-1">
                {/* Map through social links and display icons with links */}
                {socialLinks.map((social, index) => (
                    <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8">
                        <img src={social.icon} loading="lazy" />
                    </a>
                ))}
            </div>
        </aside>
    )
}