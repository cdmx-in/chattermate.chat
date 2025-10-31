// @ts-nocheck
// TypeScript declarations for global variables
/** @type {string} */
window.chattermateId;
/** @type {{ init: (options: { baseUrl?: string, id: string }) => void }} */
window.ChatterMate;

;(function () {
  // Function to validate hex color code
  function isValidHexColor(color) {
    return /^#[0-9A-F]{6}$/i.test(color);
  }

  // Get base URL - injected at build time or fallback to config
  function getBaseUrl() {
    // Use build-time injected API URL if available
    if (typeof __CHATTERMATE_API_URL__ !== 'undefined') {
      return __CHATTERMATE_API_URL__;
    }
    
    // Fallback: Check if window.APP_CONFIG exists (from config.js)
    if (typeof window !== 'undefined' && window.APP_CONFIG) {
      return window.APP_CONFIG.API_URL;
    }
    
    // Final fallback
    return 'http://localhost:8000';
  }

  // Configuration object
  const config = {
    baseUrl: getBaseUrl(),
    containerId: 'chattermate-container',
    buttonId: 'chattermate-button',
    chatBubbleColor: '#f34611', // Default color
    loadingContainerId: 'chattermate-loading',
    tokenKey: 'ctid', // Key for localStorage
    containerBottom: 100, // Default bottom position
    containerRight: 20, // Default right position
    containerWidth: 400, // Default width
    chatInitiationMessages: [], // Will be populated from widget data
    initiationMessageId: 'chattermate-initiation',
    initiationShownKey: 'ctim_shown', // Key for tracking if initiation was shown
  }

  // Create and inject styles
  function updateStyles() {
    const style = document.createElement('style')
    style.id = 'chattermate-styles'
    style.textContent = `
      #${config.buttonId} {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background: ${config.chatBubbleColor};
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        z-index: 999999;
        transition: transform 0.3s ease;
      }

      #${config.buttonId}:hover {
        transform: scale(1.1);
      }

      #${config.buttonId}.loading {
        position: relative;
      }

      #${config.buttonId}.loading:after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin: -8px 0 0 -8px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: chattermate-spin 0.6s linear infinite;
      }

      #${config.buttonId}.active .chat-icon {
        display: none;
      }

      #${config.buttonId}.active .close-icon {
        display: block !important;
      }

      @keyframes chattermate-spin {
        to {transform: rotate(360deg);}
      }

      /* Subtle idle bounce for the chat button when closed */
      @keyframes chattermate-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }

      #${config.containerId} {
        position: fixed;
        bottom: ${config.containerBottom || 100}px;
        right: ${config.containerRight || 20}px;
        width: ${config.containerWidth || 400}px;
        height: 600px;
        background: transparent;
        z-index: 999999;
        overflow: hidden;
        /* Animated open/close with slide + fade */
        opacity: 0;
        visibility: hidden;
        transform: translateY(16px) scale(0.98);
        transition: opacity 360ms cubic-bezier(0.22, 1, 0.36, 1), transform 360ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 360ms;
        border: none;
        padding: 0;
        margin: 0;
        pointer-events: none;
      }

      #${config.containerId}.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
        transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        pointer-events: auto;
      }

      /* Clean border around the widget container */
      #${config.containerId}::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 24px;
        pointer-events: none;
        border: 1px solid #e5e7eb;
      }

        .chattermate-iframe {
                width: 100%;
        height: 100%;
        border: none;
        padding: 0;
        margin: 0;
        display: block;
        border-radius: 24px;
        /* Rely on corner shadows from container */
        box-shadow: none;
      }

      #chattermate-mobile-close {
        display: none;
        position: fixed;
        top: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        background: transparent;
        border: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000000;
        transition: all 0.3s ease;
      }

      #chattermate-mobile-topbar {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 999999;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
      }

      #chattermate-mobile-topbar.active {
        display: flex;
      }

      #chattermate-mobile-topbar .topbar-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 0;
      }

      #chattermate-mobile-close.active {
        display: flex;
      }

      @media (max-width: 768px) {
        #${config.containerId} {
          width: 100vw !important;
          height: 100vh !important;
          height: 100dvh !important; /* Dynamic viewport height for mobile browsers */
          top: 0 !important;
          left: 0 !important;
          bottom: 0 !important;
          right: 0 !important;
          border-radius: 0 !important;
          position: fixed !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        #${config.containerId}.active {
          bottom: 0 !important;
        }

        .chattermate-iframe {
          border-radius: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          height: 100dvh !important; /* Dynamic viewport height for mobile browsers */
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        #${config.buttonId} {
          display: none;
        }

        #${config.buttonId}.mobile-closed {
          display: block !important;
        }

        #chattermate-mobile-close.active {
          display: flex !important;
        }

        #chattermate-mobile-close:hover {
          opacity: 0.7;
        }

        /* ASK_ANYTHING style specific mobile topbar */
        .ask-anything-mobile #chattermate-mobile-topbar.active {
          display: flex !important;
        }

        .ask-anything-mobile #chattermate-mobile-close.active {
          top: 15px !important;
          right: 15px !important;
          z-index: 1000001 !important;
        }

        /* When topbar is visible, push iframe down to avoid overlap */
        .ask-anything-mobile .chattermate-iframe {
          top: 60px !important;
          height: calc(100vh - 60px) !important;
          height: calc(100dvh - 60px) !important;
        }
      }

      @media (min-width: 769px) {
        #chattermate-mobile-close {
          display: none !important;
        }
      }

      /* Chat Initiation Message Styles */
      #${config.initiationMessageId} {
        position: fixed;
        bottom: 95px;
        right: 20px;
        max-width: 240px;
        background: white;
        padding: 12px 36px 12px 14px;
        border-radius: 14px;
        box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
        z-index: 999998;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }

      #${config.initiationMessageId}.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
        animation: chattermate-bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes chattermate-bounce-in {
        0% {
          opacity: 0;
          transform: translateY(20px) scale(0.8);
        }
        50% {
          transform: translateY(-5px) scale(1.02);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      #${config.initiationMessageId}:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.14);
      }

      #${config.initiationMessageId}::after {
        content: '';
        position: absolute;
        bottom: -7px;
        right: 30px;
        width: 14px;
        height: 14px;
        background: white;
        transform: rotate(45deg);
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.06);
        clip-path: polygon(0 0, 100% 0, 100% 100%);
      }

      .initiation-message-text {
        font-size: 13px;
        line-height: 1.4;
        color: #374151;
        margin: 0;
        position: relative;
        z-index: 1;
        padding-right: 4px;
        min-height: 18px;
      }

      .initiation-message-text::after {
        content: '|';
        animation: blink 1s step-end infinite;
        margin-left: 2px;
        color: ${config.chatBubbleColor};
        font-weight: 500;
      }

      .initiation-message-text.typing-complete::after {
        display: none;
      }

      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }

      .initiation-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        background: rgba(0, 0, 0, 0.04);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        opacity: 0.5;
        transition: all 0.2s ease;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .initiation-close:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.08);
        transform: scale(1.05);
      }

      .initiation-close::before,
      .initiation-close::after {
        content: '';
        position: absolute;
        width: 9px;
        height: 1.5px;
        background: #4a5568;
        border-radius: 1px;
      }

      .initiation-close::before {
        transform: rotate(45deg);
      }

      .initiation-close::after {
        transform: rotate(-45deg);
      }

      @media (max-width: 768px) {
        #${config.initiationMessageId} {
          display: none !important;
        }
      }
    `
    // Remove existing style if it exists
    const existingStyle = document.getElementById('chattermate-styles')
    if (existingStyle) {
      existingStyle.remove()
    }
    document.head.appendChild(style)
  }

  // Get stored token
  function getStoredToken() {
    return localStorage.getItem(config.tokenKey);
  }

  // Save token
  function saveToken(token) {
    if (token) {
      localStorage.setItem(config.tokenKey, token);
    }
  }

  // Remove token
  function removeToken() {
    localStorage.removeItem(config.tokenKey);
  }

  // Check if device is mobile
  function isMobileDevice() {
    return window.innerWidth <= 768;
  }

  // Sanitize message to remove corrupted emoji characters
  function sanitizeMessage(message) {
    if (!message) return '';
    // Remove replacement characters and other common corruption patterns
    return message
      .replace(/\uFFFD/g, '') // Remove replacement character
      .replace(/[��]/g, '') // Remove common corruption symbols
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .trim();
  }

  // Get a random message from the array
  function getRandomInitiationMessage() {
    if (!config.chatInitiationMessages || config.chatInitiationMessages.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * config.chatInitiationMessages.length);
    const message = config.chatInitiationMessages[randomIndex];
    return message ? sanitizeMessage(message) : null;
  }

  // Check if initiation message should be shown (first visit in session)
  function shouldShowInitiation() {
    // Only show on desktop
    if (isMobileDevice()) return false;
    
    // Check if we have messages to show
    if (!config.chatInitiationMessages || config.chatInitiationMessages.length === 0) {
      return false;
    }
    
    // Check session storage to see if already shown in this session
    return !sessionStorage.getItem(config.initiationShownKey);
  }

  // Mark initiation as shown
  function markInitiationShown() {
    sessionStorage.setItem(config.initiationShownKey, 'true');
  }

  // Create initiation message element
  function createInitiationMessage() {
    const message = getRandomInitiationMessage();
    if (!message) return null;

    const initiationDiv = document.createElement('div');
    initiationDiv.id = config.initiationMessageId;
    initiationDiv.innerHTML = `
      <button class="initiation-close" aria-label="Close"></button>
      <p class="initiation-message-text"></p>
    `;

    // Store the full message for typewriting effect
    initiationDiv.dataset.fullMessage = message;

    return initiationDiv;
  }

  // Typewriting effect for initiation message
  function typeWriteMessage(element, text, speed = 50) {
    const textElement = element.querySelector('.initiation-message-text');
    if (!textElement) return;

    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
        // Remove cursor after typing is complete
        textElement.classList.add('typing-complete');
        element.typeInterval = null;
      }
    }, speed);

    // Store interval ID to clear it if needed
    element.typeInterval = typeInterval;
  }

  // Show initiation message with animation
  function showInitiationMessage(initiationDiv, toggleChatFn) {
    if (!initiationDiv || !shouldShowInitiation()) return;

    document.body.appendChild(initiationDiv);

    // Show after a short delay for better UX
    setTimeout(() => {
      initiationDiv.classList.add('show');
      
      // Start typewriting effect after bubble appears
      setTimeout(() => {
        const fullMessage = initiationDiv.dataset.fullMessage;
        if (fullMessage) {
          typeWriteMessage(initiationDiv, fullMessage, 40);
        }
      }, 300);
    }, 1500);

    // Click on message opens chat
    initiationDiv.addEventListener('click', (e) => {
      if (!e.target.classList.contains('initiation-close')) {
        // Clear typewriting interval if still running
        if (initiationDiv.typeInterval) {
          clearInterval(initiationDiv.typeInterval);
        }
        hideInitiationMessage(initiationDiv);
        toggleChatFn();
        markInitiationShown();
      }
    });

    // Close button hides message
    const closeBtn = initiationDiv.querySelector('.initiation-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Clear typewriting interval if still running
        if (initiationDiv.typeInterval) {
          clearInterval(initiationDiv.typeInterval);
        }
        hideInitiationMessage(initiationDiv);
        markInitiationShown();
      });
    }
  }

  // Hide initiation message
  function hideInitiationMessage(initiationDiv) {
    if (!initiationDiv) return;
    
    initiationDiv.classList.remove('show');
    setTimeout(() => {
      if (initiationDiv.parentNode) {
        initiationDiv.parentNode.removeChild(initiationDiv);
      }
    }, 400);
  }

  // Initialize function to create and append elements
  function initialize() {
    updateStyles()

    // Create chat button with icon
    const button = document.createElement('div')
    button.id = config.buttonId
    button.innerHTML = `
      <svg class="chat-icon" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z" fill="white"/>
        <path d="M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z" fill="${config.chatBubbleColor}"/>
      </svg>
      <svg class="close-icon" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <path d="M20 20L40 40M40 20L20 40" stroke="white" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `

    // Create chat container
    const container = document.createElement('div')
    container.id = config.containerId

    // Create mobile minimize button
    const mobileCloseButton = document.createElement('div')
    mobileCloseButton.id = 'chattermate-mobile-close'
    mobileCloseButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `

    // Create mobile topbar for ASK_ANYTHING style
    const mobileTopbar = document.createElement('div')
    mobileTopbar.id = 'chattermate-mobile-topbar'
    mobileTopbar.innerHTML = `
      <h3 class="topbar-title">Chat</h3>
      <div style="width: 44px;"></div>
    `

    // Add elements to document
    document.body.appendChild(button)
    document.body.appendChild(container)
    document.body.appendChild(mobileCloseButton)
    document.body.appendChild(mobileTopbar)

    let isOpen = false
    let iframe = null
    let isLoading = false
    let initiationMessageElement = null

    function toggleChat() {
      isOpen = !isOpen
      container.classList.toggle('active')
      button.classList.toggle('active')
      mobileCloseButton.classList.toggle('active')

      // Hide initiation message when chat is opened
      if (isOpen && initiationMessageElement) {
        hideInitiationMessage(initiationMessageElement);
        initiationMessageElement = null;
        markInitiationShown();
      }

      // Handle mobile button visibility
      if (isMobileDevice()) {
        if (isOpen) {
          // When opening on mobile, hide the button
          button.classList.remove('mobile-closed')
          // Stop bouncing when open
          button.style.animation = ''
        } else {
          // When closing on mobile, show the button
          button.classList.add('mobile-closed')
          // Add subtle idle bounce when closed
          button.style.animation = 'chattermate-bounce 2.2s ease-in-out infinite'
          // Hide topbar when closing
          mobileTopbar.classList.remove('active')
          document.body.classList.remove('ask-anything-mobile')
        }
      } else {
        // On desktop, ensure mobile close button is hidden when widget is open
        if (isOpen) {
          mobileCloseButton.classList.remove('active')
        }
      }

      if (isOpen && iframe) {
        iframe.contentWindow.postMessage({ type: 'SCROLL_TO_BOTTOM' }, '*')
      }
    }

    // Start prefetching the widget data
    async function prefetchWidget() {
      if (isLoading || iframe) return
      
      try {
        isLoading = true
        button.classList.add('loading')
        
        const token = getStoredToken();
        
        iframe = document.createElement('iframe')
        iframe.className = 'chattermate-iframe'
        
        // Fetch widget data with Authorization header if token exists
        const url = `${config.baseUrl}/widgets/${window.chattermateId}/data?widget_id=${window.chattermateId}`;
        const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
        
        fetch(url, options)
          .then(response => response.text())
          .then(html => {
            iframe.srcdoc = html;
            container.appendChild(iframe)
            button.classList.remove('loading')
            iframe.style.opacity = '1'
          })
          .catch(error => {
            console.error('Failed to load widget:', error)
            button.classList.remove('loading')
          });

        // Listen for token updates from iframe
        window.addEventListener('message', function(event) {
          if (event.data.type === 'TOKEN_UPDATE') {
            saveToken(event.data.token);
            // Confirm token storage to iframe
            iframe.contentWindow.postMessage({ 
              type: 'TOKEN_RECEIVED', 
              token: event.data.token 
            }, '*');
          }
        });

      } catch (error) {
        console.error('Failed to load widget:', error)
        button.classList.remove('loading')
      } finally {
        isLoading = false
      }
    }

    // Start prefetching immediately
    prefetchWidget()

    // Show initiation message after widget loads (with delay)
    setTimeout(() => {
      if (!isOpen && config.chatInitiationMessages.length > 0) {
        initiationMessageElement = createInitiationMessage();
        showInitiationMessage(initiationMessageElement, toggleChat);
      }
    }, 2000);

    // Don't auto-open on mobile devices - let user initiate
    // Mobile users will see the chat button and can tap to open

    // Add click event listeners
    button.addEventListener('click', toggleChat)
    mobileCloseButton.addEventListener('click', toggleChat)

    // Initialize mobile button visibility
    if (isMobileDevice() && !isOpen) {
      button.classList.add('mobile-closed')
      // Idle bounce animation when initially closed
      button.style.animation = 'chattermate-bounce 2.2s ease-in-out infinite'
    }

    // Handle window resize to update mobile behavior
    window.addEventListener('resize', function() {
      const isMobile = isMobileDevice()
      
      if (isMobile && !isOpen) {
        // On mobile when closed, show the button
        button.classList.add('mobile-closed')
        button.style.animation = 'chattermate-bounce 2.2s ease-in-out infinite'
        // Ensure mobile close button is hidden when widget is closed
        mobileCloseButton.classList.remove('active')
      } else if (!isMobile) {
        // On desktop, remove mobile-specific classes
        button.classList.remove('mobile-closed')
        button.style.animation = ''
        // Ensure mobile close button is hidden on desktop
        if (isOpen) {
          mobileCloseButton.classList.remove('active')
        }
      }
      
      // Update styles to handle viewport changes
      updateStyles()
    })
  }

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize)
  } else {
    initialize()
  }

  // Add message listener for customization updates
  window.addEventListener('message', function (event) {
    if (event.data.type === 'CUSTOMIZATION_UPDATE') {
      const customData = event.data.data;
      const newColor = customData.chat_bubble_color;
      config.chatBubbleColor = isValidHexColor(newColor) ? newColor : config.chatBubbleColor;
      
      // Store chat initiation messages
      if (customData.chat_initiation_messages && Array.isArray(customData.chat_initiation_messages)) {
        config.chatInitiationMessages = customData.chat_initiation_messages;
      }
      
      // Handle ASK_ANYTHING chat style positioning (desktop only)
      if (!isMobileDevice()) {
        if (customData.chat_style === 'ASK_ANYTHING') {
          // Use same width as other chat styles for consistency
          config.containerBottom = 90;
          config.containerRight = 20;
          config.containerWidth = 400;
        } else {
          // Reset to default values for other styles
          config.containerBottom = 100;
          config.containerRight = 20;
          config.containerWidth = 400;
        }
      } else {
        // Handle mobile ASK_ANYTHING style
        if (customData.chat_style === 'ASK_ANYTHING' && isOpen) {
          document.body.classList.add('ask-anything-mobile')
          mobileTopbar.classList.add('active')
        } else {
          document.body.classList.remove('ask-anything-mobile')
          mobileTopbar.classList.remove('active')
        }
      }
      // Mobile positioning is handled by CSS media queries and should not be affected
      
      updateStyles()
      // Update the SVG fill color for the chat icon
      const chatIconPath = document.querySelector(`#${config.buttonId} .chat-icon path:last-child`)
      if (chatIconPath) {
        chatIconPath.setAttribute('fill', config.chatBubbleColor)
      }
    }
  })

  // Expose global configuration function
  window.ChatterMate = {
    init: function (options) {
      if (options.baseUrl) {
        config.baseUrl = options.baseUrl
      }
      window.chattermateId = options.id
    },
  }
})()
