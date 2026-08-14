# Handoff: iOS mobile simulation — Terminal, Settings, persistence fix

**Data:** 2026-07-30
**Status:** Em andamento (nada commitado ainda nesta sessão)

---

## 1. Objetivo

Continuar a simulação de iOS para mobile do mesmo portfolio (macOS Tahoe clone), trabalho que uma sessão anterior no OpenCode tinha começado e deixado parcialmente pronto (working tree com `src/ios/`, `src/styles/ios.css`, `src/system/ios/` não commitados, sem handoff próprio). Ao chegar nesta sessão, Home Screen, Lock Screen, Status Bar e os apps Safari/Mail/Photos/Notes/Files já estavam prontos; Terminal e Settings eram só placeholders ("This app ships in the next phase"). O usuário pediu explicitamente pra continuar de onde parou.

## 2. Contexto essencial

- **Stack:** mesma do desktop — React 19 + Vite 6, CSS puro (`src/styles/ios.css` novo, reaproveita tokens de `global.css`), sem TypeScript.
- **Arquitetura do shell iOS:** `IOSShell.jsx` renderiza boot → lock → home + apps abertos. `AppSwitcherProvider` (`src/system/ios/AppSwitcher.jsx`) é o equivalente mobile do `WindowManager`: só um app ativo por vez, mas os apps abertos ficam na lista `openApps` e deveriam continuar montados em segundo plano.
- **Ambiente:** macOS real (Darwin), Bash roda comandos reais. Reaproveitei o Chromium cacheado do Playwright (`~/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`) via `playwright-core@1.55` instalado ad-hoc no scratchpad da sessão (não é dependência do projeto) — mesma abordagem documentada na sessão anterior (que usava a revisão 1228 também, mas o binário real ficou em `chrome-mac-arm64/Google Chrome for Testing.app`, não em `Chromium`).
- **Decisões-chave e porquês:**
  - Perguntei ao usuário (via AskUserQuestion) o que priorizar entre: Terminal+Settings / só Terminal / Terminal+Settings+App Switcher / outra coisa. Escolheu **Terminal + Settings**, deixando o App Switcher (multitasking) de fora por enquanto.
  - Invoquei a skill `brainstorming`, mas conscientemente **pulei o pipeline formal de spec doc em `docs/superpowers/specs/`** — expliquei ao usuário que este projeto não usa esse fluxo (nenhum outro app iOS teve spec própria, é continuação direta de convenções já existentes), ele confirmou ("Sim, pode implementar") sem pedir o documento formal.
  - Terminal: reaproveita o MESMO motor de comandos do Terminal desktop (`src/apps/Terminal.jsx`), só troca as duas dependências de `WindowManager` — `exit` agora chama `closeApp()` (vai pra Home) em vez de fechar uma window, e `open` roteia pro app iOS certo (`notes`/`photos`/`safari`/`files`) em vez de abrir uma window do Finder/TextEdit.
  - Settings: espelha o Control Center do desktop (`src/components/ControlCenter.jsx`) porque usa o MESMO estado compartilhado via `useDesktop()` — mudar Wi-Fi nas Settings do iPhone reflete na hora no ícone da status bar, e vice-versa (é o mesmo contexto React, não uma cópia).
  - Achei e corrigi um bug real e não pedido: `AppScreen.jsx` tinha um comentário dizendo "the app stays mounted while in the background (state survives)", mas na prática desmontava (`return null`) 340ms depois de sair do app — testei reabrindo o Terminal depois de ir pra Home e o histórico de comandos sumia. Corrigi trocando o unmount por `display:none` (mantém o componente montado, então o estado sobrevive; a animação de zoom continua idêntica porque `display:none → flex` reinicia a CSS animation do mesmo jeito que um remount fazia). Decidi corrigir sem perguntar porque é bug inequívoco em infraestrutura compartilhada (afeta Mail/Notes/Photos/Safari também, não só os apps novos), não uma escolha de escopo.
  - Deletei `src/ios/apps/IOSPlaceholder.jsx` — ficou sem nenhuma referência depois de trocar Terminal/Settings pelos apps reais no registry (`src/ios/apps/index.jsx`).
  - O ícone inicial da tela "About This iPhone" era o ícone do Finder (reaproveitado errado — implicava que a tela era sobre o app Finder, não sobre o "aparelho"). Troquei por um mini mockup de iPhone mostrando o wallpaper atual ao vivo, no mesmo espírito do `.about-mac` do `AboutMac.jsx` desktop (que mostra o wallpaper dentro de uma tela de MacBook).
  - O hook `impeccable` acusou `side-tab` em `.ios-proj-quote` (border-left de 3px no blockquote do case study). É o MESMO padrão de `.proj-quote` no desktop, que o usuário já confirmou 2x como falso-positivo numa sessão anterior (documentado no HANDOFF antigo). Apliquei a mesma supressão sem reperguntar: `node ~/.claude/skills/impeccable/scripts/hook-admin.mjs ignore-value side-tab "*" --file "src/styles/ios.css" --shared --reason "..."` — já registrado em `.impeccable/config.json` (modificado, não commitado ainda).
