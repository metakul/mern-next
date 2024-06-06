import { getColors } from '@/app/layout/Theme/themes';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomDialog from '../Dailog/Dailog';
import WhitelistForm from './WhitelistForm';

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const icoData: IcoData = {
  discountTier: 40,
  countdownDate: "2025-01-01T19:40:30",
  reachedAmount: "$19,550,000",
  hardcapAmount: "$70,000,000",
  reachedPercentage: 32,
};

const IcoSale: React.FC<IcoSaleProps> = ({ data }) => {
  const [remainingTime, setRemainingTime] = useState<RemainingTime>(calculateRemainingTime(data.countdownDate));
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(data.countdownDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [data.countdownDate]);

  return (
    <div>
      <div className="mt-8">
        <div
          className="rounded-2.5xl px-6 py-8 shadow-sm md:px-16 lg:px-24"
          style={{
            background: getColors().blueAccent[900],
          }}
        >
          <div className="flex-wrap justify-between lg:flex">
            <div className="mb-14">
              <Typography variant="h2" className="pb-8 font-display text-3xl dark:text-white">
                Something New
                <span className="text-accent">Coming Soon!</span>
              </Typography>
              <CustomDialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(!isDialogOpen)}
                triggerButtonText={<p
                  className="inline-block rounded-full bg-accent py-2.5 px-8 text-center text-sm font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                  Get Whitelist Now
                </p>}
                title={''}
                description={''}
              >
                <WhitelistForm/>
              </CustomDialog>

            </div>
            <div>
              <div
                className="js-countdown-single-timer mb-2 flex space-x-2 text-center md:space-x-4"
                data-countdown={data.countdownDate}
                data-expired="This auction has ended"
              >
                <span className="countdown-days flex h-[100px] w-[100px] flex-col justify-center rounded-2lg border border-jacarta-100 bg-white text-jacarta-700 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white">
                  <span className="js-countdown-days-number font-display text-xl font-medium md:text-3xl">{remainingTime.days}</span>
                  <span className="text-md tracking-tight text-jacarta-500 dark:text-jacarta-300">Days</span>
                </span>
                <span className="countdown-hours flex h-[100px] w-[100px] flex-col justify-center rounded-2lg border border-jacarta-100 bg-white text-jacarta-700 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white">
                  <span className="js-countdown-hours-number font-display text-xl font-medium md:text-3xl">{remainingTime.hours}</span>
                  <span className="text-md tracking-tight text-jacarta-500 dark:text-jacarta-300">Hrs</span>
                </span>
                <span className="countdown-minutes flex h-[100px] w-[100px] flex-col justify-center rounded-2lg border border-jacarta-100 bg-white text-jacarta-700 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white">
                  <span className="js-countdown-minutes-number font-display text-xl font-medium md:text-3xl">{remainingTime.minutes}</span>
                  <span className="text-md tracking-tight text-jacarta-500 dark:text-jacarta-300">Min</span>
                </span>
                <span className="countdown-seconds flex h-[100px] w-[100px] flex-col justify-center rounded-2lg border border-jacarta-100 bg-white text-jacarta-700 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white">
                  <span className="js-countdown-seconds-number font-display text-xl font-medium md:text-3xl">{remainingTime.seconds}</span>
                  <span className="text-md tracking-tight text-jacarta-500 dark:text-jacarta-300">Sec</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default () => <IcoSale data={icoData} />;
