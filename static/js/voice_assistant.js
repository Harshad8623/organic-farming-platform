/**
 * voice_assistant.js
 * ------------------
 * Floating voice assistant for धरती रक्षक platform.
 * Uses Web Speech API for recognition and text-to-speech feedback.
 * Supports English and Hindi commands.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Setup
  // -------------------------------------------------------------------------
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Voice Assistant: SpeechRecognition not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-IN'; // Indian English, also picks up Hindi words

  let isListening = false;

  // -------------------------------------------------------------------------
  // Text-to-Speech Helper
  // -------------------------------------------------------------------------
  function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }

  // -------------------------------------------------------------------------
  // Command Handlers
  // -------------------------------------------------------------------------
  const COMMANDS = [
    {
      patterns: ['open marketplace', 'marketplace', 'go to market', 'dukaan', 'bazaar'],
      action: () => { speak('Opening Marketplace'); navigate('/marketplace/'); }
    },
    {
      patterns: ['open cart', 'my cart', 'cart', 'tokri', 'shopping cart'],
      action: () => { speak('Opening your cart'); navigate('/cart/'); }
    },
    {
      patterns: ['open roadmap', 'crop roadmap', 'roadmap', 'fasal', 'farming guide', 'guide'],
      action: () => { speak('Opening Crop Roadmaps'); navigate('/roadmap/'); }
    },
    {
      patterns: ['open chatbot', 'chatbot', 'chat', 'ai help', 'talk to ai'],
      action: () => { speak('Opening AI Chatbot'); navigate('/chatbot/'); }
    },
    {
      patterns: ['my orders', 'orders', 'order status', 'mera order'],
      action: () => { speak('Opening your orders'); navigate('/orders/my'); }
    },
    {
      patterns: ['farmer orders', 'incoming orders'],
      action: () => { speak('Opening farmer orders'); navigate('/orders/farmer'); }
    },
    {
      patterns: ['go home', 'home', 'ghar', 'main page', 'homepage'],
      action: () => { speak('Going home'); navigate('/'); }
    },
    {
      patterns: ['weather', 'mausam', 'open weather'],
      action: () => { speak('Opening weather advisory'); navigate('/weather/'); }
    },
    {
      patterns: ['analytics', 'dashboard', 'stats'],
      action: () => { speak('Opening analytics dashboard'); navigate('/analytics/'); }
    },
    {
      patterns: ['disease detect', 'plant disease', 'bimari'],
      action: () => { speak('Opening disease detection'); navigate('/disease/'); }
    },
    {
      patterns: ['crop recommendation', 'crop ai', 'recommend crop', 'fasal batao'],
      action: () => { speak('Opening Crop AI recommendation'); navigate('/crop/'); }
    },
    {
      patterns: ['help', 'commands', 'kya bol sakta hun'],
      action: showHelp
    },
  ];

  // -------------------------------------------------------------------------
  // Navigate Helper
  // -------------------------------------------------------------------------
  function navigate(path) {
    setTimeout(() => { window.location.href = path; }, 600);
  }

  // -------------------------------------------------------------------------
  // Search Handler
  // -------------------------------------------------------------------------
  function handleSearch(transcript) {
    const searchMatch = transcript.match(/^search\s+(.+)$/i)
      || transcript.match(/^dhundo\s+(.+)$/i)
      || transcript.match(/^search for\s+(.+)$/i)
      || transcript.match(/^find\s+(.+)$/i);

    if (searchMatch) {
      const query = searchMatch[1].trim();
      speak(`Searching for ${query}`);
      setTimeout(() => {
        window.location.href = `/marketplace/?search=${encodeURIComponent(query)}`;
      }, 600);
      return true;
    }
    return false;
  }

  // -------------------------------------------------------------------------
  // Show Help
  // -------------------------------------------------------------------------
  function showHelp() {
    const helpText = [
      'Available commands:',
      'Open Marketplace, Open Cart, Open Roadmap,',
      'Open Chatbot, My Orders, Go Home,',
      'Weather, Analytics, Crop AI,',
      'Search followed by product name,',
      'and Help for this list.'
    ].join(' ');
    speak(helpText);
    showToast('🎤 Commands: "open marketplace", "open cart", "search tomato", "my orders", "help"...', 6000);
  }

  // -------------------------------------------------------------------------
  // Process Transcript
  // -------------------------------------------------------------------------
  function processTranscript(transcript) {
    transcript = transcript.toLowerCase().trim();
    console.log('[Voice]', transcript);

    updateStatus('Processing: "' + transcript + '"');

    // Try search command first
    if (handleSearch(transcript)) return;

    // Match against known commands
    for (const cmd of COMMANDS) {
      if (cmd.patterns.some(p => transcript.includes(p))) {
        cmd.action();
        return;
      }
    }

    // No match
    speak('Sorry, I did not understand. Say "help" to hear available commands.');
    showToast('❓ Command not recognized. Say "help" for a list.', 3000);
    updateStatus('Not recognized');
  }

  // -------------------------------------------------------------------------
  // Toast Notification
  // -------------------------------------------------------------------------
  function showToast(message, duration = 3000) {
    const existing = document.getElementById('va-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'va-toast';
    toast.innerHTML = message;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '100px',
      right: '24px',
      background: 'rgba(30,40,30,0.95)',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      zIndex: '9999',
      maxWidth: '320px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      border: '1px solid rgba(46,213,115,0.3)',
      backdropFilter: 'blur(10px)',
      transition: 'opacity 0.3s ease',
      opacity: '0'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 50);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // -------------------------------------------------------------------------
  // Update Mic Button Status
  // -------------------------------------------------------------------------
  function updateStatus(msg) {
    const label = document.getElementById('va-label');
    if (label) label.textContent = msg;
  }

  // -------------------------------------------------------------------------
  // Recognition Events
  // -------------------------------------------------------------------------
  recognition.onstart = () => {
    isListening = true;
    updateStatus('Listening...');
    setMicActive(true);
    showToast('🎤 Listening... Speak your command', 5000);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    processTranscript(transcript);
  };

  recognition.onerror = (event) => {
    isListening = false;
    setMicActive(false);
    updateStatus('Tap to speak');
    if (event.error === 'no-speech') {
      showToast('🔇 No speech detected. Try again!', 2000);
    } else if (event.error === 'not-allowed') {
      showToast('🚫 Microphone access denied. Please allow mic in browser settings.', 4000);
    } else {
      showToast('⚠️ Voice error: ' + event.error, 3000);
    }
  };

  recognition.onend = () => {
    isListening = false;
    setMicActive(false);
    setTimeout(() => updateStatus('Tap to speak'), 1500);
  };

  // -------------------------------------------------------------------------
  // Mic Button Active State
  // -------------------------------------------------------------------------
  function setMicActive(active) {
    const btn = document.getElementById('va-mic-btn');
    if (!btn) return;
    if (active) {
      btn.classList.add('va-listening');
    } else {
      btn.classList.remove('va-listening');
    }
  }

  // -------------------------------------------------------------------------
  // Toggle Listening
  // -------------------------------------------------------------------------
  function toggleListening() {
    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (e) {
        showToast('⚠️ Could not start microphone: ' + e.message, 3000);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Create Floating Button UI
  // -------------------------------------------------------------------------
  function createUI() {
    const style = document.createElement('style');
    style.textContent = `
      #va-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9998;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        font-family: 'Segoe UI', sans-serif;
      }
      #va-label {
        background: rgba(20,30,20,0.9);
        color: #a8e6a3;
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 20px;
        border: 1px solid rgba(46,213,115,0.3);
        white-space: nowrap;
        backdrop-filter: blur(8px);
        transition: opacity 0.3s;
      }
      #va-mic-btn {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        background: linear-gradient(135deg, #2ed573, #1e8449);
        color: white;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(46,213,115,0.4);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
      }
      #va-mic-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 28px rgba(46,213,115,0.6);
      }
      #va-mic-btn.va-listening {
        background: linear-gradient(135deg, #ff4757, #c0392b);
        box-shadow: 0 0 0 0 rgba(255,71,87,0.6);
        animation: va-pulse 1.2s infinite;
      }
      @keyframes va-pulse {
        0%   { box-shadow: 0 0 0 0 rgba(255,71,87,0.6); }
        70%  { box-shadow: 0 0 0 18px rgba(255,71,87,0); }
        100% { box-shadow: 0 0 0 0 rgba(255,71,87,0); }
      }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'va-container';

    const label = document.createElement('div');
    label.id = 'va-label';
    label.textContent = 'Tap to speak';

    const btn = document.createElement('button');
    btn.id = 'va-mic-btn';
    btn.setAttribute('aria-label', 'Voice Assistant — tap to speak');
    btn.setAttribute('title', 'Voice Assistant');
    btn.innerHTML = '🎤';
    btn.addEventListener('click', toggleListening);

    container.appendChild(label);
    container.appendChild(btn);
    document.body.appendChild(container);
  }

  // -------------------------------------------------------------------------
  // Init on DOM ready
  // -------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createUI);
  } else {
    createUI();
  }

})();
