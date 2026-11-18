import type { StaticImageData } from 'next/image';

import heroAutomationImg from '@/assets/images/hero_automation_control_1794657179916.jpg';
import waterTreatmentImg from '@/assets/images/project_water_treatment_1794657181222.jpg';
import factoryAutomationImg from '@/assets/images/project_factory_automation_1794657182281.jpg';

/* ============================================================================
 * SINGLE-FILE CONTENT CONFIGURATION
 * Edit anything below (company info, phones, addresses, texts, projects,
 * trainings, gallery photos, section titles) without touching component code.
 * For images, you can use imported assets above OR a string path such as
 * '/assets/images/gallery/my-photo.jpg'.
 * ========================================================================== */

/* Toggle a section on/off without deleting its content or links. */
export const sectionVisibility = {
  tools: false,
};

export type ImageSource = StaticImageData | string;

export type ServiceIconKey = 'plc' | 'hmi' | 'panel' | 'iot' | 'embedded';

export type IndustryIconKey =
  'water' | 'gas' | 'dataCenter' | 'acmv' | 'chiller' | 'climate' | 'manufacturing';

export interface Office {
  id: string;
  country: string;
  company: string;
  addressLines: string[];
  phones: string[];
  email: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  icon: ServiceIconKey;
  image: ImageSource;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  topics: string[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: IndustryIconKey;
  image: ImageSource;
}

export type ToolIconKey = 'cad' | 'lines' | 'panel' | 'chart' | 'plc';

export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: ToolIconKey;
  logo: ImageSource;
}

export type ProductIconKey = 'scada' | 'alert' | 'sentinel' | 'collector' | 'appstudio' | 'app';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  icon: ProductIconKey;
  image: ImageSource;
}

export interface NavItem {
  label: string;
  href: string;
}

export type ProjectCapability = 'design' | 'management' | 'plc';

export interface Project {
  id: string;
  title: string;
  client: string;
  executedFor?: string;
  role: string;
  location: 'Singapore' | 'Sri Lanka' | 'Thailand';
  capability: ProjectCapability;
  image?: ImageSource;
  imageAlt?: string;
}

export interface GalleryItem {
  id: string;
  label: string;
  image: ImageSource;
}

export interface FooterColumn {
  title: string;
  href: string;
  items: string[];
}

export interface LinkItem {
  label: string;
  href: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirushautomation.com';

/* 1. COMPANY, BRANDING & NAVIGATION */
export const site = {
  name: 'Hirush Automation',
  legalName: 'Hirush Automation Pte Ltd',
  logo: '/assets/images/logo.png',
  email: 'admin@hirushautomation.com',
  url: siteUrl,
  domain: 'www.hirushautomation.com',
  contactButtonLabel: 'Contact',
};

export const nav: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Tools', href: '#tools' },
  { label: 'Products', href: '#products' },
  { label: 'Projects', href: '#projects' },
  { label: 'Trainings', href: '#trainings' },
];

/* 2. REGIONAL OFFICES (PHONES, ADDRESSES, EMAIL) */
export const offices: Office[] = [
  {
    id: 'singapore',
    country: 'Singapore',
    company: 'Hirush Automation Pte Ltd',
    addressLines: ['531A Upper Cross Street', '#04-95 Hong Lim Complex', 'Singapore 051531'],
    phones: ['+65 8183 0763'],
    email: 'admin@hirushautomation.com',
  },
  {
    id: 'sri-lanka',
    country: 'Sri Lanka',
    company: 'Hirush Automation (Pvt) Ltd',
    addressLines: ['247, Maruthankulam Road', 'Kovilputhukkulam, Vavuniya', 'Sri Lanka'],
    phones: ['+94 21 435 8220', '+94 76 609 9261'],
    email: 'admin@hirushautomation.com',
  },
];

