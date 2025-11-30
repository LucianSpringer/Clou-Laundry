import { Shirt, Sparkles, Briefcase, Truck, Zap, Feather } from 'lucide-react';

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
