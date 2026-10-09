
/*  — Lampa VAST preroll bypass, preserving player metadata.
 * Tested against the Lampa source structure at yumata/lampa-source (2026-10-09).
 * Does not claim to suppress all native in-player banners.
 */
(function () {
    'use strict';

    var FLAG = '__arx_adskip_v3__';
    var attempts = 0;
    var MAX_ATTEMPTS = 120;
    var INTERVAL = 250;

    if (window[FLAG]) return;

    function install() {
        var L = window.Lampa;
        if (!L || !L.Player || !L.Player.listener ||
            typeof L.Player.listener.send !== 'function') return false;

        if (window[FLAG]) return true;

        var listener = L.Player.listener;
        var originalSend = listener.send;
        var pendingRestore = null;
        var total = 0;

        function restorePending() {
            if (pendingRestore) {
                var restore = pendingRestore;
                pendingRestore = null;
                restore();
            }
        }

        function armIptvForPreroll(data) {
            // Actual IPTV should retain its own value and mode.
            if (data.iptv) return;

            var oldDescriptor = Object.getOwnPropertyDescriptor(data, 'iptv');
            if (oldDescriptor && !oldDescriptor.configurable) return;

            var reads = 0;
            var active = true;
            var restore = function () {
                if (!active) return;
                active = false;
                try {
                    if (oldDescriptor) {
                        Object.defineProperty(data, 'iptv', oldDescriptor);
                    } else {
                        delete data.iptv;
                    }
                } catch (e) {
                    console.warn('[ARX AdSkip] Failed to restore IPTV flag:', e);
                }
            };

            try {
                Object.defineProperty(data, 'iptv', {
                    configurable: true,
                    enumerable: oldDescriptor ? oldDescriptor.enumerable : true,
                    get: function () {
                        // Current IMA.getMediaType() reads iptv twice:
                        // once for `iptv`, once while building `any`.
                        // Release the override on the second read, before
                        // Android.openPlayer(data.url, data) receives data.
                        reads++;
                        if (reads >= 2) {
                            restore();
                            if (pendingRestore === restore) pendingRestore = null;
                        }
                        return true;
                    },
                    set: function (value) {
                        restore();
                        if (pendingRestore === restore) pendingRestore = null;
                        data.iptv = value;
                    }
                });
                pendingRestore = restore;
            } catch (e) {
                console.warn('[ARX AdSkip] IPTV flag cannot be wrapped:', e);
            }
        }

        listener.send = function (type, event) {
            if (type === 'create' || type === 'start' ||
                type === 'external' || type === 'destroy') {
                restorePending();
            }

            var result = originalSend.apply(this, arguments);

            if (type === 'create' && event && event.data &&
                typeof event.data === 'object') {
                var data = event.data;

                // These VAST fields are supplied by some online plugins.
                delete data.vast_url;
                delete data.vast_msg;
                delete data.vast_banner;

                armIptvForPreroll(data);
                total++;
                console.log('[ARX AdSkip] Video prepared:', total);
            }

            return result;
        };

        window[FLAG] = {
            version: '3.0.0',
            status: function () {
                return {
                    installed: true,
                    launches: total,
                    pending: !!pendingRestore
                };
            }
        };

        console.log('[ARX AdSkip] 3.0 installed — VAST preroll interception');
        return true;
    }

    if (install()) return;

    var timer = setInterval(function () {
        attempts++;
        if (install() || attempts >= MAX_ATTEMPTS) {
            clearInterval(timer);
            if (attempts >= MAX_ATTEMPTS && !window[FLAG]) {
                console.warn('[ARX AdSkip] Lampa.Player.listener unavailable');
            }
        }
    }, INTERVAL);
})();
