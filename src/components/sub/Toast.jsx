import * as ToastPrimitive from '@radix-ui/react-toast'

/**
 * Custom Toast component using Radix ToastPrimitive.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.title - Title of the toast.
 * @param {string} props.description - Description of the toast.
 * @param {boolean} props.isSuccess - Indicates whether the toast is a success message.
 * @param {boolean} props.showToast - Flag to control the visibility of the toast.
 * @param {function} props.setShowToast - Function to control the visibility of the toast.
 * @param {ReactNode} props.children - Child elements to wrap with Radix ToastPrimitive.Provider.
 * @returns {JSX.Element} - Rendered component.
 */
export default function Toast({ title, description, isSuccess, showToast, setShowToast, children }) {
  // Determine icon color and name based on success status
  const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';
  const iconName = isSuccess ? 'ri-checkbox-circle-fill' : 'ri-error-warning';

  return (
    <ToastPrimitive.Provider asChild>
    {children}
    <div 
      className={`fixed bottom-20 right-20 z-10 transition-all duration-200 transform ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      } bg-gray-900 border border-gray-600 shadow-md rounded p-2 flex items-center`}
    >
      {/* Icon representing success or error */}
      <div className={`w-8 h-8 ${iconColor} mr-2`}>
        <i className={iconName}></i>
      </div>

      {/* Content of the toast */}
      <div className="text-gray-100">
        <h3 className="text-base text-white font-semibold">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>

      {/* Button to close the toast */}
      <button
        className="ml-2 p-1 text-gray-300 hover:text-gray-100 focus:outline-none"
        onClick={() => setShowToast(false)}
        aria-label="Close"
      >
        X
      </button>
    </div>
    </ToastPrimitive.Provider>
  );
}