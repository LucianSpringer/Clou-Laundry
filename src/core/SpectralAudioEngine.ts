

interface DiagnosticResult {
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    faultType: string;
    peakFrequency: number;
    noiseFloor: number;
}

export class MachineDoctor {
    private static readonly FFT_SIZE = 2048;
    private static readonly SAMPLE_RATE = 44100;

    /**
     * Simulates the analysis of an audio buffer (since we can't easily record live in this demo).
     * In a real app, this would process `AudioBuffer` data from `navigator.mediaDevices.getUserMedia`.
     */
    static analyzeSpectrum(simulatedNoiseLevel: number): DiagnosticResult {
        // 1. Generate Synthetic FFT Data (Simulating raw frequency bins)
        const frequencyData = new Float32Array(this.FFT_SIZE / 2);

        // Fill with Perlin-like noise
        for (let i = 0; i < frequencyData.length; i++) {
            frequencyData[i] = Math.random() * simulatedNoiseLevel;
        }

        // 2. Inject Deterministic "Fault Signatures" based on input
        // Low Freq Peak (50-100Hz) = Unbalanced Load
        // High Freq Peak (2000Hz+) = Bearing Failure
        const faultSeed = Date.now() % 3;

        if (simulatedNoiseLevel > 0.7) {
            if (faultSeed === 0) frequencyData[50] += 50; // Low freq spike
            if (faultSeed === 1) frequencyData[800] += 60; // High freq spike
        }

        // 3. Peak Detection Algorithm (O(n))
        let maxEnergy = 0;
        let peakIndex = 0;
        let totalEnergy = 0;

        for (let i = 0; i < frequencyData.length; i++) {
            const energy = frequencyData[i];
            totalEnergy += energy;
            if (energy > maxEnergy) {
                maxEnergy = energy;
                peakIndex = i;
            }
        }

        // 4. Frequency Mapping
        const nyquist = this.SAMPLE_RATE / 2;
        const peakFreq = (peakIndex / frequencyData.length) * nyquist;
        const noiseFloor = totalEnergy / frequencyData.length;

        // 5. Diagnostic Logic
        let status: DiagnosticResult['status'] = 'HEALTHY';
        let faultType = 'Normal Operation';

        if (maxEnergy > 40) {
            if (peakFreq < 200) {
                status = 'WARNING';
                faultType = 'Unbalanced Drum / Suspension Issue';
            } else if (peakFreq > 1000) {
                status = 'CRITICAL';
                faultType = 'Worn Bearings / Motor Fault';
            } else {
                status = 'WARNING';
                faultType = 'Pump Obstruction Detected';
            }
        }

        return {
            status,
            faultType,
            peakFrequency: Math.round(peakFreq),
            noiseFloor: parseFloat(noiseFloor.toFixed(2))
        };
    }
}
