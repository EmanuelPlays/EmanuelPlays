// System Information.js
// Nerd stuff for the 404 page

(function() {
    'use strict';
    
    // Get system info
    function getSystemInfo() {
        const info = {
            // Browser Info
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language || navigator.userLanguage,
            languages: navigator.languages ? navigator.languages.join(', ') : '',
            cookieEnabled: navigator.cookieEnabled,
            hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
            deviceMemory: navigator.deviceMemory || 'Unknown',
            
            // Screen Info
            screenWidth: screen.width,
            screenHeight: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth,
            
            // Window Info
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            
            // Connection Info
            onLine: navigator.onLine,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            } : null,
            
            // Platform Info
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            appCodeName: navigator.appCodeName,
            
            // Timestamp
            timestamp: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            
            // Referrer
            referrer: document.referrer || 'Direct',
            
            // History length
            historyLength: history.length
        };
        
        return info;
    }
    
    // Try to get IP address (uses external API - limited info available)
    async function getIPInfo() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return {
                ip: data.ip,
                source: 'ipify.org'
            };
        } catch (e) {
            return {
                ip: 'Unable to fetch',
                source: e.message
            };
        }
    }
    
    // Get browser fingerprint
    function getBrowserFingerprint() {
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            !!navigator.cookieEnabled,
            !!navigator.doNotTrack,
            navigator.hardwareConcurrency,
            navigator.deviceMemory
        ];
        
        // Simple hash
        let hash = 0;
        components.forEach(str => {
            str = String(str);
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
        });
        
        return Math.abs(hash).toString(16).toUpperCase();
    }
    
    // Format bytes to human readable
    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Get memory info if available
    function getMemoryInfo() {
        if (navigator.deviceMemory) {
            return navigator.deviceMemory + ' GB';
        }
        return 'Not available';
    }
    
    // Get CPU cores
    function getCPUCores() {
        return navigator.hardwareConcurrency || 'Not available';
    }
    
    // Export functions
    window.SystemInfo = {
        getSystemInfo,
        getIPInfo,
        getBrowserFingerprint,
        formatBytes,
        getMemoryInfo,
        getCPUCores
    };
})();
