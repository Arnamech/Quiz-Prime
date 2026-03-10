<?php
/**
 * Webhook Proxy — Quiz Sign-Up
 * Forwards POST requests to n8n sign-up webhook.
 * Replaces Netlify's _redirects proxy on Hostinger.
 */

// ─── CORS Headers (allow GHL iframe / any origin) ───────────────────────────
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ─── Target n8n Webhook URL ─────────────────────────────────────────────────
$targetUrl = 'https://n8n.cvinson.cloud/webhook/d86eb66a-72c0-466c-835f-142b4b8d0005';

// ─── Read incoming body ─────────────────────────────────────────────────────
$body = file_get_contents('php://input');

if (empty($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Empty request body']);
    exit;
}

// ─── Forward to n8n ─────────────────────────────────────────────────────────
$ch = curl_init($targetUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($body),
        'X-From: hostinger-proxy'
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// ─── Return result ──────────────────────────────────────────────────────────
if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Proxy error', 'detail' => $curlError]);
    exit;
}

http_response_code($httpCode ?: 200);
echo $response;
