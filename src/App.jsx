import React, { useState, useEffect } from 'react';

import { IoMdSearch } from 'react-icons/io';

import { BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs';

import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';
import { useWheater } from './shared/hooks/useWheater';

const App = () => {
  const {
    errorMsg,
    animate,
    handleInput,
    icon,
    data,
    date,
    handleSubmit,
    loading,
  } = useWheater();
  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {errorMsg && (
        <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md'>{`${errorMsg.response.data?.message}`}</div>
      )}
      <form
        className={`glassmorphism ${
          animate ? 'animate-shake' : 'animate-none'
        } h-16 bg-black/30 w-full max-w-[450px]
      rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className='h-full relative flex items-center justify-between p-2'>
          <input
            onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full'
            type='text'
            placeholder='Search by city or country'
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'
          >
            <IoMdSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      <div className='glassmorphism w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {!loading && data ? (
          <div>
            <div className='flex items-center gap-x-5'>
              <div className='text-[87px]'>{icon}</div>
              <div>
                <div className='text-2xl font-semibold'>
                  {data?.name}, {data?.sys.country}
                </div>
                <div>
                  {date?.getUTCDate()}/{date?.getUTCMonth() + 1}/
                  {date?.getUTCFullYear()}
                </div>
              </div>
            </div>
            <div className='my-20'>
              <div className='flex justify-center items-center'>
                <div className='text-[144px] leading-none font-light'>
                  {parseInt(data?.main.temp)}
                </div>
                <div className='text-4xl'>
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className='capitalize text-center'>
                {data?.weather[0].description}
              </div>
            </div>
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'>
                    <BsEye />
                  </div>
                  <div>
                    Visibility
                    <span className='ml-2'>{data?.visibility / 1000} km</span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'>
                    <BsThermometer />
                  </div>
                  <div className='flex'>
                    Feels like
                    <div className='flex ml-2'>
                      {parseInt(data?.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'>
                    <BsWater />
                  </div>
                  <div>
                    Humidity
                    <span className='ml-2'>{data?.main.humidity} %</span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  {/* icon */}
                  <div className='text-[20px]'>
                    <BsWind />
                  </div>
                  <div>
                    Wind <span className='ml-2'>{data?.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <ImSpinner8 className='text-white text-5xl animate-spin' />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
