declare namespace JSX {
    interface IntrinsicElements {
      'coingecko-coin-price-marquee-widget': {
        'coin-ids': string;
        currency: string;
        locale: string;
      } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }