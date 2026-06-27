import { StatItem, ProjectItem, GalleryItem } from './types';

// Import all 22 gallery images from local assets
import g1 from './assets/gallery-1.jpeg';
import g2 from './assets/gallery-2.jpeg';
import g3 from './assets/gallery-3.jpeg';
import g4 from './assets/gallery-4.jpeg';
import g5 from './assets/gallery-5.jpeg';
import g6 from './assets/gallery-6.jpeg';
import g7 from './assets/gallery-7.jpeg';
import g8 from './assets/gallery-8.jpeg';
import g9 from './assets/gallery-9.jpeg';
import g10 from './assets/gallery-10.jpeg';
import g11 from './assets/gallery-11.jpeg';
import g12 from './assets/gallery-12.jpeg';
import g13 from './assets/gallery-13.jpeg';
import g14 from './assets/gallery-14.jpeg';
import g15 from './assets/gallery-15.jpeg';
import g16 from './assets/gallery-16.jpeg';
import g17 from './assets/gallery-17.jpeg';
import g18 from './assets/gallery-18.jpeg';
import g19 from './assets/gallery-19.jpeg';
import g20 from './assets/gallery-20.jpeg';
import g21 from './assets/gallery-21.jpeg';
import g22 from './assets/gallery-22.jpeg';

export const statsData: StatItem[] = [
  { icon: 'Map', label: 'Acres Developed', value: '700+' },
  { icon: 'Users', label: 'Happy Customers', value: '1,000+' },
  { icon: 'Leaf', label: 'Premium Projects', value: '8+' },
  { icon: 'Home', label: 'Plots Under Management', value: '1,000+' },
  { icon: 'Award', label: 'Years of Trust', value: '5+' },
];

export const trustHighlights = [
  '100% Clear Title Deeds & Legal Verification',
  'Legally Verified Documents & Seamless Registration',
  'Excellent Road Connectivity to Key Highways',
  'Borewell & Electricity Facilities Fully Equipped',
  'Plantation-Ready Fertile Farmland with Water Grid',
  'Ideal for Long-Term Investment, Farming & Weekend Living',
  'Highly Appreciating Projects Near Bengaluru & Pondicherry',
  'Site Visit Assistance for complete transparency and satisfaction',
];

export const projectLocations = [
  'Anekal Thalli Road (Towards Hoganekkal Road)',
  'Electronic City (Proximity Corridor)',
  'Jigani Industrial & Green Belt',
  'Chandapur-Anekal Corridor',
  'Bannerghatta Road Extn',
  'Kanakapura Road Extn',
  'Hosur (High-growth peaceful belt)',
];

