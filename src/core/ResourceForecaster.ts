

interface ForecastResult {
    nextPeriodPrediction: number;
    trend: number;
    safetyStockLevel: number;
}

export class SupplyChainBrain {

    /**
     * Predicts next week's detergent usage based on historical "WashMatrix" logs.
     * @param history Array of daily usage in ml
     * @param alpha Smoothing factor for level (0-1)
     * @param beta Smoothing factor for trend (0-1)
     */
    static predictUsage(history: number[], alpha: number = 0.5, beta: number = 0.4): ForecastResult {
        if (history.length < 2) return { nextPeriodPrediction: 0, trend: 0, safetyStockLevel: 0 };

        let level = history[0];
        let trend = history[1] - history[0];

        // Holt's Algorithm Loop
        for (let i = 1; i < history.length; i++) {
            const prevLevel = level;
            const prevTrend = trend;

            // Update Level
            level = (alpha * history[i]) + ((1 - alpha) * (prevLevel + prevTrend));

            // Update Trend
            trend = (beta * (level - prevLevel)) + ((1 - beta) * prevTrend);
        }

        const prediction = level + trend;

        // Calculate Standard Deviation for Safety Stock (Z-score 1.65 for 95%)
        const mean = history.reduce((a, b) => a + b, 0) / history.length;
        const variance = history.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / history.length;
        const stdDev = Math.sqrt(variance);
        const safetyStock = stdDev * 1.65;

        return {
            nextPeriodPrediction: parseFloat(prediction.toFixed(2)),
            trend: parseFloat(trend.toFixed(4)),
            safetyStockLevel: parseFloat(safetyStock.toFixed(2))
        };
    }
}
