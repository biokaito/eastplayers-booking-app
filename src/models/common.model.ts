import { Package } from "@/models/package.model";

export interface State {
  clientInformation: Record<string, any>;
  services: Package[];
  reviewAndSend: Record<string, any>;
};