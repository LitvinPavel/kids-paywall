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

const svgTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 844" width="390" height="844">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F3F0FF" stop-opacity="0.8"/>
      <stop offset="40%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>

    <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="50%" stop-color="#14B8A6"/>
      <stop offset="100%" stop-color="#22C55E"/>
    </linearGradient>

    <linearGradient id="selectedCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EEF2FF"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F5F3FF"/>
    </linearGradient>

    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6C5CE7"/>
      <stop offset="100%" stop-color="#4F46E5"/>
    </linearGradient>

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
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#10B981" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="390" height="844" fill="url(#bgGrad)"/>

  <!-- ================= 1. STATUS BAR ================= -->
  <g id="StatusBar">
    ${textToPath({ text: '09:41', x: 28, y: 26, size: 14, font: boldFont, fill: '#0F172A' })}
    <!-- Dynamic Island Pill -->
    <rect x="134" y="10" width="94" height="26" rx="13" fill="#000000"/>
    <!-- Icons -->
    <g transform="translate(315, 14)" fill="#0F172A">
      <rect x="0" y="8" width="3" height="4" rx="0.5"/>
      <rect x="4" y="6" width="3" height="6" rx="0.5"/>
      <rect x="8" y="3" width="3" height="9" rx="0.5"/>
      <rect x="12" y="0" width="3" height="12" rx="0.5"/>
      <path d="M22 2 C 25 0, 29 0, 32 2 M 24 5 C 26 3.5, 28 3.5, 30 5 M 26 9 A 1.5 1.5 0 1 1 28 9" stroke="#0F172A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <rect x="38" y="1" width="20" height="11" rx="3" fill="none" stroke="#0F172A" stroke-width="1.5"/>
      <rect x="40" y="3" width="13" height="7" rx="1.5" fill="#0F172A"/>
      <path d="M59 4.5 Q 60 4.5 60 5.5 L 60 7.5 Q 60 8.5 59 8.5" fill="#0F172A"/>
    </g>
  </g>

  <!-- ================= 2. HEADER ================= -->
  <g id="Header">
    <!-- Close Button -->
    <circle cx="38" cy="70" r="18" fill="#F1F5F9"/>
    <path d="M33 65 L43 75 M43 65 L33 75" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>

    <!-- Full Access Badge -->
    <g transform="translate(130, 56)">
      <rect x="0" y="0" width="130" height="28" rx="14" fill="#FFF5D9" stroke="#FFC048" stroke-width="1" stroke-opacity="0.5"/>
      <path d="M14 14 L16 9 L18 14 L23 16 L18 18 L16 23 L14 18 L9 16 Z" fill="#D97706"/>
      ${textToPath({ text: 'ПОЛНЫЙ ДОСТУП', x: 28, y: 18, size: 10.5, font: boldFont, fill: '#92400E' })}
    </g>
  </g>

  <!-- ================= 3. HERO & MASCOT ================= -->
  <g id="Hero">
    <!-- Mascot Glow -->
    <circle cx="195" cy="160" r="55" fill="url(#mascotGlow)"/>

    <!-- Mascot Graphic -->
    <g transform="translate(145, 110)">
      <path d="M-15 45 Q 10 15 45 25" stroke="#FFC048" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 6" opacity="0.8"/>
      <circle cx="20" cy="30" r="14" fill="#F39C12"/>
      <circle cx="20" cy="30" r="8" fill="#FAD7A0"/>
      <circle cx="80" cy="30" r="14" fill="#F39C12"/>
      <circle cx="80" cy="30" r="8" fill="#FAD7A0"/>
      <circle cx="50" cy="52" r="34" fill="#F5B041"/>
      <ellipse cx="32" cy="62" rx="6" ry="3.5" fill="#FF7675" opacity="0.6"/>
      <ellipse cx="68" cy="62" rx="6" ry="3.5" fill="#FF7675" opacity="0.6"/>
      <ellipse cx="38" cy="50" rx="3.5" ry="5" fill="#2C3E50"/>
      <circle cx="39" cy="48" r="1.5" fill="#FFFFFF"/>
      <ellipse cx="62" cy="50" rx="3.5" ry="5" fill="#2C3E50"/>
      <circle cx="63" cy="48" r="1.5" fill="#FFFFFF"/>
      <ellipse cx="50" cy="60" rx="12" ry="9" fill="#FDEBD0"/>
      <ellipse cx="50" cy="56" rx="4.5" ry="3" fill="#2C3E50"/>
      <path d="M47 59 Q 50 62 53 59" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>
      <path d="M35 15 L42 2 L50 10 L58 2 L65 15 Z" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1.5"/>
      <circle cx="42" cy="2" r="2" fill="#E74C3C"/>
      <circle cx="50" cy="10" r="2" fill="#3498DB"/>
      <circle cx="58" cy="2" r="2" fill="#2ECC71"/>
    </g>

    <!-- Star Accent -->
    <g transform="translate(235, 120) rotate(15)">
      <polygon points="12,0 15,8 24,10 18,16 20,24 12,20 4,24 6,16 0,10 9,8" fill="#FFC048"/>
    </g>

    <!-- Headline and Subtitles -->
    ${textToPath({ text: 'Открой все игры!', x: 195, y: 236, size: 24, font: boldFont, fill: '#0F172A', align: 'center' })}
    ${textToPath({ text: '500+ развивающих заданий, логических игр', x: 195, y: 258, size: 12, font: regFont, fill: '#475569', align: 'center' })}
    ${textToPath({ text: 'и пазлов для детей без рекламы', x: 195, y: 275, size: 12, font: regFont, fill: '#475569', align: 'center' })}
  </g>

  <!-- ================= 4. VALUE PERKS ================= -->
  <g id="Features">
    <!-- Perk 1 -->
    <g transform="translate(20, 298)">
      <rect width="350" height="46" rx="16" fill="#FFFFFF" fill-opacity="0.85" stroke="#E2E8F0" stroke-width="1"/>
      <rect x="8" y="7" width="32" height="32" rx="10" fill="#EEF2FF"/>
      <path d="M18 20 L22 20 M20 18 L20 22 M27 20 A 1 1 0 1 1 29 20" stroke="#4F46E5" stroke-width="2" stroke-linecap="round"/>
      ${textToPath({ text: 'Все 500+ развивающих игр', x: 50, y: 21, size: 12.5, font: boldFont, fill: '#1E293B' })}
      ${textToPath({ text: 'Пазлы, математика, логика, рисование и слова', x: 50, y: 34, size: 10.5, font: regFont, fill: '#64748B' })}
    </g>

    <!-- Perk 2 -->
    <g transform="translate(20, 350)">
      <rect width="350" height="46" rx="16" fill="#FFFFFF" fill-opacity="0.85" stroke="#E2E8F0" stroke-width="1"/>
      <rect x="8" y="7" width="32" height="32" rx="10" fill="#ECFDF5"/>
      <path d="M24 16 L18 19 L18 25 C 18 28 24 31 24 31 C 24 31 30 28 30 25 L30 19 Z" stroke="#059669" stroke-width="1.8" fill="none"/>
      ${textToPath({ text: '100% безопасная среда', x: 50, y: 21, size: 12.5, font: boldFont, fill: '#1E293B' })}
      ${textToPath({ text: 'Никакой рекламы и случайных кликов малыша', x: 50, y: 34, size: 10.5, font: regFont, fill: '#64748B' })}
    </g>

    <!-- Perk 3 -->
    <g transform="translate(20, 402)">
      <rect width="350" height="46" rx="16" fill="#FFFFFF" fill-opacity="0.85" stroke="#E2E8F0" stroke-width="1"/>
      <rect x="8" y="7" width="32" height="32" rx="10" fill="#FEF3C7"/>
      <path d="M19 19 C 22 17 26 17 29 19 M 17 17 L 31 31" stroke="#D97706" stroke-width="1.8" stroke-linecap="round"/>
      ${textToPath({ text: 'Работает без интернета', x: 50, y: 21, size: 12.5, font: boldFont, fill: '#1E293B' })}
      ${textToPath({ text: 'Идеально в дорогу, в машине, поезде и самолёте', x: 50, y: 34, size: 10.5, font: regFont, fill: '#64748B' })}
    </g>
  </g>

  <!-- ================= 5. TARIFF CARDS ================= -->
  <!-- CARD 1: ANNUAL (SELECTED) -->
  <g id="CardAnnualSelected" transform="translate(20, 468)" filter="url(#cardShadow)">
    <rect width="350" height="74" rx="20" fill="url(#selectedCardGrad)" stroke="#6C5CE7" stroke-width="2.5"/>

    <!-- Discount Badge -->
    <g transform="translate(235, -11)">
      <rect width="98" height="22" rx="11" fill="url(#badgeGrad)"/>
      <path d="M10 11 L12 7 L14 11 L18 12 L14 13 L12 17 L10 13 L6 12 Z" fill="#FFC048"/>
      ${textToPath({ text: 'ВЫГОДА 65%', x: 22, y: 15, size: 10, font: boldFont, fill: '#FFFFFF' })}
    </g>

    <!-- Radio Indicator (Checked) -->
    <circle cx="28" cy="37" r="12" fill="#6C5CE7"/>
    <path d="M22 37 L26 41 L34 33" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

    <!-- Left Content -->
    ${textToPath({ text: 'Годовой доступ', x: 50, y: 33, size: 15, font: boldFont, fill: '#0F172A' })}
    <rect x="50" y="42" width="102" height="18" rx="4" fill="#ECFDF5"/>
    ${textToPath({ text: '3 дня бесплатно', x: 56, y: 55, size: 10.5, font: boldFont, fill: '#059669' })}

    <!-- Right Content -->
    ${textToPath({ text: '1 990 ₽ / год', x: 334, y: 34, size: 16, font: boldFont, fill: '#0F172A', align: 'right' })}
    ${textToPath({ text: 'всего 165 ₽ / мес', x: 334, y: 52, size: 11, font: boldFont, fill: '#6C5CE7', align: 'right' })}
  </g>

  <!-- CARD 2: MONTHLY (UNSELECTED) -->
  <g id="CardMonthlyUnselected" transform="translate(20, 554)">
    <rect width="350" height="64" rx="20" fill="#FFFFFF" fill-opacity="0.95" stroke="#CBD5E1" stroke-width="1.5"/>

    <!-- Radio Indicator (Unchecked) -->
    <circle cx="28" cy="32" r="11" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>

    <!-- Left Content -->
    ${textToPath({ text: 'Месячный доступ', x: 50, y: 29, size: 15, font: boldFont, fill: '#0F172A' })}
    ${textToPath({ text: 'Без обязательств', x: 50, y: 46, size: 11, font: regFont, fill: '#64748B' })}

    <!-- Right Content -->
    ${textToPath({ text: '499 ₽ / мес', x: 334, y: 30, size: 16, font: boldFont, fill: '#0F172A', align: 'right' })}
    ${textToPath({ text: 'ежемесячно', x: 334, y: 46, size: 11, font: regFont, fill: '#94A3B8', align: 'right' })}
  </g>

  <!-- ================= 6. CTA BUTTON ================= -->
  <g id="CTAButton" transform="translate(20, 634)" filter="url(#ctaShadow)">
    <rect width="350" height="56" rx="20" fill="url(#ctaGrad)"/>
    ${textToPath({ text: 'Попробовать 3 дня бесплатно', x: 165, y: 34, size: 16, font: boldFont, fill: '#FFFFFF', align: 'center' })}
    <path d="M305 28 L311 34 L305 40" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>

  <!-- CTA Subtext -->
  ${textToPath({ text: 'Затем 1 990 ₽/год (~165 ₽/мес). Отмена в любой момент в 1 клик', x: 195, y: 704, size: 10.5, font: regFont, fill: '#64748B', align: 'center' })}

  <!-- ================= 7. FOOTER ================= -->
  <g id="Footer">
    ${textToPath({ text: 'Восстановить покупки', x: 195, y: 736, size: 12, font: boldFont, fill: '#6C5CE7', align: 'center' })}
    ${textToPath({ text: 'Условия использования   •   Конфиденциальность', x: 195, y: 756, size: 10, font: regFont, fill: '#94A3B8', align: 'center' })}
  </g>

  <!-- Home Indicator (Bottom Bar) -->
  <rect x="131" y="828" width="128" height="4" rx="2" fill="#CBD5E1"/>
</svg>
`

fs.writeFileSync('/Users/pavellitvin/Desktop/test_tasks/kids-paywall-nuxt/figma/paywall_design.svg', svgTemplate)
console.log('Successfully generated paywall_design.svg with full vector text paths!')
