

interface Node {
    id: string;
    rank: number;
    outLinks: string[]; // IDs of people this user referred
    inLinks: string[];  // IDs of people who referred this user
}

export class SocialGraphEngine {
    private static readonly DAMPING_FACTOR = 0.85;
    private static readonly MAX_ITERATIONS = 20;
    private static readonly CONVERGENCE_THRESHOLD = 0.001;

    /**
     * Generates a synthetic graph of users and referrals.
     */
    static generateNetwork(size: number): Record<string, Node> {
        const nodes: Record<string, Node> = {};

        // Init Nodes
        for (let i = 0; i < size; i++) {
            const id = `user_${i}`;
            nodes[id] = { id, rank: 1 / size, outLinks: [], inLinks: [] };
        }

        // Create Random Edges (Referrals)
        Object.keys(nodes).forEach(sourceId => {
            const numReferrals = Math.floor(Math.random() * 3); // 0-2 referrals
            for (let j = 0; j < numReferrals; j++) {
                const targetId = `user_${Math.floor(Math.random() * size)}`;
                if (targetId !== sourceId && !nodes[sourceId].outLinks.includes(targetId)) {
                    nodes[sourceId].outLinks.push(targetId);
                    nodes[targetId].inLinks.push(sourceId);
                }
            }
        });

        return nodes;
    }

    /**
     * Executes the PageRank algorithm to find the "VIP" influencers.
     * Logic: PR(A) = (1-d) + d * sum(PR(T)/C(T))
     */
    static computePageRank(nodes: Record<string, Node>): Node[] {
        const numNodes = Object.keys(nodes).length;
        let iterations = 0;
        let diff = 1;

        while (iterations < this.MAX_ITERATIONS && diff > this.CONVERGENCE_THRESHOLD) {
            let newDiff = 0;
            const newRanks: Record<string, number> = {};

            Object.values(nodes).forEach(node => {
                let rankSum = 0;

                // Sum ranks from incoming links
                node.inLinks.forEach(inLinkID => {
                    const inNode = nodes[inLinkID];
                    rankSum += inNode.rank / (inNode.outLinks.length || 1);
                });

                // The PageRank Formula
                const newRank = (1 - this.DAMPING_FACTOR) + (this.DAMPING_FACTOR * rankSum);
                newRanks[node.id] = newRank;
                newDiff += Math.abs(newRank - node.rank);
            });

            // Update Ranks
            Object.entries(newRanks).forEach(([id, rank]) => {
                nodes[id].rank = rank;
            });

            diff = newDiff;
            iterations++;
        }

        // Return sorted by influence
        return Object.values(nodes).sort((a, b) => b.rank - a.rank);
    }
}
