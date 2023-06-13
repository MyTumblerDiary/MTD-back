declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }

  interface ProcessEnv extends ReservedEnvironmentVariables {
    [key: string]: null;
  }
}
declare interface ReservedEnvironmentVariables {
  /**
   * Server's running variables
   */
  NODE_ENV: string;
  SERVER_PORT: number;

  /**
   * JWT's variables
   */
  ACCESS_SECRET_KEY: string;
  REFRESH_SECRET_KEY;

  /**
   * Database's connection variables
   */
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  /**
   * Redis's connection variables
   */
  REDIS_HOST: string;

  /**
   * OAuth Google variables
   */
  OAUTH_GOOGLE_ID: string;
  OAUTH_GOOGLE_SECRET: string;
  OAUTH_GOOGLE_CALLBACK: string;

  /**
   * OAuth Kakao variables
   */
  OAUTH_KAKAO_ID: string;
  OAUTH_KAKAO_SECRET: string;
  OAUTH_KAKAO_CALLBACK: string;

  /**
   * OAuth Apple variables
   */
  OAUTH_APPLE_TEAM_ID: string;
  OAUTH_APPLE_KEY_ID: string;
  OAUTH_APPLE_CLIENT_ID: string;
  OAUTH_APPLE_REDIRECT_URI: string;
  OAUTH_APPLE_SECRETKRY_PATH: string;

  /**
   * AWS's variables
   */
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  AWS_S3_BUCKET_NAME: string;
}
