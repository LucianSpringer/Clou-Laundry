


interface GeoPoint {
    lat: number;
    lng: number;
    bearing: number;
}

export class TelemetryEngine {
    // Surabaya Base Coordinates
    private static readonly HUB_LAT = -7.2575;
    private static readonly HUB_LNG = 112.7521;

    /**
     * Deterministically calculates the driver's position based on time.
     * Uses a pseudo-random path derived from the Order ID.
     */
    static getDriverPosition(orderId: string): GeoPoint {
        // 1. Generate Seed from Order ID Hash
        let seed = 0;
        for (let i = 0; i < orderId.length; i++) {
            seed = ((seed << 5) - seed) + orderId.charCodeAt(i);
            seed |= 0; // Force 32-bit integer
        }

        // 2. Time-based Progression (Oscillates every hour)
        const now = Date.now();
        const cycle = (now % 3600000) / 3600000; // 0.0 to 1.0 progress

        // 3. Vector Calculation (Lissajous Curve for natural movement)
        // We add variance based on the seed so every order has a unique "path"
        const variance = (Math.abs(seed) % 100) / 1000;
        const latOffset = Math.sin(cycle * Math.PI * 2) * (0.05 + variance);
        const lngOffset = Math.cos(cycle * Math.PI * 4) * (0.05 + variance);

        // 4. Calculate Bearing using simple differential
        const nextLat = Math.sin((cycle + 0.01) * Math.PI * 2);
        const nextLng = Math.cos((cycle + 0.01) * Math.PI * 4);
        const bearing = (Math.atan2(nextLng - lngOffset, nextLat - latOffset) * 180) / Math.PI;

        return {
            lat: this.HUB_LAT + latOffset,
            lng: this.HUB_LNG + lngOffset,
            bearing: (bearing + 360) % 360
        };
    }

    /**
     * Estimates arrival time using Manhattan Distance weightings.
     */
    static estimateArrival(orderId: string): string {
        const pos = this.getDriverPosition(orderId);
        const dist = Math.sqrt(Math.pow(pos.lat - this.HUB_LAT, 2) + Math.pow(pos.lng - this.HUB_LNG, 2));

        // Convert coordinate distance to minutes (approximate logic)
        const minutesLeft = Math.floor(dist * 1000);

        return minutesLeft < 5 ? "Arriving Now" : `${minutesLeft} mins`;
    }
}
