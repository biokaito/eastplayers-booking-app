import { stepConstants } from "@/components/Page/Appointments/Add/AddApppointments";
import Scheduler from "@/components/shared/Scheduler";
import ServiceCard from "@/components/UI/ServiceCard";
import { State } from "@/models/common.model";
import { Button, notification } from "antd";
import { PencilLine } from "lucide-react";
import { FC, useState } from "react";

interface IReviewNSendProps {
  state: State;
  backTo: (step: number) => void;
}

const ReviewNSend: FC<IReviewNSendProps> = ({ state, backTo }) => {

  const [scheduler, setScheduler] = useState({
    time: "",
    month: new Date().getMonth().toString(),
    day: "",
    year: new Date().getFullYear().toString(),
  });

  const onSubmitScheduler = (data: any) => {
    setScheduler(data);
  }

  const onSendAppointment = () => {
    if (!scheduler.time || !scheduler.day || !scheduler.month || !scheduler.year) {
      notification.error({
        message: "Invalid Appointment",
        description: "Please select a valid date and time for the appointment.",
        duration: 3,
        placement: "top"
      });
      return;
    }
    notification.success({
      message: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${scheduler.day}/${scheduler.month}/${scheduler.year} at ${scheduler.time}.`,
      duration: 3,
      placement: "top"
    })
  }

  const totalDuration = state.services?.reduce((acc, service) => acc + (service.duration || 0), 0) || 0;
  return (<div className=" flex-1 p-2 overflow-auto">
    <h2 className="text-white font-semibold text-2xl mb-6 select-none">
      Review & Send
    </h2>
    <div className="flex flex-col gap-6 overflow-y-auto max-h-[80vh] pr-4 pb-5">
      <div className="w-full bg-[#18181B] p-6 rounded-lg">
        <div className="w-full flex justify-between items-center mb-6">
          <h3 className="text-white">Client Information</h3>
          <Button onClick={() => backTo(stepConstants.clientInformation)} type='text' className="flex items-center gap-2 font-medium text-[#2E7FF1]">Edit <PencilLine size={20} /> </Button>
        </div>
        <div className="flex items-center gap-4 mb-4 text-white">
          <span className="text-gray-300 text-sm mr-4">client</span> {state.clientInformation.client.name} | {state.clientInformation.client.email} | {state.clientInformation.client.phone}
        </div>
        <div className="flex items-center gap-4 mb-4 text-white">
          <span className="text-gray-300 text-sm mr-4">Vehicle Details</span>
          <div className="flex items-center gap-4 border bg-[#212226] rounded-3xl px-4 py-2 border-[#2F323E]">
            <span className="text-[#7F859F]">Year</span>
            <span className="text-white">{state.clientInformation.year}</span>
          </div>
          <div className="flex items-center gap-4 border bg-[#212226] rounded-3xl px-4 py-2 border-[#2F323E]">
            <span className="text-[#7F859F]">Make</span>
            <span className="text-white">{state.clientInformation.make}</span>
          </div>
          <div className="flex items-center gap-4 border bg-[#212226] rounded-3xl px-4 py-2 border-[#2F323E]">
            <span className="text-[#7F859F]">Model</span>
            <span className="text-white">{state.clientInformation.model}</span>
          </div>
          <div className="flex items-center gap-4 border bg-[#212226] rounded-3xl px-4 py-2 border-[#2F323E]">
            <span className="text-[#7F859F]">Vehicle Type</span>
            <span className="text-white">{state.clientInformation.vehicleType}</span>
          </div>
        </div>
      </div>

      {/* Appointment Schedule */}
      <div className="w-full bg-[#18181B] p-6 rounded-lg">
        <div className="w-full flex justify-between items-center mb-6">
          <h3 className="text-white">Appointment Schedule</h3>
        </div>
        <div>
          <Scheduler onSubmit={onSubmitScheduler} duration={totalDuration} />
        </div>
      </div>

      {/* Services */}
      <div className="w-full bg-[#18181B] p-6 rounded-lg">
        <div className="w-full flex justify-between items-center mb-6">
          <h3 className="text-white">Services</h3>
          <Button onClick={() => backTo(stepConstants.services)} type='text' className="flex items-center gap-2 font-medium text-[#2E7FF1]">Edit <PencilLine size={20} /> </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            state.services?.length > 0 && state.services.map((service, index) => (
              <ServiceCard item={service} key={index} />
            ))
          }
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <Button onClick={onSendAppointment} className="text-white bg-[#2E7FF1] h-10"><span className="font-medium">Send Appointment</span></Button>
      </div>
    </div>

  </div>)
}

export default ReviewNSend;