

import { LifecycleStatus } from './LinenLifecycle';

export interface WashManifest {
    waterTempCelsius: number;
    drumRPM: number;
    detergentMl: number;
    solventMl: number;
    cycleDurationMin: number;
    riskFactor: number;
}

export class WashOptimizationSystem {
    // 3x3 Control Matrix for [Light, Medium, Heavy] vs [LowVol, MidVol, HighVol]
    private static readonly RPM_MATRIX = [
        [600, 800, 1000],  // Light Fabric
        [800, 1000, 1200], // Medium Fabric
        [1000, 1200, 1400] // Heavy Fabric
    ];

    private static readonly TEMP_MATRIX = [
        [30, 30, 40], // Light (Cold/Warm)
        [40, 50, 60], // Medium
        [60, 75, 90]  // Heavy (Sanitize)
    ];

    /**
     * Calculates the precise machine configuration.
     * Integration Point: Consumes outputs from VolumetricEngine and FabricEntropy.
     */
    static calculateCycle(
        entropyScore: number,
        volumeKg: number,
        isSensitive: boolean,
        linenStatus?: LifecycleStatus['tensileCategory'] // Optional integration
    ): WashManifest {
        // 1. Normalize Inputs to Matrix Indices
        const fabricIndex = entropyScore < 15 ? 0 : entropyScore < 40 ? 1 : 2;
        const loadIndex = volumeKg < 5 ? 0 : volumeKg < 10 ? 1 : 2;

        // 2. Base Matrix Lookup
        let rpm = this.RPM_MATRIX[fabricIndex][loadIndex];
        let temp = this.TEMP_MATRIX[fabricIndex][loadIndex];

        // 3. Apply Heuristic Adjustments (Chaos Factor)
        // If fabric is high entropy (complex texture) but low weight, reduce RPM to prevent tearing
        if (entropyScore > 50 && volumeKg < 3) {
            rpm *= 0.6;
        }

        // 4. Chemical Stoichiometry Calculation
        // Base 10ml per kg + 2ml per unit of entropy
        const detergentBase = (volumeKg * 10) + (entropyScore * 0.5);

        // 5. Sensitivity Dampening
        if (isSensitive) {
            rpm = Math.min(rpm, 600);
            temp = Math.min(temp, 40);
        }

        // 5b. Commercial Linen Lifecycle Integration
        if (linenStatus === 'FRAGILE' || linenStatus === 'CRITICAL') {
            rpm = Math.min(rpm, 600); // Hard cap to prevent tearing
        }

        // 6. Risk Calculation (Sigmoid Function)
        const riskInput = (rpm / 1400) + (temp / 90) - 1;
        const riskFactor = 1 / (1 + Math.exp(-riskInput));

        return {
            waterTempCelsius: Math.round(temp),
            drumRPM: Math.round(rpm),
            detergentMl: parseFloat(detergentBase.toFixed(1)),
            solventMl: isSensitive ? parseFloat((volumeKg * 15).toFixed(1)) : 0,
            cycleDurationMin: 30 + (volumeKg * 2) + (entropyScore / 10),
            riskFactor: parseFloat(riskFactor.toFixed(4))
        };
    }
}
