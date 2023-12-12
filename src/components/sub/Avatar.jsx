// Avatar component for displaying profile picture
function Avatar() {
  return (
    <div className="hidden xl:flex xl:max-w-none">
        <img src="/avatar.png" srcSet='/avatar.avif 1x, /avatar.png 2x' width={737} height={678} alt="Profile Picture" className="translate-z-0 w-full h-full" loading="lazy" />
    </div>
  )
}

export default Avatar