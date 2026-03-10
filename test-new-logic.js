// test-new-logic.js
const QUIZ_DATA = {
    stages: [
        { id: 'tourist', name: "Tourist" },
        { id: 'explorer', name: "Explorer" },
        { id: 'adventurer', name: "Adventurer" },
        { id: 'global_citizen', name: "Global Citizen" }
    ],
    questions: [
        { text: "q1", multiple: true, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q2", multiple: false, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q3", multiple: false, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q4", multiple: false, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q5", multiple: true, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q6", multiple: false, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q7", multiple: true, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q8", multiple: true, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q9", multiple: false, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q10", multiple: true, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q11", multiple: false, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q12", multiple: false, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] },
        { text: "q13", multiple: false, options: [{ stageId: 'tourist' }, { stageId: 'explorer' }, { stageId: 'adventurer' }, { stageId: 'global_citizen' }] }
    ]
};

function calculateResult(answers) {
    let scores = { 'tourist': 0, 'explorer': 0, 'adventurer': 0, 'global_citizen': 0 };

    QUIZ_DATA.questions.forEach((q, idx) => {
        const ansArray = answers[idx] || [];
        ansArray.forEach(stageId => {
            scores[stageId] += 8;
        });
    });

    let resultsArray = [];
    QUIZ_DATA.stages.forEach(stage => {
        const score = scores[stage.id];
        const percentage = Math.round((score / 104) * 100);
        resultsArray.push({
            id: stage.id,
            name: stage.name,
            score: score,
            percentage: percentage
        });
    });

    resultsArray.sort((a, b) => b.score - a.score);
    return resultsArray;
}

// Test 1: Max out Tourist (select 1st option for every question)
let ans1 = Array.from({ length: 13 }, () => ['tourist']);
console.log("Test 1 (Max Tourist):", calculateResult(ans1));

// Test 2: Select all 4 options for a multiple choice question (Q1)
let ans2 = Array.from({ length: 13 }, () => []);
ans2[0] = ['tourist', 'explorer', 'adventurer', 'global_citizen'];
ans2[1] = ['explorer'];
console.log("\nTest 2 (Multiple choice Q1 + single Q2):", calculateResult(ans2));
