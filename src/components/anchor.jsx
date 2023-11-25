/**
 * Custom FloatingWindow component.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.title - Title of the floating window.
 * @param {string} props.additionalInfo - Additional information as a string.
 * @param {boolean} props.showWindow - Flag to control the visibility of the floating window.
 * @param {function} props.setShowWindow - Function to control the visibility of the floating window.
 * @param {ReactNode} props.children - Child elements to be rendered inside the floating window.
 * @returns {JSX.Element} - Rendered component.
 */

export default function FloatingWindow({ title, additionalInfo, showWindow, setShowWindow, children }) {

  return (
    <div className={`fixed top-1/2 left-1/2 transform mt-10 -translate-x-1/2 -translate-y-1/2 
                    z-40 transition-all duration-200
                    ${showWindow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white p-4 shadow-md rounded-md">
        {/* Title bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-black">{title}</div>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowWindow(false)}
            aria-label="Close"
          >
            X
          </button>
        </div>
        
        {/* Additional Information */}
        {additionalInfo && <div className="text-sm text-gray-500 mb-2">{additionalInfo}</div>}
        
        {/* Content */}
        {children}
      </div>
    </div>
  );
}