import * as ToastPrimitive from '@radix-ui/react-toast'

export default function Toast({ title, description, isSuccess, showToast, setShowToast, children }) {
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
      <div className={`w-8 h-8 ${iconColor} mr-2`}>
        <i className={iconName}></i>
      </div>
      <div className="text-gray-100">
        <h3 className="text-base text-white font-semibold">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
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