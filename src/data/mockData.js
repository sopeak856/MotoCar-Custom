// MotoCar Custom - Comprehensive Mock Data & Configuration

export const VEHICLE_DATABASE = {
  cars: [
    {
      make: 'Honda',
      models: [
        { name: 'Civic Type R (FL5)', years: [2023, 2024, 2025], engines: ['2.0L Turbo K20C1'] },
        { name: 'Civic (FE / Hatchback)', years: [2022, 2023, 2024, 2025], engines: ['1.5L VTEC Turbo'] },
        { name: 'Accord', years: [2020, 2021, 2022, 2023, 2024], engines: ['1.5L Turbo', '2.0L e:HEV'] },
        { name: 'CR-V Turbo', years: [2022, 2023, 2024, 2025], engines: ['1.5L Turbo', '2.0L Hybrid'] }
      ]
    },
    {
      make: 'Toyota',
      models: [
        { name: 'GR Yaris', years: [2021, 2022, 2023, 2024, 2025], engines: ['1.6L Turbo G16E-GTS'] },
        { name: 'GR86', years: [2022, 2023, 2024, 2025], engines: ['2.4L Boxer FA24'] },
        { name: 'GR Supra (A90)', years: [2020, 2021, 2022, 2023, 2024], engines: ['3.0L Turbo B58', '2.0L Turbo B48'] },
        { name: 'Land Cruiser 300', years: [2022, 2023, 2024, 2025], engines: ['3.5L Twin-Turbo V6'] },
        { name: 'Hilux Revo / Rocco', years: [2020, 2021, 2022, 2023, 2024, 2025], engines: ['2.8L GD Turbo Diesel'] }
      ]
    },
    {
      make: 'Ford',
      models: [
        { name: 'Ranger Raptor', years: [2022, 2023, 2024, 2025], engines: ['3.0L Twin-Turbo EcoBoost V6', '2.0L Bi-Turbo'] },
        { name: 'Mustang GT', years: [2020, 2021, 2022, 2023, 2024], engines: ['5.0L Coyote V8'] },
        { name: 'Everest Titanium', years: [2022, 2023, 2024, 2025], engines: ['2.0L Bi-Turbo', '3.0L V6 Turbo Diesel'] }
      ]
    },
    {
      make: 'BMW',
      models: [
        { name: 'M3 (G80) / M4 (G82)', years: [2021, 2022, 2023, 2024, 2025], engines: ['3.0L Twin-Turbo S58'] },
        { name: '330i / M340i (G20)', years: [2020, 2021, 2022, 2023, 2024], engines: ['2.0L B48', '3.0L B58'] },
        { name: 'M2 (G87)', years: [2023, 2024, 2025], engines: ['3.0L Twin-Turbo S58'] }
      ]
    },
    {
      make: 'Mercedes-AMG',
      models: [
        { name: 'A45 S AMG', years: [2021, 2022, 2023, 2024], engines: ['2.0L Turbo M139'] },
        { name: 'C63 S AMG', years: [2020, 2021, 2022, 2023], engines: ['4.0L Bi-Turbo V8'] },
        { name: 'G63 AMG', years: [2021, 2022, 2023, 2024, 2025], engines: ['4.0L Bi-Turbo V8'] }
      ]
    },
    {
      make: 'Porsche',
      models: [
        { name: '911 (992) Carrera / GT3', years: [2020, 2021, 2022, 2023, 2024, 2025], engines: ['3.0L Boxer-6 Twin-Turbo', '4.0L NA Boxer-6'] },
        { name: '718 Cayman / Boxster', years: [2020, 2021, 2022, 2023, 2024], engines: ['2.0L Turbo', '4.0L GTS'] }
      ]
    }
  ],
  motorcycles: [
    {
      make: 'Yamaha',
      models: [
        { name: 'YZF-R7', years: [2022, 2023, 2024, 2025], engines: ['689cc CP2 Parallel Twin'] },
        { name: 'MT-09 / SP', years: [2021, 2022, 2023, 2024, 2025], engines: ['890cc CP3 Inline 3'] },
        { name: 'YZF-R1 / R1M', years: [2020, 2021, 2022, 2023, 2024], engines: ['998cc Crossplane CP4'] },
        { name: 'TMAX 560 Tech Max', years: [2021, 2022, 2023, 2024, 2025], engines: ['562cc Parallel Twin'] }
      ]
    },
    {
      make: 'Kawasaki',
      models: [
        { name: 'Ninja ZX-6R (636)', years: [2021, 2022, 2023, 2024, 2025], engines: ['636cc Inline-Four'] },
        { name: 'Ninja ZX-10R', years: [2021, 2022, 2023, 2024, 2025], engines: ['998cc Inline-Four'] },
        { name: 'Z900 / SE', years: [2020, 2021, 2022, 2023, 2024], engines: ['948cc Inline-Four'] },
        { name: 'Ninja H2 / SX', years: [2021, 2022, 2023, 2024], engines: ['998cc Supercharged'] }
      ]
    },
    {
      make: 'Honda',
      models: [
        { name: 'CBR1000RR-R Fireblade SP', years: [2021, 2022, 2023, 2024, 2025], engines: ['1000cc Inline-Four'] },
        { name: 'CBR650R', years: [2021, 2022, 2023, 2024, 2025], engines: ['649cc DOHC 16-valve Inline 4'] },
        { name: 'CB1000R Black Edition', years: [2021, 2022, 2023, 2024], engines: ['998cc DOHC 4-Cylinder'] },
        { name: 'ADV 350 / 750', years: [2022, 2023, 2024, 2025], engines: ['330cc eSP+ / 745cc Twin'] }
      ]
    },
    {
      make: 'Ducati',
      models: [
        { name: 'Panigale V4 / V4S', years: [2021, 2022, 2023, 2024, 2025], engines: ['1,103cc Desmosedici Stradale V4'] },
        { name: 'Streetfighter V4', years: [2021, 2022, 2023, 2024, 2025], engines: ['1,103cc Desmosedici Stradale V4'] },
        { name: 'Monster 937', years: [2021, 2022, 2023, 2024], engines: ['937cc Testastretta 11°'] }
      ]
    },
    {
      make: 'BMW Motorrad',
      models: [
        { name: 'S1000RR', years: [2020, 2021, 2022, 2023, 2024, 2025], engines: ['999cc ShiftCam Inline-4'] },
        { name: 'M1000RR', years: [2022, 2023, 2024, 2025], engines: ['999cc High-Output Racing 4'] },
        { name: 'R1250GS Adventure', years: [2021, 2022, 2023, 2024], engines: ['1254cc Boxer Twin'] }
      ]
    }
  ]
};