export const projectList: ProjectItem[] = [
  {
    id: 'sk-green-acres',
    name: 'SK Green Acres',
    location: 'Anekal Thalli Road, Near Bengaluru',
    distance: '35 mins from Electronic City',
    price: '₹499 - ₹649 per sq.ft',
    size: 'Starts from 0.25 Acre (Quarter Acre)',
    image: g1,
    type: 'Managed',
    status: 'Ongoing',
    features: [
      '35 Fruit Plants with Drip Irrigation',
      '24/7 Security & CCTV Monitoring',
      'Individual Borewell Water Grid Connection',
      'Picket Fencing & Gate for Each Plot',
    ],
  },
  {
    id: 'sk-tamarind-valley',
    name: 'SK Tamarind Valley',
    location: 'Hosur - Hoganekkal Road',
    distance: '45 mins from Bannerghatta Road',
    price: '₹599 - ₹749 per sq.ft',
    size: '0.25, 0.5 & 1-2 Acres',
    image: g2,
    type: 'Premium',
    status: 'Ongoing',
    features: [
      'Grand Wood-Paneled Entrance Gateway',
      'Cement Concrete Internal Access Roads',
      'Solar Street Lighting Grid',
      'Perfect for Eco-Friendly Farmhouse & Airbnb Stay',
    ],
  },
  {
    id: 'sk-nature-retreat',
    name: 'SK Nature Retreat',
    location: 'Kanakapura Road Extension',
    distance: '50 mins from Kanakapura Road Metro',
    price: '₹699 - ₹849 per sq.ft',
    size: 'Starts from 0.5 Acre',
    image: g3,
    type: 'Managed',
    status: 'Completed',
    features: [
      '100% Ready for Cultivation (Mango & Guava)',
      'Hassle-Free Basic Maintenance & Upkeep Handled',
      'Stunning Mountain View and Clean Air',
      'Private Weekend Living with Easy Connectivity',
    ],
  },
  {
    id: 'sk-heritage-orchards',
    name: 'SK Heritage Orchards',
    location: 'Pondicherry Highway Corridor',
    distance: 'Premium Scenic Location',
    price: '₹499 - ₹599 per sq.ft',
    size: '0.5 Acre & 1 Acre Plots',
    image: g4,
    type: 'Plain',
    status: 'Upcoming',
    features: [
      'Budget-Friendly Plain Farmland Options',
      'Freedom to Develop Layout as Per Your Choice',
      'Fitted with Grid Power & Primary Borewell',
      'Ideal for Long-Term Land Value Appreciation',
    ],
  },
  {
    id: 'sk-banyan-echoes',
    name: 'SK Banyan Echoes',
    location: 'Sikkanapalli, Near Bangalore',
    distance: '40 mins from Electronic City',
    price: '₹549 - ₹699 per sq.ft',
    size: 'Starts from 0.25 Acre',
    image: g5,
    type: 'Premium',
    status: 'Upcoming',
    features: [
      'Serene Miyawaki Forest Community',
      'Wooden Picket Fenced Plot Borders',
      '24/7 Security & CCTV Network',
      'Access CC Roads & Solar Illumination',
    ],
  },
  {
    id: 'sk-misty-heights',
    name: 'SK Misty Heights',
    location: 'Bannerghatta Corridor, Bengaluru',
    distance: '30 mins from Bannerghatta Main Gate',
    price: '₹649 - ₹799 per sq.ft',
    size: 'Starts from 0.5 Acre',
    image: g6,
    type: 'Managed',
    status: 'Ongoing',
    features: [
      'Misty Hilltop Panoramic Vistas',
      'Complimentary Fruit plantation Drip Network',
      'Individual Borewell Water Outlets',
      'Fully Guarded Gated Community Security',
    ],
  },
];

export const managedFarmlandFeatures = [
  {
    title: 'Hassle-Free Maintenance',
    desc: 'Complete maintenance, plantation upkeep, and seasonal security managed by our in-house agronomy and security teams, so you do not have to worry about daily operations.',
  },
  {
    title: 'Drip Irrigation & Plantation',
    desc: 'Each plot is allocated 35 premium saplings (Mango, Guava, Sapota, etc.) supported by a high-efficiency drip irrigation network.',
  },
  {
    title: 'Water Grid Access',
    desc: 'Individual high-pressure water grid connection mapped directly to your boundary, backed by high-capacity community borewells.',
  },
  {
    title: 'Elegantly Fenced Plotting',
    desc: 'A premium picket compound fence with dedicated gates is installed at the frontage of each plot, providing an orderly and beautiful layout view.',
  },
  {
    title: '24/7 Security & CCTV',
    desc: 'Continuous patrolling and surveillance across the community boundary to ensure your asset and farm retreats are safe and peaceful.',
  },
  {
    title: 'Infrastructure Ready',
    desc: 'Equipped with wide internal access roads, Cement Concrete (CC) road sections, and solar-powered street lamps lining the pathways.',
  },
];

export const incomeGenerators = [
  {
    title: 'Build Your Dream Farmhouse',
    desc: 'Construct a stunning rustic or modern farmhouse tailored to your exact style and budget. We provide assistance in sourcing trusted architects and contractors.',
    icon: 'Home',
  },
  {
    title: 'Airbnb & Farm Stay Revenue',
    desc: 'Register your nature retreat on platforms like Airbnb or StayVista. Capitalize on the exploding trend of urban professionals searching for tranquil weekend getaways near Bengaluru.',
    icon: 'TrendingUp',
  },
  {
    title: 'Agronomic Yield & Crops',
    desc: 'Grow high-yield crops like Mango, Papaya, Guava, or seasonal grains. Supported by fertile soil and ample water supply, turn your acreage into a productive green asset.',
    icon: 'Leaf',
  },
  {
    title: 'Sustained Capital Growth',
    desc: 'Farmland in proximity to key corridors like Anekal-Thalli, Electronic City, and Kanakapura Road is appreciating rapidly. Land is the safest long-term hedge.',
    icon: 'DollarSign',
  },
];