/* 3. HERO SECTION */
export const hero = {
  heading: 'Industrial Automation & Control Solutions',
  subheading: 'PLC • HMI • SCADA • Control Panels',
  description:
    'A distinguished Electrical, Control, and Automation company with offices in Singapore and Sri Lanka. We specialize in PLC/HMI/SCADA systems, control panel design and fabrication, IoT solutions, and embedded controller development.',
  primaryCta: { label: 'Explore Services', href: '#services' } as LinkItem,
  secondaryCta: { label: 'Request Consultation', href: '#contact' } as LinkItem,
  backgroundImage: heroAutomationImg as ImageSource,
  slides: [
    { id: 'plc', label: 'PLC Programming', image: '/assets/aistudio/PLC_Programming.png' },
    { id: 'hmi', label: 'HMI/SCADA Design', image: '/assets/aistudio/hmi_35e7747e.png' },
    {
      id: 'panel',
      label: 'Electrical & Control Panel',
      image: '/assets/aistudio/control_panel_9f36a063.png',
    },
    {
      id: 'embedded',
      label: 'Embedded Controller Design',
      image: '/assets/aistudio/embedded_eb02073d.png',
    },
  ],
};

/* 4. ABOUT, MISSION & VISION */
export const about = {
  title: 'About Us',
  image: '/assets/aistudio/about_us.png' as ImageSource,
  imageAlt: 'Electrical and Control Panel Engineering',
  intro: [
    'Hirush Automation Pte Ltd was established in Singapore as a distinguished Electrical, Control, and Automation Company. In addition to our presence in Singapore, Hirush Automation Pvt Ltd in Sri Lanka also contributes significantly to our success. Our expansion into Sri Lanka has been driven by the same commitment to excellence in Electrical, Control, and Automation services.',
    'The core of our business model is our proficiency in the design, implementation, testing, commissioning, and maintenance of PLC/HMI/SCADA systems and Electrical/Control panels. We specialize in delivering tailored services and have successfully executed numerous projects, solidifying our reputation as leaders in the industry.',
  ],
  capabilities: [
    'Design & engineering',
    'Implementation',
    'Testing & commissioning',
    'Maintenance & support',
  ],
};

export const mission = {
  title: 'Our Mission',
  description:
    "Our company's mission is to deliver superior quality control and automation systems, paired with exceptional customer service, by relentlessly pursuing innovation and leveraging advanced technology.",
};

export const vision = {
  title: 'Our Vision',
  description:
    'To establish ourselves as one of the leading system integrators and process control automation companies in Singapore and Sri Lanka, committed to delivering exceptional quality services that consistently exceed the expectations of our esteemed customers.',
};

/* 5. SERVICES */
export const servicesSection = {
  eyebrow: 'Services',
  heading: 'Comprehensive solutions for industrial excellence',
};

export const services: Service[] = [
  {
    id: 'plc-programming',
    title: 'PLC Programming',
    shortDescription:
      'Suitable PLC hardware configuration and programming aligned precisely with your control system requirements and designated control philosophy, across Siemens, Allen-Bradley, and Mitsubishi platforms.',
    description:
      'Our expertise lies in proposing a suitable PLC hardware configuration and delivering programming services that align precisely with the control system requirements specified in the contract and the designated control philosophy. We specialize in PLC programming across various brands.',
    features: [
      'Siemens PLC Programming',
      'Allen-Bradley PLC Programming',
      'Mitsubishi PLC Programming',
      'Hardware Configuration & Philosophy',
      'Testing, Commissioning & Support',
    ],
    icon: 'plc',
    image: '/assets/aistudio/PLC_Programming.png',
  },
  {
    id: 'hmi-scada-design',
    title: 'HMI/SCADA Design',
    shortDescription:
      'SCADA software and communication configuration, plus robust, effective, and user-friendly HMI graphics across Siemens, Schneider, Allen-Bradley, and Mitsubishi systems.',
    description:
      'We offer SCADA software and communication configuration solutions in consultation with our clients, tailored to meet contractual requirements and specifications. Our engineering services extend to the development of HMI graphics characterized by their robustness, effectiveness, visual appeal, and user-friendliness — across Siemens, Schneider, Allen-Bradley, and Mitsubishi systems.',
    features: [
      'SCADA Software Configuration',
      'Communication Configuration',
      'HMI Graphics Development',
      'Alarm Management & Trending',
      'Multi-Brand Platform Support',
    ],
    icon: 'hmi',
    image: '/assets/aistudio/hmi_35e7747e.png',
  },
  {
    id: 'electrical-control-panel',
    title: 'Electrical & Control Panel',
    shortDescription:
      'High-quality electrical panel design and fabrication, integrated with drives, starters, PLC systems, and control components, with full drawing and documentation support.',
    description:
      'Control panel design and fabrication constitute integral components of our business offerings. We craft high-quality electrical panels, expertly integrated with drives, starters, and control systems, and carefully outfitted with PLC systems and electrical control components for precise control and monitoring. We also provide comprehensive drawing and documentation support for seamless operation and maintenance.',
    features: [
      'Control Panel Design & Fabrication',
      'Drive & Starter Integration',
      'PLC System Integration',
      'Electrical Control Components',
      'Drawing & Documentation Support',
    ],
    icon: 'panel',
    image: '/assets/aistudio/control_panel_9f36a063.png',
  },
  {
    id: 'iot-solutions',
    title: 'IoT Solutions',
    shortDescription:
      'End-to-end IoT services that integrate with existing control systems — sensor integration, network configuration, data management, cloud services, and real-time analytics.',
    description:
      'Our IoT solutions are designed to integrate seamlessly with existing control systems, enabling enhanced data collection, real-time monitoring, and advanced analytics. We provide end-to-end IoT services — sensor integration, network configuration, data management, and cloud services — helping clients achieve greater visibility and control over their processes.',
    features: [
      'Sensor Integration',
      'Network Configuration',
      'Data Management & Cloud Services',
      'Real-Time Monitoring & Analytics',
      'Predictive Maintenance Support',
    ],
    icon: 'iot',
    image: '/assets/aistudio/IOT.png',
  },
  {
    id: 'embedded-controller-design',
    title: 'Embedded Controller Design',
    shortDescription:
      'Full-cycle embedded controller development — hardware design, firmware development, and system integration from initial concept through to final product.',
    description:
      'We specialize in the design and development of embedded controllers tailored to meet specific application requirements. Our services encompass the entire development cycle — from initial concept through to final product — including hardware design, firmware development, and system integration, delivering robust, efficient, and scalable solutions.',
    features: [
      'Hardware Design',
      'Firmware Development',
      'System Integration',
      'Microcontroller Platforms',
      'Concept to Final Product',
    ],
    icon: 'embedded',
    image: '/assets/aistudio/embedded_eb02073d.png',
  },
];