export const CATEGORIES = [
  {
    id: 'exhaust',
    name: 'Exhaust Systems & Downpipes',
    nameKh: 'ប្រព័ន្ធបំពង់ស៊ីម៉ាំង & Downpipe',
    slug: 'exhaust-systems',
    icon: 'Flame',
    count: 38,
    vehicleType: 'all',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    description: 'Titanium and stainless performance full systems, slip-ons, valvetronic cat-backs, and ceramic heat-coated downpipes.'
  },
  {
    id: 'aero',
    name: 'Carbon Aero & Body Kits',
    nameKh: 'គ្រឿងបំពាក់ Carbon Fiber & Body Kit',
    slug: 'carbon-aero',
    icon: 'Shield',
    count: 42,
    vehicleType: 'all',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    description: 'Autoclave pre-preg dry carbon spoilers, widebody fender flares, front splitters, and aerodynamic diffusers.'
  },
  {
    id: 'wheels',
    name: 'Forged Wheels & Tires',
    nameKh: 'កង់យ៉ាន់ Forged & សំបកកង់ប្រណាំង',
    slug: 'forged-wheels',
    icon: 'Disc',
    count: 29,
    vehicleType: 'car',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
    description: 'Custom monoblock aerospace aluminum 6061-T6 forged wheels, centerlock conversions, and high-grip track tires.'
  },
  {
    id: 'suspension',
    name: 'Suspension & Coilovers',
    nameKh: 'ប្រព័ន្ធបូម & ជន្ទល់ប្រណាំង',
    slug: 'suspension-coilovers',
    icon: 'Activity',
    count: 24,
    vehicleType: 'all',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    description: 'Fully adjustable inverted coilovers, piggyback reservoir shocks, electronic active dampers, and air suspension systems.'
  },
  {
    id: 'brakes',
    name: 'Big Brake Kits (BBK)',
    nameKh: 'ប្រព័ន្ធហ្វ្រាំងធំ Brembo / AP Racing',
    slug: 'brakes-rotors',
    icon: 'CircleDot',
    count: 19,
    vehicleType: 'all',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80',
    description: 'Monobloc 6-piston and 4-piston calipers, two-piece floating slotted/drilled ceramic composite brake rotors.'
  },
  {
    id: 'tuning',
    name: 'ECU Tuning & Electronics',
    nameKh: 'ប្រព័ន្ធតេស្តម៉ាស៊ីន & កុំព្យូទ័រ ECU Remap',
    slug: 'ecu-tuning',
    icon: 'Cpu',
    count: 27,
    vehicleType: 'all',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    description: 'Stage 1/2/3 plug-and-play piggyback modules, standalone engine management, quickshifters, launch control, and dyno flash maps.'
  },
  {
    id: 'lighting',
    name: 'Laser & Matrix Lighting',
    nameKh: 'ចង្កៀងមុខ Laser & ភ្លើងតុបតែង LED',
    slug: 'lighting-matrix',
    icon: 'Sun',
    count: 31,
    vehicleType: 'all',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    description: 'RGB sequential smoked taillights, ultra-bright laser projectors, underglow ambient LED kits, and daytime running lights.'
  },
  {
    id: 'moto-cnc',
    name: 'Motorcycle CNC & Armor',
    nameKh: 'គ្រឿងបន្លាស់ម៉ូតូ CNC & ការពារដួល',
    slug: 'moto-cnc-armor',
    icon: 'Wrench',
    count: 35,
    vehicleType: 'moto',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    description: 'Billet rearsets, frame sliders, clutch guards, carbon fiber tank shrouds, clip-ons, and bar-end mirrors.'
  }
];

