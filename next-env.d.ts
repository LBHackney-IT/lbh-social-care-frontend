/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GSSO_TOKEN_NAME: string;
      HACKNEY_JWT_SECRET: string;
      AUTHORISED_ADMIN_GROUP: string;
      AUTHORISED_ADULT_GROUP: string;
      AUTHORISED_CHILD_GROUP: string;
      AUTHORISED_ALLOCATORS_GROUP: string;
      AUTHORISED_UNRESTRICTED_GROUP: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
