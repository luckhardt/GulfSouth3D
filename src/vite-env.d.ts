/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OMEKA_API_URL: string;
  readonly VITE_OMEKA_KEY_IDENTITY: string;
  readonly VITE_OMEKA_KEY_CREDENTIAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}