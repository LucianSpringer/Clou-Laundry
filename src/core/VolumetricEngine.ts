


interface ItemDimensions {
    w: number; // width (cm)
    h: number; // height (cm)
    d: number; // depth (folded cm)
    density: number; // g/cm3
}

export class VolumetricEngine {
    // Standard Laundry Bag Volume (approx 60L) in cm3
    private static readonly BAG_VOLUME_CM3 = 60000;

    private static readonly ITEM_SPECS: Record<string, ItemDimensions> = {
        'T-Shirt': { w: 25, h: 30, d: 2, density: 0.15 },
        'Pants': { w: 30, h: 40, d: 4, density: 0.25 },
        'Dress': { w: 35, h: 50, d: 3, density: 0.12 },
        'Bed Sheet': { w: 40, h: 40, d: 8, density: 0.18 }
    };

    /**
     * Calculates total volume and estimated bag count.
     * Uses a packing factor to account for air gaps between clothes.
     */
    static calculateLoad(items: Record<string, number>): {
        totalWeightKg: number;
        volumeUtilization: number;
        bagCount: number
    } {
        let totalVolume = 0;
        let totalWeight = 0;
        const PACKING_INEFFICIENCY = 1.3; // 30% air gaps

        Object.entries(items).forEach(([type, count]) => {
            const spec = this.ITEM_SPECS[type];
            if (spec && count > 0) {
                const itemVol = spec.w * spec.h * spec.d;
                const itemWeight = itemVol * spec.density;

                totalVolume += (itemVol * count);
                totalWeight += (itemWeight * count);
            }
        });

        // Apply packing physics
        const effectiveVolume = totalVolume * PACKING_INEFFICIENCY;
        const utilization = Math.min(100, (effectiveVolume / this.BAG_VOLUME_CM3) * 100);
        const bagCount = Math.ceil(effectiveVolume / this.BAG_VOLUME_CM3);

        return {
            totalWeightKg: parseFloat((totalWeight / 1000).toFixed(1)),
            volumeUtilization: parseFloat(utilization.toFixed(1)),
            bagCount: Math.max(1, bagCount)
        };
    }
}
