/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import React from 'react';
import LiveSale from "./LiveSale"
import { getColors } from '@/app/layout/Theme/themes';
import { Typography } from '@mui/material';
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

const isTimeZero = (remainingTime: RemainingTime): boolean => {
  return remainingTime.days <= 0 && remainingTime.hours <= 0 && remainingTime.minutes <= 0;
};

const IcoSale: React.FC<IcoSaleProps> = ({ data }) => {
  const remainingTime = calculateRemainingTime(data.countdownDate);
  const updatedIcoData = {
    ...data,
    reachedAmount: isTimeZero(remainingTime) ? "$19,550,000" : "0",
    reachedPercentage: isTimeZero(remainingTime) ? "25" : "0",
  };
  return (
    <div>
      <div className="mt-8">
        <div style={{
          background:getColors().primary[900],
        }} className="rounded-2.5xl border-2 px-6 py-16 shadow-sm dark:bg-jacarta-700 md:px-16 lg:px-24">
          <div className="flex-wrap justify-between lg:flex">
            <div className="mb-6">
              <h2 style={{
                color:getColors().secondary[200]
              }} className="mb-4 font-display text-3xl text-jacarta-700 dark:text-white">
                $KULL ICO Pre-Sale is <span className="text-accent"> {isTimeZero(remainingTime) ? "LIVE":"Coming Soon!"}</span>
              </h2>
              <p className="mb-2 text-lg text-jacarta-500 dark:text-jacarta-300">
                Discount Tier 1: {data.discountTier}%
              </p>
            
            </div>
            <div>
              {isTimeZero(remainingTime) ? (

                <LiveSale />
              ) : (
                <div
                  className="js-countdown-single-timer mb-10 flex space-x-2 text-center md:space-x-4"
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
              )}
              <div>
                <>
                  <div className="mb-2 flex justify-between ">
                    <span>
                      <span className='text-jacarta-500'>  Reached: </span><span className="text-green">{updatedIcoData.reachedAmount}</span>
                    </span>
                    <Typography >{data.hardcapAmount}</Typography>
                  </div>
                  <div className="rounded bg-accent-lighter">
                    <div className="h-4 rounded bg-accent" style={{ width: `${updatedIcoData.reachedPercentage}%` }}></div>
                  </div>
                  <div className="mt-2 flex justify-between text-jacarta-400">
                    <span>Softcap</span>
                    <span>Hardcap</span>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


//todo get total amount 
const icoData = {
  discountTier: 40,
  countdownDate: "2024-01-01T19:40:30",
  reachedAmount: "$19,550,000",
  hardcapAmount: "$70,000,000",
  reachedPercentage: 32,
};

export default () => <IcoSale data={icoData} />;
