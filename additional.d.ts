declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GSSO_TOKEN_NAME: string;
      HACKNEY_JWT_SECRET: string;
      AUTHORISED_DEV_GROUP: string;
      AUTHORISED_ADMIN_GROUP: string;
      AUTHORISED_ADULT_GROUP: string;
      AUTHORISED_CHILD_GROUP: string;
      AUTHORISED_ALLOCATORS_GROUP: string;
      AUTHORISED_UNRESTRICTED_GROUP: string;
      AUTHORISED_AUDITABLE_GROUP: string;
    }
  }

  interface Window {
    GOVUKFrontend: {
      initAll: () => void;
    };
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
