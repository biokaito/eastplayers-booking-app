// HorizontalSlider.tsx
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { FC, useRef } from 'react';

interface IHorizontalSliderProps {
  items: any[],
  selectedDay: string | number,
  onSelect?: (day: string | number) => void,
}

const HorizontalSlider: FC<IHorizontalSliderProps> = ({ items, selectedDay, onSelect }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex items-center space-x-2 w-full">
      <button
        className="absolute flex items-center justify-center h-9 w-9 p-2 rounded-full border boder-[#7F859F] bg-[#44485ACC] text-white hover:bg-gray-300"
        onClick={() => scroll('left')}
      >
        <ChevronLeft />
      </button>
      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-4 w-full"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE 10+
        }}
      >
        <style>
          {`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
          `}
        </style>
        <div className="hide-scrollbar flex space-x-4 w-full">
          {items.map((item, idx) => (
            <div
              onClick={() => onSelect?.(item?.date)}
              key={idx}
              className={clsx("cursor-pointer flex flex-col gap-1 text-white min-w-[200px] h-24 text-white flex items-center justify-center rounded-lg border", selectedDay === item?.date ? 'border-[#2E7FF1] bg-[#00285F]' : 'border-[#2F323E]')}
            >
              <span className='text-gray-400'>
                {item?.weekday}
              </span>
              <span className='font-medium'>
                {item?.date}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="flex items-center absolute -right-2 bg-gray-200 rounded hover:bg-gray-300 h-9 w-9 p-2 rounded-full border boder-[#7F859F] bg-[#44485ACC] text-white"
        onClick={() => scroll('right')}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default HorizontalSlider;