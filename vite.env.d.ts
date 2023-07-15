/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_KEY: "AIzaSyBp1GBpOjLTUVZNA12bc8HeJzaVREdYuD0";
  VITE_AUTH_DOMAIN: "project-fintech-c29d3.firebaseapp.com";
  VITE_PROJECT_ID: "project-fintech-c29d3";
  VITE_STORAGE_BUCKET: "project-fintech-c29d3.appspot.com";
  VITE_MESSAGING_SENDER_ID: "717110448677";
  VITE_APP_ID: "1:717110448677:web:e4f0fffc2b04806bd665cc";
  VITE_MEASUREMENT_ID: "G-6E60VPTB2F";
}

declare module "import.meta" {
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}