export const galleryData: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Grand Entrance Gate',
    category: 'Entrance',
    image: g1,
    description: 'The elegant modern wood-paneled community entrance gate, welcoming owners to their serene lands.',
  },
  {
    id: 'g-2',
    title: 'Scenic Farmhouse Cottage',
    category: 'Farmhouse',
    image: g2,
    description: 'A cozy double-story weekend farmhouse cottage nestled amidst green lawns and trees.',
  },
  {
    id: 'g-3',
    title: 'Organic Fruit Plantation',
    category: 'Crops',
    image: g3,
    description: 'Healthy plantation grids with scientific drip irrigation networks.',
  },
  {
    id: 'g-4',
    title: 'Layout Road Infrastructure',
    category: 'Land',
    image: g4,
    description: 'Neatly developed asphalt and CC internal roads providing excellent connectivity within the project.',
  },
  {
    id: 'g-5',
    title: 'Organic Crops Cultivation',
    category: 'Crops',
    image: g5,
    description: 'Intercropping layouts featuring organic papaya, banana, and vegetables.',
  },
  {
    id: 'g-6',
    title: 'Vast Managed Farmland Landscape',
    category: 'Land',
    image: g6,
    description: 'Sprawling green farmland plots near Hosur, presenting a perfect blend of ecology and investment.',
  },
  {
    id: 'g-7',
    title: 'Front Entrance Gateway',
    category: 'Entrance',
    image: g7,
    description: 'The primary gated entrance structure showing high security fencing and checkposts.',
  },
  {
    id: 'g-8',
    title: 'Aesthetic Weekend Cabin',
    category: 'Farmhouse',
    image: g8,
    description: 'Beautiful wood-finished modular cabin layout ideal for short weekend stays and vacations.',
  },
  {
    id: 'g-9',
    title: 'Drip Network Plantation',
    category: 'Crops',
    image: g9,
    description: 'Automated pressure-managed drip lines linked to high-yield fruit trees.',
  },
  {
    id: 'g-10',
    title: 'Cement Concrete Roads',
    category: 'Land',
    image: g10,
    description: 'Wide, heavy-load bearing concrete roads lining our premium corridors.',
  },
  {
    id: 'g-11',
    title: 'Site Visit Overview',
    category: 'Entrance',
    image: g11,
    description: 'Guided pathway maps and plots ready for site visits and registration.',
  },
  {
    id: 'g-12',
    title: 'Luxury Eco-Stay Cottage',
    category: 'Farmhouse',
    image: g12,
    description: 'Premium farmhouse construction design showcasing modern stone masonry.',
  },
  {
    id: 'g-13',
    title: 'Scientific Agri Layout',
    category: 'Crops',
    image: g13,
    description: 'Carefully spaced saplings designed for maximum yields and growth.',
  },
  {
    id: 'g-14',
    title: 'Serene Nature Plots',
    category: 'Land',
    image: g14,
    description: 'Lush boundary alignments offering a peaceful and healthy environment.',
  },
  {
    id: 'g-15',
    title: 'High-Growth Sapling Rows',
    category: 'Crops',
    image: g15,
    description: 'Soil-enriched mango and guava saplings maintained by on-site agronomists.',
  },
  {
    id: 'g-16',
    title: 'Compound Frontage Fencing',
    category: 'Land',
    image: g16,
    description: 'Picket-style front fencing ensuring clear marking and premium look for every plot.',
  },
  {
    id: 'g-17',
    title: 'Illuminated Path Markers',
    category: 'Entrance',
    image: g17,
    description: 'Solar streetlights highlighting access paths and security checkpoints at dusk.',
  },
  {
    id: 'g-18',
    title: 'Cozy Farmhouse Veranda',
    category: 'Farmhouse',
    image: g18,
    description: 'Outdoor seating spaces next to organic crops, perfect for relaxation.',
  },
  {
    id: 'g-19',
    title: 'Drip Grid Irrigation',
    category: 'Crops',
    image: g19,
    description: 'Borewell-connected drip lines running through organic crop rows.',
  },
  {
    id: 'g-20',
    title: 'Survey Mapped Boundary',
    category: 'Land',
    image: g20,
    description: 'Legally demarcated plot lines ready for registration and handover.',
  },
  {
    id: 'g-21',
    title: 'Premium Country Cottage',
    category: 'Farmhouse',
    image: g21,
    description: 'A quiet countryside cottage setup built amidst scenic mountain backdrops.',
  },
  {
    id: 'g-22',
    title: 'SK Farmland Panoramic Acres',
    category: 'Land',
    image: g22,
    description: 'Beautiful elevated view of our green managed farmland layouts.',
  },
];