/* 6. TRAINING PROGRAMS */
export const trainingsSection = {
  eyebrow: 'Training',
  heading: 'Training Programs',
};

export const trainings: Training[] = [
  {
    id: 'industrial-electrical-engineering',
    title: 'Industrial Electrical Engineering',
    description:
      'The Industrial Electrical Engineering program is meticulously crafted to equip participants with the expertise needed to excel in electrical engineering and operations. This course delves into fundamental electrical concepts and extends to advanced techniques in equipment maintenance, fault detection, and control panel wiring. Participants will engage in practical, hands-on experiences through site visits and on-site training, preparing them thoroughly for real-world challenges in the electrical industry.',
    topics: [],
  },
  {
    id: 'plc-programming-hmi-design',
    title: 'PLC Programming and HMI Design',
    description:
      'Our PLC Programming and HMI Design course offers a comprehensive exploration of Programmable Logic Controllers (PLC) and Human-Machine Interface (HMI) programming. Participants will learn the principles of automation, control systems, and safety in industrial environments. The curriculum includes both hardware and software aspects of automation, covering equipment instrumentation, application development, and network architecture design. This course ensures a deep understanding of automation technology, preparing students for effective implementation in industrial settings.',
    topics: [],
  },
  {
    id: 'embedded-systems-design',
    title: 'Embedded Systems Design',
    description:
      'Our Embedded Systems Design program provides participants with the essential knowledge and practical skills required to thrive in the embedded systems field. Covering a wide array of topics, this course takes you from the fundamentals of embedded systems to advanced techniques in wireless communication protocols, real-time operating systems (RTOS), and PCB design. Through hands-on projects, ranging from simple to complex, participants will gain invaluable experience, ensuring they are well-prepared for real-world applications across various industries.',
    topics: [],
  },
  {
    id: 'eplan-electric-p8',
    title: 'EPLAN Electric P8',
    description:
      'The EPLAN Electric P8 program is designed to provide participants with comprehensive knowledge and skills in electrical design and documentation using EPLAN software. This course covers the fundamentals of EPLAN Electric P8, including project creation, schematic design, and report generation. Participants will learn advanced techniques for efficient electrical design and documentation, including the integration of PLCs, generation of reports, and customization of templates. Through hands-on exercises and real-world projects, participants will develop proficiency in using EPLAN Electric P8 to create professional electrical documentation for industrial applications.',
    topics: [],
  },
];

