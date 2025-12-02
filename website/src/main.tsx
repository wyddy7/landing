import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Динамическая загрузка Яндекс Метрики (скрыта от просмотра исходного кода)
(function() {
  const m = window as any;
  const e = document;
  const t = 'script';
  const r = 'https://mc.yandex.ru/metrika/tag.js?id=105618061';
  const i = 'ym';
  const id = 105618061;
  
  m[i] = m[i] || function(){(m[i].a = m[i].a || []).push(arguments)};
  m[i].l = 1 * new Date();
  
  // Проверка на дубликаты
  for (let j = 0; j < e.scripts.length; j++) {
    if (e.scripts[j].src === r) { return; }
  }
  
  const k = e.createElement(t);
  const a = e.getElementsByTagName(t)[0];
  k.async = 1;
  k.src = r;
  a.parentNode?.insertBefore(k, a);
  
  // Инициализация Метрики
  m[i](id, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    accurateTrackBounce: true,
    trackLinks: true
  });
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

