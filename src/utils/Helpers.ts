
export const getBaseUrl = () => {
  if (import.meta.env.VITE_PUBLIC_APP_URL) {
    return import.meta.env.VITE_PUBLIC_APP_URL;
  }

  if (
    import.meta.env.VERCEL_ENV === 'production' &&
    import.meta.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${import.meta.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (import.meta.env.VERCEL_URL) {
    return `https://${import.meta.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const getI18nPath = (url: string, locale: string) => {

  return `/${locale}${url}`;
};