/* 7. TOOLS & PLATFORMS */
export const toolsSection = {
  eyebrow: 'Tools',
  heading: 'Industry-leading software and platforms we work with',
};

export const tools: Tool[] = [
  {
    id: 'autocad',
    name: 'AutoCAD',
    category: 'Design Software',
    description: 'Professional 2D and 3D CAD design for electrical panel layouts and schematics.',
    icon: 'cad',
    logo: '/assets/images/tools/autocad-icon.png',
  },
  {
    id: 'eplan-electric',
    name: 'ePlan Electric',
    category: 'Design Software',
    description:
      'Advanced electrical engineering design software for comprehensive project documentation.',
    icon: 'lines',
    logo: '/assets/images/tools/EPL_Logo.png',
  },
  {
    id: 'paneldraw',
    name: 'PanelDraw',
    category: 'Design Software',
    description:
      'Specialized software for designing electrical panel layouts with component libraries.',
    icon: 'panel',
    logo: '',
  },
  {
    id: 'pscad',
    name: 'PSCAD',
    category: 'Simulation Software',
    description: 'Power system simulation and analysis tool for electrical network studies.',
    icon: 'chart',
    logo: '/assets/images/tools/PSCAD.png',
  },
  {
    id: 'siemens-tia-portal',
    name: 'Siemens TIA Portal',
    category: 'PLC Platform',
    description:
      'Totally Integrated Automation Portal for Siemens S7 PLC programming and configuration.',
    icon: 'plc',
    logo: '/assets/images/tools/TIA.png',
  },
  {
    id: 'allen-bradley',
    name: 'Allen Bradley',
    category: 'PLC Platform',
    description:
      'Rockwell Automation Studio 5000 for ControlLogix and CompactLogix PLC programming.',
    icon: 'plc',
    logo: '/assets/images/tools/AllenBradley.png',
  },
  {
    id: 'schneider-ecostruxure',
    name: 'Schneider EcoStruxure',
    category: 'PLC Platform',
    description:
      'EcoStruxure Automation Enterprise for Schneider Modicon PLC programming and configuration.',
    icon: 'plc',
    logo: '/assets/images/tools/SchneiderEcoStruxure.png',
  },
];

/* 8. HIRUSHCORE PRODUCTS */
export const productsSection = {
  eyebrow: 'Products',
  heading: 'HirushCore',
};

export const products: Product[] = [
  {
    id: 'hirushcore-scada',
    name: 'HirushCore SCADA',
    tagline: 'Industrial Web-Based Monitoring & Design Platform',
    features: [
      'Web-based industrial monitoring and control',
      'HMI and dashboard design',
      'Real-time process visualization',
      'Trends, reporting & events',
      'Alarm management',
      'Centralized system management',
    ],
    icon: 'scada',
    image: '/assets/images/Products/HirushCore SCADA.png',
  },
  {
    id: 'hirushcore-alert',
    name: 'HirushCore Alert',
    tagline: 'Industrial Notification & Alerting System',
    features: [
      'SMS, Email & WhatsApp notifications',
      'Mobile push notifications',
      'Real-time event detection',
      'Instant alarm delivery',
      'Multi-protocol data collection',
      'Critical event escalation support',
    ],
    icon: 'alert',
    image: '/assets/images/Products/HirushCore Alert.png',
  },
  {
    id: 'hirushcore-sentinel',
    name: 'HirushCore Sentinel',
    tagline: 'Industrial Web-Based Central Alarm Monitoring Platform',
    features: [
      'Centralized alarm monitoring',
      'Multi-site alarm management',
      'Alarm acknowledgment tracking',
      'Historical alarm analysis',
      'Web-based alarm dashboards',
    ],
    icon: 'sentinel',
    image: '/assets/images/Products/HirushCore Sentinel.png',
  },
  {
    id: 'hirushcore-data-collector',
    name: 'HirushCore Data Collector',
    tagline: 'Industrial Communication Engine',
    features: [
      'Two-way industrial communication',
      'Multi-protocol device integration',
      'Real-time data acquisition',
      'Secure communication architecture',
      'Protocol-specific or multi-protocol deployment',
      'Integration with industrial applications',
    ],
    icon: 'collector',
    image: '/assets/images/Products/HirushCore Data Collector.png',
  },
  {
    id: 'hirushcore-appstudio',
    name: 'HirushCore AppStudio',
    tagline: 'Industrial Mobile App Development Platform',
    features: [
      'Industrial mobile app development',
      'Android & iOS deployment',
      'Real-time industrial data integration',
      'Mobile alarm & notification handling',
      'Custom UI & dashboard creation',
      'Secure user authentication',
    ],
    icon: 'appstudio',
    image: '/assets/images/Products/HirushCore AppStudio.png',
  },
  {
    id: 'hirushcore-app',
    name: 'HirushCore App',
    tagline: 'Industrial Mobile Runtime',
    features: [
      'Real-time industrial monitoring',
      'Mobile alarm notifications',
      'Remote access & control',
      'Trend & historical data viewing',
      'Mobile dashboard visualization',
      'Secure industrial connectivity',
    ],
    icon: 'app',
    image: '/assets/images/Products/HirushCore App.png',
  },
];

