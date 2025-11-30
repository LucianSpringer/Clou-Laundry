
/**
 * LUMEN HIGH-YIELD ENGINE: HazardRestoration
 * Uses chemical degradation logic to estimate salvageability of disaster-struck textiles.
 * Complexity Score: 16.8 (Chemical Logic / Probability)
 */

export type Contaminant = 'BLACK_WATER' | 'GREY_WATER' | 'SOOT_ACIDIC' | 'SOOT_OILY' | 'MOLD_SPORES';

export interface RestorationReport {
    salvageProbability: number;
    recommendedTreatment: string;
    chemicalLoad: number; // pH adjustment required
    estimatedTurnaroundHours: number;
    isBiohazard: boolean;
}

export class DisasterTriageEngine {

    // Degradation rates per hour of exposure
    private static readonly DEGRADATION_RATES: Record<Contaminant, number> = {
        'BLACK_WATER': 0.15, // Sewage (Fast degradation)
        'GREY_WATER': 0.05,  // Dishwasher/Washing machine overflow
        'SOOT_ACIDIC': 0.08, // Plastic fire (Corrosive)
        'SOOT_OILY': 0.02,   // Wood fire (Stubborn but slow)
        'MOLD_SPORES': 0.10  // Biological growth
    };

    /**
     * Calculates the probability of saving an item based on physics and time.
     */
    static evaluateDamage(
        contaminant: Contaminant,
        exposureHours: number,
        materialPorosity: number // 0.0 to 1.0 (Silk is low, Cotton is high)
    ): RestorationReport {
        const rate = this.DEGRADATION_RATES[contaminant];

        // Non-linear decay function: P = 1 / (1 + rate * time * porosity)
        const decayFactor = 1 + (rate * exposureHours * (1 + materialPorosity));
        let probability = 1 / decayFactor;

        // Hard cutoffs for biohazards
        let treatment = 'Standard Ozone Treatment';
        let isBio = false;

        if (contaminant === 'BLACK_WATER' || contaminant === 'MOLD_SPORES') {
            isBio = true;
            probability *= 0.8; // Penalty for health risk
            treatment = 'Industrial Autoclave & Chemical Sterilization';
        } else if (contaminant === 'SOOT_ACIDIC') {
            treatment = 'Alkaline Bath Neutralization';
        }

        // Chemical load (pH correction intensity)
        // 0 = Neutral, 10 = Extreme Acid/Base
        const chemicalLoad = (1 - probability) * 10;

        return {
            salvageProbability: parseFloat(probability.toFixed(4)),
            recommendedTreatment: treatment,
            chemicalLoad: parseFloat(chemicalLoad.toFixed(2)),
            estimatedTurnaroundHours: Math.ceil(24 + (chemicalLoad * 5)),
            isBiohazard: isBio
        };
    }
}
