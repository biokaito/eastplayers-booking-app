import { Package } from '@/models/package.model';
import { NextResponse } from 'next/server';

// Dummy database for car services packages
const dummyCarServices: Package[] = [
  {
    id: 1,
    name: "Basic Car Wash",
    description: "Exterior wash and dry, tire cleaning.",
    price: 19.99,
    thumbnail: "https://placehold.co/150",
    services: ["Exterior Wash", "Tire Cleaning"],
    isActive: true,
    duration: 30 // duration in minutes
  },
  {
    id: 2,
    name: "Full Service Detailing",
    description: "Interior vacuum, exterior wash, wax, and tire shine.",
    price: 49.99,
    thumbnail: "https://placehold.co/150",
    services: ["Interior Vacuum", "Exterior Wash", "Wax", "Tire Shine"],
    isActive: true,
    duration: 90
  },
  {
    id: 3,
    name: "Premium Maintenance",
    description: "Oil change, fluid top-up, brake inspection, and car wash.",
    price: 129.99,
    thumbnail: "https://placehold.co/150",
    services: ["Oil Change", "Fluid Top-up", "Brake Inspection", "Car Wash"],
    isActive: true,
    duration: 120
  },
  {
    id: 4,
    name: "Engine Diagnostic",
    description: "Comprehensive engine check and diagnostic report.",
    price: 59.99,
    thumbnail: "https://placehold.co/150",
    services: ["Engine Check", "Diagnostic Report"],
    isActive: true,
    duration: 60
  },
  {
    id: 5,
    name: "Ultimate Protection Package",
    description: "Ceramic coating, underbody wash, and interior sanitization.",
    price: 199.99,
    thumbnail: "https://placehold.co/150",
    services: ["Ceramic Coating", "Underbody Wash", "Interior Sanitization"],
    isActive: true,
    duration: 180
  }
];

export async function GET() {
  const carServices = [
    ...dummyCarServices
  ];
  return NextResponse.json(carServices);
}