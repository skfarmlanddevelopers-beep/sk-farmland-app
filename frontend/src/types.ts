export type PageId = 'home' | 'about' | 'projects' | 'managed' | 'journey' | 'gallery' | 'contact' | 'faqs' | 'testimonials' | 'terms' | 'privacy' | 'disclaimer' | 'adminLogin' | 'adminDashboard';

export interface StatItem {
  icon: string;
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  location: string;
  distance: string;
  price: string;
  size: string;
  image: string;
  features: string[];
  type: 'Managed' | 'Plain' | 'Premium';
  status: 'Ongoing' | 'Completed' | 'Upcoming';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Land' | 'Farmhouse' | 'Crops' | 'Entrance';
  image: string;
  description: string;
}

export interface LeadSubmission {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  projectInterest: string;
  notes?: string;
  budget?: string;
}
