import React from 'react';

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
}

interface IcoData {
  discountTier: number;
  countdownDate: string;
  reachedAmount: string;
  hardcapAmount: string;
  reachedPercentage: number;
}

interface IcoSaleProps {
  data: IcoData;
}

const calculateRemainingTime = (countdownDate: string): RemainingTime => {
  const now = new Date();
  const targetDate = new Date(countdownDate);
  const difference = targetDate.getTime() - now.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};

const icoData = {
    discountTier: 40,
    countdownDate: "2025-01-01T19:40:30",
    reachedAmount: "$19,550,000",
    hardcapAmount: "$70,000,000",
    reachedPercentage: 32,
  };

const IcoSale: React.FC<IcoSaleProps> = ({ data }) => {
  const remainingTime = calculateRemainingTime(data.countdownDate);
    data=icoData
  return (
    <div>
      <div className="mt-8">
        <div className="rounded-2.5xl  px-6 py-16 shadow-sm  md:px-16 lg:px-24" style={{
            backgroundColor=
        }}>
          <div className="flex-wrap justify-between lg:flex">
            <div className="mb-14">
              <h2 className="mb-4 font-display text-3xl text-jacarta-700 dark:text-white">
                Something New <span className="text-accent">Coming Soon!</span>
              </h2>
              <a
                href="item.html"
                className="inline-block rounded-full bg-accent py-2.5 px-8 text-center text-sm font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Get Whitelist Now
              </a>
            </div>
            <div>
              <div
                className="js-countdown-single-timer mb-2 flex space-x-2 text-center md:space-x-4"
                data-countdown={data.countdownDate}
                data-expired="This auction has ended"
              >
                <span
                  className="countdown-days flex h-[100px] w-[100px] flex-col justify-center rounded-2lg border border-jacarta-100 bg-white text-jacarta-700 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                >
                  <span className="js-countdown-days-number font-display text-xl font-medium md:text-3xl">{remainingTime.days}</span>
                  <span className="text-md tracking-tight text-jacarta-500 dark:text-jacarta-300">Days</span>
                </span>
                <span
                  className="countdown-hours flex h-[100px] w-[100px] flex-col justify-center rounded-2lg border border-jacarta-100 bg-white text-jacarta-700 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                >
                  <span className="js-countdown-hours-number font-display text-xl font-medium md:text-3xl">{remainingTime.hours}</span>
                  <span className="text-md tracking-tight text-jacarta-500 dark:text-jacarta-300">Hrs</span>
                </span>
                <span
                  className="countdown-minutes flex h-[100px] w-[100px] flex-col justify-center rounded-2lg border border-jacarta-100 bg-white text-jacarta-700 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                >
                  <span className="js-countdown-minutes-number font-display text-xl font-medium md:text-3xl">{remainingTime.minutes}</span>
                  <span className="text-md tracking-tight text-jacarta-500 dark:text-jacarta-300">Min</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default () => <IcoSale data={icoData} />;