export const PRODUCTS = [
  {
    id: 'MCC-P001',
    title: 'Akrapovič Evolution Titanium Full Exhaust System',
    titleKh: 'បំពង់ស៊ីម៉ាំង Akrapovič Titanium Full System កម្រិតប្រណាំង',
    slug: 'akrapovic-evolution-titanium-exhaust',
    category: 'exhaust',
    vehicleType: 'car',
    brand: 'Akrapovič',
    retailPrice: 4250,
    b2bTiers: [
      { minQty: 1, price: 4250 },
      { minQty: 3, price: 3820 },
      { minQty: 5, price: 3490 },
      { minQty: 10, price: 3180 }
    ],
    moq: 1,
    b2bMoq: 3,
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 38,
    featured: true,
    isB2BPopular: true,
    isPromotion: true,
    promoDiscountPercent: 8,
    installationAvailable: true,
    installationFee: 120,
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Honda', model: 'Civic Type R (FL5)', years: [2023, 2024, 2025] },
      { make: 'Toyota', model: 'GR Yaris', years: [2021, 2022, 2023, 2024] },
      { make: 'BMW', model: 'M3 (G80) / M4 (G82)', years: [2021, 2022, 2023, 2024, 2025] }
    ],
    specifications: {
      'Material': 'Ultralight Grade 1 Titanium & Carbon Tips',
      'Weight Reduction': '-9.4 kg (-46% vs OEM)',
      'Horsepower Gain': '+14.2 HP @ 5,900 RPM',
      'Torque Gain': '+18.6 Nm @ 3,400 RPM',
      'Sound Valve Control': 'Dual Wireless Bluetooth Controller + OBD2 Mode',
      'Warranty': '3 Years Factory Warranty (Cambodia Official)',
      'Installation Time': '2.5 Hours at Certified Partner Garage'
    },
    description: 'Precision engineered in Slovenia. The Akrapovič Evolution Titanium System delivers unmatched acoustic resonance, instant throttle response, and significant power gains without triggering check engine lights. Complete with hand-finished carbon fiber quad tips.',
    descriptionKh: 'ផលិតឡើងពីលោហៈធាតុ Titanium ពិសេសទម្ងន់ស្រាលបំផុត កាត់បន្ថយទម្ងន់បានរហូតដល់ 9.4kg បង្កើនកម្លាំងសេះ +14.2 HP និងកម្លាំងរមួល +18.6 Nm។ មានប្រព័ន្ធបិទបើកសម្លេងតាម Bluetooth Controller និងទុយោចុងកាបូន 4 គ្រាប់យ៉ាងប្រណិត។'
  },
  {
    id: 'MCC-P002',
    title: 'SC-Project SC1-R Titanium Slip-On Motorcycle Exhaust',
    titleKh: 'បំពង់ស៊ីម៉ាំងម៉ូតូ SC-Project SC1-R Titanium Slip-On',
    slug: 'sc-project-sc1r-slipon-moto',
    category: 'exhaust',
    vehicleType: 'moto',
    brand: 'SC-Project',
    retailPrice: 890,
    b2bTiers: [
      { minQty: 1, price: 890 },
      { minQty: 5, price: 740 },
      { minQty: 10, price: 670 },
      { minQty: 20, price: 590 }
    ],
    moq: 1,
    b2bMoq: 5,
    inStock: true,
    stockCount: 28,
    rating: 4.95,
    reviewCount: 64,
    featured: true,
    isB2BPopular: true,
    isPromotion: false,
    promoDiscountPercent: 0,
    installationAvailable: true,
    installationFee: 25,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Yamaha', model: 'YZF-R7', years: [2022, 2023, 2024, 2025] },
      { make: 'Yamaha', model: 'MT-09 / SP', years: [2021, 2022, 2023, 2024] },
      { make: 'Kawasaki', model: 'Ninja ZX-6R (636)', years: [2021, 2022, 2023, 2024, 2025] },
      { make: 'Honda', model: 'CBR650R', years: [2021, 2022, 2023, 2024] },
      { make: 'Ducati', model: 'Panigale V4 / V4S', years: [2021, 2022, 2023, 2024] }
    ],
    specifications: {
      'Sleeve Material': 'Aeronautical Titanium with Matt Carbon End Cap',
      'Weight': '1.85 kg (OEM 4.6 kg)',
      'dB Killer': 'Removable Racing Baffle Included',
      'Power Gain': '+4.8 HP @ 10,200 RPM',
      'Certification': 'Euro 5 Approved with Catalyst Link Pipe',
      'Country of Origin': 'Milan, Italy'
    },
    description: 'Directly inherited from MotoGP technology. The SC1-R is the benchmark of high-revving racing sound, thermal efficiency, and lightweight architecture.',
    descriptionKh: 'បច្ចេកវិទ្យាផ្លូវប្រណាំង MotoGP ពីប្រទេសអ៊ីតាលី! ផលិតពី Titanium ជាមួយគម្របចុង Carbon Fiber។ សម្លេងកក្រើកបែប Superbike ជួយសម្រាលទម្ងន់ និងបង្កើនល្បឿនស្ទុះភ្លាមៗ។'
  },
  {
    id: 'MCC-P003',
    title: 'Brembo GT-R Monobloc 6-Piston Big Brake Kit (380mm Rotors)',
    titleKh: 'ឈុតហ្វ្រាំងធំ Brembo GT-R 6-Piston 380mm Floating Rotors',
    slug: 'brembo-gtr-monobloc-6piston-bbk',
    category: 'brakes',
    vehicleType: 'car',
    brand: 'Brembo',
    retailPrice: 5400,
    b2bTiers: [
      { minQty: 1, price: 5400 },
      { minQty: 2, price: 4850 },
      { minQty: 4, price: 4400 },
      { minQty: 8, price: 3990 }
    ],
    moq: 1,
    b2bMoq: 2,
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 22,
    featured: true,
    isB2BPopular: true,
    isPromotion: true,
    promoDiscountPercent: 5,
    installationAvailable: true,
    installationFee: 150,
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Honda', model: 'Civic Type R (FL5)', years: [2023, 2024, 2025] },
      { make: 'Toyota', model: 'GR Supra (A90)', years: [2020, 2021, 2022, 2023, 2024] },
      { make: 'BMW', model: 'M3 (G80) / M4 (G82)', years: [2021, 2022, 2023, 2024, 2025] },
      { make: 'Ford', model: 'Mustang GT', years: [2020, 2021, 2022, 2023, 2024] }
    ],
    specifications: {
      'Caliper Body': 'Nickel Plated Billet Monobloc Aluminum',
      'Piston Count': '6 Differential Diameter Stainless Pistons',
      'Rotor Size': '380x34mm Type-3 Curved Slotted 2-Piece Floating',
      'Brake Pads': 'High Performance Street & Track Ceramic Carbon Pad',
      'Lines': 'Goodridge Stainless Steel Braided Brake Hoses',
      'Warranty': '2 Years Brembo High Performance Warranty'
    },
    description: 'The pinnacle of braking technology. Brembo GT-R provides relentless stopping power, zero brake fade under extreme track temperatures, and distinctive nickel-plated race aesthetics.',
    descriptionKh: 'កំពូលឈុតហ្វ្រាំងប្រណាំង Brembo GT-R Caliper 6 ពីស្តុង Monobloc ពណ៌ Nickel រួមជាមួយថាសហ្វ្រាំង 380mm មុខកាត់ពីរជាន់ Floating Rotor និងខ្សែហ្វ្រាំងដែកអ៊ីណុក Goodridge។'
  },
  {
    id: 'MCC-P004',
    title: 'Öhlins Road & Track Dedicated Coilovers (DFV Technology)',
    titleKh: 'បូមប្រណាំង Öhlins Road & Track Dual Flow Valve (DFV)',
    slug: 'ohlins-road-and-track-coilovers',
    category: 'suspension',
    vehicleType: 'car',
    brand: 'Öhlins',
    retailPrice: 2850,
    b2bTiers: [
      { minQty: 1, price: 2850 },
      { minQty: 3, price: 2520 },
      { minQty: 6, price: 2280 },
      { minQty: 12, price: 2050 }
    ],
    moq: 1,
    b2bMoq: 3,
    inStock: true,
    stockCount: 11,
    rating: 4.88,
    reviewCount: 41,
    featured: true,
    isB2BPopular: true,
    isPromotion: false,
    promoDiscountPercent: 0,
    installationAvailable: true,
    installationFee: 100,
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Honda', model: 'Civic Type R (FL5)', years: [2023, 2024, 2025] },
      { make: 'Honda', model: 'Civic (FE / Hatchback)', years: [2022, 2023, 2024, 2025] },
      { make: 'Toyota', model: 'GR Yaris', years: [2021, 2022, 2023, 2024] },
      { make: 'Toyota', model: 'GR86', years: [2022, 2023, 2024, 2025] },
      { make: 'BMW', model: '330i / M340i (G20)', years: [2020, 2021, 2022, 2023, 2024] }
    ],
    specifications: {
      'Valving Technology': 'DFV (Dual Flow Valve) Comfort & High-Speed Control',
      'Height Adjustment': 'Independent Threaded Lower Bracket (-15mm to -50mm)',
      'Damping Clicks': '24-Way Simultaneous Compression & Rebound Adjustment',
      'Top Mounts': 'Spherical Bearing Camber Adjustable Pillowball (Front)',
      'Corrosion Protection': 'Salt Spray Tested 240+ Hours Anodized Body'
    },
    description: 'Experience pure Swedish suspension mastery. Road & Track with DFV keeps the tires glued to uneven roads and curbs while maintaining daily street comfort without kidney-punching harshness.',
    descriptionKh: 'បូមកម្រិតពិភពលោក Öhlins DFV ពីប្រទេសស៊ុយអែត! អាចសារ៉េកម្ពស់ទាបខ្ពស់ និងរឹងទន់បាន ២៤ កម្រិត ផ្តល់លំនឹងជាប់ថ្នល់ ងាយបត់បែន និងទន់ស្រួលក្នុងការបើកបរប្រចាំថ្ងៃ។'
  },
  {
    id: 'MCC-P005',
    title: 'Vorsteiner Pre-Preg Dry Carbon Fiber Aerokit & Rear Wing',
    titleKh: 'ឈុត Carbon Fiber Dry Aerokit & កន្ទុយក្រោយ Vorsteiner',
    slug: 'vorsteiner-carbon-aerokit-wing',
    category: 'aero',
    vehicleType: 'car',
    brand: 'Vorsteiner',
    retailPrice: 3890,
    b2bTiers: [
      { minQty: 1, price: 3890 },
      { minQty: 2, price: 3450 },
      { minQty: 5, price: 3090 },
      { minQty: 10, price: 2750 }
    ],
    moq: 1,
    b2bMoq: 2,
    inStock: true,
    stockCount: 6,
    rating: 4.92,
    reviewCount: 19,
    featured: true,
    isB2BPopular: false,
    isPromotion: true,
    promoDiscountPercent: 10,
    installationAvailable: true,
    installationFee: 140,
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'BMW', model: 'M3 (G80) / M4 (G82)', years: [2021, 2022, 2023, 2024, 2025] },
      { make: 'Porsche', model: '911 (992) Carrera / GT3', years: [2020, 2021, 2022, 2023, 2024] },
      { make: 'Toyota', model: 'GR Supra (A90)', years: [2020, 2021, 2022, 2023, 2024] }
    ],
    specifications: {
      'Weave Type': '2x2 Twill Dry Carbon Fiber with UV Gloss Clear Coat',
      'Manufacturing': 'Autoclave Cured under High Heat & Vacuum Pressure',
      'Downforce Rating': '+85 kg of Real Downforce at 160 km/h',
      'Fitment': 'OEM 3D Laser Scan Mapped - Direct Bolt-on Replacement'
    },
    description: 'Designed in California for supercar enthusiasts. Vorsteiner dry carbon components combine aggressive aerospace contours with flawless UV-resistant mirror clear coating.',
    descriptionKh: 'ផលិតពីសសៃកាបូនស្ងួត Dry Carbon Fiber ប្រភេទ 2x2 Twill តាមបច្ចេកវិទ្យា Autoclave។ បង្កើនកម្លាំងសង្កត់ Downforce +85kg ពេលបើកបរក្នុងល្បឿនលឿន និងបង្កើនរូបរាងស្ព័រអស្ចារ្យ។'
  },
  {
    id: 'MCC-P006',
    title: 'BBS FI-R Forged Monoblock Lightweight Wheels (Set of 4)',
    titleKh: 'កង់យ៉ាន់ BBS FI-R Forged Monoblock ស្រាលបំផុត (១ឈុត ៤គ្រាប់)',
    slug: 'bbs-fir-forged-monoblock-wheels',
    category: 'wheels',
    vehicleType: 'car',
    brand: 'BBS Germany',
    retailPrice: 8400,
    b2bTiers: [
      { minQty: 1, price: 8400 },
      { minQty: 2, price: 7600 },
      { minQty: 4, price: 6990 },
      { minQty: 8, price: 6350 }
    ],
    moq: 1,
    b2bMoq: 2,
    inStock: true,
    stockCount: 5,
    rating: 5.0,
    reviewCount: 15,
    featured: true,
    isB2BPopular: true,
    isPromotion: false,
    promoDiscountPercent: 0,
    installationAvailable: true,
    installationFee: 60,
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Porsche', model: '911 (992) Carrera / GT3', years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { make: 'BMW', model: 'M3 (G80) / M4 (G82)', years: [2021, 2022, 2023, 2024, 2025] },
      { make: 'Toyota', model: 'GR Supra (A90)', years: [2020, 2021, 2022, 2023, 2024] }
    ],
    specifications: {
      'Structure': '1-Piece Forged Monoblock Aluminum with Relief Holes',
      'Wheel Weight': 'Just 7.9 kg per 19" wheel!',
      'Finish': 'Satin Platinum / Diamond Black / Ceramic Gold',
      'PCD': '5x112 / 5x120 / Centerlock Option',
      'Origin': 'Schiltach, Germany'
    },
    description: 'The holy grail of forged wheels. Features distinctive weight-saving relief holes cut directly through the spokes. Unmatched rotational inertia reduction.',
    descriptionKh: 'កំពូលយ៉ាន់រថយន្ត Forged Monoblock ពីប្រទេសអាល្លឺម៉ង់! ទម្ងន់ស្រាលត្រឹមតែ 7.9kg ក្នុងមួយគ្រាប់ មានប្រហោងកាត់បន្ថយទម្ងន់នៅតាមកាំយ៉ាន់ បង្កើនល្បឿនស្ទុះ និងការទប់លំនឹង។'
  },
  {
    id: 'MCC-P007',
    title: 'HKS Flash Editor & Stage 2 ECU Dyno Remap Calibration',
    titleKh: 'ប្រព័ន្ធ HKS Flash Editor & កម្មវិធី ECU Stage 2 Dyno Remap',
    slug: 'hks-flash-editor-stage-2-ecu',
    category: 'tuning',
    vehicleType: 'car',
    brand: 'HKS Japan',
    retailPrice: 1150,
    b2bTiers: [
      { minQty: 1, price: 1150 },
      { minQty: 3, price: 980 },
      { minQty: 6, price: 880 },
      { minQty: 12, price: 790 }
    ],
    moq: 1,
    b2bMoq: 3,
    inStock: true,
    stockCount: 30,
    rating: 4.85,
    reviewCount: 52,
    featured: false,
    isB2BPopular: true,
    isPromotion: true,
    promoDiscountPercent: 12,
    installationAvailable: true,
    installationFee: 50,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Honda', model: 'Civic Type R (FL5)', years: [2023, 2024, 2025] },
      { make: 'Honda', model: 'Civic (FE / Hatchback)', years: [2022, 2023, 2024, 2025] },
      { make: 'Toyota', model: 'GR Yaris', years: [2021, 2022, 2023, 2024] },
      { make: 'Ford', model: 'Ranger Raptor', years: [2022, 2023, 2024, 2025] }
    ],
    specifications: {
      'Interface': 'OBD2 Diagnostic Port Direct Read & Write',
      'Maps Included': 'Phase 1 (Stock Boost +30hp), Phase 2 (Custom Exhaust/Intake +55hp)',
      'Data Logging': 'Live Real-time AFR, Knock Sensor, Boost Pressure, IAT',
      'Features': 'Speed Limiter Removal, Pops & Bangs Crackle Map, Rev Limit +500 RPM'
    },
    description: 'Plug into your OBD2 port and unleash genuine JDM horsepower. Features multiple switchable fuel maps for 95 Octane and 98 Octane fuels in Cambodia.',
    descriptionKh: 'ឧបករណ៍ដោតឌុយ OBD2 បញ្ចូលទិន្នន័យ Map ថ្មីពី HKS ជប៉ុន។ ជួយបង្កើនកម្លាំងសេះ +30hp ដល់ +55hp ដោះសោរល្បឿនអតិបរមា និងមានមុខងារ Pops & Bangs យ៉ាងពីរោះ។'
  },
  {
    id: 'MCC-P008',
    title: 'Ducabike Billet CNC Clear Clutch Cover & Pressure Plate Kit',
    titleKh: 'ឈុតគម្របក្ដាប់កំប៉ុងថ្លា Ducabike Billet CNC Clear Clutch Cover',
    slug: 'ducabike-clear-clutch-cover-kit',
    category: 'moto-cnc',
    vehicleType: 'moto',
    brand: 'Ducabike Italy',
    retailPrice: 720,
    b2bTiers: [
      { minQty: 1, price: 720 },
      { minQty: 4, price: 590 },
      { minQty: 8, price: 520 },
      { minQty: 15, price: 460 }
    ],
    moq: 1,
    b2bMoq: 4,
    inStock: true,
    stockCount: 18,
    rating: 4.96,
    reviewCount: 37,
    featured: false,
    isB2BPopular: true,
    isPromotion: false,
    promoDiscountPercent: 0,
    installationAvailable: true,
    installationFee: 30,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Ducati', model: 'Panigale V4 / V4S', years: [2021, 2022, 2023, 2024, 2025] },
      { make: 'Ducati', model: 'Streetfighter V4', years: [2021, 2022, 2023, 2024, 2025] },
      { make: 'Ducati', model: 'Monster 937', years: [2021, 2022, 2023, 2024] }
    ],
    specifications: {
      'Material': '6082 Billet Aluminum with Hard Anodized Color Treatment',
      'Window Lens': 'High-Impact Lexan Polycarbonate (Heat Resistant to 220°C)',
      'O-Ring Seal': 'Viton Fluoropolymer High Temperature Gasket',
      'Colors Available': 'Racing Red, Anodized Gold, Stealth Black, Ducati Silver'
    },
    description: 'Transform your Ducati into an rolling kinetic art piece. High-clarity Lexan window reveals the spinning pressure plate and internal oil circulation.',
    descriptionKh: 'ផលិតនៅប្រទេសអ៊ីតាលីពីអាលុយមីញ៉ូម CNC គុណភាពខ្ពស់ ជាមួយកញ្ចក់ថ្លា Lexan ធន់កម្តៅខ្លាំង។ បង្ហាញការវិលនៃទ្រនាប់ក្ដាប់ម៉ាស៊ីន (Clutch) យ៉ាងទាក់ទាញបំផុត។'
  },
  {
    id: 'MCC-P009',
    title: 'Gilles Tooling MUE2 Adjustable CNC Billet Racing Rearsets',
    titleKh: 'ឈុតឈ្នាន់ជើងប្រណាំង Gilles Tooling MUE2 CNC Billet',
    slug: 'gilles-tooling-mue2-rearsets',
    category: 'moto-cnc',
    vehicleType: 'moto',
    brand: 'Gilles Tooling',
    retailPrice: 580,
    b2bTiers: [
      { minQty: 1, price: 580 },
      { minQty: 5, price: 490 },
      { minQty: 10, price: 430 },
      { minQty: 20, price: 385 }
    ],
    moq: 1,
    b2bMoq: 5,
    inStock: true,
    stockCount: 22,
    rating: 4.89,
    reviewCount: 29,
    featured: false,
    isB2BPopular: false,
    isPromotion: true,
    promoDiscountPercent: 10,
    installationAvailable: true,
    installationFee: 25,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Yamaha', model: 'YZF-R7', years: [2022, 2023, 2024, 2025] },
      { make: 'Yamaha', model: 'YZF-R1 / R1M', years: [2020, 2021, 2022, 2023, 2024] },
      { make: 'BMW Motorrad', model: 'S1000RR', years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { make: 'Kawasaki', model: 'Ninja ZX-10R', years: [2021, 2022, 2023, 2024] }
    ],
    specifications: {
      'Adjustment Range': '16 Position Footpeg Indexing with Double Ball Bearings',
      'Shifting': 'Standard or Reverse GP Shift Pattern Compatible',
      'Material': 'High Tensile 7075-T6 Aerospace Billet Alloy',
      'Carbon Heel Guards': 'Real Twill Carbon Fiber Included'
    },
    description: 'Official supplier to BMW Motorrad WorldSBK Team. Offers razor-sharp shifting precision, knurled anti-slip footpegs, and perfect ergonomic tailoring.',
    descriptionKh: 'ឈ្នាន់ប្រណាំង CNC លំដាប់ WorldSBK ពី Gilles Tooling! អាចសារ៉េទីតាំងឈ្នាន់ជើងបាន ១៦ កម្រិត ងាយស្រួលផ្អៀងកាច់កែងលើផ្លូវ និងប្តូរលេខបានរហ័ស។'
  },
  {
    id: 'MCC-P010',
    title: 'Laser Matrix LED Sequential Smoked Dynamic Headlight Assembly',
    titleKh: 'ចង្កៀងមុខ Laser Matrix LED Sequential Smoked Dynamic',
    slug: 'laser-matrix-led-smoked-headlights',
    category: 'lighting',
    vehicleType: 'car',
    brand: 'AlphaRex Pro',
    retailPrice: 1650,
    b2bTiers: [
      { minQty: 1, price: 1650 },
      { minQty: 3, price: 1420 },
      { minQty: 6, price: 1290 },
      { minQty: 12, price: 1150 }
    ],
    moq: 1,
    b2bMoq: 3,
    inStock: true,
    stockCount: 15,
    rating: 4.87,
    reviewCount: 34,
    featured: false,
    isB2BPopular: true,
    isPromotion: false,
    promoDiscountPercent: 0,
    installationAvailable: true,
    installationFee: 60,
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Ford', model: 'Ranger Raptor', years: [2022, 2023, 2024, 2025] },
      { make: 'Ford', model: 'Everest Titanium', years: [2022, 2023, 2024, 2025] },
      { make: 'Toyota', model: 'Hilux Revo / Rocco', years: [2020, 2021, 2022, 2023, 2024, 2025] }
    ],
    specifications: {
      'Projector Technology': 'Quad 3D Ice-Cube Laser LED Bi-Projectors',
      'DRL Function': '3D Polycarbonate Fiber-Optic Sequential Startup Animation',
      'Lumens Output': '12,000 Lumens (300% Brighter than Halogen OEM)',
      'Waterproof Standard': 'IP68 Sealed with Desiccant Anti-Fog Breathing Valves'
    },
    description: 'Transform your truck or SUV with high-intensity laser lighting, signature activation animation when unlocking, and amber sequential turn signals.',
    descriptionKh: 'ចង្កៀងមុខ Laser Matrix LED ជំនាន់ចុងក្រោយ ពន្លឺខ្លាំងរហូតដល់ 12,000 Lumens ភ្លឺច្បាស់នៅពេលយប់ ជាមួយភ្លើងរត់ Animation ស្វាគមន៍នៅពេលដោះសោររថយន្ត។'
  },
  {
    id: 'MCC-P011',
    title: 'Öhlins TTX GP Rear Shock Absorber for Superbike',
    titleKh: 'បូមក្រោយ Öhlins TTX GP សម្រាប់ Superbike',
    slug: 'ohlins-ttx-gp-rear-shock-moto',
    category: 'suspension',
    vehicleType: 'moto',
    brand: 'Öhlins',
    retailPrice: 1750,
    b2bTiers: [
      { minQty: 1, price: 1750 },
      { minQty: 3, price: 1520 },
      { minQty: 6, price: 1380 },
      { minQty: 10, price: 1250 }
    ],
    moq: 1,
    b2bMoq: 3,
    inStock: true,
    stockCount: 9,
    rating: 4.98,
    reviewCount: 46,
    featured: true,
    isB2BPopular: true,
    isPromotion: false,
    promoDiscountPercent: 0,
    installationAvailable: true,
    installationFee: 40,
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Yamaha', model: 'YZF-R1 / R1M', years: [2020, 2021, 2022, 2023, 2024] },
      { make: 'Kawasaki', model: 'Ninja ZX-10R', years: [2021, 2022, 2023, 2024] },
      { make: 'Honda', model: 'CBR1000RR-R Fireblade SP', years: [2021, 2022, 2023, 2024, 2025] },
      { make: 'Ducati', model: 'Panigale V4 / V4S', years: [2021, 2022, 2023, 2024, 2025] },
      { make: 'BMW Motorrad', model: 'S1000RR', years: [2020, 2021, 2022, 2023, 2024, 2025] }
    ],
    specifications: {
      'Technology': 'TTX Twin Tube MotoGP Hydraulic Fluid Circuit',
      'Adjustability': 'Compression, Rebound, Spring Preload & Ride Height',
      'Piston Diameter': '36mm Solid Piston with Internal Nitrogen Reservoir',
      'Spring Rate': 'Customized Spring Rate matched to Rider Body Weight'
    },
    description: 'The definitive WorldSBK championship rear shock. Twin tube TTX circulation eliminates risk of cavitation, ensuring consistent damping in extreme tropical heat.',
    descriptionKh: 'បូមក្រោយម៉ូតូ Öhlins TTX GP លំដាប់ MotoGP! បច្ចេកវិទ្យា Twin-Tube ជួយរក្សាសីតុណ្ហភាពប្រេងឱ្យត្រជាក់ និងសារ៉េបានសព្វបែបយ៉ាង ធានាលំនឹងកង់ក្រោយមិនរអិលពេលកាច់កែងល្បឿនលឿន។'
  },
  {
    id: 'MCC-P012',
    title: 'Eventuri Carbon Fiber High-Flow Cold Air Intake System',
    titleKh: 'ប្រព័ន្ធបឺតខ្យល់ Eventuri Dry Carbon Fiber Cold Air Intake',
    slug: 'eventuri-carbon-cold-air-intake',
    category: 'tuning',
    vehicleType: 'car',
    brand: 'Eventuri UK',
    retailPrice: 1980,
    b2bTiers: [
      { minQty: 1, price: 1980 },
      { minQty: 3, price: 1750 },
      { minQty: 5, price: 1580 },
      { minQty: 10, price: 1420 }
    ],
    moq: 1,
    b2bMoq: 3,
    inStock: true,
    stockCount: 12,
    rating: 4.93,
    reviewCount: 28,
    featured: false,
    isB2BPopular: false,
    isPromotion: true,
    promoDiscountPercent: 15,
    installationAvailable: true,
    installationFee: 50,
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    compatibleVehicles: [
      { make: 'Honda', model: 'Civic Type R (FL5)', years: [2023, 2024, 2025] },
      { make: 'Toyota', model: 'GR Yaris', years: [2021, 2022, 2023, 2024] },
      { make: 'BMW', model: 'M3 (G80) / M4 (G82)', years: [2021, 2022, 2023, 2024, 2025] }
    ],
    specifications: {
      'Housing Design': 'Patented Venturi Effect Carbon Air Filter Housing',
      'Inlet Ducting': 'Direct Scoop Sealed Engine Bay Heat Shielding',
      'Air Temperature': 'Intake Air Temp (IAT) reduced by up to -12°C',
      'Acoustics': 'Pronounced Turbo Spool and Blow-Off Valve Induction Sound'
    },
    description: 'Setting a new standard in intake design. Uses aerodynamically shaped carbon cones to create laminar air flow directly into the turbocharger compressor.',
    descriptionKh: 'ប្រព័ន្ធបឺតខ្យល់ Eventuri ពីចក្រភពអង់គ្លេស! ផលិតពីកាបូន Fiber សុទ្ធ កាត់បន្ថយកម្តៅខ្យល់បឺតចូល Turbo ជួយឱ្យម៉ាស៊ីនដំណើរការខ្លាំង និងឮសម្លេង Turbo Spool យ៉ាងពិរោះ។'
  }
];

