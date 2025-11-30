import { Shirt, Sparkles, Briefcase, Truck, Zap, Feather } from 'lucide-react';

export const COMPANY_NAME = "Clou Laundry";
export const COMPANY_PHONE = "+62 812-3456-7890";
export const COMPANY_ADDRESS = "Jl. Raya Darmo No. 123, Surabaya";
export const COMPANY_EMAIL = "hello@cloulaundry.id";

export const GIFT_CARD_DESIGNS = [
    { id: 'classic', name: 'Classic Blue', image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=450&fit=crop' },
    { id: 'birthday', name: 'Happy Birthday', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=450&fit=crop' },
    { id: 'thankyou', name: 'Thank You', image: 'https://images.unsplash.com/photo-1549032305-e816fabf0dd2?w=800&h=450&fit=crop' },
];

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Siti Rahmawati",
        role: "Mother of 3",
        text: "Clou has been a lifesaver! The pickup is always on time, and the clothes come back smelling amazing and folded perfectly.",
        avatar: "https://picsum.photos/seed/siti/100/100",
        rating: 5,
        date: "2023-10-15"
    },
    {
        id: 2,
        name: "Budi Santoso",
        role: "Business Professional",
        text: "Best dry cleaner in Surabaya. My suits are always crisp and they handle delicate fabrics very well. Highly recommended.",
        avatar: "https://picsum.photos/seed/budi/100/100",
        rating: 5,
        date: "2023-09-28"
    },
    {
        id: 3,
        name: "Jessica Tan",
        role: "Cafe Owner",
        text: "We use Clou for our cafe's linens. Reliable commercial service with great pricing. The team is very responsive on WhatsApp.",
        avatar: "https://picsum.photos/seed/jess/100/100",
        rating: 4,
        date: "2023-10-02"
    },
    {
        id: 4,
        name: "Rizky Pratama",
        role: "University Student",
        text: "Super convenient for students. I love the app booking system and the express service when I need clothes for a presentation.",
        avatar: "https://picsum.photos/seed/rizky/100/100",
        rating: 5,
        date: "2023-08-15"
    },
    {
        id: 5,
        name: "Amanda Wijaya",
        role: "Fashion Designer",
        text: "I trust Clou with my most expensive fabrics. They really understand how to treat silk and lace. The packaging is also lovely.",
        avatar: "https://picsum.photos/seed/amanda/100/100",
        rating: 5,
        date: "2023-10-10"
    },
    {
        id: 6,
        name: "Dewi Lestari",
        role: "Homemaker",
        text: "Finally a laundry service that actually reads the notes! They followed my request for unscented detergent perfectly.",
        avatar: "https://picsum.photos/seed/dewi/100/100",
        rating: 4,
        date: "2023-09-10"
    }
];

export const SERVICE_ASSETS: Record<string, any> = {
    'Wash & Fold': {
        icon: Shirt,
        description: 'Perfect for everyday clothes. We wash, dry, and neatly fold your laundry ready for your drawer.'
    },
    'Dry Cleaning': {
        icon: Sparkles,
        description: 'Expert care for your delicate fabrics, suits, and dresses using eco-friendly solvents.'
    },
    'Steam Pressing': {
        icon: Zap,
        description: 'Professional ironing service to keep your clothes crisp and wrinkle-free.'
    },
    'Leather Care': {
        icon: Briefcase,
        description: 'Specialized cleaning and conditioning for leather jackets, bags, and shoes.'
    }
};

