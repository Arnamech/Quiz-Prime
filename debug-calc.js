
const QUIZ_DATA = {
    stages: [
        {
            id: 'tourist', emoji: '\uD83C\uDFD6\uFE0F',
            name: "The Tourist", tagline: "The Escape Seeker",
            subtitle: "Travel for relaxation and reward",
            characteristics: "You believe travel is your reward after working hard, and you have earned these escapes. You rely on guidebooks, TripAdvisor, or Instagram for travel decisions, valuing comfort, predictability, and familiar options. You often experience post-trip blues when returning to routine, and you sense there is something more to travel but feels like it's incompatible with current life. Deep down, you dream of travelling more but feel trapped by money, time, or obligations.",
            traits: ["Restless", "Curious", "Comfort-seeking", "Safety"],
            preferences: "More towards guided tours, resorts, and package deals. You prefer destinations with good infrastructure and English-speaking populations, often travelling with pre-book to ensure itinerary is well planned. You enjoy hotel amenities over a local restaurant.",
            mode: "Tasting Freedom", driver: "Escape", mindset: "Reactive", state: '"Life is happening TO ME"',
            stageInsight: 'You are at the beginning of a powerful journey. That longing for "more" is your wisdom calling you forward. You want permission to want something different from your daily mundane, and you deserve to know that a freedom lifestyle is genuinely possible for someone like you. The biggest mistake most people made is to wait until retirement or saved "enough". There are easier, smarter ways in our modern day today to make travel sustainable and meaningful, starting from exactly where you are right now.',
            theme: null,
            evolution: "Consider stepping slightly outside your comfort zone on your next trip. Try exploring a local place not mentioned in guidebooks, or spend a day without a rigid itinerary. Start journaling about what you discover beyond the typical tourist experiences, and what you've learned about yourself through the trip."
        },
        {
            id: 'explorer', emoji: '\uD83E\uDDED',
            name: "The Explorer", tagline: "The Self-Discoverer",
            subtitle: "Travel for discovery and learning",
            characteristics: 'You believe travel is the best way to learn and grow, and it genuinely changes who you are through new experiences. You have experienced solo travel or extended trips, mixing planned and spontaneous approaches. The world has become your classroom and you are actively redefining societal limits. You return from trips inspired but often unsure how to maintain that feeling back home, feeling your "travel life" is separated from "real life". You are exploring options like moving to a new country, remote work, digital nomadism, etc.',
            traits: ["Independent", "Open Minded", "Growth-Seeking", "Self-motivated"],
            preferences: "Your planning style is flexible with room for spontaneity. You enjoy a mix of researched cultural immersions and off-the-beaten-path destinations. You travel solo or open to meet like-minded travellers who share your curiosity because they feel more aligned than your peers back home who don't understand you. Other than good rating hotels, you also explore local stays, Airbnbs, or hostels.",
            mode: "Seeking Freedom", driver: "Discovery", mindset: "Willful", state: '"Life is happening BY ME"',
            stageInsight: "You have crossed a threshold most tourists never do. You know travel changes you for the better, and you want this freedom to be longer-term, not one-offs here and there. You deserve to travel more meaningfully without constantly worrying about money, logistics or cultural navigation. The proven roadmap you are seeking for exists\u2014without needing trial-and-error anymore. You can build a sustainable travel life that works for your circumstances when you have the right blueprint.",
            theme: '"How do I travel more frequently and meaningfully?"',
            evolution: 'Reflect how your last transformative trip changed a specific belief inside you, and understand what\'s your deeper "why" to travel before your next trip. Map out more clarity what your dream life with more travels looks & feels like and how the next destination could help one step closer.'
        },
        {
            id: 'adventurer', emoji: '\uD83C\uDFAF',
            name: "The Adventurer", tagline: "The Purposeful Builder",
            subtitle: "Using travel to create a better life by design",
            characteristics: "You believe travel with intention leads to better life opportunities and have started approaching it strategically rather than accidentally. Your work and travel are beginning to combine, and you care about creating positive impacts. You have achieved outward success, but deep down something is still missing no matter how many countries you've visited. Cultural navigation is now second nature for you and you enjoy being around like-minded community. Yet despite all your self-improvement work, you're still searching for deeper meaning in all of this.",
            traits: ["Intentional", "Courageous", "Purpose-seeking", "High-Achieving"],
            preferences: "Besides regular trips, you are likely also incorporating strategic relocations, nomad/expat gatherings, personal growth events, and retreats. You craft unique adventures\u2014open to any country that aligns with your personal goals. You choose accommodation for networking or quality experience. Your travel companions or community tend to be deeper connections met overseas, or travellers who share similar mindset that elevates you.",
            mode: "Building Freedom", driver: "Impact", mindset: "Intellectual", state: '"Life is happening THROUGH ME"',
            stageInsight: "You understand travel is more than escapes and have been intentionally designing your life differently. You're eager to break free from the matrix and discover the deeper meaning in your journeys. The clarity you seek is closer than you think\u2014faster results are possible after all the self-improvement work you've invested. The breakthrough you need isn't about more information; it's about the creating the blueprint and transformation that can help you bend time and achieve in months what would take years alone.",
            theme: '"What\'s my deeper purpose behind all these travels?"',
            evolution: 'Audit your whole travel and life journey honestly: Why it brought you here? Instead of asking "where should I go next?", ask "who do I want to become?" From now on, explore how each destination reflects your core values, curiosities, and personal vision. The answers you\'re seeking aren\'t found by travelling more, but within you. Unlock them through "travelling inwards" (intentional inner work).'
        },
        {
            id: 'global_citizen', emoji: '\uD83C\uDF0D',
            name: "The Global Citizen", tagline: "The Global Changemaker",
            subtitle: "Travel as a way of living, evolving, and transforming others",
            characteristics: "You believe travel transforms all areas of life and it has become a natural expression of who you are becoming and how you lead. You are an integrated travel master. You don't believe there's separation in travel and life anymore; they are holistic and sustainable. You can feel at home anywhere because you are at home within yourself. Travel unlocks more financial growth and soulful connections, and you know how to open synchronistic opportunities wherever you go. Your passion lies in making positive impacts and helping others becoming better.",
            traits: ["Wisdom", "Leadership", "Vision-led", "Mastery"],
            preferences: "Beyond regular trips and international events, you're drawn to speaking engagements, leading workshops or retreats, and collaborating with fellow changemakers. Your travel choices are both purposeful and intuitive\u2014each journey supporting your conscious evolution from the inside-out. You aspire to cultivate both a nourishing home base and meaningful global travels, chosen with alignment.",
            mode: "Becoming Freedom", driver: "Lifestyle", mindset: "Intuitive & Integral", state: '"Life is happening AS ME"',
            stageInsight: "You have arrived integration\u2014embodying freedom across different areas of life. The world needs what you have learned, and it is time to leave your legacy. You deserve collaborators who match your level of consciousness, as well as mentors and coaches to support your next level of expansion. The global community you seek to contribute to and grow alongside already exists. Your highest potential as a global citizen is ready to be unleashed, creating total freedom (Financial, Emotional, Location and Time), alongside your deeper purpose on this earth.",
            theme: '"How do I make the world a better place through travel?"',
            evolution: 'What is the biggest obstacle currently slowing you from getting to where you want to be? Ask yourself what lesson you are meant to learn here. Envision your ideal day once you have achieved and manifested your highest vision\u2014from there, instead of asking "how", ask "who"\u2014who can walk alongside you, reflect your blind spots, and support your next level of expansion?'
        }
    ],
    questions: [
        // Stage 1: The Call (Tourist)
        { text: "Do you often feel a sense of restlessness or a yearning for something more beyond your current routine?", stageId: 'tourist' },
        { text: "Do you often dream or fantasize about a different life, a new location, or a significant personal change?", stageId: 'tourist' },
        { text: "Do you feel a subtle, persistent inner voice urging you towards a new direction?", stageId: 'tourist' },

        // Stage 2: The Departure (Explorer)
        { text: "How do you respond to early obstacles in a new endeavor?", stageId: 'explorer' },
        { text: "Have you recently made a major life change in response to an inner calling?", stageId: 'explorer' },
        { text: "Do you actively seek out new skills or perspectives for your path?", stageId: 'explorer' },

        // Stage 3: The Trials (Adventurer)
        { text: "When faced with setbacks, how do you respond?", stageId: 'adventurer' },
        { text: "Are you gaining new inner strengths from facing challenges?", stageId: 'adventurer' },

        // Stage 4: The Return (Global Citizen)
        { text: "How has your life perspective changed after your journey?", stageId: 'global_citizen' },
        { text: "Do you feel a desire to contribute to something greater than yourself?", stageId: 'global_citizen' }
    ]
};
let state = { answers: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3] };
function calculateResult() {
    let scores = { 'tourist': 0, 'explorer': 0, 'adventurer': 0, 'global_citizen': 0 };

    QUIZ_DATA.questions.forEach((q, idx) => {
        const points = state.answers[idx];
        if (typeof points === 'number') {
            scores[q.stageId] += points;
        }
    });

    const stageMaxPoints = {
        'tourist': 9,        // 3 questions * 3 pts
        'explorer': 9,       // 3 questions * 3 pts
        'adventurer': 6,     // 2 questions * 3 pts
        'global_citizen': 6  // 2 questions * 3 pts
    };

    let resultsArray = [];

    // Calculate total score across all categories
    let totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

    // Largest remainder method — guarantees percentages always sum to exactly 100
    const n = QUIZ_DATA.stages.length;
    const rawPercentages = QUIZ_DATA.stages.map(stage => {
        const score = scores[stage.id];
        const raw = totalScore > 0 ? (score / totalScore) * 100 : (100 / n);
        return { id: stage.id, name: stage.name, score, floor: Math.floor(raw), remainder: raw - Math.floor(raw) };
    });

    let sumFloors = rawPercentages.reduce((sum, r) => sum + r.floor, 0);
    let leftover = 100 - sumFloors;

    // Sort by largest remainder to distribute leftover 1% increments
    rawPercentages.sort((a, b) => b.remainder - a.remainder);
    rawPercentages.forEach((r, i) => { r.percentage = r.floor + (i < leftover ? 1 : 0); });

    rawPercentages.forEach(r => {
        resultsArray.push({ id: r.id, name: r.name, score: r.score, percentage: r.percentage });
    });

    // The participant is assigned to whichever stage has the highest total percentile score
    // In case of a tie, default to earliest stage in sequence (tourist -> explorer -> adventurer -> global_citizen)
    const stageOrder = ['tourist', 'explorer', 'adventurer', 'global_citizen'];
    resultsArray.sort((a, b) => {
        if (b.percentage !== a.percentage) return b.percentage - a.percentage;
        return stageOrder.indexOf(a.id) - stageOrder.indexOf(b.id);
    });

    return resultsArray;
}
console.log(calculateResult());