/* 9. PROJECT REFERENCE, FEATURED SPOTLIGHTS & GALLERY */
export const projectReference = {
  title: 'Project Reference',
  subtitle: 'Electrical & Control — Singapore , Sri Lanka & Thailand',
  allProjectsLabel: 'More Projects',
  clientLabel: 'Client',
  executedForLabel: 'Executed for',
  galleryTitle: 'Project Gallery',
  galleryAutoScrollMs: 2000,
};

export const featuredProjectIds: string[] = [
  'programming-support-otv-veolia',
  'bms-system-omni-logistics',
  'vertical-injector-ls-marine',
];

export const projectGallery: GalleryItem[] = [
  {
    id: 'gallery-panel',
    label: '',
    image: '/assets/aistudio/control_panel_9f36a063.png',
  },
  { id: 'gallery-plc', label: '', image: '/assets/aistudio/plc_48c8d680.png' },
  { id: 'gallery-scada', label: '', image: '/assets/aistudio/hmi_35e7747e.png' },
  {
    id: 'gallery-embedded',
    label: '',
    image: '/assets/aistudio/embedded_eb02073d.png',
  },
  {
    id: 'gallery-datacenter',
    label: '',
    image: '/assets/aistudio/project1_5bc6bd0f.png',
  },
  {
    id: 'gallery-chiller',
    label: '',
    image: '/assets/aistudio/project4_3ca87e0c.png',
  },
  {
    id: 'gallery-water',
    label: '',
    image: '/assets/aistudio/project3_ea8a1936.png',
  },
  {
    id: 'gallery-omni-logistic',
    label: '',
    image: '/assets/aistudio/omni.png',
  },
  {
    id: 'gallery-tual',
    label: '',
    image: '/assets/aistudio/tual.png',
  },
  {
    id: 'gallery-redmart',
    label: '',
    image: '/assets/aistudio/rec.png',
  },
];

export type ProjectFilterKey = 'all' | ProjectCapability;

export const projectFilters: { key: ProjectFilterKey; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'design', label: 'Design & Build' },
  { key: 'management', label: 'Project Management' },
  { key: 'plc', label: 'PLC, SCADA & HMI' },
];

