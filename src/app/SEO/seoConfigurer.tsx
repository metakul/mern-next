// utils/seoConfigurer.js
import { NextSeo } from 'next-seo';

export const seoConfigurer = ({ title, description, url, images, siteName, twitter }:any) => (
  <NextSeo
    title={title}
    description={description}
    canonical={url}
    openGraph={{
      url: url,
      title: title,
      description: description,
      images: images,
      siteName: siteName,
    }}
    twitter={{
      handle: twitter?.handle || '@metakul.nft',
      site: twitter?.site || '@metakul.io',
      cardType: twitter?.cardType || 'summary_large_image',
    }}
  />
);
