const logsDiv = document.getElementById('logs');

function appendLogMessage(type, ...messages) {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    const messageText = messages.map(msg => 
        typeof msg === 'object' ? JSON.stringify(msg, null, 2) : String(msg)
    ).join(' ');

    logEntry.innerHTML = `[${timestamp}] ${messageText}`;
    logsDiv.appendChild(logEntry);
    logsDiv.scrollTop = logsDiv.scrollHeight;

    // Also log to console for debugging
    console[type](...messages);
}

export const logger = {
    info: (...messages) => appendLogMessage('info', ...messages),
    error: (...messages) => appendLogMessage('error', ...messages)
};
