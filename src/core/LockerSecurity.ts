


export class LockerProtocol {
    /**
     * Generates a 6-digit secure access code.
     * Logic: (Timestamp XOR LockerID) Bit-shifted by Seed
     */
    static generateAccessCode(lockerId: string): string {
        const timestamp = Math.floor(Date.now() / 30000); // 30-second window
        let hash = 0x811c9dc5; // FNV-1a offset basis

        // FNV-1a Hash of LockerID
        for (let i = 0; i < lockerId.length; i++) {
            hash ^= lockerId.charCodeAt(i);
            hash = (hash * 0x01000193) >>> 0;
        }

        // Mix with Timestamp using XOR and Bit Shifts
        const mixed = (hash ^ timestamp) >>> 0;
        const shifted = (mixed << 13) | (mixed >>> 19); // Circular shift

        // Extract 6 digits
        const code = (shifted % 1000000).toString().padStart(6, '0');

        return code;
    }

    /**
     * Validates if a locker is currently available based on a
     * deterministic "slot availability" algorithm.
     */
    static getLockerStatus(lockerId: string): 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' {
        // Deterministic pseudo-random status
        const seed = lockerId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const timeBlock = new Date().getHours();

        // Complex modulo arithmetic to determine state
        const stateVal = (seed + timeBlock) % 10;

        if (stateVal === 0) return 'MAINTENANCE';
        if (stateVal < 4) return 'OCCUPIED';
        return 'AVAILABLE';
    }
}
