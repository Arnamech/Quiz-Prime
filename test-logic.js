// test-logic.js
const QUIZ_DATA = {
    stages: [
        { id: 1, name: "Stage 1: The Call to Adventure" },
        { id: 2, name: "Stage 2: Taking Action" },
        { id: 3, name: "Stage 3: Facing Challenges" },
        { id: 4, name: "Stage 4: Integration & Return" }
    ],
    questions: [
        { text: "q1", stage: 1 }, { text: "q2", stage: 1 }, { text: "q3", stage: 1 }, { text: "q4", stage: 1 }, { text: "q5", stage: 1 },
        { text: "q6", stage: 2 }, { text: "q7", stage: 2 }, { text: "q8", stage: 2 }, { text: "q9", stage: 2 }, { text: "q10", stage: 2 },
        { text: "q11", stage: 3 }, { text: "q12", stage: 3 }, { text: "q13", stage: 3 }, { text: "q14", stage: 3 }, { text: "q15", stage: 3 },
        { text: "q16", stage: 4 }, { text: "q17", stage: 4 }, { text: "q18", stage: 4 }, { text: "q19", stage: 4 }, { text: "q20", stage: 4 }
    ]
};

function calculateResult(answers) {
    let scores = { 1: 0, 2: 0, 3: 0, 4: 0 };

    QUIZ_DATA.questions.forEach((q, idx) => {
        const ans = answers[idx];
        if (ans !== null && ans !== undefined) {
            scores[q.stage] += ans;
        }
    });

    let resultsArray = [];
    for (let i = 1; i <= 4; i++) {
        const stageData = QUIZ_DATA.stages.find(s => s.id === i);
        const score = scores[i];
        const percentage = Math.round((score / 15) * 100);
        resultsArray.push({
            id: i,
            name: stageData.name,
            score: score,
            percentage: percentage
        });
    }

    resultsArray.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return a.id - b.id; // lower ID wins tie
    });

    return resultsArray;
}

// Test 1: Tie between 1 and 2
let ans1 = new Array(20).fill(0);
// Max out stage 1 (ans index 0-4) -> 15 points
ans1[0] = 3; ans1[1] = 3; ans1[2] = 3; ans1[3] = 3; ans1[4] = 3;
// Max out stage 2 (ans index 5-9) -> 15 points
ans1[5] = 3; ans1[6] = 3; ans1[7] = 3; ans1[8] = 3; ans1[9] = 3;

let res1 = calculateResult(ans1);
console.log("Test 1 (Tie 1&2):");
console.log(res1);

// Test 2: Stage 3 wins
let ans2 = new Array(20).fill(0);
ans2[10] = 3; ans2[11] = 3; ans2[12] = 3; ans2[13] = 3; ans2[14] = 3; // Stage 3 gets 15 (100%)
ans2[0] = 2; // Stage 1 gets 2 (13%)
ans2[5] = 3; // Stage 2 gets 3 (20%)

let res2 = calculateResult(ans2);
console.log("\nTest 2 (Stage 3 wins, partial scores elsewhere):");
console.log(res2);

// Test 3: Tie between 3 and 4
let ans3 = new Array(20).fill(0);
ans3[10] = 3; ans3[11] = 3; ans3[12] = 3; ans3[13] = 3; ans3[14] = 3; // Stage 3 gets 15
ans3[15] = 3; ans3[16] = 3; ans3[17] = 3; ans3[18] = 3; ans3[19] = 3; // Stage 4 gets 15

let res3 = calculateResult(ans3);
console.log("\nTest 3 (Tie 3&4):");
console.log(res3);
