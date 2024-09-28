/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
