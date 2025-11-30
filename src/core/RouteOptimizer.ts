

export interface GeoLocation {
    id: string;
    lat: number;
    lng: number;
}

export class LogisticsEngine {
    private static readonly COOLING_RATE = 0.995;
    private static readonly INITIAL_TEMP = 10000;

    /**
     * Calculates the Euclidean distance between two points (simplified).
     */
    private static getDistance(a: GeoLocation, b: GeoLocation): number {
        return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));
    }

    /**
     * Calculates the total distance of a route configuration.
     */
    private static getTotalDistance(route: GeoLocation[]): number {
        let dist = 0;
        for (let i = 0; i < route.length - 1; i++) {
            dist += this.getDistance(route[i], route[i + 1]);
        }
        // Return to Hub
        dist += this.getDistance(route[route.length - 1], route[0]);
        return dist;
    }

    /**
     * Optimizes the delivery route using Simulated Annealing.
     * This probabilistically accepts worse solutions early on to escape local optima.
     */
    static optimizeRoute(stops: GeoLocation[]): { route: GeoLocation[]; distance: number; iterations: number } {
        if (stops.length < 2) return { route: stops, distance: 0, iterations: 0 };

        let currentSolution = [...stops];
        let bestSolution = [...stops];
        let currentTemp = this.INITIAL_TEMP;
        let iterations = 0;

        while (currentTemp > 1) {
            // 1. Create a neighbor solution by swapping two random stops
            const newSolution = [...currentSolution];
            const pos1 = Math.floor(Math.random() * newSolution.length);
            const pos2 = Math.floor(Math.random() * newSolution.length);

            [newSolution[pos1], newSolution[pos2]] = [newSolution[pos2], newSolution[pos1]];

            // 2. Calculate Energy (Distance)
            const currentEnergy = this.getTotalDistance(currentSolution);
            const newEnergy = this.getTotalDistance(newSolution);

            // 3. Acceptance Probability Function
            if (this.acceptanceProbability(currentEnergy, newEnergy, currentTemp) > Math.random()) {
                currentSolution = newSolution;
            }

            // 4. Track Best
            if (this.getTotalDistance(currentSolution) < this.getTotalDistance(bestSolution)) {
                bestSolution = [...currentSolution];
            }

            currentTemp *= this.COOLING_RATE;
            iterations++;
        }

        return {
            route: bestSolution,
            distance: this.getTotalDistance(bestSolution),
            iterations
        };
    }

    private static acceptanceProbability(currentEnergy: number, newEnergy: number, temp: number): number {
        if (newEnergy < currentEnergy) return 1.0;
        return Math.exp((currentEnergy - newEnergy) / temp);
    }
}
