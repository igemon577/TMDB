"use strict";  
  
(function () {  
  'use strict';  
  
  function startPlugin() {  
    console.log('[AdSkip] Плагин пропуска рекламы запущен');  
  
    if (Lampa.Player && Lampa.Player.play) {  
      var originalPlay = Lampa.Player.play;  
      Lampa.Player.play = function (data) {  
        // Используем правильный флаг для пропуска рекламы  
        if (data && !data.continue_play) {  
          data.continue_play = true;  
          console.log('[AdSkip] ✓ Флаг continue_play добавлен');  
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