export const PARTNER_GARAGES = [
  {
    id: 'G-PP-01',
    name: 'Apex Performance Tuning & Dyno Lab',
    nameKh: 'Apex Performance Tuning & មជ្ឈមណ្ឌល Dyno',
    province: 'Phnom Penh',
    district: 'Tuol Kork',
    address: 'Street 315, Sangkat Boeung Kak 1, Khan Tuol Kork, Phnom Penh',
    phone: '+855 (0)23 999 111',
    telegram: '@apex_tuning_kh',
    rating: 4.95,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    openingHours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    lifts: 6,
    hasDyno: true,
    certifiedServices: ['ECU Remap & Dyno Run', 'Akrapovič / Full Exhaust Installation', 'Coilover Setup & Corner Balancing', 'Brembo Big Brake Kit Upgrades'],
    verifiedByMotoCar: true,
    badges: ['Certified Master Center', '4WD Dyno Facility', 'VIP Lounge']
  },
  {
    id: 'G-PP-02',
    name: 'K-Speed Superbike & MotoCraft Workshop',
    nameKh: 'K-Speed Superbike & ជាងជំនាញម៉ូតូធំ',
    province: 'Phnom Penh',
    district: 'Chamkarmon',
    address: 'Norodom Blvd, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh',
    phone: '+855 (0)98 777 222',
    telegram: '@kspeed_moto_kh',
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    openingHours: 'Mon - Sun: 8:30 AM - 7:00 PM',
    lifts: 4,
    hasDyno: true,
    certifiedServices: ['Superbike SC-Project Exhaust Fitting', 'Ducabike & CNC Tuning', 'Öhlins Suspension Servicing', 'Quickshifter & ECU Flash'],
    verifiedByMotoCar: true,
    badges: ['Official Superbike Specialist', 'Motorcycle Dyno On-Site']
  },
  {
    id: 'G-PP-03',
    name: 'RPM Carbon Aero & Bodyshop Pro',
    nameKh: 'RPM Carbon Aero & មជ្ឈមណ្ឌលកែច្នៃរថយន្ត',
    province: 'Phnom Penh',
    district: 'Sen Sok',
    address: 'Street 2004, Sangkat Teuk Thla, Khan Sen Sok, Phnom Penh',
    phone: '+855 (0)12 333 444',
    telegram: '@rpm_aero_kh',
    rating: 4.88,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    openingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    lifts: 5,
    hasDyno: false,
    certifiedServices: ['Dry Carbon Bodykit Fitting', 'BBS Wheel Alignment & Mounting', 'Laser Headlight Retrofitting', 'PPF Paint Protection'],
    verifiedByMotoCar: true,
    badges: ['Aero & Carbon Certified', 'Dust-Free Installation Booth']
  },
  {
    id: 'G-SR-01',
    name: 'Angkor Speed & 4x4 Offroad Custom',
    nameKh: 'Angkor Speed & យានដ្ឋានកែច្នៃ 4x4 សៀមរាប',
    province: 'Siem Reap',
    district: 'Slor Kram',
    address: 'National Road 6, Sangkat Slor Kram, Krong Siem Reap',
    phone: '+855 (0)63 888 555',
    telegram: '@angkorspeed_sr',
    rating: 4.92,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    openingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    lifts: 4,
    hasDyno: false,
    certifiedServices: ['Raptor & Truck Suspension Lift Kits', 'Matrix Laser Lighting Upgrades', 'Performance Brake Upgrades', 'Virak Buntham Direct Depot Delivery'],
    verifiedByMotoCar: true,
    badges: ['Siem Reap Premier Hub', 'Truck & Superbike Service']
  },
  {
    id: 'G-BTB-01',
    name: 'Battambang Racing Syndicate',
    nameKh: 'យានដ្ឋានប្រណាំង បាត់ដំបង Racing Syndicate',
    province: 'Battambang',
    district: 'Svay Pao',
    address: 'Street 106, Sangkat Svay Pao, Krong Battambang',
    phone: '+855 (0)53 666 777',
    telegram: '@btb_racingsyndicate',
    rating: 4.84,
    reviewsCount: 61,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    openingHours: 'Mon - Sat: 8:00 AM - 5:30 PM',
    lifts: 3,
    hasDyno: false,
    certifiedServices: ['Motorcycle CNC Accessories Fitting', 'Exhaust Custom Welds & Slip-on', 'Oil & Suspension Overhaul'],
    verifiedByMotoCar: true,
    badges: ['Regional Certified Partner']
  }
];