export const LOYALTY_TIERS = [
    {
        id: 'bronze',
        name: 'Bronze',
        minPoints: 0,
        color: 'bg-orange-50 text-orange-900',
        benefits: [
            'Earn 1 point per Rp 10k',
            'Free Pickup & Delivery',
            'Standard Turnaround (48h)',
            'Birthday Discount (10%)'
        ]
    },
    {
        id: 'silver',
        name: 'Silver',
        minPoints: 1000,
        color: 'bg-slate-100 text-slate-800',
        benefits: [
            'Earn 1.5 points per Rp 10k',
            'Priority Processing (24h)',
            'Free Eco-Detergent Upgrade',
            'Birthday Discount (20%)',
            'Quarterly Dry Cleaning Discount'
        ]
    },
    {
        id: 'gold',
        name: 'Gold',
        minPoints: 5000,
        color: 'bg-yellow-50 text-yellow-900',
        benefits: [
            'Earn 2 points per Rp 10k',
            'Same Day Express Service',
            'Dedicated Account Manager',
            'Free Stain Removal Treatment',
            'Birthday Discount (50%)',
            'Exclusive Seasonal Gifts'
        ]
    }
];

export const FAQS = [
    {
        question: "How do I schedule a pickup?",
        answer: "You can schedule a pickup directly through our website or mobile app. Simply choose your service, select a time slot, and we'll be there."
    },
    {
        question: "What is the turnaround time?",
        answer: "Standard wash & fold is 48 hours. Express service is available for 24-hour turnaround. Dry cleaning typically takes 3-4 days."
    },
    {
        question: "Do you use eco-friendly detergents?",
        answer: "Yes! We use 100% biodegradable, hypoallergenic detergents that are tough on stains but gentle on your skin and the environment."
    },
    {
        question: "What if I'm not home during delivery?",
        answer: "No problem. You can leave specific instructions for our driver, or we can leave your laundry with your building's concierge or security."
    }
];

export const SUBSCRIPTION_PLANS = [
    {
        id: 'starter',
        name: 'Starter Plan',
        price: 'Rp 250k',
        frequency: 'Monthly',
        popular: false,
        bagSize: 'Small Bag (5kg)',
        features: ['2 Pickups per Month', 'Wash & Fold', 'Free Delivery']
    },
    {
        id: 'family',
        name: 'Family Plan',
        price: 'Rp 600k',
        frequency: 'Monthly',
        popular: true,
        bagSize: 'Large Bag (15kg)',
        features: ['4 Pickups per Month', 'Wash & Fold + Ironing', 'Priority Delivery', 'Stain Treatment']
    },
    {
        id: 'business',
        name: 'Business',
        price: 'Rp 1.5m',
        frequency: 'Monthly',
        popular: false,
        bagSize: 'Unlimited',
        features: ['Daily Pickup', 'Full Service', 'Dedicated Manager', 'Express Turnaround']
    }
];

export const MOCK_ORDER_HISTORY = [
    {
        id: 'ORD-2023-001',
        status: 'Completed' as const,
        date: '2023-10-01',
        total: 'Rp 45,000',
        items: ['2kg Wash & Fold', '1x Bed Sheet'],
        photoInventory: ['https://picsum.photos/seed/laundry1/400/600', 'https://picsum.photos/seed/laundry2/400/600']
    },
    {
        id: 'ORD-2023-002',
        status: 'In Progress' as const,
        date: '2023-10-15',
        total: 'Rp 120,000',
        items: ['Suit Dry Clean', 'Dress Steam Press'],
        photoInventory: null
    },
    {
        id: 'ORD-2023-003',
        status: 'Placed' as const,
        date: '2023-10-20',
        total: 'Rp 30,000',
        items: ['5kg Wash & Fold'],
        photoInventory: null
    }
];

export const GALLERY_ITEMS = [
    {
        id: 1,
        before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&sat=-100',
        title: 'Wine Stain Removal',
        category: 'Stain Treatment'
    },
    {
        id: 2,
        before: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&q=80',
        after: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&q=80&sat=-100',
        title: 'Silk Dress Restoration',
        category: 'Delicate Care'
    },
    {
        id: 3,
        before: 'https://images.unsplash.com/photo-1594938298603-c8148c47e356?w=800&q=80',
        after: 'https://images.unsplash.com/photo-1594938298603-c8148c47e356?w=800&q=80&sat=-100',
        title: 'Leather Jacket Conditioning',
        category: 'Leather Care'
    }
];