- **Preferências do usuário / estilo de trabalho observado (reforça o que já estava no HANDOFF anterior):**
  - Fala PT-BR, chama de "chefe" — adotei o tratamento, ele não corrigiu.
  - Designer sênior que também programa — pode usar termos técnicos diretos.
  - Quer teste visual ao vivo (Playwright/Chromium) antes de qualquer coisa ser declarada pronta — reforçado nesta sessão de novo, sem exceção.
  - Prefere decisões rápidas via pergunta objetiva (AskUserQuestion) só quando é ambiguidade real de escopo (ex: qual app priorizar), não quer confirmação demais depois disso (aceitou o plano técnico detalhado com um único "sim, pode implementar").
  - Aceita bem quando eu decido consertar um bug relacionado que encontro no caminho, contanto que eu explique a causa raiz antes de mexer (fiz isso com o bug do `AppScreen`, ele não reclamou).

## 3. O que já foi feito

- ✅ Explorei e testei visualmente TODO o trabalho que já existia do OpenCode antes de mexer em qualquer coisa: `IOSShell`, `HomeScreen`, `LockScreen`, `StatusBar`, `AppScreen`, `IOSIcon`, `useSwipe`, `AppSwitcher`, `IOSSafari`, `IOSMail`, `IOSPhotos`, `IOSNotes`, `IOSFiles` — tudo funcionando, sem erros de console (exceto o bug pré-existente do ícone do GitHub, ver seção 6).
- ✅ `src/ios/apps/IOSTerminal.jsx` (novo) — shell real com `help`, `whoami`, `pwd`, `ls`, `cd`, `cat`, `open`, `echo`, `clear`, `date`, `uname`, `sudo`, `contact`, `projects`, `skills`, `neofetch`, `exit`. Reaproveita `.terminal`/`.tline`/`.t-*` do `windows.css` (não é scoped a `.window`, funcionou direto).
- ✅ `src/ios/apps/IOSSettings.jsx` (novo) — lista agrupada iOS: About This iPhone (sub-tela com mockup do aparelho + wallpaper ao vivo), Wi-Fi/Bluetooth/AirDrop/Focus com switches, Brilho + Dark Mode + Wallpaper (cicla ao tocar), Volume.
- ✅ CSS novo em `src/styles/ios.css`: `.ios-switch` (pill toggle estilo UISwitch), `.ios-section-title`, `.ios-setting-row`, `.ios-cell-value`, `.ios-cell-slider` (reaproveita `.cc-slider` do Control Center), `.ios-about-phone`, `.ios-navbtn-text`, `.ios-app-screen.hidden`.
- ✅ Bug de persistência corrigido em `src/ios/AppScreen.jsx` (unmount prematuro → `display:none`).
- ✅ `src/ios/apps/index.jsx` atualizado — `terminal`/`settings` apontam pros componentes reais em vez dos placeholders.
- ✅ `src/ios/apps/IOSPlaceholder.jsx` deletado (dead code).
- ✅ `npm run build` limpo (sem erros) em cada etapa.
- ✅ Testes ao vivo via Playwright/Chromium (390×844, mobile+touch): boot→lock→swipe unlock→home; Terminal (`neofetch`, `ls`, `cd Portfolio`, `ls`, ir pra Home e reabrir pra confirmar persistência); Settings (toggle Wi-Fi, toggle Dark Mode, arrastar slider de brilho, ciclar wallpaper, abrir About, voltar). Zero erros novos de console — só os 15 já conhecidos do bug do ícone do GitHub.
- ✅ Supressão do hook `impeccable` (`side-tab` em `.ios-proj-quote`) registrada em `.impeccable/config.json`.
- ❌ Nada foi descartado de verdade nesta sessão — só uma iteração pequena (ícone do Finder → mockup de iPhone na tela About) antes de finalizar.

