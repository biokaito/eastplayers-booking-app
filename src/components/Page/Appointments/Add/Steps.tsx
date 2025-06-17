import { StepProps, Steps } from "antd";
import { FC } from "react";
import styled from 'styled-components';

interface IAddAppointmentStepsProps {
  currentStep: number;
  onChangeStep: (step: number) => void;
}

const RestyledSteps = styled(Steps)`
  .ant-steps-item-description{
    color: #fff !important;
    font-size: 16px !important;
    font-weight: 600 !important;
  }
  .ant-steps-item-title{
    color: #7F859F !important;
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .ant-steps-item-icon {
    background-color: #2E7FF1 !important;
    border: none !important;
  }
  .anticon-check {
    color: #fff !important;
  }
  .ant-steps-item-tail::after{
    background-color: #D9D9D9 !important;
  }
`;

const AddAppointmentSteps: FC<IAddAppointmentStepsProps> = ({ currentStep, onChangeStep }) => {
  const stepItems: StepProps[] = [
    { title: 'Step 1', description: 'Client Information', icon: null },
    {
      title: 'Step 2',
      description: 'Services',
      icon: null
    },
    {
      title: 'Step 3',
      description: 'Review & Send',
      icon: null
    },
  ]

  return (
    <div className="bg-[#18181B] w-full h-fit flex items-center justify-center px-8 py-6 rounded-lg shadow-lg">
      <RestyledSteps
        direction="vertical"
        current={currentStep}
        onChange={onChangeStep}
        items={stepItems}
      />
    </div>
  )
}

export default AddAppointmentSteps;