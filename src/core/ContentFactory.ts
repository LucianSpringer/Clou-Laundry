


export class ContentFactory {

    static getBlogPosts() {
        // Procedural Title Generation
        const topics = ['Stain Removal', 'Fabric Care', 'Sustainability', 'Tech in Laundry'];
        const adjectives = ['Ultimate', 'Essential', 'Professional', 'Secret'];
        const actions = ['Guide to', 'Hacks for', 'Methods regarding', 'Truth about'];

        // Deterministic Generation based on Date
        const baseDate = new Date();

        return Array.from({ length: 6 }).map((_, i) => {
            const topic = topics[i % topics.length];
            const adj = adjectives[i % adjectives.length];
            const action = actions[i % actions.length];

            return {
                id: `blog_${i}`,
                title: `The ${adj} ${action} ${topic}`,
                excerpt: `Discover why ${topic.toLowerCase()} matters more than ever. Our experts analyze the ${adj.toLowerCase()} techniques...`,
                category: topic,
                date: new Date(baseDate.setDate(baseDate.getDate() - (i * 5))).toLocaleDateString(),
                author: i % 2 === 0 ? 'Clou AI Team' : 'Head of Operations',
                image: `https://picsum.photos/seed/blog${i}/800/600`
            };
        });
    }

    static getCareers() {
        const roles = ['Logistics Coordinator', 'Chemical Specialist', 'Full Stack Engineer', 'Customer Success Lead'];
        const types = ['Full-time', 'Contract', 'Part-time'];

        return roles.map((role, i) => ({
            id: `job_${i}`,
            title: role,
            department: role.split(' ')[1] || 'Operations',
            type: types[i % types.length],
            location: i === 2 ? 'Remote' : 'Surabaya HQ'
        }));
    }
}