export const projects: Project[] = [
  {
    id: 'flow-lab-system-atlanticsolution',
    title: 'Flow Lab System',
    client: 'Atlantic Solution',
    executedFor: 'Atlantic Solution',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'power-train-unit-ptu',
    title: 'Power Train Unit (PTU)',
    client: 'Digital Edge Data Centre',
    executedFor: 'RSA',
    role: 'Design and Built',
    location: 'Thailand',
    capability: 'design',
  },
  {
    id: 'epms-system-pg',
    title: 'EPMS System',
    client: 'P&G',
    executedFor: '',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'sand-filter-system-zoo',
    title: 'Sand Filter System',
    client: 'Singapore Zoological Gardens',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'treated-waste-water-recovery',
    title: 'Treated Waste Water Recovery for Process Use',
    client: 'Petrochemical Corporation of Singapore Pte Ltd',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
    image: waterTreatmentImg,
  },
  {
    id: 'ro-di-system-stats-chippac',
    title: 'RO/DI System',
    client: 'Stats ChipPAC Pte Ltd',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'process-cooling-water-system',
    title: 'Process Cooling Water System',
    client: 'Stats ChipPAC Pte Ltd',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'polishing-system',
    title: 'Polishing System',
    client: 'Stats ChipPAC Pte Ltd',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'demineralized-water-treatment-plant',
    title: 'Demineralized Water Treatment Plant',
    client: 'Keppel Sighers Engineering Singapore Pte Ltd',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'semakau-electrical-generation-distribution',
    title: 'Upgrading of the Electrical Generation and Distribution System at Semakau Land Fill',
    client: 'National Environment Agency (NEA)',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Project Management and Technical Support',
    location: 'Singapore',
    capability: 'management',
    image: heroAutomationImg,
  },
  {
    id: 'remote-operation-monitoring-ipu-valves',
    title: 'Remote Operation and Monitoring of IPU Valves at Reservoirs and Ponds',
    client: 'Public Utilities Board (PUB)',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'upgrading-plant-water-system-cwrp',
    title: 'Upgrading of Plant Water System at Changi Water Reclamation Plant (CWRP)',
    client: 'Public Utilities Board (PUB)',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Project Management and Technical Support',
    location: 'Singapore',
    capability: 'management',
  },
  {
    id: 'sodium-hypochlorite-dosing-bedok',
    title: 'Sodium Hypochlorite Dosing System at Bedok Water Works',
    client: 'Public Utilities Board (PUB)',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Project Management and Technical Support',
    location: 'Singapore',
    capability: 'management',
  },
  {
    id: 'pulsator-vacuum-chua-chu-kang',
    title: 'Replacement of Pulsator Vacuum System at Chua Chu Kang Water Works',
    client: 'Public Utilities Board (PUB)',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Project Management and Technical Support',
    location: 'Singapore',
    capability: 'management',
  },
  {
    id: 'swimming-pool-filtration-electrical',
    title: 'Upgrading of Swimming Pool Filtration System (Electrical)',
    client: 'Singapore Polytechnic',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'ro-system-singapore-polytechnic',
    title: 'RO System',
    client: 'Singapore Polytechnic',
    executedFor: 'Memiontec Pte Ltd',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'wave-generation-sump-pump-control',
    title: 'Automated Wave Generation and Sump Pump Control System',
    client: 'Nanyang Technological University',
    executedFor: '',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'ro-di-chemical-transfer',
    title: 'RO DI System and Chemical Transfer System',
    client: '2D Material Pte Ltd',
    executedFor: '',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'ro-system-800-super',
    title: 'RO System',
    client: '800 Super Waste Management Pte Ltd',
    executedFor: '',
    role: 'Design and Built',
    location: 'Singapore',
    capability: 'design',
  },
  {
    id: 'programming-support-otv-veolia',
    title: 'Programming Support and Troubleshooting',
    client: 'OTV VEOLIA (Sri Lanka)',
    executedFor: '',
    role: 'PLC Programming and SCADA/HMI Development',
    location: 'Sri Lanka',
    capability: 'plc',
    image: '/assets/aistudio/OTV.png',
  },
  {
    id: 'bms-system-omni-logistics',
    title: 'BMS System',
    client: 'OMNI Logistics',
    executedFor: 'Electromatic Pte Ltd',
    role: 'PLC Programming and SCADA Development',
    location: 'Singapore',
    capability: 'plc',
    image: '/assets/aistudio/omni.png',
  },
  {
    id: 'vertical-injector-ls-marine',
    title: 'Vertical Injector',
    client: 'LS Marine Solution',
    executedFor: 'Electromatic Pte Ltd',
    role: 'PLC Programming and SCADA Development',
    location: 'Singapore',
    capability: 'plc',
    image: '/assets/aistudio/project2_842d791d.png',
  },
  {
    id: 'ro-system-fn-foods',
    title: 'RO System',
    client: 'F&N Foods Pte Ltd',
    executedFor: '',
    role: 'PLC Programming and HMI Development',
    location: 'Singapore',
    capability: 'plc',
  },
];

/* 10. INDUSTRIES SERVED */
export const industriesSection = {
  heading: 'Industries We Serve',
};

