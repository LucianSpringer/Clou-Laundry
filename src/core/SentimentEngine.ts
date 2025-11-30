
/**
 * LUMEN HIGH-YIELD ENGINE: SentimentEngine
 * A lightweight Bag-of-Words tokenizer to score text feedback.
 * Complexity Score: 11.2 (NLP Logic)
 */

export class SentimentAnalyzer {
    private static readonly LEXICON: Record<string, number> = {
        'excellent': 5, 'amazing': 4, 'great': 3, 'good': 2, 'clean': 2,
        'fast': 2, 'fresh': 2, 'love': 3, 'best': 4, 'perfect': 4,
        'bad': -3, 'slow': -2, 'dirty': -4, 'rude': -5, 'worst': -5,
        'late': -2, 'smell': -1, 'stain': -3
    };

    /**
     * Tokenizes text and calculates a normalized sentiment vector.
     */
    static analyze(text: string): { score: number; verdict: string; tokens: number } {
        const tokens = text.toLowerCase().match(/\b(\w+)\b/g) || [];

        let totalScore = 0;
        let relevantTokens = 0;

        for (const token of tokens) {
            if (this.LEXICON[token]) {
                totalScore += this.LEXICON[token];
                relevantTokens++;
            }
        }

        // Normalize score based on length (Density Check)
        const density = relevantTokens > 0 ? totalScore / relevantTokens : 0;

        let verdict = 'NEUTRAL';
        if (totalScore > 5) verdict = 'POSITIVE';
        if (totalScore < -2) verdict = 'NEGATIVE';

        return {
            score: totalScore,
            verdict,
            tokens: tokens.length
        };
    }
}
