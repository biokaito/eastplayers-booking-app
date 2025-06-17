import { DatePicker } from "antd";
import styled from "styled-components";

export const RestyleDatePicker = styled(DatePicker)`
  background: transparent !important;
  border: none !important;
  .ant-picker-input input::placeholder {
    font-size: 16px;
    font-weight: 500;
    color: #ffffff !important;
    opacity: 1;
  }
  .ant-picker-input, .ant-picker-suffix {
  color: white !important;
  font-size: 16px;
    font-weight: 500;
  }
`