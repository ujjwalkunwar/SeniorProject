/** @type {import('next').NextConfig} */
const nextConfig = {

  /**
   * Configuration options for handling images.
   * 
   * @type {Object}
   * @property {string[]} domains - Array of domains for which to allow image optimization.
   */
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com"
    ]
  },

  /**
   * Configuration options for ESLint.
   * 
   * @type {Object}
   * @property {boolean} ignoreDuringBuilds - Whether ESLint should be ignored during builds.
   */
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;