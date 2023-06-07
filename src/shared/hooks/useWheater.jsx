import { useEffect, useState } from 'react';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from 'react-icons/io';
import axios from 'axios';
import { APIkey } from '../config/api';

import { BsCloudHaze2Fill, BsCloudDrizzleFill } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';

export const useWheater = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Barranquilla');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== '') {
      setLocation(inputValue);
    }

    const input = document.querySelector('input');

    if (input.value === '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = '';

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          if (mounted) {
            setData(res.data);
            setLoading(false);
          }
        }, 1500);
      })
      .catch((err) => {
        setErrorMsg(err);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner8 className='text-5xl animate-spin text-white' />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]' />;
      break;
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]' />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]' />;
      break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#31cafb]' />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }

  const date = new Date();

  return {
    errorMsg,
    animate,
    handleInput,
    handleSubmit,
    icon,
    data,
    date,
    loading,
  };
};
