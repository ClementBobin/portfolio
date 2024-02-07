// Import the necessary modules from Vite
import { defineConfig, loadEnv } from 'vite'
// Import the React plugin for Vite
import react from '@vitejs/plugin-react'

// Export the configuration as the default module
export default defineConfig(({ mode }) => {
  // Load the environment variables for the specified mode (e.g., 'development' or 'production')
  const env = loadEnv(mode, process.cwd(), '')

  // Return the configuration object
  return {
    // Define the environment variables in the client-side code
    define: {
      'process.env': env
    },

    // Specify the plugins to be used by Vite
    plugins: [react()],
  }
})