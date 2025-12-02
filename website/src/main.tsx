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
  m[i].l = Date.now();
  
  // Проверка на дубликаты
  for (let j = 0; j < e.scripts.length; j++) {
    if (e.scripts[j].src === r) { return; }
  }
  
  const k = e.createElement(t);
  k.async = true;
  k.src = r;
  
  // Bug 2 fix: Проверка существования script элемента перед вставкой
  const a = e.getElementsByTagName(t)[0];
  if (a && a.parentNode) {
    a.parentNode.insertBefore(k, a);
  } else {
    // Если нет script элементов, вставляем в head или body
    const head = e.head || e.getElementsByTagName('head')[0];
    if (head) {
      head.appendChild(k);
    } else {
      e.body.appendChild(k);
    }
  }
  
  // Инициализация добавляется в очередь (стандартный паттерн Яндекс Метрики)
  // Очередь автоматически обработается когда скрипт загрузится
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

