document.addEventListener('DOMContentLoaded', () => {
    const unlockSlider = document.getElementById('unlockSlider');
    const lockScreen = document.getElementById('lockScreen');
    const appDrawer = document.getElementById('appDrawer');
    const messengerApp = document.getElementById('messengerApp');
    const contactsApp = document.getElementById('contactsApp');
    const weatherApp = document.getElementById('weatherApp');
    const calculatorApp = document.getElementById('calculatorApp');
    const chatScreen = document.getElementById('chatScreen');
    
    // Slide-to-unlock action
    unlockSlider.addEventListener('click', () => {
        lockScreen.style.display = 'none';
        appDrawer.style.display = 'flex';
    });
    
    // Launch Messenger Chat Screen when Messenger app is clicked
   messengerApp.addEventListener('click', () => {
        if (chatScreen.style.display === 'flex') {
            // Shake the chat screen if it's already open
            chatScreen.classList.add('shake');
            setTimeout(() => {
                chatScreen.classList.remove('shake');
            }, 500);
        } else {
            appDrawer.style.display = 'none';
            chatScreen.style.display = 'flex';
        }
    });
     const showFeedback = () => {
        // Replace alert with any UI feedback mechanism if needed
        alert("Only Messenger is allowed. Please press the Messenger app.");
    };

    // For non-Messenger apps: if chat screen is open, shake it

    const shakeApp = () => {
        if (chatScreen.style.display === 'flex') {
            phone.classList.add('shake');
            setTimeout(() => {
                phone.classList.remove('shake');
            }, 500);
        }
    };

    contactsApp.addEventListener('click', showFeedback);
    weatherApp.addEventListener('click', showFeedback);
    calculatorApp.addEventListener('click', showFeedback);
    
    
    // Variables for swipe detection
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let translateX = 0;
    let isSliding = null; // null: not determined yet, true: horizontal swipe, false: vertical swipe
    const threshold = 100; // pixels required to trigger slide-out

    // Touch events for mobile with vertical scroll support
    chatScreen.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSliding = null; // Reset decision
        chatScreen.style.transition = 'none';
    });

    chatScreen.addEventListener('touchmove', (e) => {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        // Determine swipe direction if not yet decided
        if (isSliding === null) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                isSliding = true;  // Horizontal swipe detected
            } else {
                isSliding = false; // Vertical scroll detected
            }
        }
        if (isSliding) {
            // Prevent vertical scrolling when swiping horizontally
            e.preventDefault();
            translateX = deltaX;
            if (translateX > 0) {
                chatScreen.style.transform = `translateX(${translateX}px)`;
            }
        }
    });

    chatScreen.addEventListener('touchend', (e) => {
        // Only process sliding if horizontal swipe was detected
        if (isSliding) {
            chatScreen.style.transition = 'transform 0.3s ease';
            if (translateX > threshold) {
                chatScreen.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    chatScreen.style.display = 'flex';
                    appDrawer.style.display = 'flex';
                    chatScreen.style.transform = 'translateX(0)';
                }, 300);
            } else {
                chatScreen.style.transform = 'translateX(0)';
            }
        }
        // Reset for next gesture
        isSliding = null;
        translateX = 0;
    });
    
    // Optional: allow mouse dragging for desktops (existing code)
    chatScreen.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isSliding = true;
        chatScreen.style.transition = 'none';
    });
    
    chatScreen.addEventListener('mousemove', (e) => {
        if (!isSliding) return;
        currentX = e.clientX;
        translateX = currentX - startX;
        if (translateX > 0) {
            chatScreen.style.transform = `translateX(${translateX}px)`;
        }
    });
    
    chatScreen.addEventListener('mouseup', (e) => {
        if (!isSliding) return;
        isSliding = false;
        chatScreen.style.transition = 'transform 0.3s ease';
        if (translateX > threshold) {
            chatScreen.style.transform = 'translateX(100%)';
            setTimeout(() => {
                chatScreen.style.display = 'flex';
                appDrawer.style.display = 'flex';
                chatScreen.style.transform = 'translateX(0)';
            }, 300);
        } else {
            chatScreen.style.transform = 'translateX(0)';
        }
    });
    
    chatScreen.addEventListener('mouseleave', (e) => {
        if (!isSliding) return;
        isSliding = false;
        chatScreen.style.transition = 'transform 0.3s ease';
        chatScreen.style.transform = 'translateX(0)';
    });
});