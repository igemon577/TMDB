"use strict";

(function () {
  'use strict';

  function startPlugin() {
    console.log('[AdSkip] Плагин пропуска рекламы запущен');

    // Перехватываем Player.play()  
    if (Lampa.Player && Lampa.Player.play) {
      var originalPlay = Lampa.Player.play;
      Lampa.Player.play = function (data) {
        // Добавляем флаги для пропуска рекламы  
        if (data && !data.torrent_hash && !data.youtube && !data.iptv) {
          // Выбираем один из флагов (torrent_hash самый надежный)  
          data.torrent_hash = 'ad_skip_' + Date.now();
          console.log('[AdSkip] ✓ Флаг torrent_hash добавлен:', data.torrent_hash);
        }
        return originalPlay.call(this, data);
      };
      console.log('[AdSkip] ✓ Player.play() перехвачен');
    }
  }
  if (window.Lampa) {
    startPlugin();
  } else {
    window.addEventListener('lampa-ready', startPlugin);
    window.addEventListener('lampa:ready', startPlugin);
  }
})();