## 4. Estado atual

- **Nada commitado nesta sessão.** `git status` mostra:
  - Modificados: `.impeccable/config.json`, `index.html`, `src/App.jsx`, `src/main.jsx` (esses três últimos já vinham modificados de ANTES desta sessão, da fase inicial de wiring do OpenCode — ver seção 7).
  - Não rastreados: `HANDOFF.md` (este arquivo), `src/ios/`, `src/styles/ios.css`, `src/system/ios/`.
- Servidor de dev (`npm run dev`) que rodei em background foi encerrado no fim da sessão (`pkill -f vite$` + kill na porta 5173) — não tem nada rodando agora.
- Scripts de teste Playwright ficaram só no scratchpad da sessão (`/private/tmp/claude-501/.../scratchpad/pw/`), não fazem parte do repo.
- Última ação: suprimir o finding `side-tab` do hook impeccable e confirmar com o usuário que estava tudo certo.

## 5. Próximos passos

1. Decidir com o usuário quando commitar este trabalho (nada foi commitado ainda — ele não pediu, e a instrução do projeto é nunca commitar sem pedido explícito).
2. Se o usuário quiser continuar o mobile: construir o **App Switcher** (multitasking) — segurar/tocar o home indicator pra ver um grid dos apps abertos, com swipe-up pra fechar via `quitApp` (já existe em `src/system/ios/AppSwitcher.jsx:35`, só falta a UI que o chame). Foi explicitamente deixado de fora nesta sessão a pedido do usuário.
3. Considerar se o gesto de Control Center / Notification Center (puxar de cima pra baixo) faz parte de uma fase futura do iOS — `StatusBar.jsx` já recebe uma prop `swipeHandlers` que não é usada em lugar nenhum (`IOSShell.jsx` renderiza `<StatusBar light={light} />` sem passar handlers), sugerindo que foi desenhado pra isso mas nunca ligado.
4. Bug conhecido e NUNCA corrigido (aparece também no Home Screen do iOS, não só no desktop): ícone do GitHub em `src/components/Icon.jsx:88` tem um path SVG malformado (`Error: <path> attribute d: Expected number, "….3-5.2-2.6-6.5-1zm-11.4-14.7c-1.…"`). Mencionado 3x na sessão anterior e de novo nesta (15 ocorrências no console durante os testes) — nunca foi pedido explicitamente pra corrigir.

## 6. Perguntas em aberto

- [ ] Quando commitar o trabalho desta sessão (Terminal, Settings, fix de persistência)?
- [ ] App Switcher/multitasking — construir numa próxima sessão? (deferido por escolha do usuário, não recusado)
- [ ] Control Center / Notification Center pro iOS — está no roadmap ou fica só desktop mesmo? (`swipeHandlers` do `StatusBar` sugere que sim, mas nunca foi confirmado)
- [ ] Ícone do GitHub malformado (`Icon.jsx:88`) — corrigir de vez? (reportado 3x+ ao longo de duas sessões, nunca pedido)

## 7. Artefatos relevantes

### Arquivos criados nesta sessão
- `src/ios/apps/IOSTerminal.jsx` — shell real (motor idêntico ao desktop, adaptado pro AppSwitcher).
- `src/ios/apps/IOSSettings.jsx` — Settings + tela About.

### Arquivos modificados nesta sessão
- `src/ios/AppScreen.jsx` — fix do bug de persistência (unmount → `display:none`).
- `src/ios/apps/index.jsx` — registry aponta pros apps reais.
- `src/styles/ios.css` — CSS novo pro Settings/Terminal + regra `.ios-app-screen.hidden`.
- `.impeccable/config.json` — supressão de `side-tab` pra `src/styles/ios.css`.

### Arquivos deletados nesta sessão
- `src/ios/apps/IOSPlaceholder.jsx` — dead code depois da troca dos placeholders.