export const PROMOTIONS = [
  {
    id: 'PROMO-01',
    code: 'MOTO2025',
    title: 'Spring Season Kickoff',
    titleKh: 'ប្រូម៉ូសិនពិសេសដើមរដូវកាល',
    discount: '10% OFF',
    discountPercent: 10,
    minSpend: 200,
    validUntil: '2026-12-31',
    description: 'Save 10% on all motorcycle performance exhausts & CNC billet accessories.'
  },
  {
    id: 'PROMO-02',
    code: 'GARAGE10',
    title: 'Free Certified Installation',
    titleKh: 'ឥតគិតថ្លៃសេវាដំឡើងនៅយានដ្ឋានដៃគូ',
    discount: 'Free Install ($120 Cap)',
    discountPercent: 0,
    freeInstallation: true,
    minSpend: 500,
    validUntil: '2026-11-30',
    description: 'Complimentary professional installation at any certified partner garage in Cambodia on orders over $500.'
  },
  {
    id: 'PROMO-03',
    code: 'B2BBULK',
    title: 'B2B Wholesale Garage Bonus',
    titleKh: 'រង្វាន់លើកទឹកចិត្តសម្រាប់យានដ្ឋានលក់ដុំ B2B',
    discount: 'Extra 5% Bulk Credit',
    discountPercent: 5,
    minSpend: 2500,
    validUntil: '2026-12-31',
    description: 'Extra 5% instant discount credit for verified workshops and tuning garages.'
  }
];

