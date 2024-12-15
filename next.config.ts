import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  env:{

  FIREBASE_KEY: process.env.FIREBASE_KEY,
  APP_AUTH_DOMAIN: process.env.APP_AUTH_DOMAIN,
  PROJECTID: process.env.PROJECTID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDER: process.env.MESSAGING_SENDER,
  APP_ID: process.env.APP_ID,
  MESSUREMENTID: process.env.MESSUREMENTID,
  API_REQUEST_URL: process.env.API_REQUEST_URL,
  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
  NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
  },
  images:{
    domains:["res.cloudinary.com"]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
