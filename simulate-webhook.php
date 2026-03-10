<?php
/**
 * Test script to simulate webhook payload for verification.
 * Instead of sending to n8n, this prints what WOULD be sent.
 */

// Dummy payload matching what quiz-widget.js will send
$payload = [
    'first_name' => 'John',
    'last_name' => 'Doe',
    'email' => 'john.doe@example.com',
    'phone' => '+15551234567',
    'event' => 'quiz_started',
    'tags' => 'quiz sign up',
    'source' => 'travel-archetype-quiz',
    'timestamp' => date('c')
];

$jsonPayload = json_encode($payload, JSON_PRETTY_PRINT);

echo "=== SIGN-UP WEBHOOK SIMULATION ===\n";
echo "Target URL: https://n8n.cvinson.cloud/webhook/d86eb66a-72c0-466c-835f-142b4b8d0005\n";
echo "Headers:\n";
echo "  Content-Type: application/json\n";
echo "  X-From: hostinger-proxy\n";
echo "Payload:\n";
echo $jsonPayload . "\n\n";

// Dummy completion payload
$completionPayload = [
    'first_name' => 'John',
    'last_name' => 'Doe',
    'email' => 'john.doe@example.com',
    'phone' => '+15551234567',
    'quiz_result' => 'The Global Citizen',
    'question_1_answer' => 'A structured itinerary with cultural deep dives.',
    'question_2_answer' => 'To connect deeply with local traditions and sustainable practices.',
    'score_tourist_pct' => '25%',
    'score_tourist_pts' => 5,
    'score_global_citizen_pct' => '75%',
    'score_global_citizen_pts' => 15,
    'all_answers_summary' => "Q1: How do you prefer to plan your trips?\nA: A structured itinerary with cultural deep dives.\n\nQ2: What is your primary motivation for traveling?\nA: To connect deeply with local traditions.",
    'event' => 'quiz_completed',
    'tags' => 'quiz finish',
    'source' => 'travel-archetype-quiz',
    'timestamp' => date('c')
];

$jsonCompletion = json_encode($completionPayload, JSON_PRETTY_PRINT);

echo "=== COMPLETION WEBHOOK SIMULATION ===\n";
echo "Target URL: https://n8n.cvinson.cloud/webhook/be10b2b6-d6ad-4114-aba7-1bb9f8d095fa\n";
echo "Headers:\n";
echo "  Content-Type: application/json\n";
echo "  X-From: hostinger-proxy\n";
echo "Payload:\n";
echo $jsonCompletion . "\n";
