import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { I18nProvider } from '@/hooks/i18n-provider'

type YmInitOptions = {
  ssr: boolean
  webvisor: boolean
  clickmap: boolean
  ecommerce: string
  accurateTrackBounce: boolean
  trackLinks: boolean
}

type YmArguments = [number, "init", YmInitOptions]
type YmFunction = ((...args: YmArguments) => void) & {
  a?: YmArguments[]
  l?: number
}

// Динамическая загрузка Яндекс Метрики (скрыта от просмотра исходного кода)
(function() {
  const m = window as Window & { ym?: YmFunction };
  const e = document;
  const t = 'script';
  const r = 'https://mc.yandex.ru/metrika/tag.js?id=105618061';
  const id = 105618061;

  const ym: YmFunction = m.ym ?? ((...args: YmArguments) => {
    ym.a = ym.a || [];
    ym.a.push(args);
  });

  m.ym = ym;
  ym.l = Date.now();
  
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
  ym(id, 'init', {
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
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
)