export const USER_MOCK = {
  id: 'USR-88219',
  name: 'Sokha Rithy',
  email: 'sokha.rithy@garage-apex.kh',
  phone: '+855 12 888 999',
  telegram: '@sokharithy_kh',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  mode: 'b2c', // 'b2c' | 'b2b'
  b2bProfile: {
    companyName: 'Apex Motor Tuning Co., Ltd',
    companyTin: 'K009-882739102',
    garageLicense: 'MOC-GAR-2024-9912',
    businessType: 'Tuning Garage & Speed Shop',
    creditTier: 'Tier 1 Certified Partner (15% Base Wholesale Discount)',
    creditLimit: 25000,
    availableCredit: 18450,
    creditTermDays: 30, // Net 30
    isApproved: true,
    address: 'Street 315, Sangkat Boeung Kak 1, Khan Tuol Kork, Phnom Penh'
  },
  garageVehicles: [
    {
      id: 'V-01',
      type: 'car',
      make: 'Honda',
      model: 'Civic Type R (FL5)',
      year: 2024,
      engine: '2.0L Turbo K20C1',
      plateNumber: 'PP 2BS-8899',
      nickname: 'Championship White Beast',
      color: 'Championship White',
      isPrimary: true
    },
    {
      id: 'V-02',
      type: 'moto',
      make: 'Yamaha',
      model: 'YZF-R7',
      year: 2023,
      engine: '689cc CP2 Parallel Twin',
      plateNumber: 'PP 1Z-7711',
      nickname: 'Icon Blue Track Weapon',
      color: 'Icon Blue',
      isPrimary: false
    }
  ],
  savedAddresses: [
    {
      id: 'ADDR-1',
      label: 'Tuol Kork Workshop (Primary)',
      recipient: 'Sokha Rithy',
      phone: '+855 12 888 999',
      province: 'Phnom Penh',
      district: 'Tuol Kork',
      detail: 'House #42, Street 315, Sangkat Boeung Kak 1',
      isDefault: true
    },
    {
      id: 'ADDR-2',
      label: 'Home Residence',
      recipient: 'Sokha Rithy',
      phone: '+855 12 888 999',
      province: 'Phnom Penh',
      district: 'Sen Sok',
      detail: 'Borey Peng Huoth The Star Premier, Villa #19',
      isDefault: false
    }
  ]
};

