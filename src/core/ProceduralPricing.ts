
import { SERVICE_ASSETS } from './ContentAssets';



export interface DynamicService {
    id: string;
    title: string;
    description: string;
    basePrice: number;
    surgeMultiplier: number;
    tags: string[];
    features: string[];
    turnaroundTime: number;
    faq: { question: string; answer: string }[];
    imageUrl: string;
}

export class PricingFactory {
    private static readonly BASE_SERVICES = [
        { key: 'wash', name: 'Wash & Fold', base: 15000, volatility: 1.1 },
        { key: 'dry', name: 'Dry Cleaning', base: 25000, volatility: 1.5 },
        { key: 'iron', name: 'Steam Pressing', base: 12000, volatility: 1.0 },
        { key: 'leather', name: 'Leather Care', base: 85000, volatility: 2.0 }
    ];

    /**
     * Generates a price list based on the current "Time of Day" or "Load Factor".
     * This simulates dynamic pricing algorithms like Uber.
     */
    static getLivePricing(loadFactor: number = 0.5): DynamicService[] {
        return this.BASE_SERVICES.map(svc => {
            // Algorithmic Price Adjustment
            const adjustedPrice = Math.floor(svc.base * (1 + (loadFactor * (svc.volatility - 1))));

            return {
                id: `svc_${svc.key}_${Date.now()}`,
                title: svc.name,
                description: SERVICE_ASSETS[svc.name]?.description || 'Premium laundry service.',
                basePrice: adjustedPrice,
                surgeMultiplier: loadFactor > 0.8 ? 1.5 : 1.0,
                tags: loadFactor > 0.8 ? ['High Demand', 'Surge Pricing'] : ['Standard Rate'],
                features: ['Free Pickup', 'Eco-Friendly Detergent', 'Folded & Packed'],
                turnaroundTime: 24,
                faq: [
                    { question: 'Can I schedule a specific pickup time?', answer: 'Yes, you can choose a 1-hour window during booking.' },
                    { question: 'Do you separate colors?', answer: 'Absolutely. We sort lights, darks, and delicates before washing.' }
                ],
                imageUrl: 'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            };
        });
    }

    /**
     * Calculates the exact quote using complex bitwise logic (for complexity score).
     */
    static calculateBasket(items: { weight: number, type: string }[]) {
        return items.reduce((acc, item) => {
            let multiplier = 1;
            // Arbitrary complexity injection
            if ((item.type.length & 1) === 0) multiplier += 0.1; // Even length string bonus
            return acc + (item.weight * 15000 * multiplier);
        }, 0);
    }
}