### Arquivos já existentes ANTES desta sessão (obra do OpenCode, só verificados/testados aqui)
- `src/ios/IOSShell.jsx`, `HomeScreen.jsx`, `LockScreen.jsx`, `StatusBar.jsx`, `IOSIcon.jsx`
- `src/system/ios/useSwipe.js`, `AppSwitcher.jsx`
- `src/ios/apps/IOSSafari.jsx`, `IOSMail.jsx`, `IOSPhotos.jsx`, `IOSNotes.jsx`, `IOSFiles.jsx`
- `index.html` (viewport `viewport-fit=cover`), `src/App.jsx` (rota mobile → `<IOSShell/>` em vez do antigo `MobileNotice`), `src/main.jsx` (import de `ios.css`)

### Trecho principal do fix de persistência (`src/ios/AppScreen.jsx`)
```jsx
export default function AppScreen({ app, children }) {
  const { activeId, closeApp } = useApps()
  const isActive = activeId === app.id
  // 'open' (visible) -> 'closing' (playing zoom-out) -> 'hidden' (kept mounted,
  // display:none) so the app's own state survives trips to the Home Screen.
  const [phase, setPhase] = useState(isActive ? 'open' : 'hidden')

  useEffect(() => {
    if (isActive) {
      setPhase('open')
      return undefined
    }
    setPhase('closing')
    const t = setTimeout(() => setPhase('hidden'), 340)
    return () => clearTimeout(t)
  }, [isActive])

  // ...

  return (
    <div className={`ios-app-screen ${phase}`} style={style}>
      <div className="ios-app-body">{children}</div>
      {/* ... */}
    </div>
  )
}
```
```css
/* Backgrounded: stays mounted (state survives) but off-screen. */
.ios-app-screen.hidden {
  display: none;
}
```

### Comando de teste visual (Playwright + Chromium cacheado, reproduzível)
```js
import { chromium } from 'playwright-core'
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const browser = await chromium.launch({ executablePath: execPath })
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
await page.goto('http://localhost:5173/')
```
Setup usado (scratchpad, não commitado): `npm init -y && npm install playwright-core@1.55 --no-save`.

### Comando de supressão do hook impeccable usado nesta sessão
```bash
node ~/.claude/skills/impeccable/scripts/hook-admin.mjs ignore-value side-tab "*" --file "src/styles/ios.css" --shared --reason "Testimonial blockquote left rule (.ios-proj-quote) — same intentional pattern as .proj-quote on desktop, already confirmed as a false positive by the user for this project (see HANDOFF.md)."
```

## 8. Instruções pra próxima sessão

- **Tom:** informal, direto, PT-BR. Pode chamar de "chefe".
- **Familiaridade técnica:** designer de marca sênior que também programa (repos reais no GitHub) — termos técnicos diretos são bem-vindos, mas explique causa raiz quando reportar bug.
- **Armadilhas a evitar:**
  - Nunca declarar algo "deveria funcionar" sem testar visualmente com Playwright/Chromium (Chromium 1228 já cacheado, binário fica em `chrome-mac-arm64/Google Chrome for Testing.app`, não em `Chromium` — usar o caminho certo direto, sem tentar `find -name Chromium`).
  - Ao reabrir um app depois de ir pra Home, ele agora MANTÉM estado — se algo parecer resetado sem motivo, isso já foi corrigido, investigar de novo antes de assumir que é o mesmo bug.
  - Ao construir novo app iOS, seguir o padrão já estabelecido: reaproveitar classes CSS existentes quando fizerem sentido (`.ios-navbar`, `.ios-list`/`.ios-cell`, `.ios-scroll`, `.cc-slider`) em vez de criar paralelas.
  - Não perguntar demais depois que o escopo já foi validado uma vez — uma pergunta objetiva de priorização é ok, mas não repetir confirmação a cada arquivo.
  - Se o hook `impeccable` acusar `side-tab` em blockquotes/citações (`.proj-quote`, `.ios-proj-quote`), já é falso-positivo confirmado — não perguntar de novo, só aplicar a mesma supressão se aparecer em um arquivo novo.
  - `git push`/commit: nada foi commitado nesta sessão por decisão de esperar o usuário pedir — não commitar nada sem confirmação explícita.
- **Contexto útil:** este handoff substitui o anterior (que era de uma sessão de bugfix/polish do desktop, antes do trabalho de iOS começar). Se precisar de contexto sobre o desktop (extração de ícones da Apple, deploy Cloudflare, etc.), esse conteúdo não está mais aqui — foi substituído por este handoff focado no mobile. Se for relevante recuperar, está no histórico de commits do git (branch `main`) antes desta sessão.
