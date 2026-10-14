import fs from 'fs'
import opentype from 'opentype.js'

const boldBuf = fs.readFileSync('/System/Library/Fonts/Supplemental/Arial Bold.ttf')
const regBuf = fs.readFileSync('/System/Library/Fonts/Supplemental/Arial.ttf')

const boldFont = opentype.parse(boldBuf.buffer.slice(boldBuf.byteOffset, boldBuf.byteOffset + boldBuf.byteLength))
const regFont = opentype.parse(regBuf.buffer.slice(regBuf.byteOffset, regBuf.byteOffset + regBuf.byteLength))

function textToPath({ text, x, y, size, font, fill, align = 'left' }) {
  const width = font.getAdvanceWidth(text, size)
  let startX = x
  if (align === 'center') {
    startX = x - width / 2
  } else if (align === 'right') {
    startX = x - width
  }

  const path = font.getPath(text, startX, y, size)
  const pathData = path.toPathData(2)
  return `<path d="${pathData}" fill="${fill}" />`
}

// Lucide Icon SVG definitions
const icons = {
  x: `
    <g stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </g>
  `,
  sparkles: `
    <g fill="#D97706">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </g>
    <g stroke="#D97706" stroke-width="1.5" stroke-linecap="round" fill="none">
      <path d="M20 3v4 M22 5h-4 M4 17v2 M5 18H3"/>
    </g>
  `,
  sparkleStarWhite: `
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" fill="#FFFFFF"/>
  `,
  bug: `
    <g stroke="#E11D48" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="m8 2 1.88 1.88 M14.12 3.88 16 2 M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6 M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5 M6 13H2 M3 21c0-2.1 1.7-3.9 3.8-4 M20.97 5c0 2.1-1.6 3.8-3.5 4 M22 13h-4 M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </g>
  `,
  star: `
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" fill="#78350F" />
  `,
  gamepad2: `
    <g stroke="#4F46E5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <line x1="6" y1="11" x2="10" y2="11" />
      <line x1="8" y1="9" x2="8" y2="13" />
      <circle cx="15" cy="12" r="0.8" fill="#4F46E5" />
      <circle cx="18" cy="10" r="0.8" fill="#4F46E5" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
    </g>
  `,
  shieldCheck: `
    <g stroke="#059669" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </g>
  `,
  wifiOff: `
    <g stroke="#D97706" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M12 20h.01 M8.5 16.429a5 5 0 0 1 7 0 M5 12.859a10 10 0 0 1 5.17-2.69 M19 12.859a10 10 0 0 0-2.007-1.523 M2 8.82a15 15 0 0 1 4.177-2.643 M22 8.82a15 15 0 0 0-11.288-3.764 M2 2l20 20" />
    </g>
  `,
  check: `
    <path d="M20 6 9 17l-5-5" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  `,
  arrowRight: `
    <g stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </g>
  `
}

const svgTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 844" width="390" height="844">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F3F0FF" stop-opacity="0.85"/>
      <stop offset="45%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>

    <!-- CTA Button Gradient -->
    <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="50%" stop-color="#14B8A6"/>
      <stop offset="100%" stop-color="#22C55E"/>
    </linearGradient>

    <!-- Selected Tariff Card Gradient -->
    <linearGradient id="selectedCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EEF2FF" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#F5F3FF" stop-opacity="0.95"/>
    </linearGradient>

    <!-- Discount Badge Gradient -->
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6C5CE7"/>
      <stop offset="100%" stop-color="#4F46E5"/>
    </linearGradient>

    <!-- Mascot Glow -->
    <linearGradient id="mascotGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6C5CE7" stop-opacity="0.2"/>
      <stop offset="50%" stop-color="#FFC048" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FF6B8B" stop-opacity="0.2"/>
    </linearGradient>

    <!-- Shadows -->
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#6C5CE7" flood-opacity="0.22"/>
    </filter>

    <filter id="ctaShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#10B981" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="390" height="844" fill="url(#bgGrad)"/>

  <!-- ================= 1. HEADER (Pixel-Perfect with Web App) ================= -->
  <g id="Header" transform="translate(20, 16)">
    <!-- Close Button Circle -->
    <circle cx="18" cy="18" r="18" fill="#000000" fill-opacity="0.05"/>
    <g transform="translate(6, 6) scale(1)">
      ${icons.x}
    </g>

    <!-- Center Badge: ПОЛНЫЙ ДОСТУП -->
    <g transform="translate(98, 4)">
      <rect x="0" y="0" width="134" height="28" rx="14" fill="#FFF5D9" stroke="#FFC048" stroke-width="1" stroke-opacity="0.4"/>
      <!-- Sparkles icon -->
      <g transform="translate(10, 6) scale(0.68)">
        ${icons.sparkles}
      </g>
      <!-- Text ПОЛНЫЙ ДОСТУП -->
      ${textToPath({ text: 'ПОЛНЫЙ ДОСТУП', x: 30, y: 18.5, size: 10.5, font: boldFont, fill: '#92400E' })}
    </g>

    <!-- Right Dev Toggle (Bug Icon) -->
    <g transform="translate(314, 0)">
      <circle cx="18" cy="18" r="18" fill="#FFF1F2" stroke="#FB7185" stroke-width="1.5"/>
      <g transform="translate(8, 8) scale(0.85)">
        ${icons.bug}
      </g>
    </g>
  </g>

  <!-- ================= 2. HERO & MASCOT ================= -->
  <g id="Hero" transform="translate(195, 68)">
    <!-- Glow -->
    <circle cx="0" cy="52" r="54" fill="url(#mascotGlow)"/>

    <!-- Mascot Graphic -->
    <g transform="translate(-50, 0)">
      <!-- Wand Trail -->
      <path d="M-15 45 Q 10 15 45 25" stroke="#FFC048" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 6" opacity="0.8"/>
      <!-- Ears -->
      <circle cx="20" cy="30" r="14" fill="#F39C12"/>
      <circle cx="20" cy="30" r="8" fill="#FAD7A0"/>
      <circle cx="80" cy="30" r="14" fill="#F39C12"/>
      <circle cx="80" cy="30" r="8" fill="#FAD7A0"/>
      <!-- Head -->
      <circle cx="50" cy="52" r="34" fill="#F5B041"/>
      <!-- Cheeks -->
      <ellipse cx="32" cy="62" rx="6" ry="3.5" fill="#FF7675" opacity="0.6"/>
      <ellipse cx="68" cy="62" rx="6" ry="3.5" fill="#FF7675" opacity="0.6"/>
      <!-- Eyes -->
      <ellipse cx="38" cy="50" rx="3.5" ry="5" fill="#2C3E50"/>
      <circle cx="39" cy="48" r="1.5" fill="#FFFFFF"/>
      <ellipse cx="62" cy="50" rx="3.5" ry="5" fill="#2C3E50"/>
      <circle cx="63" cy="48" r="1.5" fill="#FFFFFF"/>
      <!-- Snout -->
      <ellipse cx="50" cy="60" rx="12" ry="9" fill="#FDEBD0"/>
      <ellipse cx="50" cy="56" rx="4.5" ry="3" fill="#2C3E50"/>
      <path d="M47 59 Q 50 62 53 59" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>
      <!-- Golden Crown -->
      <path d="M35 15 L42 2 L50 10 L58 2 L65 15 Z" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1.5"/>
      <circle cx="42" cy="2" r="2" fill="#E74C3C"/>
      <circle cx="50" cy="10" r="2" fill="#3498DB"/>
      <circle cx="58" cy="2" r="2" fill="#2ECC71"/>
    </g>

    <!-- Star Badge at Top-Right of Mascot (matching Web App) -->
    <g transform="translate(38, 14) rotate(12)">
      <circle cx="12" cy="12" r="12" fill="#FFC048" />
      <g transform="translate(4, 4) scale(0.68)">
        ${icons.star}
      </g>
    </g>

    <!-- Headline: Открой все игры! -->
    ${textToPath({ text: 'Открой все игры!', x: 0, y: 126, size: 24, font: boldFont, fill: '#0F172A', align: 'center' })}

    <!-- Subtitle (exact text from web app) -->
    ${textToPath({ text: '500+ обучающих заданий, логических игр и пазлов', x: 0, y: 148, size: 12.5, font: boldFont, fill: '#475569', align: 'center' })}
    ${textToPath({ text: 'для детей от 2 до 7 лет без рекламы', x: 0, y: 165, size: 12.5, font: boldFont, fill: '#475569', align: 'center' })}
  </g>

  <!-- ================= 3. FEATURES (Exact Lucide Icons & Layout) ================= -->
  <g id="Features" transform="translate(20, 258)">
    <!-- Perk 1 -->
    <g transform="translate(0, 0)">
      <rect width="350" height="48" rx="16" fill="#FFFFFF" fill-opacity="0.8" stroke="#E2E8F0" stroke-width="1" stroke-opacity="0.8"/>
      <rect x="8" y="6" width="36" height="36" rx="12" fill="#EEF2FF"/>
      <g transform="translate(14, 12) scale(1)">
        ${icons.gamepad2}
      </g>
      ${textToPath({ text: 'Все 500+ развивающих игр', x: 54, y: 22, size: 12.5, font: boldFont, fill: '#1E293B' })}
      ${textToPath({ text: 'Пазлы, математика, логика, рисование и слова', x: 54, y: 36, size: 10.5, font: regFont, fill: '#64748B' })}
    </g>

    <!-- Perk 2 -->
    <g transform="translate(0, 56)">
      <rect width="350" height="48" rx="16" fill="#FFFFFF" fill-opacity="0.8" stroke="#E2E8F0" stroke-width="1" stroke-opacity="0.8"/>
      <rect x="8" y="6" width="36" height="36" rx="12" fill="#ECFDF5"/>
      <g transform="translate(14, 12) scale(1)">
        ${icons.shieldCheck}
      </g>
      ${textToPath({ text: '100% безопасная среда', x: 54, y: 22, size: 12.5, font: boldFont, fill: '#1E293B' })}
      ${textToPath({ text: 'Никакой рекламы и случайных ссылок для малышей', x: 54, y: 36, size: 10.5, font: regFont, fill: '#64748B' })}
    </g>

    <!-- Perk 3 -->
    <g transform="translate(0, 112)">
      <rect width="350" height="48" rx="16" fill="#FFFFFF" fill-opacity="0.8" stroke="#E2E8F0" stroke-width="1" stroke-opacity="0.8"/>
      <rect x="8" y="6" width="36" height="36" rx="12" fill="#FEF3C7"/>
      <g transform="translate(14, 12) scale(1)">
        ${icons.wifiOff}
      </g>
      ${textToPath({ text: 'Работает без интернета', x: 54, y: 22, size: 12.5, font: boldFont, fill: '#1E293B' })}
      ${textToPath({ text: 'Идеально в дорогу, в машине, поезде и самолёте', x: 54, y: 36, size: 10.5, font: regFont, fill: '#64748B' })}
    </g>
  </g>

  <!-- ================= 4. TARIFF CARDS ================= -->
  <!-- CARD 1: ANNUAL (SELECTED) -->
  <g id="CardAnnualSelected" transform="translate(20, 442)" filter="url(#cardShadow)">
    <rect width="350" height="72" rx="16" fill="url(#selectedCardGrad)" stroke="#6C5CE7" stroke-width="2"/>

    <!-- Discount Badge -->
    <g transform="translate(230, -11)">
      <rect width="104" height="22" rx="11" fill="url(#badgeGrad)"/>
      <g transform="translate(8, 3) scale(0.68)">
        ${icons.sparkleStarWhite}
      </g>
      ${textToPath({ text: 'ВЫГОДА 65%', x: 25, y: 15, size: 10, font: boldFont, fill: '#FFFFFF' })}
    </g>

    <!-- Radio Indicator with Outer Ring -->
    <g transform="translate(16, 24)">
      <!-- Outer Ring (ring-4 ring-kid-purple/20) -->
      <circle cx="12" cy="12" r="16" fill="#6C5CE7" fill-opacity="0.15"/>
      <!-- Inner Solid Purple Circle -->
      <circle cx="12" cy="12" r="12" fill="#6C5CE7"/>
      <!-- Checkmark -->
      <g transform="translate(2, 2) scale(0.85)">
        ${icons.check}
      </g>
    </g>

    <!-- Left Content -->
    ${textToPath({ text: 'Годовой доступ', x: 54, y: 31, size: 15, font: boldFont, fill: '#0F172A' })}
    <rect x="54" y="39" width="98" height="18" rx="4" fill="#ECFDF5"/>
    ${textToPath({ text: '3 дня бесплатно', x: 60, y: 52, size: 10.5, font: boldFont, fill: '#059669' })}

    <!-- Right Content (Exact Alignment) -->
    ${textToPath({ text: '1 990 ₽ / год', x: 334, y: 32, size: 16, font: boldFont, fill: '#0F172A', align: 'right' })}
    ${textToPath({ text: 'всего 165 ₽ / мес', x: 334, y: 50, size: 11, font: boldFont, fill: '#6C5CE7', align: 'right' })}
  </g>

  <!-- CARD 2: MONTHLY (UNSELECTED) -->
  <g id="CardMonthlyUnselected" transform="translate(20, 526)">
    <rect width="350" height="64" rx="16" fill="#FFFFFF" fill-opacity="0.9" stroke="#E2E8F0" stroke-width="2"/>

    <!-- Radio Indicator (Unchecked) -->
    <g transform="translate(16, 20)">
      <circle cx="12" cy="12" r="11" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
    </g>

    <!-- Left Content -->
    ${textToPath({ text: 'Месячный доступ', x: 54, y: 29, size: 15, font: boldFont, fill: '#0F172A' })}
    ${textToPath({ text: 'Без обязательств', x: 54, y: 46, size: 11, font: regFont, fill: '#64748B' })}

    <!-- Right Content -->
    ${textToPath({ text: '499 ₽ / мес', x: 334, y: 30, size: 16, font: boldFont, fill: '#0F172A', align: 'right' })}
    ${textToPath({ text: 'ежемесячно', x: 334, y: 46, size: 11, font: regFont, fill: '#94A3B8', align: 'right' })}
  </g>

  <!-- ================= 5. CTA BUTTON ================= -->
  <g id="CTAButton" transform="translate(20, 606)" filter="url(#ctaShadow)">
    <rect width="350" height="56" rx="16" fill="url(#ctaGrad)"/>
    ${textToPath({ text: 'Попробовать 3 дня бесплатно', x: 160, y: 34, size: 16, font: boldFont, fill: '#FFFFFF', align: 'center' })}
    <!-- Arrow Right Icon -->
    <g transform="translate(290, 16) scale(1)">
      ${icons.arrowRight}
    </g>
  </g>

  <!-- CTA Subtext -->
  ${textToPath({ text: 'Затем 1 990 ₽/год (~165 ₽/мес). Отмена в любой момент в 1 клик', x: 195, y: 680, size: 11, font: regFont, fill: '#64748B', align: 'center' })}

  <!-- ================= 6. FOOTER ================= -->
  <g id="Footer" transform="translate(195, 712)">
    ${textToPath({ text: 'Восстановить покупки', x: 0, y: 0, size: 12, font: boldFont, fill: '#6C5CE7', align: 'center' })}
    ${textToPath({ text: 'Условия использования   •   Конфиденциальность', x: 0, y: 20, size: 10, font: regFont, fill: '#94A3B8', align: 'center' })}
  </g>

  <!-- Home Indicator (Bottom Bar) -->
  <rect x="131" y="828" width="128" height="4" rx="2" fill="#CBD5E1"/>
</svg>
`

fs.writeFileSync(new URL('../figma/paywall_design.svg', import.meta.url), svgTemplate)
console.log('Successfully generated pixel-perfect paywall_design.svg exactly matching the web app!')
