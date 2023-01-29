declare namespace NodeJS {
  /** Merge declaration with `process` in order to override the global-scoped env. */
  export interface ProcessEnv {
    /**
     * Built-in environment variable.
     * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
     */
    readonly NG_APP_ENV: string;

    NG_APP_API_URL: string;
    NG_APP_FIREBASE: {
      NG_APP_APIKEY: string,
      NG_APP_AUTHDOMAIN: string,
      NG_APP_PROJECTID: string,
      NG_APP_STORAGEBUCKET: string,
      NG_APP_MESSAGINGSENDERID: string,
      NG_APP_APPID: string,
      NG_APP_MEASUREMENTID: string,
    };
  }
}
