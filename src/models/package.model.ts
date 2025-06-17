export interface Package {
  id?: string | number; // Optional, as it may not be present when creating a new package
  name: string;
  description?: string;
  price: number | string;
  services: string[]; // Array of service IDs or names included in the package
  isActive?: boolean; // Optional, to indicate if the package is currently active
  thumbnail?: string; // Optional, URL to an image representing the package
  duration?: number; // Optional, duration in minutes
}