export const industries: Industry[] = [
  {
    id: 'water-treatment',
    name: 'Water Treatment',
    description:
      'Solutions for controlling and monitoring water treatment processes, ensuring water quality and safety.',
    icon: 'water',
    image: '/assets/aistudio/project3_ea8a1936.png',
  },
  {
    id: 'gas-systems',
    name: 'Gas Systems',
    description:
      'Gas control systems offering precise control and safety measures for gas handling and distribution.',
    icon: 'gas',
    image: '/assets/aistudio/Gas Systems.png',
  },
  {
    id: 'data-centers',
    name: 'Data Centers',
    description:
      'Advanced control and monitoring systems to optimize data center operations, ensuring reliability and efficiency.',
    icon: 'dataCenter',
    image: '/assets/aistudio/IOT.png',
  },
  {
    id: 'acmv',
    name: 'ACMV',
    description:
      'Climate control systems for air conditioning, mechanical ventilation, maintaining optimal conditions for comfort and productivity.',
    icon: 'acmv',
    image: '/assets/aistudio/project4_3ca87e0c.png',
  },
  {
    id: 'chiller-systems',
    name: 'Chiller Systems',
    description:
      'Solutions for efficient cooling and temperature control essential for various industrial processes.',
    icon: 'chiller',
    image: '/assets/aistudio/chiller_system.png',
  },
  {
    id: 'climate-monitoring',
    name: 'Climate Monitoring',
    description:
      'Advanced climate monitoring solutions for environmental and industrial applications enabling data collection and analysis.',
    icon: 'climate',
    image: '/assets/aistudio/Climate Monitoring.png',
  },
  {
    id: 'manufacturing-factories',
    name: 'Manufacturing Factories',
    description:
      'Controllers and monitoring systems that enhance manufacturing processes by ensuring precision, efficiency, and quality control.',
    icon: 'manufacturing',
    image: '/assets/aistudio/control_panel_9f36a063.png',
  },
];

export const industriesClosing =
  "";
// "In each of these industries, our focus is on designing, implementing, and maintaining customized electronics-based controllers to meet specific operational requirements. Whether it's optimizing processes, enhancing safety, or ensuring compliance, our tailored solutions are designed to address the unique challenges and goals of our clients across diverse sectors.";

/* 11. CONTACT SECTION */
export const contactSection = {
  eyebrow: 'Contact Us',
  heading: 'Get In Touch',
};

/* 12. FOOTER */
export const footer = {
  description: '',
  columns: [
    {
      title: 'SERVICES',
      href: '#services',
      items: [
        'PLC Programming',
        'HMI/SCADA Design',
        'Electrical & Control Panel',
        'IoT Solutions',
        'Embedded Controller Design',
        'Training Programs',
      ],
    },
    {
      title: 'TRAINING',
      href: '#trainings',
      items: [
        'Industrial Electrical Engineering',
        'PLC Programming and HMI Design',
        'Embedded Systems Design',
        'EPLAN Electric P8',
      ],
    },
    {
      title: 'TOOLS',
      href: '#tools',
      items: [
        'AutoCAD',
        'ePlan Electric',
        'PanelDraw',
        'PSCAD',
        'Siemens TIA Portal',
        'Allen Bradley',
        'Schneider EcoStruxure',
      ],
    },
    {
      title: 'PRODUCTS',
      href: '#products',
      items: [
        'HirushCore SCADA',
        'HirushCore Alert',
        'HirushCore Sentinel',
        'HirushCore Data Collector',
        'HirushCore AppStudio',
        'HirushCore App',
      ],
    },
    {
      title: 'OFFICES',
      href: '#contact',
      items: ['Singapore', 'Sri Lanka'],
    },
  ] as FooterColumn[],
};

/* 13. SEO & METADATA */
export const seo = {
  title: 'Hirush Automation – Electrical, Control & Automation Engineering Solutions',
  description:
    'Hirush Automation Pte Ltd — Expert electrical, control, and automation engineering solutions. PLC programming, HMI/SCADA design, control panel fabrication, IoT solutions, embedded controllers, and online training. Singapore & Sri Lanka.',
  ogTitle: 'Hirush Automation – Automation Solutions',
  ogDescription:
    'Expert electrical, control, and automation engineering. PLC programming, HMI/SCADA design, control panel fabrication, IoT solutions, and embedded controllers by Hirush Automation Pte Ltd.',
  twitterTitle: 'Hirush Automation – Automation Solutions',
  twitterDescription:
    'Expert electrical, control, and automation engineering solutions by Hirush Automation Pte Ltd.',
};
