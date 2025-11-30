


interface Point {
    x: number;
    y: number;
}

export class GeoFenceEngine {
    // Define a complex 6-point polygon covering "Surabaya Central"
    // These are normalized coordinates for the service zone
    private static readonly SERVICE_POLYGON: Point[] = [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 12, y: 8 },
        { x: 6, y: 12 },
        { x: 0, y: 10 },
        { x: -2, y: 5 }
    ];

    /**
     * Hashes a Zip Code string into a 2D coordinate space.
     * This creates a deterministic "Location" for any string input.
     */
    private static zipToCoordinate(zip: string): Point {
        let hashX = 0;
        let hashY = 0;

        for (let i = 0; i < zip.length; i++) {
            const code = zip.charCodeAt(i);
            if (i % 2 === 0) hashX = ((hashX << 5) - hashX) + code;
            else hashY = ((hashY << 5) - hashY) + code;
        }

        // Normalize to our polygon space (0-15 scale)
        return {
            x: Math.abs(hashX) % 15,
            y: Math.abs(hashY) % 15
        };
    }

    /**
     * The Ray-Casting Algorithm (Even-Odd Rule).
     * Casts a ray from the point to infinity and counts intersections.
     */
    static isServiceable(zipCode: string): boolean {
        const point = this.zipToCoordinate(zipCode);
        const poly = this.SERVICE_POLYGON;

        let inside = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            const xi = poly[i].x, yi = poly[i].y;
            const xj = poly[j].x, yj = poly[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y))
                && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

            if (intersect) inside = !inside;
        }

        return inside;
    }
}
