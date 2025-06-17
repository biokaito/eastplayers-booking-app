import HorizontalSlider from "@/components/UI/HorizontalSlider";
import { RestyleDatePicker } from "@/components/UI/RestyleDatePicker";
import { getDaysInMonth } from "@/utils/common.utils";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

interface ISchedulerProps {
  onSubmit?: (data: any) => void;
  duration?: number; // Duration in minutes
}

interface ISchedulerState {
  time: string;
  month: string | number;
  day: string | number;
  year: string | number;
}

const timeSlots = Array.from({ length: 10 }, (_, i) => {
  const hour = 8 + i;
  const displayHour = hour > 12 ? hour - 12 : hour;
  const ampm = hour < 12 ? "AM" : "PM";
  const formatted = `${displayHour.toString().padStart(2, "0")}:00 ${ampm}`;
  return formatted;
});

const Scheduler: FC<ISchedulerProps> = ({ onSubmit, duration }) => {
  const [scheduler, setScheduler] = useState<ISchedulerState>({
    time: "",
    month: new Date().getMonth().toString(),
    day: "",
    year: new Date().getFullYear().toString(),
  });
  const [dayOptions, setDayOptions] = useState<string[]>([]);
  const [timeSlotOptions, setTimeSlotOptions] = useState<string[]>([...timeSlots]);

  const onChange = (date: any, dateString: string | string[]) => {
    const selectedMonth = dayjs(date).format("MM");

    handleChangeDayOptions(selectedMonth);
    setScheduler((prev) => ({
      ...prev,
      month: selectedMonth
    }));
  }

  const handleChangeDayOptions = (selectedMonth: any) => {
    const newDayOptions: any[] = getDaysInMonth(+selectedMonth, +scheduler.year || new Date().getFullYear());
    setDayOptions([...newDayOptions])
  }

  const onSelectDay = (day: any) => {
    setScheduler((prev) => ({
      ...prev,
      day: day,
    }));
  }

  const onSelectTime = (time: string) => {
    setScheduler((prev) => ({
      ...prev,
      time: time,
    }));
  }

  useEffect(() => {
    const currentMonth = new Date().getMonth().toString();
    handleChangeDayOptions(currentMonth);
  }, [])

  useEffect(() => {
    if (!scheduler) return;
    onSubmit && onSubmit(scheduler)
  }, [scheduler.month, scheduler.year, scheduler.day, scheduler.time]);

  return (
    <div className="text-white">
      <div>
        <div className="flex items-center justify-between px-4 py-2">
          <span>Select A Date</span>
          <RestyleDatePicker allowClear={false} defaultValue={dayjs()} placeholder="choose" className="w-28" format={"MMM YYYY"} onChange={onChange} picker="month" />
        </div>
        <div className="w-full">
          <HorizontalSlider items={dayOptions} selectedDay={scheduler.day} onSelect={onSelectDay} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between px-4 py-2">
          <span>Select A Time</span>
        </div>
        <div className="w-full grid grid-cols-3 gap-4 px-4 py-2">
          {
            timeSlotOptions.map((time, idx) => (
              <div
                key={idx}
                onClick={() => onSelectTime(time)}
                className={`cursor-pointer flex items-center justify-center h-12 rounded-lg border ${scheduler.time === time ? 'border-[#2E7FF1] bg-[#00285F]' : 'border-[#2F323E]'} text-white`}
              >
                {time}
              </div>
            ))
          }
        </div>
      </div>
      <div className="flex items-center gap-8 mt-5 px-4 py-2 rounded-3xl bg-[#2F323E] w-fit">
        <span className="text-sm font-medium text-[#A4A8B7]">Estimated End Date</span>
        <div className="text-white">
          {scheduler?.day && scheduler?.month && scheduler?.year && scheduler.time ?
            dayjs(`${scheduler.year}-${scheduler.month}-${scheduler.day} ${scheduler.time}`).add(duration || 0, 'minute').format('MMM DD, YYYY - hh:mm A')
            : "Select date and time"}
        </div>
      </div>
    </div>
  );
}

export default Scheduler;