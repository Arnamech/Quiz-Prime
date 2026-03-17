/**
 * Travel to Transform Quiz Widget (Finalized Logic)
 * Embeddable Standalone JavaScript Snippet for GHL
 */
(function () {
    // ─── CONFIGURATION ────────────────────────────────────────────────────────
    // Set window.TTT_CONFIG before this script loads, OR edit the defaults below.
    // Example (place BEFORE the <script src="quiz-widget.js"> tag):
    //   <script>window.TTT_CONFIG = { webhookUrl: 'https://services.leadconnectorhq.com/hooks/YOUR_ID/webhook-trigger/YOUR_KEY' };</script>
    const TTT_CONFIG = Object.assign({
        webhookUrl: '/api/webhook', // Proxied via Netlify → https://n8n.cvinson.cloud/webhook/be10b2b6-d6ad-4114-aba7-1bb9f8d095fa
        signupWebhookUrl: '/api/signup-webhook', // Proxied via Netlify → https://n8n.cvinson.cloud/webhook/d86eb66a-72c0-466c-835f-142b4b8d0005
        masterclassUrl: 'https://traveltotransform.com/masterclass-replay-how-to-travel-the-world-purposefully'
    }, window.TTT_CONFIG || {});

    // Inject the necessary CSS
    const style = document.createElement('style');
    style.innerHTML = `
        :root {
            /* Premium Color Palette */
            --primary: #6366f1; /* Indigo-500 */
            --primary-hover: #4f46e5; /* Indigo-600 */
            --primary-light: #e0e7ff; /* Indigo-100 */
            --primary-subtle: #f5f3ff; /* Violet-50 */
            --secondary: #10b981; /* Emerald-500 */
            --accent: #f43f5e; /* Rose-500 */
            --background: #ffffff;
            --background-alt: #f8fafc; /* Slate-50 */
            --text-main: #0f172a; /* Slate-900 */
            --text-muted: #64748b; /* Slate-500 */
            --border: #e2e8f0; /* Slate-200 */
            --error: #ef4444; /* Red-500 */
            
            /* Enhanced Radii */
            --radius-sm: 8px;
            --radius-md: 16px;
            --radius-lg: 24px;
            --radius-full: 9999px;
            
            /* Enhanced Spacing */
            --sp-xs: 6px;
            --sp-sm: 12px;
            --sp-md: 20px;
            --sp-lg: 32px;
            --sp-xl: 48px;
            
            /* Shadows for depth */
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            --shadow-glow: 0 0 15px rgba(99, 102, 241, 0.3);
            
            /* Typography */
            --font: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        :where(#ttt-quiz-container) * {
            box-sizing: border-box;
            font-family: var(--font);
            margin: 0;
            padding: 0;
        }

        #ttt-quiz-container {
            width: 100%;
            max-width: 700px;
            margin: 2rem auto;
            color: var(--text-main);
        }

        /* Container Card */
        .ttt-card {
            background: var(--background);
            border-radius: var(--radius-lg);
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: var(--shadow-lg);
            padding: var(--sp-xl);
            overflow: hidden;
            position: relative;
            /* Optional subtle glassmorphism if background is colored */
            /* backdrop-filter: blur(10px); */
        }

        /* Views */
        .ttt-view {
            display: none;
            animation: ttt-fade-in 0.4s ease-out;
        }

        .ttt-view.active {
            display: block;
        }

        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .ttt-view h2 {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: var(--sp-md);
            letter-spacing: -0.03em;
            color: var(--text-main);
            line-height: 1.2;
        }
        
        .ttt-view p {
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: var(--sp-lg);
            font-size: 1.0625rem;
        }

        /* Form Elements */
        .ttt-form-group {
            margin-bottom: var(--sp-md);
            text-align: left;
        }
        .ttt-label {
            display: block;
            font-size: 0.9375rem;
            font-weight: 600;
            margin-bottom: var(--sp-sm);
            color: var(--text-main);
        }
        .ttt-input {
            width: 100%;
            padding: 14px 20px;
            border: 2px solid var(--border);
            border-radius: var(--radius-md);
            font-size: 1rem;
            transition: var(--transition);
            outline: none;
            background: var(--background-alt);
            color: var(--text-main);
        }
        .ttt-input:hover {
            border-color: #cbd5e1;
        }
        .ttt-input:focus {
            background: var(--background);
            border-color: var(--primary);
            box-shadow: var(--shadow-glow);
        }
        .ttt-error-msg {
            color: var(--error);
            font-size: 0.875rem;
            margin-top: var(--sp-xs);
            display: none;
        }

        /* Buttons */
        .ttt-btn {
            background: linear-gradient(135deg, #eaaa1a 0%, #f9c632 100%);
            color: white;
            border: none;
            padding: 16px 32px;
            border-radius: var(--radius-full);
            font-size: 1.0625rem;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition);
            width: 100%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-shadow: var(--shadow-md);
            margin-top: var(--sp-sm);
        }
        .ttt-btn:hover:not([disabled]) {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg), var(--shadow-glow);
        }
        .ttt-btn:active:not([disabled]) {
            transform: translateY(0px);
        }
        .ttt-btn[disabled] {
            opacity: 0.7;
            cursor: not-allowed;
            background: var(--border);
            color: var(--text-muted);
            box-shadow: none;
        }
        .ttt-btn-secondary {
            background: white;
            color: var(--text-main);
            border: 2px solid var(--border);
            box-shadow: var(--shadow-sm);
        }
        .ttt-btn-secondary:hover:not([disabled]) {
            background: var(--background-alt);
            border-color: #cbd5e1;
            box-shadow: var(--shadow-md);
            transform: translateY(-2px);
        }

        /* Header Actions (Restart) */
        .ttt-header-actions {
            text-align: right;
            margin-bottom: var(--sp-sm);
        }
        .ttt-btn-restart {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
        }
        .ttt-btn-restart:hover {
            background: var(--background-alt);
            color: var(--text-main);
        }

        /* Progress Bar */
        .ttt-progress-container {
            margin-bottom: var(--sp-xl);
            margin-top: 0;
        }
        .ttt-progress-text {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-muted);
            margin-bottom: var(--sp-sm);
        }
        .ttt-progress-track {
            height: 8px;
            background: var(--border);
            border-radius: 4px;
            overflow: hidden;
        }
        .ttt-progress-fill {
            height: 100%;
            background: var(--primary);
            border-radius: 4px;
            width: 0%;
            transition: width 0.3s ease;
        }

        /* Question Options */
        .ttt-options-grid {
            display: flex;
            flex-direction: column;
            gap: var(--sp-sm);
            margin-bottom: var(--sp-xl);
        }
        .ttt-option {
            border: 2px solid var(--border);
            border-radius: var(--radius-md);
            padding: var(--sp-lg);
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            background: var(--background);
            font-weight: 500;
            font-size: 1.0625rem;
            line-height: 1.5;
            box-shadow: var(--shadow-sm);
        }
        .ttt-option:hover {
            border-color: #cbd5e1;
            background: var(--background-alt);
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
        }
        .ttt-option.selected {
            border-color: var(--primary);
            background: var(--primary-subtle);
            box-shadow: var(--shadow-md);
        }
        .ttt-option-radio {
            width: 20px;
            height: 20px;
            border: 2px solid var(--border);
            border-radius: 50%;
            flex-shrink: 0;
            position: relative;
            transition: var(--transition);
            margin-right: var(--sp-md); /* Moved from original .ttt-option-radio */
        }
        .ttt-option-radio.checkbox {
            border-radius: 4px;
        }
        .ttt-option.selected .ttt-option-radio {
            border-color: var(--primary);
            background: var(--primary);
        }
        .ttt-option.selected .ttt-option-radio::after {
            content: '';
            position: absolute;
            left: 6px;
            top: 2px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
         .ttt-option-checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid var(--border);
            border-radius: 4px;
            margin-right: var(--sp-md);
            position: relative;
            flex-shrink: 0;
            transition: all 0.2s ease;
        }
        .ttt-option.selected .ttt-option-checkbox {
            border-color: var(--primary);
            background: var(--primary);
        }
        .ttt-option.selected .ttt-option-checkbox::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 6px;
            width: 4px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        /* Navigation Buttons */
        .ttt-nav-buttons {
            display: flex;
            gap: var(--sp-md);
            margin-top: var(--sp-lg);
        }

        /* Loader */
        .ttt-loader-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--sp-xl) 0;
        }
        .ttt-spinner {
            width: 48px;
            height: 48px;
            border: 4px solid var(--border);
            border-top-color: var(--primary);
            border-radius: 50%;
            animation: ttt-spin 1s linear infinite;
            margin-bottom: var(--sp-lg);
        }

        /* Results Display */
        .ttt-result-card {
            text-align: center;
        }
        .ttt-result-stage {
            display: inline-block;
            background: var(--primary-subtle);
            color: var(--primary);
            font-weight: 800;
            font-size: 0.875rem;
            padding: 8px 16px;
            border-radius: var(--radius-full);
            margin-bottom: var(--sp-md);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .ttt-result-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--primary-hover);
            margin-bottom: var(--sp-md);
            line-height: 1.2;
        }

        .ttt-result-list {
            display: flex;
            flex-direction: column;
            gap: var(--sp-md);
        }

        /* Animations */
        @keyframes ttt-fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ttt-spin {
            to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 480px) {
            .ttt-card { padding: var(--sp-xl) var(--sp-md); }
            .ttt-nav-buttons { flex-direction: column-reverse; }
            .ttt-insights-grid { grid-template-columns: 1fr; }
            .ttt-profile-detail-body { padding: var(--sp-md); }
        }

        /* ─── NEW RESULTS PAGE ─── */

        /* Main Title */
        .ttt-results-main-title {
            text-align: center;
            font-size: 1.75rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: var(--sp-xl);
        }

        /* Hero Banner */
        .ttt-hero-banner {
            background: linear-gradient(135deg, #6366f1 0%, #7c3aed 40%, #a855f7 100%);
            border-radius: var(--radius-lg);
            padding: 48px 24px 36px;
            text-align: center;
            margin-bottom: var(--sp-xl);
            position: relative;
            overflow: hidden;
        }
        .ttt-hero-banner::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%);
        }
        .ttt-hero-emoji {
            font-size: 3rem;
            display: block;
            margin-bottom: var(--sp-sm);
            position: relative;
            z-index: 1;
        }
        .ttt-hero-img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 4px solid rgba(255,255,255,0.3);
            margin: 0 auto var(--sp-md);
            display: block;
            object-fit: cover;
            position: relative;
            z-index: 1;
        }
        .ttt-hero-name {
            font-size: 2rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 6px;
            position: relative;
            z-index: 1;
        }
        .ttt-hero-subtitle {
            font-size: 1rem;
            color: rgba(255,255,255,0.85);
            font-weight: 400;
            position: relative;
            z-index: 1;
        }

        /* Section Cards */
        .ttt-section-card {
            background: #fff;
            border-radius: var(--radius-lg);
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
            padding: var(--sp-xl);
            margin-bottom: var(--sp-lg);
        }
        .ttt-section-title {
            text-align: center;
            font-size: 1.25rem;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: var(--sp-lg);
        }

        /* Profile Cards (expandable) */
        .ttt-profile-card {
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            margin-bottom: var(--sp-md);
            overflow: hidden;
            transition: var(--transition);
        }
        .ttt-profile-card:hover { box-shadow: var(--shadow-md); }
        .ttt-profile-card.expanded { border-color: #c7d2fe; }
        .ttt-profile-header {
            display: flex;
            align-items: center;
            padding: var(--sp-md) var(--sp-lg);
            cursor: pointer;
            user-select: none;
            gap: var(--sp-sm);
        }
        .ttt-profile-info { flex: 1; }
        .ttt-profile-stage-name {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .ttt-profile-stage-sub {
            font-size: 0.8125rem;
            color: var(--text-muted);
            font-style: italic;
            margin-top: 2px;
        }
        .ttt-profile-pct {
            font-size: 1.5rem;
            font-weight: 800;
            min-width: 60px;
            text-align: right;
        }
        .ttt-profile-toggle {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            cursor: pointer;
            transition: var(--transition);
            border: none;
            color: #fff;
        }
        .ttt-profile-card.expanded .ttt-profile-toggle { transform: rotate(180deg); }
        .ttt-profile-bar {
            height: 5px;
            margin: 0 var(--sp-lg) var(--sp-sm);
            background: var(--border);
            border-radius: var(--radius-full);
            overflow: hidden;
        }
        .ttt-profile-bar-fill {
            height: 100%;
            border-radius: var(--radius-full);
            width: 0%;
            transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Stage colors */
        .ttt-stage-tourist .ttt-profile-pct { color: #4f46e5; }
        .ttt-stage-tourist .ttt-profile-toggle { background: #4f46e5; }
        .ttt-stage-tourist .ttt-profile-bar-fill { background: #4f46e5; }
        .ttt-stage-explorer .ttt-profile-pct { color: #2563eb; }
        .ttt-stage-explorer .ttt-profile-toggle { background: #2563eb; }
        .ttt-stage-explorer .ttt-profile-bar-fill { background: #2563eb; }
        .ttt-stage-adventurer .ttt-profile-pct { color: #ea580c; }
        .ttt-stage-adventurer .ttt-profile-toggle { background: #ea580c; }
        .ttt-stage-adventurer .ttt-profile-bar-fill { background: #ea580c; }
        .ttt-stage-global_citizen .ttt-profile-pct { color: #0d9488; }
        .ttt-stage-global_citizen .ttt-profile-toggle { background: #0d9488; }
        .ttt-stage-global_citizen .ttt-profile-bar-fill { background: #0d9488; }

        /* Expanded detail body */
        .ttt-profile-detail {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease;
        }
        .ttt-profile-card.expanded .ttt-profile-detail {
            max-height: 2000px;
        }
        .ttt-profile-detail-body {
            padding: var(--sp-md) var(--sp-lg) var(--sp-lg);
            border-top: 1px solid var(--border);
        }
        .ttt-detail-section-h {
            font-size: 0.9375rem;
            font-weight: 700;
            color: var(--text-main);
            margin: var(--sp-md) 0 var(--sp-sm);
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .ttt-detail-section-h:first-child { margin-top: 0; }
        .ttt-detail-text {
            font-size: 0.9375rem;
            color: #64748b;
            line-height: 1.65;
            margin: 0;
        }
        .ttt-quick-wins {
            border-left: 3px solid var(--primary);
            padding: var(--sp-md) var(--sp-lg);
            background: var(--background-alt);
            border-radius: 0 var(--radius-md) var(--radius-md) 0;
            margin-top: var(--sp-md);
        }
        .ttt-quick-wins-h {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: var(--sp-sm);
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .ttt-quick-wins p {
            font-size: 0.875rem;
            color: #64748b;
            line-height: 1.6;
            margin: 0;
        }

        /* Completion Info */
        .ttt-completed-section {
            background: #fff;
            border-radius: var(--radius-lg);
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
            text-align: center;
            padding: var(--sp-lg) var(--sp-xl);
            margin-bottom: var(--sp-lg);
        }
        .ttt-completed-label {
            font-size: 0.9375rem;
            font-style: italic;
            color: var(--text-muted);
            margin-bottom: var(--sp-sm);
        }
        .ttt-completed-name {
            font-size: 1.125rem;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 4px;
        }
        .ttt-completed-info {
            font-size: 0.875rem;
            color: var(--text-muted);
            line-height: 1.6;
        }
        .ttt-completed-info span { display: flex; align-items: center; justify-content: center; gap: 6px; }
        .ttt-completed-date {
            font-size: 0.8rem;
            color: #94a3b8;
            margin-top: var(--sp-sm);
        }

        /* Insights Grid */
        .ttt-insights-container {
            background: #fff;
            border-radius: var(--radius-lg);
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            border: 1px solid var(--border);
            padding: var(--sp-xl);
            margin-bottom: var(--sp-lg);
        }
        .ttt-insights-container .ttt-section-title {
            margin-bottom: 8px;
        }
        .ttt-title-dash {
            width: 40px;
            height: 4px;
            background: linear-gradient(90deg, #6366f1, #a855f7);
            border-radius: 2px;
            margin: 0 auto var(--sp-lg);
        }
        .ttt-insights-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--sp-lg);
            align-items: stretch;
        }
        .ttt-insight-card {
            background: #fff;
            border-radius: var(--radius-md);
            padding: 24px;
            border: 1px solid var(--border);
            border-left: 3px solid #6366f1;
            box-shadow: 0 2px 8px rgba(0,0,0,0.02);
            height: 100%;
        }
        .ttt-insight-card-h {
            font-size: 1.125rem;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: var(--sp-md);
            display: flex;
            align-items: center;
            gap: 8px;
            line-height: 1.3;
        }
        .ttt-insight-card p {
            font-size: 0.9375rem;
            color: #64748b;
            line-height: 1.7;
            margin: 0;
        }
        .ttt-insight-body {
            display: none;
            padding: 0 var(--sp-lg) var(--sp-lg);
            border-top: 1px solid transparent;
        }
        .ttt-insight-card.expanded .ttt-insight-body {
            display: block;
            border-top-color: var(--border-light);
        }
        .ttt-insight-card p {
            font-size: 0.9375rem;
            color: #64748b;
            line-height: 1.7;
            margin: 0;
        }
        .ttt-insight-toggle {
            background: none;
            border: none;
            font-size: 0.8rem;
            color: var(--text-muted);
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .ttt-insight-card.expanded .ttt-insight-toggle {
            transform: rotate(180deg);
        }

        /* Masterclass CTA */
        .ttt-cta-box { 
            border: 2px solid var(--primary); 
            background: var(--primary-subtle); 
            border-radius: var(--radius-lg); 
            padding: var(--sp-xl); 
            margin-top: var(--sp-xl); 
            position: relative;
            overflow: hidden;
        }
        .ttt-cta-eyebrow { font-size: 0.875rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--sp-sm); }
        .ttt-cta-title { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: var(--sp-md); line-height: 1.2; }
        .ttt-cta-sub { font-size: 1.0625rem; color: var(--text-muted); margin-bottom: var(--sp-lg); line-height: 1.6; }
        .ttt-cta-list { list-style: none; padding: 0; margin: 0 0 var(--sp-xl); }
        .ttt-cta-list li { font-size: 1rem; font-weight: 500; color: var(--text-main); line-height: 1.5; padding: 8px 0 8px 32px; position: relative; border-bottom: 1px solid rgba(99, 102, 241, 0.1); }
        .ttt-cta-list li:last-child { border-bottom: none; }
        .ttt-cta-list li::before { content: '✓'; position: absolute; left: 0; color: var(--primary); font-weight: 900; font-size: 1.25rem; }

        /* Trait Badges */
        .ttt-trait-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: var(--sp-md);
            justify-content: center;
        }
        .ttt-trait-tag {
            background: var(--primary-light);
            color: var(--primary-hover);
            padding: 6px 14px;
            border-radius: var(--radius-full);
            font-size: 0.8125rem;
            font-weight: 700;
            letter-spacing: 0.02em;
        }

        /* Focus & Action Cards */
        .ttt-focus-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--sp-lg);
            margin-bottom: var(--sp-xl);
        }
        .ttt-focus-card {
            background: #fff;
            padding: var(--sp-lg);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border);
            text-align: left;
            box-shadow: var(--shadow-sm);
            transition: var(--transition);
        }
        .ttt-focus-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .ttt-focus-label { 
            font-size: 0.75rem; 
            font-weight: 800; 
            color: var(--primary); 
            text-transform: uppercase; 
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .ttt-focus-text { font-size: 1rem; color: var(--text-main); line-height: 1.5; font-weight: 600; }

        /* Guidance Section */
        .ttt-guidance-card {
            background: var(--background-alt);
            padding: var(--sp-xl);
            border-radius: var(--radius-lg);
            margin-bottom: var(--sp-xl);
            text-align: left;
        }
        .ttt-guidance-h { font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: var(--sp-md); }
        .ttt-guidance-p { color: var(--text-muted); line-height: 1.7; font-size: 1rem; margin-bottom: var(--sp-lg); }
        .ttt-next-steps-list { list-style: none; padding: 0; margin: 0; }
        .ttt-next-step-item { 
            background: #fff; 
            padding: var(--sp-md); 
            border-radius: var(--radius-md); 
            margin-bottom: var(--sp-sm); 
            display: flex; 
            gap: 12px; 
            border-left: 4px solid var(--primary);
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .ttt-step-number { font-weight: 800; color: var(--primary); font-size: 1.125rem; }
        .ttt-step-text { font-size: 0.9375rem; color: var(--text-main); line-height: 1.5; }
    `;
    document.head.appendChild(style);

    // Make sure we have a container, otherwise create one and append it to the body
    let container = document.getElementById('ttt-quiz-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ttt-quiz-container';
        // In GHL, this will append to the bottom of the body if the specific ID isn't found. 
        // It's recommended to have <div id="ttt-quiz-container"></div> placed exactly where you want it to appear.
        document.body.appendChild(container);
    }

    // Configuration & Data
    const QUIZ_DATA = {
        stages: [
            {
                id: 'tourist', emoji: '\uD83C\uDFD6\uFE0F',
                name: "Stage 1: The Call", tagline: "The Escape Seeker",
                subtitle: "Travel for relaxation and reward",
                traits: ["Restless", "Curious", "Comfort-seeking", "Safety"],
                characteristics: "You believe travel is your reward after working hard, and you have earned these escapes. You rely on guidebooks, TripAdvisor, or Instagram for travel decisions, valuing comfort, predictability, and familiar options. You often experience post-trip blues when returning to routine, and you sense there is something more to travel but feel like it's incompatible with current life. Deep down, you dream of travelling more but feel trapped by money, time, or obligations.",
                preferences: "More towards guided tours, resorts, and package deals. You prefer destinations with good infrastructure and English-speaking populations, often pre-booking to ensure the itinerary is well planned. You enjoy hotel amenities over a local restaurant.",
                mode: "Tasting Freedom", driver: "Escape", mindset: "Reactive", state: '"Life is happening TO ME"',
                stageInsight: "You are at the beginning of a powerful journey. That longing for \u201cmore\u201d is your wisdom calling you forward. You want permission to want something different from your daily mundane, and you deserve to know that a freedom lifestyle is genuinely possible for someone like you. The biggest mistake most people make is waiting until retirement or saving \u201cenough\u201d. There are easier, smarter ways in our modern day today to make travel sustainable and meaningful, starting from exactly where you are right now.",
                theme: null,
                evolution: "Consider stepping slightly outside your comfort zone on your next trip. Try exploring a local place not mentioned in guidebooks, or spend a day without a rigid itinerary. Start journaling about what you discover beyond the typical tourist experiences, and what you've learned about yourself through the trip."
            },
            {
                id: 'explorer', emoji: '\uD83E\uDDED',
                name: "Stage 2: The Departure", tagline: "The Self-Discoverer",
                subtitle: "Travel for discovery and learning",
                traits: ["Independent", "Open Minded", "Growth-Seeking", "Self-motivated"],
                characteristics: 'You believe travel is the best way to learn and grow, and it genuinely changes who you are through new experiences. You have experienced solo travel or extended trips, mixing planned and spontaneous approaches. The world has become your classroom and you are actively redefining societal limits. You return from trips inspired but often unsure how to maintain that feeling back home, feeling your "travel life" is separated from "real life". You are exploring options like moving to a new country, remote work, digital nomadism, etc.',
                preferences: "Your planning style is flexible with room for spontaneity. You enjoy a mix of researched cultural immersions and off-the-beaten-path destinations. You travel solo or open to meet like-minded travellers who share your curiosity because they feel more aligned than your peers back home who don't understand you. Other than good rating hotels, you also explore local stays, Airbnbs, or hostels.",
                mode: "Seeking Freedom", driver: "Discovery", mindset: "Willful", state: '"Life is happening BY ME"',
                stageInsight: "You have crossed a threshold most tourists never do. You know travel changes you for the better, and you want this freedom to be longer-term, not one-offs here and there. You deserve to travel more meaningfully without constantly worrying about money, logistics or cultural navigation. The proven roadmap you are seeking for exists—without needing trial-and-error anymore. You can build a sustainable travel life that works for your circumstances when you have the right blueprint.",
                theme: '"How do I travel more frequently and meaningfully?"',
                evolution: 'Reflect how your last transformative trip changed a specific belief inside you, and understand what\'s your deeper "why" to travel before your next trip. Map out more clarity what your dream life with more travels looks & feels like and how the next destination could help one step closer.'
            },
            {
                id: 'adventurer', emoji: '\uD83C\uDFAF',
                name: "Stage 3: The Trials", tagline: "The Purposeful Builder",
                subtitle: "Using travel to create a better life by design",
                traits: ["Intentional", "Courageous", "Purpose-seeking", "High-Achieving"],
                characteristics: "You believe travel with intention leads to better life opportunities and have started approaching it strategically rather than accidentally. Your work and travel are beginning to combine, and you care about creating positive impacts. You have achieved outward success, but deep down something is still missing no matter how many countries you've visited. Cultural navigation is now second nature for you and you enjoy being around like-minded community. Yet despite all your self-improvement work, you're still searching for deeper meaning in all of this.",
                preferences: "Besides regular trips, you are likely also incorporating strategic relocations, nomad/expat gatherings, personal growth events, and retreats. You craft unique adventures\u2014open to any country that aligns with your personal goals. You choose accommodation for networking or quality experience. Your travel companions or community tend to be deeper connections met overseas, or travellers who share similar mindset that elevates you.",
                mode: "Building Freedom", driver: "Impact", mindset: "Intellectual", state: '"Life is happening THROUGH ME"',
                stageInsight: "You understand travel is more than escapes and have been intentionally designing your life differently. You\u2019re eager to break free from the matrix and discover the deeper meaning in your journeys. The clarity you seek is closer than you think\u2014faster results are possible after all the self-improvement work you\u2019ve invested. The breakthrough you need isn\u2019t about more information; it\u2019s about the creating the blueprint and transformation that can help you bend time and achieve in months what would take years alone.",
                theme: '"What\'s my deeper purpose behind all these travels?"',
                evolution: 'Audit your whole travel and life journey honestly: Why it brought you here? Instead of asking "where should I go next?", ask "who do I want to become?" From now on, explore how each destination reflects your core values, curiosities, and personal vision. The answers you\'re seeking aren\'t found by travelling more, but within you. Unlock them through "travelling inwards" (intentional inner work).'
            },
            {
                id: 'global_citizen', emoji: '\uD83C\uDF0D',
                name: "Stage 4: The Return", tagline: "The Global Changemaker",
                subtitle: "Travel as a way of living, evolving, and transforming others",
                traits: ["Wisdom", "Leadership", "Vision-led", "Mastery"],
                characteristics: "You believe travel transforms all areas of life and it has become a natural expression of who you are becoming and how you lead. You are an integrated travel master. You don't believe there's separation in travel and life anymore; they are holistic and sustainable. You can feel at home anywhere because you are at home within yourself. Travel unlocks more financial growth and soulful connections, and you know how to open synchronistic opportunities wherever you go. Your passion lies in making positive impacts and helping others become better.",
                preferences: "Beyond regular trips and international events, you're drawn to speaking engagements, leading workshops or retreats, and collaborating with fellow changemakers. Your travel choices are both purposeful and intuitive\u2014each journey supporting your conscious evolution from the inside-out. You aspire to cultivate both a nourishing home base and meaningful global travels, chosen with alignment.",
                mode: "Becoming Freedom", driver: "Lifestyle", mindset: "Intuitive & Integral", state: '"Life is happening AS ME"',
                stageInsight: "You have arrived at integration\u2014embodying freedom across different areas of life. The world needs what you have learned, and it is time to leave your legacy. You deserve collaborators who match your level of consciousness, as well as mentors and coaches to support your next level of expansion. The global community you seek to contribute to and grow alongside already exists. Your highest potential as a global citizen is ready to be unleashed, creating total freedom (Financial, Emotional, Location and Time), alongside your deeper purpose on this earth.",
                theme: '"How do I make the world a better place through travel?"',
                evolution: 'What is the biggest obstacle currently slowing you from getting to where you want to be? Ask yourself what lesson you are meant to learn here. Envision your ideal day once you have achieved and manifested your highest vision\u2014from there, instead of asking "how", ask "who"\u2014who can walk alongside you, reflect your blind spots, and support your next level of expansion?'
            }
        ],
        questions: [
            // SECTION 1: Transform Global Mindset
            {
                category: "SECTION 1: TRANSFORM GLOBAL MINDSET",
                text: "When you think about travel in your life, which statement resonates most?",
                note: "Multiple answers allowed",
                options: [
                    { label: "Travel is my reward after working hard. I'm always finding ways to earn my next escape", stageId: 'tourist', points: 8 },
                    { label: "Travel is how I learn about myself and the world around me", stageId: 'explorer', points: 8 },
                    { label: "Travel is a strategic tool for creating better life opportunities and breaking free from societal limits", stageId: 'adventurer', points: 8 },
                    { label: "Travel is where I create multiple bases in different countries to create positive impacts as part of my global lifestyle", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 1: TRANSFORM GLOBAL MINDSET",
                text: "When faced with travel challenges (delays, cultural misunderstandings, plans changing), you most likely:",
                options: [
                    { label: "Feel frustrated and stressed – these things ruin my carefully planned trip", stageId: 'tourist', points: 8 },
                    { label: "See it as part of the exploration and try to learn from the experience", stageId: 'explorer', points: 8 },
                    { label: "View it as data for optimising future travels and building my longer-term global journey", stageId: 'adventurer', points: 8 },
                    { label: "Flow with it naturally without expectation, knowing deeply that every experience serves my purpose perfectly", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 1: TRANSFORM GLOBAL MINDSET",
                text: "When looking at your recent travels, which motivation or focus describes them best?",
                options: [
                    { label: "I travel to enjoy my holidays and take a break from everyday stress", stageId: 'tourist', points: 8 },
                    { label: "I travel to learn more about the world and cultures – it's all about discovering new things", stageId: 'explorer', points: 8 },
                    { label: "I travel because it brings better life quality, opportunities and connections that wouldn't otherwise be possible", stageId: 'adventurer', points: 8 },
                    { label: "I travel because it's part of the global identity I intentionally craft and a pathway to make positive changes in the world", stageId: 'global_citizen', points: 8 }
                ]
            },
            // SECTION 2: Refine Inner Travel
            {
                category: "SECTION 2: REFINE INNER TRAVEL",
                text: "After returning from a trip, you mostly experience:",
                options: [
                    { label: "Post-trip blues or feeling like I need another holiday to recover", stageId: 'tourist', points: 8 },
                    { label: "Inspiration and new perspectives, though sometimes unsure how to maintain the feeling", stageId: 'explorer', points: 8 },
                    { label: "Clear insights about myself and specific life-changing ideas that can be implemented", stageId: 'adventurer', points: 8 },
                    { label: "A natural continuation of my growth – the journey never really ends and I usually know where to go next with clarity and alignment", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 2: REFINE INNER TRAVEL",
                text: "Which frustration about travel resonates most with you right now?",
                note: "Multiple answers allowed",
                options: [
                    { label: "\"I can't afford to travel as much as I'd like, and trips feel too short\"", stageId: 'tourist', points: 8 },
                    { label: "\"I love travelling, but I'm craving deeper meaning—souvenir photos aren't enough anymore\"", stageId: 'explorer', points: 8 },
                    { label: "\"I've been trying to travel with more intention and meaning, but I lack clarity on finding my deeper purpose\"", stageId: 'adventurer', points: 8 },
                    { label: "\"I want my travels to become an integrated lifestyle with better opportunities, finances, and impact—but I'm still figuring out how to align it all\"", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 2: REFINE INNER TRAVEL",
                text: "How do you view travel as a personal growth tool?",
                note: "Scale question",
                options: [
                    { label: "I don't really think about travel and personal growth together", stageId: 'tourist', points: 8 },
                    { label: "I notice how travel could help me grow after each trip, but haven't explored it much", stageId: 'explorer', points: 8 },
                    { label: "I intentionally use travel for personal development and would include growth experiences and community events into my journeys", stageId: 'adventurer', points: 8 },
                    { label: "Travel and personal transformation are completely integrated – I'm passionate about becoming the best version of myself", stageId: 'global_citizen', points: 8 }
                ]
            },
            // SECTION 3: Integrate Outer Travel
            {
                category: "SECTION 3: INTEGRATE OUTER TRAVEL",
                text: "Which travel planning style sounds most like you?",
                note: "Multiple answers allowed",
                options: [
                    { label: "Research popular spots, read reviews, follow guidebooks", stageId: 'tourist', points: 8 },
                    { label: "Rough plan with room for spontaneity and discovery", stageId: 'explorer', points: 8 },
                    { label: "I design my adventures with my personal goals in mind", stageId: 'adventurer', points: 8 },
                    { label: "Itineraries serve my higher purpose: where I can contribute, collaborate and grow", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 3: INTEGRATE OUTER TRAVEL",
                text: "Your relationship with other travellers/locals during recent trips tends to be:",
                note: "Multiple answers allowed",
                options: [
                    { label: "Interactions here and there: mostly transactional or tour-focused", stageId: 'tourist', points: 8 },
                    { label: "Open to authentic connections, though sometimes feeling annoyed being misunderstood", stageId: 'explorer', points: 8 },
                    { label: "Confident in cultural navigation and building strategic networks or communities", stageId: 'adventurer', points: 8 },
                    { label: "Able to create authentic, synchronistic connections and unexpected collaborations that feel divinely orchestrated", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 3: INTEGRATE OUTER TRAVEL",
                text: "Your biggest travel fears centre around:",
                options: [
                    { label: "Safety, medical issues abroad, or scams", stageId: 'tourist', points: 8 },
                    { label: "Missing out on better experiences or feeling lonely", stageId: 'explorer', points: 8 },
                    { label: "Wasting time or money on trips that don't move my overall life forward", stageId: 'adventurer', points: 8 },
                    { label: "Not fulfilling my true potential or living my deepest purpose", stageId: 'global_citizen', points: 8 }
                ]
            },
            // SECTION 4: Purpose Driven Journeys
            {
                category: "SECTION 4: PURPOSE DRIVEN JOURNEYS",
                text: "What role does travel play in your bigger life vision?",
                note: "Multiple answers allowed",
                options: [
                    { label: "It's how I reward myself and take breaks from real life", stageId: 'tourist', points: 8 },
                    { label: "It's helping me discover who I am and what I want from life", stageId: 'explorer', points: 8 },
                    { label: "It's part of my path to building a global life while being able to serve others", stageId: 'adventurer', points: 8 },
                    { label: "It's integral to my purpose and contribution – I transform others through travel and am passionate about making the world a better place", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 4: PURPOSE DRIVEN JOURNEYS",
                text: "How clear are you about living your deepest purpose through travel?",
                options: [
                    { label: "I don't really think about purpose – I just want to enjoy myself", stageId: 'tourist', points: 8 },
                    { label: "I'm still exploring what my purpose might be and how travel fits in", stageId: 'explorer', points: 8 },
                    { label: "I have some clarity on my purpose but need help integrating it with my travels", stageId: 'adventurer', points: 8 },
                    { label: "I'm crystal clear on my purpose and travel is one of my main vehicles for expressing it", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 4: PURPOSE DRIVEN JOURNEYS",
                text: "When it comes to making a difference through travel, you feel:",
                options: [
                    { label: "That's not really why I travel – I travel for myself", stageId: 'tourist', points: 8 },
                    { label: "I believe travel can make a difference, so just keeping an open mind for now.", stageId: 'explorer', points: 8 },
                    { label: "I'm passionate about creating positive impact—personally, locally, and globally—but could also use clearer direction.", stageId: 'adventurer', points: 8 },
                    { label: "It's central to my journeys. I'm already using travel as a force to contribute—for positive change and transformation.", stageId: 'global_citizen', points: 8 }
                ]
            },
            {
                category: "SECTION 4: PURPOSE DRIVEN JOURNEYS",
                text: "When you imagine your ideal travel lifestyle, what element excites you the most?",
                options: [
                    { label: "Relaxing time at a beautiful location that's safe and easy to navigate", stageId: 'tourist', points: 8 },
                    { label: "Freedom to explore and learn in any country and expand my worldview", stageId: 'explorer', points: 8 },
                    { label: "Personalised trips that combine my passions and skills that'd yield more success in life", stageId: 'adventurer', points: 8 },
                    { label: "Travelling whenever I want, however I want, while making a positive impact on others or uplifting humanity", stageId: 'global_citizen', points: 8 }
                ]
            }
        ]
    };

    // State Management
    let state = {
        user: { name: "", phone: "", email: "" },
        answers: Array(13).fill().map(() => []), // Array of arrays for multiple selections
        currentQuestion: 0,
    };

    const STORAGE_KEY = 'ttt_quiz_state_v3';

    function loadState() {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                state.user = parsed.user || { name: "", phone: "", email: "" };
            }

            // Also attempt to load from URL parameters (e.g. from GHL email links)
            // Example: ?name={{contact.name}}&email={{contact.email}}&phone={{contact.phone}}
            const urlParams = new URLSearchParams(window.location.search);
            const urlName = urlParams.get('name') || urlParams.get('first_name');
            const urlEmail = urlParams.get('email');
            const urlPhone = urlParams.get('phone');

            let urlOverrides = false;
            // Only apply URL params if they don't look like raw un-replaced brackets
            if (urlName && !urlName.includes('{{')) { state.user.name = urlName; urlOverrides = true; }
            if (urlEmail && !urlEmail.includes('{{')) { state.user.email = urlEmail; urlOverrides = true; }
            if (urlPhone && !urlPhone.includes('{{')) { state.user.phone = urlPhone; urlOverrides = true; }

            if (urlOverrides) {
                saveState(); // Save the new URL params into session
            }
        } catch (e) {
            console.warn("Could not load quiz state", e);
        }
    }

    function saveState() {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ user: state.user }));
        } catch (e) {
            console.warn("Could not save quiz state", e);
        }
    }

    function clearState(keepUser = false) {
        if (!keepUser) {
            sessionStorage.removeItem(STORAGE_KEY);
            state.user = { name: "", phone: "", email: "" };
        }
        state.answers = Array(13).fill().map(() => []);
        state.currentQuestion = 0;
        if (keepUser) {
            saveState(); // Ensure the cleared answers/progress are saved, but user remains
        }
    }

    // Expose reset/retake functions globally so onclick works
    // from dynamically-injected HTML inside the IIFE scope
    window.tttResetQuiz = function () {
        clearState(false);
        initWelcomeScreen();
        showView('ttt-view-welcome');
    };

    window.tttRetakeQuiz = function () {
        clearState(true); // Keep user info
        renderQuestion();
        showView('ttt-view-quiz');
    };

    // Data Transmission (GHL, n8n, Zapier)
    function sendData(resultStageName, resultsArray, userAnswers) {
        const winner = QUIZ_DATA.stages.find(s => s.name === resultStageName) || {};

        const nameParts = state.user.name.trim().split(/\s+/);
        const lastName = nameParts.length > 1 ? nameParts.pop() : '';
        const firstName = nameParts.join(' ');

        const payload = {
            first_name: firstName,
            last_name: lastName,
            email: state.user.email,
            phone: state.user.phone,
            quiz_result: ({ tourist: 'The Tourist', explorer: 'The Explorer', adventurer: 'The Adventurer', global_citizen: 'The Global Citizen' }[winner.id] || resultStageName),
            quiz_result_stage: resultStageName,
            quiz_result_emoji: winner.emoji || '',
            quiz_result_subtitle: winner.subtitle || '',
            quiz_result_traits: (winner.traits || []).join(', '),
            tags: 'quiz finish',
            source: 'travel-archetype-quiz'
        };

        // Format answers
        let summaryParts = [];
        QUIZ_DATA.questions.forEach((q, idx) => {
            const selectedIndices = userAnswers[idx] || [];
            const labels = selectedIndices.length > 0 ? selectedIndices.map(i => q.options[i].label).join(', ') : 'No answer';

            payload[`question_${idx + 1}_text`] = q.text;
            payload[`question_${idx + 1}_answer`] = labels;

            summaryParts.push(`Q${idx + 1}: ${q.text}\nA: ${labels}`);
        });
        payload['all_answers_summary'] = summaryParts.join('\n\n');

        // Format score breakdown
        if (resultsArray) {
            resultsArray.forEach(res => {
                const stageFull = QUIZ_DATA.stages.find(s => s.id === res.id);
                payload[`score_${res.id}_pct`] = `${res.percentage}%`;
                payload[`score_${res.id}_pts`] = res.score;
            });
        }

        // ─── 1. Webhook POST (Works natively with n8n, Zapier, Make, and GHL) ─
        if (TTT_CONFIG.webhookUrl) {
            const isProxyPath = TTT_CONFIG.webhookUrl.startsWith('/');
            const targetUrl = isProxyPath ? window.location.origin + TTT_CONFIG.webhookUrl : TTT_CONFIG.webhookUrl;

            console.log('[TTT] Sending webhook to:', targetUrl, isProxyPath ? '(via Netlify proxy)' : '(direct)');

            // If using Netlify proxy (/api/webhook), request is same-origin → use normal fetch with JSON
            // If hitting external URL directly, use no-cors + text/plain to avoid CORS preflight blocks
            const fetchOptions = isProxyPath
                ? {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }
                : {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(payload)
                };

            fetch(targetUrl, fetchOptions)
                .then(res => {
                    if (isProxyPath) {
                        console.log('[TTT] Webhook sent via proxy, status:', res.status);
                        if (!res.ok) console.warn('[TTT] Webhook proxy returned non-OK status:', res.status);
                    } else {
                        console.log('[TTT] Webhook "shot" successfully (mode: no-cors, response is opaque)');
                    }
                })
                .catch(err => console.warn('[TTT] Webhook failed:', err));
        } else {
            console.warn('[TTT] No webhookUrl configured.');
        }

        // ─── 2. Fill any hidden GHL form fields on the page ──────────────────
        // This allows you to use a native GHL form with hidden custom fields
        const q = sel => document.querySelector(sel);

        // Basic Profile Info
        const nameField = q('input[name="first_name"], input[name="name"], input[placeholder*="Name" i]');
        const emailField = q('input[name="email"], input[type="email"]');
        const phoneField = q('input[name="phone"], input[type="tel"]');
        if (nameField) nameField.value = state.user.name;
        if (emailField) emailField.value = state.user.email;
        if (phoneField) phoneField.value = state.user.phone;

        // Core Result
        const stageField = q('input[name="custom_quiz_result"], input[name*="quiz_result"]');
        if (stageField) stageField.value = resultStageName;

        // Populate the 13 Questions (e.g. input[name="custom_question_1"])
        for (let i = 1; i <= 13; i++) {
            const qField = q(`input[name="custom_question_${i}"], input[name*="question_${i}"]`);
            if (qField) qField.value = payload[`question_${i}_answer`];
        }

        // Populate the Percentages (e.g. input[name="custom_score_tourist_pct"])
        if (resultsArray) {
            resultsArray.forEach(res => {
                const pctField = q(`input[name="custom_score_${res.id}_pct"], input[name*="score_${res.id}_pct"]`);
                if (pctField) pctField.value = `${res.percentage}%`;

                const ptsField = q(`input[name="custom_score_${res.id}_pts"], input[name*="score_${res.id}_pts"]`);
                if (ptsField) ptsField.value = res.score;
            });
        }

        // Auto-submit the hidden GHL Form (if present on same domain)
        const submitBtn = document.querySelector('form button[type="submit"]');
        if (submitBtn) {
            console.log('[TTT] Auto-submitting hidden GHL form...');
            submitBtn.click();
        }

        // ─── 3. iframe postMessage — For embedded GHL forms on different domains ─
        const ghlIframe = document.querySelector('iframe[src*="connect.civy.ph"], iframe[src*="api.leadconnectorhq.com"]');
        if (ghlIframe) {
            console.log('[TTT] Found GHL iframe. Sending payload via postMessage...');
            // GHL form receivers expect messages structured under specific keys.
            // Some versions listen to raw form field names being passed.
            ghlIframe.contentWindow.postMessage({
                type: 'leadconnector-form-submission', // common GHL trigger
                data: Object.assign({}, payload)
            }, '*');

            // Send a second format just in case the iframe uses an older listener
            ghlIframe.contentWindow.postMessage({
                message: 'formInfo',
                formInfo: payload
            }, '*');
        }

        // ─── 4. DOM event — Custom elements can listen to this ──────────────
        window.dispatchEvent(new CustomEvent('tttQuizCompleted', { detail: payload }));
        console.log('[TTT] Quiz completed. Payload:', payload);
    }

    // Build the Shell HTML
    function renderShell() {
        container.innerHTML = `
            <div class="ttt-card">
                <div class="ttt-header-actions" id="ttt-header-actions" style="display:none;"></div>

                <!-- WELCOME SCREEN -->
                <div id="ttt-view-welcome" class="ttt-view active">
                    <h2>Welcome to The Traveller DNA Quiz</h2>
                    <p>Before we discover your current stage of transformation, please tell us a little about yourself.</p>
                    
                    <div class="ttt-form-group">
                        <label class="ttt-label" for="ttt-name">Full Name <span style="color:var(--error)">*</span></label>
                        <input type="text" id="ttt-name" class="ttt-input" placeholder="e.g. Jane Doe" autocomplete="name" required>
                        <div class="ttt-error-msg" id="ttt-err-name">Please enter your full name</div>
                    </div>
                    
                    <div class="ttt-form-group">
                        <label class="ttt-label" for="ttt-email">Email Address <span style="color:var(--error)">*</span></label>
                        <input type="email" id="ttt-email" class="ttt-input" placeholder="e.g. jane@example.com" autocomplete="email" required>
                        <div class="ttt-error-msg" id="ttt-err-email">Please enter a valid email</div>
                    </div>

                    <div class="ttt-form-group">
                        <label class="ttt-label" for="ttt-phone">Phone Number</label>
                        <input type="tel" id="ttt-phone" class="ttt-input" inputmode="tel" placeholder="e.g. +61 412 345 678" autocomplete="tel">
                        <div class="ttt-error-msg" id="ttt-err-phone">Please enter a valid phone number</div>
                    </div>

                    <button class="ttt-btn" id="ttt-btn-start">Begin the Quiz</button>
                </div>

                <!-- QUIZ SCREEN -->
                <div id="ttt-view-quiz" class="ttt-view">
                    <div class="ttt-progress-container">
                        <div class="ttt-progress-text">
                            <span>Question <span id="ttt-q-current">1</span> of 13</span>
                            <span id="ttt-q-percent">10%</span>
                        </div>
                        <div class="ttt-progress-track">
                            <div class="ttt-progress-fill" id="ttt-p-bar"></div>
                        </div>
                    </div>
                    
                    <div id="ttt-question-eyebrow" style="font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em;"></div>
                    <h2 id="ttt-question-text" style="font-size: 1.25rem; line-height: 1.4; margin-bottom: 0.5rem;"></h2>
                    <div id="ttt-question-note" style="font-size: 0.85rem; color: #6366f1; font-weight: 600; margin-bottom: 1.5rem; display: none;"></div>
                    
                    <div class="ttt-options-grid" id="ttt-options-container">
                        <!-- Options rendered via JS -->
                    </div>

                    <div class="ttt-nav-buttons">
                        <button class="ttt-btn ttt-btn-secondary" id="ttt-btn-prev" style="display:none;">Back</button>
                        <button class="ttt-btn" id="ttt-btn-next" disabled>Next</button>
                    </div>
                </div>

                <!-- LOADING SCREEN -->
                <div id="ttt-view-loading" class="ttt-view">
                    <div class="ttt-loader-wrapper">
                        <div class="ttt-spinner"></div>
                        <h2>Analyzing your answers...</h2>
                        <p style="margin-bottom:0;">Please wait while we determine your current stage.</p>
                    </div>
                </div>

                <!-- RESULTS SCREEN -->
                <div id="ttt-view-results" class="ttt-view">
                    <div class="ttt-result-card">
                        <div class="ttt-result-stage" id="ttt-res-subtitle">Your Primary Stage</div>
                        <h2 class="ttt-result-title" id="ttt-res-title">Stage Title</h2>
                        <p id="ttt-res-desc">
                            Below is the breakdown of your alignment with each stage of the transformational journey.
                        </p>
                        
                        <div class="ttt-result-list" id="ttt-result-list-container">
                            <!-- Populated via JS -->
                        </div>
                        <br/>
                        <div style="display: flex; justify-content: center;">
                            <button class="ttt-btn" id="ttt-btn-finish-retake" style="max-width: 300px;">Retake Quiz</button>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }

    // View Management
    function showView(viewId) {
        document.querySelectorAll('.ttt-view').forEach(v => v.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');

        // Show header restart button only in quiz
        const headerActions = document.getElementById('ttt-header-actions');
        if (headerActions) {
            headerActions.style.display = (viewId === 'ttt-view-quiz') ? 'block' : 'none';
        }
    }

    // Validation logic
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Event Listeners Setup
    function attachListeners() {
        document.getElementById('ttt-btn-finish-retake').addEventListener('click', () => {
            window.tttRetakeQuiz();
        });

        document.getElementById('ttt-btn-start').addEventListener('click', () => {
            const nameInput = document.getElementById('ttt-name');
            const emailInput = document.getElementById('ttt-email');
            const phoneInput = document.getElementById('ttt-phone');

            let isValid = true;

            if (!nameInput.value.trim()) {
                nameInput.classList.add('invalid');
                document.getElementById('ttt-err-name').style.display = 'block';
                isValid = false;
            } else {
                nameInput.classList.remove('invalid');
                document.getElementById('ttt-err-name').style.display = 'none';
            }

            if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                document.getElementById('ttt-err-email').style.display = 'block';
                isValid = false;
            } else {
                emailInput.classList.remove('invalid');
                document.getElementById('ttt-err-email').style.display = 'none';
            }

            const phoneVal = phoneInput.value.trim();
            const digitsOnly = phoneVal.replace(/[^0-9]/g, '');
            // Validate: if provided, must have 7+ digits and only contain digits, +, spaces, dashes, parentheses
            if (phoneVal && !/^[+]?[\d\s\-()]+$/.test(phoneVal)) {
                phoneInput.classList.add('invalid');
                document.getElementById('ttt-err-phone').style.display = 'block';
                isValid = false;
            } else if (phoneVal && digitsOnly.length < 7) {
                phoneInput.classList.add('invalid');
                document.getElementById('ttt-err-phone').style.display = 'block';
                isValid = false;
            } else {
                phoneInput.classList.remove('invalid');
                document.getElementById('ttt-err-phone').style.display = 'none';
            }

            if (isValid) {
                state.user.name = nameInput.value.trim();
                state.user.email = emailInput.value.trim();
                state.user.phone = phoneInput.value.trim();
                saveState();

                // Send sign-up webhook on quiz start
                try {
                    const signupUrl = TTT_CONFIG.signupWebhookUrl || '';
                    if (signupUrl) {
                        const nameParts = state.user.name.trim().split(/\s+/);
                        const lastName = nameParts.length > 1 ? nameParts.pop() : '';
                        const firstName = nameParts.join(' ');
                        const leadPayload = {
                            first_name: firstName,
                            last_name: lastName,
                            email: state.user.email,
                            phone: state.user.phone,
                            event: 'quiz_started',
                            tags: 'quiz sign up',
                            source: 'travel-archetype-quiz',
                            timestamp: new Date().toISOString()
                        };
                        const isProxy = signupUrl.startsWith('/');
                        fetch(isProxy ? window.location.origin + signupUrl : signupUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': isProxy ? 'application/json' : 'text/plain' },
                            mode: isProxy ? 'cors' : 'no-cors',
                            body: JSON.stringify(leadPayload)
                        }).then(res => {
                            console.log('[TTT] Sign-up webhook sent:', res.status);
                        }).catch(err => {
                            console.warn('[TTT] Sign-up webhook error:', err);
                        });
                    }
                } catch (e) {
                    console.warn('[TTT] Sign-up webhook error:', e);
                }

                state.answers = Array(13).fill().map(() => []);
                state.currentQuestion = 0;
                renderQuestion();
                showView('ttt-view-quiz');
            }
        });

        document.getElementById('ttt-btn-prev').addEventListener('click', () => {
            if (state.currentQuestion > 0) {
                state.currentQuestion--;
                renderQuestion();
            }
        });

        document.getElementById('ttt-btn-next').addEventListener('click', () => {
            if (state.currentQuestion < QUIZ_DATA.questions.length - 1) {
                state.currentQuestion++;
                renderQuestion();
            } else {
                handleFinish();
            }
        });

        ['name', 'email', 'phone'].forEach(field => {
            document.getElementById(`ttt-${field}`).addEventListener('input', (e) => {
                e.target.classList.remove('invalid');
                document.getElementById(`ttt-err-${field}`).style.display = 'none';
            });
        });

        // Allow only phone-valid characters: digits, +, spaces, dashes, parentheses
        document.getElementById('ttt-phone').addEventListener('keydown', (e) => {
            // Allow: backspace, delete, tab, escape, enter, arrows
            if ([8, 9, 13, 27, 46, 37, 38, 39, 40].includes(e.keyCode)) return;
            // Allow Ctrl/Cmd+A, Ctrl/Cmd+C, Ctrl/Cmd+V, Ctrl/Cmd+X
            if ((e.ctrlKey || e.metaKey) && [65, 67, 86, 88].includes(e.keyCode)) return;
            // Allow: digits, +, space, dash, parentheses
            if (/[0-9+\-() ]/.test(e.key)) return;
            // Block everything else (letters, symbols)
            e.preventDefault();
        });

        // Strip invalid chars on paste, keep phone-friendly characters
        document.getElementById('ttt-phone').addEventListener('paste', (e) => {
            setTimeout(() => {
                const input = e.target;
                input.value = input.value.replace(/[^0-9+\-() ]/g, '');
            }, 0);
        });
    }

    // Quiz Render logic
    function renderQuestion() {
        const qIndex = state.currentQuestion;
        const totalQ = QUIZ_DATA.questions.length;
        const questionData = QUIZ_DATA.questions[qIndex];
        const currentAnswer = state.answers[qIndex];

        document.getElementById('ttt-q-current').innerText = qIndex + 1;
        const percent = Math.round(((qIndex + 1) / totalQ) * 100);
        document.getElementById('ttt-q-percent').innerText = `${percent}%`;
        document.getElementById('ttt-p-bar').style.width = `${percent}%`;

        document.getElementById('ttt-question-eyebrow').innerText = questionData.category || "";
        document.getElementById('ttt-question-text').innerText = questionData.text;

        const noteEl = document.getElementById('ttt-question-note');
        if (questionData.note) {
            noteEl.innerText = `(${questionData.note})`;
            noteEl.style.display = 'block';
        } else {
            noteEl.style.display = 'none';
        }

        const optionsContainer = document.getElementById('ttt-options-container');
        optionsContainer.innerHTML = '';

        const isMulti = questionData.note && questionData.note.includes('Multiple');

        questionData.options.forEach((opt, idx) => {
            const isSelected = currentAnswer.includes(idx);
            const optDiv = document.createElement('div');
            optDiv.className = `ttt-option ${isSelected ? 'selected' : ''}`;

            optDiv.innerHTML = `
                <div class="ttt-option-radio ${isMulti ? 'checkbox' : ''}"></div>
                <span>${opt.label}</span>
            `;
            optDiv.addEventListener('click', () => {
                if (isMulti) {
                    if (currentAnswer.includes(idx)) {
                        state.answers[qIndex] = currentAnswer.filter(i => i !== idx);
                    } else {
                        state.answers[qIndex].push(idx);
                    }
                } else {
                    state.answers[qIndex] = [idx]; // Single selection as array of one
                }
                renderQuestion();
            });
            optionsContainer.appendChild(optDiv);
        });

        document.getElementById('ttt-btn-prev').style.display = qIndex > 0 ? 'inline-flex' : 'none';

        const nextBtn = document.getElementById('ttt-btn-next');
        if (currentAnswer && currentAnswer.length > 0) {
            nextBtn.removeAttribute('disabled');
        } else {
            nextBtn.setAttribute('disabled', 'true');
        }

        if (qIndex === totalQ - 1) {
            nextBtn.innerText = "Finish";
        } else {
            nextBtn.innerText = "Next";
        }
    }

    // Scoring Logic
    function calculateResult() {
        let scores = { 'tourist': 0, 'explorer': 0, 'adventurer': 0, 'global_citizen': 0 };

        QUIZ_DATA.questions.forEach((q, idx) => {
            const selectedIndices = state.answers[idx];
            if (selectedIndices && Array.isArray(selectedIndices)) {
                selectedIndices.forEach(sIdx => {
                    const opt = q.options[sIdx];
                    if (opt) scores[opt.stageId] += opt.points;
                });
            }
        });

        // Calculate total score across all categories
        const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0);

        let resultsArray = [];

        // Largest remainder method — guarantees percentages always sum to exactly 100
        const n = QUIZ_DATA.stages.length;
        const rawPercentages = QUIZ_DATA.stages.map(stage => {
            const score = scores[stage.id];
            const raw = totalScore > 0 ? (score / totalScore) * 100 : (100 / n);
            return { id: stage.id, name: stage.name, score, floor: Math.floor(raw), remainder: raw - Math.floor(raw) };
        });

        const sumFloors = rawPercentages.reduce((sum, r) => sum + r.floor, 0);
        const leftover = 100 - sumFloors;

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

    // Completion Flow
    function handleFinish() {
        const results = calculateResult();
        const primaryResult = results[0];
        const winner = QUIZ_DATA.stages.find(s => s.id === primaryResult.id);

        sendData(primaryResult.name, results, state.answers);
        showView('ttt-view-loading');

        // Format completion date
        const now = new Date();
        const completedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            + ' at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        setTimeout(() => {
            const resView = document.getElementById('ttt-view-results');

            const traitName = (id) => ({ tourist: 'The Tourist', explorer: 'The Explorer', adventurer: 'The Adventurer', global_citizen: 'The Global Citizen' }[id] || id);

            // 2. Profile Cards Breakdown
            let profileCardsHTML = '';
            results.forEach((res, index) => {
                const isWinner = index === 0;
                const stageFull = QUIZ_DATA.stages.find(s => s.id === res.id);
                if (!stageFull) return;

                profileCardsHTML += `
                    <div class="ttt-profile-card ttt-stage-${res.id} ${isWinner ? 'expanded' : ''}" data-card-id="${res.id}">
                        <div class="ttt-profile-header" onclick="this.parentElement.classList.toggle('expanded')">
                            <div class="ttt-profile-info">
                                <div class="ttt-profile-stage-name">${stageFull.emoji} ${traitName(stageFull.id)}</div>
                                <div class="ttt-profile-stage-sub">${stageFull.subtitle}</div>
                            </div>
                            <div class="ttt-profile-pct">${res.percentage}%</div>
                            <button class="ttt-profile-toggle" onclick="event.stopPropagation(); this.closest('.ttt-profile-card').classList.toggle('expanded')">&#9660;</button>
                        </div>
                        <div class="ttt-profile-bar"><div class="ttt-profile-bar-fill" data-pct="${res.percentage}"></div></div>
                        <div class="ttt-profile-detail">
                            <div class="ttt-profile-detail-body">
                                <div class="ttt-detail-section-h">🔍 Core Characteristics</div>
                                <p class="ttt-detail-text">${stageFull.characteristics}</p>
                                <div class="ttt-detail-section-h">🏷️ Your Traveller Traits</div>
                                <p class="ttt-detail-text" style="font-weight: 600;">${stageFull.traits.join(' • ')}</p>
                                <div class="ttt-detail-section-h">✈️ Travel Preferences</div>
                                <p class="ttt-detail-text">${stageFull.preferences}</p>
                                <div class="ttt-detail-section-h">🧠 Your Primary Operating Mode</div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 8px 0;">
                                    <div style="background: var(--background-alt); padding: 8px 12px; border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
                                        <div style="font-size: 0.65rem; color: var(--text-muted);">Mode</div>
                                        <div style="font-weight: 700; font-size: 0.875rem;">${stageFull.mode}</div>
                                    </div>
                                    <div style="background: var(--background-alt); padding: 8px 12px; border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
                                        <div style="font-size: 0.65rem; color: var(--text-muted);">Primary Driver</div>
                                        <div style="font-weight: 700; font-size: 0.875rem;">${stageFull.driver}</div>
                                    </div>
                                    <div style="background: var(--background-alt); padding: 8px 12px; border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
                                        <div style="font-size: 0.65rem; color: var(--text-muted);">Operating Mindset</div>
                                        <div style="font-weight: 700; font-size: 0.875rem;">${stageFull.mindset}</div>
                                    </div>
                                    <div style="background: var(--background-alt); padding: 8px 12px; border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
                                        <div style="font-size: 0.65rem; color: var(--text-muted);">State of Living</div>
                                        <div style="font-weight: 700; font-size: 0.875rem;">${stageFull.state}</div>
                                    </div>
                                </div>
                                <div class="ttt-detail-section-h">💡 Your Personalised Journey Insights</div>
                                <p class="ttt-detail-text" style="margin-bottom: 8px;"><strong>🌟 About Your Stage:</strong> ${stageFull.stageInsight}</p>
                                ${stageFull.theme ? `<p class="ttt-detail-text" style="margin-bottom: 8px;"><strong>🗺️ Main Theme to Explore:</strong> <em style="color: var(--primary);">${stageFull.theme}</em></p>` : ''}
                                <p class="ttt-detail-text"><strong>🚀 Your Next Evolution:</strong> ${stageFull.evolution}</p>
                            </div>
                        </div>
                    </div>
                `;
            });

            resView.innerHTML = `
                <div class="ttt-results-main-title">Your Traveller DNA Quiz Results</div>

                <div class="ttt-hero-banner">
                    <span class="ttt-hero-emoji">${winner.emoji}</span>
                    <div class="ttt-hero-name">${winner.emoji} The ${winner.id === 'tourist' ? 'Tourist' : winner.id === 'explorer' ? 'Explorer' : winner.id === 'adventurer' ? 'Adventurer' : 'Global Citizen'}: ${winner.tagline}</div>
                    <div class="ttt-hero-subtitle">${winner.subtitle}</div>
                </div>

                <div class="ttt-guidance-card">
                    <div class="ttt-guidance-h">🔍 Core Characteristics</div>
                    <p class="ttt-guidance-p">${winner.characteristics}</p>

                    <div class="ttt-guidance-h">🏷️ Your Traveller Traits</div>
                    <div class="ttt-trait-container" style="justify-content: flex-start; margin-bottom: var(--sp-lg); margin-top: 8px;">
                        ${winner.traits.map(t => `<span class="ttt-trait-tag">${t}</span>`).join('')}
                    </div>

                    <div class="ttt-guidance-h">✈️ Travel Preferences</div>
                    <p class="ttt-guidance-p">${winner.preferences}</p>

                    <div class="ttt-guidance-h">🧠 Your Primary Operating Mode</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: var(--sp-lg);">
                        <div style="background: #fff; padding: 12px 16px; border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
                            <div style="font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.03em;">Mode <span style="font-style:italic;">(Your current relationship with freedom)</span></div>
                            <div style="font-weight: 700; color: var(--text-main);">${winner.mode}</div>
                        </div>
                        <div style="background: #fff; padding: 12px 16px; border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
                            <div style="font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.03em;">Primary Driver <span style="font-style:italic;">(Why you travel)</span></div>
                            <div style="font-weight: 700; color: var(--text-main);">${winner.driver}</div>
                        </div>
                        <div style="background: #fff; padding: 12px 16px; border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
                            <div style="font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.03em;">Operating Mindset <span style="font-style:italic;">(How you think and respond most often)</span></div>
                            <div style="font-weight: 700; color: var(--text-main);">${winner.mindset}</div>
                        </div>
                        <div style="background: #fff; padding: 12px 16px; border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
                            <div style="font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.03em;">State of Living <span style="font-style:italic;">(Your current relationship with life)</span></div>
                            <div style="font-weight: 700; color: var(--text-main);">${winner.state}</div>
                        </div>
                    </div>
                </div>

                <div class="ttt-guidance-card">
                    <div class="ttt-guidance-h">💡 Your Personalised Journey Insights</div>

                    <div class="ttt-guidance-h" style="font-size: 1.1rem; margin-top: 16px;">🌟 About Your Stage</div>
                    <p class="ttt-guidance-p">${winner.stageInsight}</p>

                    ${winner.theme ? `<div class="ttt-guidance-h" style="font-size: 1.1rem; margin-top: 16px;">🗺️ Main Theme to Explore</div>
                    <p class="ttt-guidance-p" style="font-style: italic; font-size: 1.1rem; color: var(--primary);">${winner.theme}</p>` : ''}

                    <div class="ttt-guidance-h" style="font-size: 1.1rem; margin-top: 16px;">🚀 Your Next Evolution</div>
                    <p class="ttt-guidance-p">${winner.evolution}</p>
                </div>

                <div class="ttt-section-card">
                    <div class="ttt-section-title">Your Complete Journey Profile</div>
                    <p style="text-align:center; color: var(--text-muted); margin-bottom: 24px; font-size: 0.875rem;">Your dominant type is ${primaryResult.percentage}%. See how you align with all four traveller types.</p>
                    ${profileCardsHTML}
                </div>

                <div class="ttt-cta-box">
                    <div class="ttt-cta-eyebrow">📍 Next Step: Watch Our FREE Masterclass</div>
                    <div class="ttt-cta-title">Learn more about your travel stage—see the full roadmap and how to apply it before your next trip.</div>
                    <p class="ttt-cta-sub">
                        In this free training, you'll discover:
                    </p>
                    <ul class="ttt-cta-list">
                        <li>✅ The 4-step system for making travel sustainable (not just an occasional escape)</li>
                        <li>✅ The mistakes keeping most people stuck between &ldquo;travel life&rdquo; and &ldquo;real life&rdquo; (and how to break through this)</li>
                        <li>✅ The inner mindset AND outer mastery you need to thrive anywhere (the skills we never learned in school)</li>
                        <li>✅ How to realise your next level of global potential from exactly where you are</li>
                    </ul>
                    <button class="ttt-btn" onclick="window.open(TTT_CONFIG && TTT_CONFIG.masterclassUrl ? TTT_CONFIG.masterclassUrl : '#', '_blank')">Watch FREE Masterclass Now &#8594;</button>
                </div>

                <div class="ttt-completed-section">
                    <div class="ttt-completed-label">Journey completed by:</div>
                    <div class="ttt-completed-name">${state.user.name}</div>
                    <div class="ttt-completed-info">
                        ${state.user.email ? `<span>&#128231; ${state.user.email}</span>` : ''}
                        ${state.user.phone ? `<span>&#128241; ${state.user.phone}</span>` : ''}
                    </div>
                    <div class="ttt-completed-date">Completed on: ${completedDate}</div>
                </div>

                <div style="display: flex; justify-content: center; margin-top: var(--sp-xl);">
                    <button class="ttt-btn ttt-btn-secondary" style="max-width: 300px;" onclick="window.tttRetakeQuiz()">Retake the Quiz</button>
                </div>
            `;

            // Animate progress bars
            results.forEach((res, index) => {
                const card = document.querySelector(`[data-card-id="${res.id}"]`);
                if (card) {
                    const fill = card.querySelector('.ttt-profile-bar-fill');
                    setTimeout(() => { fill.style.width = res.percentage + '%'; }, 100 + index * 150);
                }
            });

            showView('ttt-view-results');
        }, 3000);
    }

    // Initialization
    function initWelcomeScreen() {
        document.getElementById('ttt-name').value = state.user.name || "";
        document.getElementById('ttt-email').value = state.user.email || "";
        document.getElementById('ttt-phone').value = state.user.phone || "";

        document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        document.querySelectorAll('.ttt-error-msg').forEach(el => el.style.display = 'none');
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runInitialization);
        } else {
            runInitialization();
        }
    }

    function runInitialization() {
        renderShell();
        loadState();
        initWelcomeScreen();
        attachListeners();
    }

    // Run
    init();

})();
