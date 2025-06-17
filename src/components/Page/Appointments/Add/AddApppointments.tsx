import ClientInformation from "@/components/Page/Appointments/Add/ClientInformation";
import ReviewNSend from "@/components/Page/Appointments/Add/ReviewNSend";
import Services from "@/components/Page/Appointments/Add/Services";
import AddAppointmentSteps from "@/components/Page/Appointments/Add/Steps";
import { State } from "@/models/common.model";
import { Package } from "@/models/package.model";
import { useState } from "react";

export const stepConstants = {
  clientInformation: 0,
  services: 1,
  reviewAndSend: 2,
}

const AddAppointmentPage = () => {
  const [currentStep, setCurrentStep] = useState(stepConstants.clientInformation);

  const [state, setState] = useState<State>({
    clientInformation: {},
    services: [],
    reviewAndSend: {},
  });

  const onChangeStep = (step: number) => {
    if (step < 0 || step > Object.keys(stepConstants).length - 1) {
      return;
    }
    setCurrentStep(step);
  }

  const onSubmitClientInformation = (data: ClientInformation) => {
    setState((prevState) => ({
      ...prevState,
      clientInformation: data,
    }));
    onChangeStep(stepConstants.services);
  }

  const onSubmitServices = (data: Package[]) => {
    setState((prevState) => ({
      ...prevState,
      services: [...data],
    }));
    onChangeStep(stepConstants.reviewAndSend);
  }

  const backTo = (step: number) => {
    if (step < 0 || step > Object.keys(stepConstants).length - 1) {
      return;
    }
    setCurrentStep(step);
  }

  const stepRenderer = {
    [stepConstants.clientInformation]: <ClientInformation submit={onSubmitClientInformation} defaultValues={state.clientInformation} />,
    [stepConstants.services]: <Services submit={onSubmitServices} defaultValues={state.services} />,
    [stepConstants.reviewAndSend]: <ReviewNSend state={state} backTo={backTo} />,
  }

  return (
    <div className="grid grid-cols-10 w-full h-full bg-gradient-to-t from-black from-70% to-[#1e293b] p-8 gap-4">
      <div className="col-span-8 h-full flex items-start justify-center">
        {stepRenderer[currentStep] || <div className="text-white">Invalid Step</div>}
      </div>
      <div className="col-span-2 h-full flex items-start justify-center">
        <AddAppointmentSteps currentStep={currentStep} onChangeStep={onChangeStep} />
      </div>
    </div>
  );
}

export default AddAppointmentPage;