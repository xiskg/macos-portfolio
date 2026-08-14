// ============================================================================
//  PORTFOLIO CONTENT — SINGLE SOURCE OF TRUTH
//  ----------------------------------------------------------------------------
//  Real data imported from https://github.com/xiskg/personal-website
//  (João de Almeida — Senior Brand & Visual Designer).
//  Every app on this desktop reads from this file.
// ============================================================================

export const profile = {
  name: 'João de Almeida',
  shortName: 'João',
  username: 'joao', // used in the Terminal prompt
  machineName: 'joaos-macbook',
  role: 'Senior Brand & Visual Designer',
  tagline: 'Every great brand starts as a sketch.',
  location: 'Brazil — working worldwide',
  email: 'joaoadriano.psd@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jojoao/',
  github: 'https://github.com/xiskg',
  website: 'https://github.com/xiskg/personal-website',
  yearsOfExperience: 5,
  availableForWork: true,
  languages: ['Portuguese — native', 'English — fluent', 'Spanish — basic'],
  aboutShort:
    'Strategic brand designer turning business goals into identities people ' +
    'actually remember. 5+ years shipping brands across LATAM and North ' +
    'America, from the first pencil stroke to the final guideline.',
}

export const aboutParagraphs = [
  `I'm João — Brazilian, brand-obsessed, and convinced that strategy and craft ` +
    `are the same discipline held in one hand.`,
  `Right now I lead a four-designer team at DotBrands. Before that: a ` +
    `creative-studio sprint across US & LATAM tech and luxury, a typography ` +
    `specialization in Toronto, and 550+ shipped assets that taught me speed ` +
    `without sloppiness.`,
  `Brands live or die on the gap between what a business means and what people ` +
    `see. My job is closing that gap — and teaching the team beside me to close ` +
    `it without me.`,
  `This desktop is my portfolio — poke around! Open the Portfolio folder for ` +
    `the case studies, browse them in Safari, flip through the artwork in ` +
    `Photos, or press ⌘Space to search everything with Spotlight.`,
]

export const skills = [
  {
    group: 'Strategy',
    items: ['Brand Strategy', 'Brand Architecture', 'Go-to-Market', 'Brand Workshops', 'User Research', 'Competitor Analysis'],
  },
  {
    group: 'Design',
    items: ['Art Direction', 'Advanced Typography', 'Visual Systems', 'Iconography', 'Identity Design'],
  },
  {
    group: 'Delivery',
    items: ['Brand Guidelines', 'Launch Support', 'Mentoring', 'Design Ops'],
  },
  {
    group: 'Languages',
    items: profile.languages,
  },
]

// Field metrics from the "process" section of the original portfolio
export const metrics = [
  { value: '15+', label: 'brands researched across the US & LATAM' },
  { value: '+40%', label: 'qualified leads on a flagship campaign' },
  { value: '25+', label: 'identities shipped end to end' },
  { value: '98%', label: 'client satisfaction rate' },
]

// Each project becomes: a folder in ~/Portfolio, a page in Safari,
// an album in Photos and a searchable item in Spotlight.
// Images are served from the original portfolio's CDN.
export const projects = [
  {
    id: 'poliana-pionorio',
    name: 'Poliana Pionório',
    client: 'Poliana Pionório — Business Mentor',
    year: '2025',
    kind: 'Brand Strategy & Identity',
    tagline:
      "A brand of 'Human Sophistication' that balances 15 years of authority " +
      'with the warmth of true mentorship.',
    sections: [
      {
        title: 'The Challenge',
        text:
          'Poliana Pionório is a powerhouse in business management with over 15 ' +
          'years of experience and a unique hands-on mentorship style. However, ' +
          'her visual identity didn\'t match the vibrancy of her work — it felt ' +
          'too serious, rigid, and distant. She faced a common paradox in the ' +
          'expert space: immense authority, but struggling to appear accessible ' +
          'to the early-stage female entrepreneurs she wanted to help. The ' +
          'challenge was to strip away the corporate image and reveal the ' +
          'welcoming, transformative mentor underneath, without losing the ' +
          'credibility she had built over a decade.',
      },
      {
        title: 'The Strategy',
        text:
          'Our discovery phase identified a core concept: Human Sophistication. ' +
          'We needed a visual language that could hold two opposing ideas ' +
          'simultaneously — the Authority of a specialist and the Welcoming ' +
          'nature of a mentor. We used the metaphor of the Butterfly to ' +
          'represent the transformation she facilitates for her clients, mixing ' +
          'high-contrast serif typography for stature with a clean, modern ' +
          'sans-serif for clarity and humanity.',
      },
      {
        title: 'The Process',
        text:
          'We started with a deep-dive briefing to map Poliana\'s archetypes, ' +
          'identifying "The Creator" and "The Sage" traits. Moving into design, ' +
          'we developed a custom symbol that integrates three meanings: an ' +
          'abstract butterfly, a subtle "PP" monogram, and a tree structure ' +
          '(growth and stability). For the palette, we moved away from standard ' +
          'corporate blues to a sophisticated mix of Deep Blue, Moss Green, and ' +
          'warm Earth Tones (Terracotta and Sand) — grounded and organic, yet ' +
          'highly professional.',
      },
      {
        title: 'The Solution',
        text:
          'We delivered a comprehensive brand system versatile enough for both ' +
          'digital courses and high-end corporate consulting. The new identity ' +
          'features a dynamic logo system, a proprietary pattern for brand ' +
          'recall, and a social media framework that organizes her content into ' +
          'a cadence of authority and approachability. The result communicates ' +
          '"Success" not as a distant dream, but as a guided, achievable reality.',
      },
    ],
    deliverables: ['Brand Strategy', 'Visual Identity', 'Custom Symbol', 'Color System', 'Social Media Framework'],
    testimonial:
      "\"I wanted to stop looking 'too serious' and show that I truly hold my " +
      "clients' hands through their journey. This brand captures exactly that — " +
      "it's strong and professional, but it finally feels like me.\"",
    testimonialAuthor: 'Poliana Pionório, Business Mentor',
    hero: 'https://framerusercontent.com/images/ZV2SffrU1PUc3Sc49Pe6IDuVz0Y.png',
    thumb: 'https://framerusercontent.com/images/hO2CgC844nNOOoHI8odLP519TB4.jpg',
    gallery: [
      'https://framerusercontent.com/images/hO2CgC844nNOOoHI8odLP519TB4.jpg',
      'https://framerusercontent.com/images/ZV2SffrU1PUc3Sc49Pe6IDuVz0Y.png',
      'https://framerusercontent.com/images/rArl4rDI97OaFs4JnCPjU99toDw.jpg',
      'https://framerusercontent.com/images/pBnAU1Df75JLDtZspmneBJ4kfo.jpg',
      'https://framerusercontent.com/images/pvIbY6UbpgRkkrF05nT7IslHNRM.jpg',
      'https://framerusercontent.com/images/f58D8dEquIUsKz3SBIiw64rS0.png',
    ],
    image: { from: '#1f3d5c', to: '#a9714b', glyph: 'note' }, // fallback gradient
  },
  {
    id: 'prado-marum',
    name: 'Prado & Marum',
    client: 'Prado & Marum Advogados',
    year: '2025',
    kind: 'Brand Strategy & Identity',
    tagline:
      'Defining sophisticated equilibrium for a modern law firm — balancing ' +
      'traditional authority with approachable innovation.',
    sections: [
      {
        title: 'The Challenge',
        text:
          'Prado & Marum is a new firm composed of experienced professionals who ' +
          'needed to establish an immediate, solid presence in the legal market. ' +
          'They faced a statistic that defines the sector: 68% of clients choose ' +
          'lawyers based on trust and clarity. The challenge was to escape the ' +
          'sea of sameness in the legal industry — typically overly formal and ' +
          'rigid — and create a brand that reflected their innovative ' +
          'perspective without sacrificing the credibility essential to law.',
      },
      {
        title: 'The Strategy',
        text:
          'We developed the concept of sophisticated equilibrium. Our research ' +
          'showed that the most successful modern legal brands master the ' +
          'balance between opposing forces: Tradition vs. Modernity and ' +
          'Formality vs. Accessibility. Instead of relying on generic legal ' +
          'symbols (like gavels or scales), we decided to rely on the power of ' +
          'typography — a visual language that feels uncomplicated yet highly ' +
          'professional, positioning the firm as a partner that simplifies ' +
          'the complex.',
      },
      {
        title: 'The Process',
        text:
          'We selected Gelica in italics as the primary typeface for the ' +
          'logotype — the italics convey movement and dynamism while subtly ' +
          'referencing the traditional signature aspect of legal documents. We ' +
          'paired this with Satoshi, a modern sans-serif, to ensure absolute ' +
          'clarity in communication. For the colors, we moved away from harsh ' +
          'blacks to "Graphite" and "Serenity" (a calm teal), a palette that ' +
          'reduces visual aggression and promotes readability in long legal ' +
          'texts.',
      },
      {
        title: 'The Solution',
        text:
          'We delivered a purely typographic identity system that exudes ' +
          'confidence through simplicity. By removing all unnecessary icons, we ' +
          'reinforced the brand values of objectivity and clarity. The result is ' +
          'a visual system that allows the lawyers to present complex arguments ' +
          'in a clean, sophisticated frame — ensuring the firm is perceived as ' +
          'both a pillar of tradition and a modern business partner.',
      },
    ],
    deliverables: ['Brand Strategy', 'Typographic Identity', 'Art Direction', 'Color System', 'Brand Guidelines'],
    testimonial:
      '"We didn\'t want to look like just another law firm. This identity ' +
      'captures exactly who we are: serious about the law, but modern in our ' +
      'approach. It gives us the confidence to stand out in a crowded market."',
    testimonialAuthor: 'Hugo Marum, Founding Partner @ Prado & Marum',
    hero: 'https://framerusercontent.com/images/rKN77X2Dsjh2SDX79LyoJx71jY.png',
    thumb: 'https://framerusercontent.com/images/o9X5Z90uOq8pTsPLvh64NcNtp90.png',
    gallery: [
      'https://framerusercontent.com/images/o9X5Z90uOq8pTsPLvh64NcNtp90.png',
      'https://framerusercontent.com/images/vKROmSxcu74hCOom6vSOliUvgk.png',
      'https://framerusercontent.com/images/rKN77X2Dsjh2SDX79LyoJx71jY.png',
      'https://framerusercontent.com/images/2rpWntSg0JiOqyWRCNo6znzRTYE.png',
      'https://framerusercontent.com/images/fN9YmTPeSCoKfItuWBFiuNrTeM.png',
      'https://framerusercontent.com/images/InAN8Zy7c4Wftpj3L7GMZb6c7k.png',
      'https://framerusercontent.com/images/ErgwHuo48YAGBcSp2OoT2qb0X4.png',
    ],
    image: { from: '#3a3f44', to: '#4f9a94', glyph: 'shapes' },
  },
  {
    id: 'nutripharme',
    name: 'Nutripharme',
    client: 'Nutripharme — Saúde Animal',
    year: '2025',
    kind: 'Brand Strategy & Identity',
    tagline:
      'Closing the gap between scientific reality and market perception — ' +
      'branding a leader in veterinary nutraceuticals.',
    sections: [
      {
        title: 'The Challenge',
        text:
          'Nutripharme is a technical giant disguised as a small player. With ' +
          'over 15 years of history and groundbreaking proprietary technologies ' +
          '(like the ETR coating for NutriSAMe and the Support neonate line), ' +
          'their visual identity remained stuck in the past. The market viewed ' +
          'them as smaller than they actually were, and the packaging was ' +
          'described internally as "clean but boring". The challenge was to ' +
          'modernize the brand to reflect its true scientific authority without ' +
          'losing its ethical, prescription-focused DNA.',
      },
      {
        title: 'The Strategy',
        text:
          'We defined the brand essence around four pillars: Wise, Reliable, ' +
          'Innovative, and Careful — moving away from the cold, purely clinical ' +
          'aesthetic of the previous brand to embrace a "scientific care" ' +
          'positioning. While the vet is the decision-maker, the tutor is the ' +
          'one delivering the care, so the brand needed to be technical enough ' +
          'for the doctor but warm and accessible for the pet owner — a system ' +
          'that organizes a complex portfolio (from hepatics to neonates) ' +
          'through color and clarity, transforming medicine into care.',
      },
      {
        title: 'The Process',
        text:
          'The redesign centered on evolving the logotype: we replaced the ' +
          'abstract curves with a strong, distinct "N" symbol on a firm ' +
          'baseline, representing the company\'s scientific foundation. Museo ' +
          'Sans Rounded balances technical legibility with a friendly, human ' +
          'geometry. Crucially, we expanded the palette beyond corporate blue ' +
          'into a vibrant system (Red for Digestion, Purple for Energy, Pink ' +
          'for Neonates) to improve shelf navigation and emotional recall — ' +
          'plus strict photography guidelines favoring high-end, emotional ' +
          'imagery of the bond between tutor and pet.',
      },
      {
        title: 'The Solution',
        text:
          'We delivered a complete rebranding that prepares Nutripharme to be ' +
          'among the top 3 nutraceutical companies in Brazil. The new system ' +
          'provides a cohesive architecture for their 35+ SKUs, ensuring ' +
          'products like Enzymase and Vita Energy stand out individually while ' +
          'building masterbrand equity. The result feels premium and innovative ' +
          '— matching the value of the product inside the bottle and empowering ' +
          'the sales team to tell a story that justifies the investment.',
      },
    ],
    deliverables: ['Rebranding', 'Packaging System', 'Visual Identity', 'Color Architecture', 'Photography Guidelines'],
    testimonial:
      '"For years, our image was smaller than our reality. This new brand ' +
      'finally does justice to our technology. It gives our team pride and ' +
      'makes it easier to show the vet and the tutor why our product makes a ' +
      'difference."',
    testimonialAuthor: 'Alessandro Freiberger, Co-founder & Director @ Nutripharme',
    hero: 'https://framerusercontent.com/images/0ydwY78fQTVcyFNaDwiiNv1a0E.png',
    thumb: 'https://framerusercontent.com/images/DYKjzfYwpU2A83ZdUGK1XVA64E4.png',
    gallery: [
      'https://framerusercontent.com/images/q8TWSm8LvhQyVGP46JeeCzpqM.png',
      'https://framerusercontent.com/images/0ydwY78fQTVcyFNaDwiiNv1a0E.png',
      'https://framerusercontent.com/images/ZNbzPctspuJo1vsY7wrHnpeybJ4.png',
      'https://framerusercontent.com/images/DYKjzfYwpU2A83ZdUGK1XVA64E4.png',
      'https://framerusercontent.com/images/pf4rgrgTf4y2lhTQqunoafWZHRk.png',
      'https://framerusercontent.com/images/wD2RsfpIDkQ4gHACeVmtSYpkNg4.png',
    ],
    image: { from: '#1e40af', to: '#10b981', glyph: 'pulse' },
  },
  {
    id: 'checksy',
    name: 'Checksy',
    client: 'Checksy Learning',
    year: '2024',
    kind: 'Brand Strategy & Identity',
    tagline:
      'Redefining the perception of chess through a modern, vibrant and ' +
      'accessible digital learning experience.',
    sections: [
      {
        title: 'The Challenge',
        text:
          'Traditional chess platforms often feel antiquated, overly academic, ' +
          'and intimidating, creating a high barrier to entry for newcomers and ' +
          'younger users. Checksy needed an identity that could bridge the ' +
          'intellectual depth of the game with a welcoming, modern, and ' +
          'engaging user experience — signifying "smart thinking" without ' +
          'resorting to clichés.',
      },
      {
        title: 'The Strategy',
        text:
          'Our strategy was to inject dynamism and energy into a historically ' +
          'serious subject. We positioned Checksy as the "Agile Mind" platform. ' +
          'The core insight was leveraging the Knight piece — the most ' +
          'adaptable and strategically mobile piece on the board — to symbolize ' +
          'smart, non-linear thinking. This allowed us to build a geometric, ' +
          'clean, and memorable logo versatile enough for digital interfaces.',
      },
      {
        title: 'The Process',
        text:
          'We began by defining the brand personality as "Encouraging, Focused, ' +
          'and Dynamic." The visual language started with the custom geometric ' +
          'logomark, then a comprehensive color palette: the core deep blue ' +
          '(representing focus) paired with vibrant accents — yellow, red, ' +
          'green — used contextually in the app to highlight learning modules ' +
          'and key actions.',
      },
      {
        title: 'The Solution',
        text:
          'We delivered a complete, scalable brand identity system featuring ' +
          'the stylized Knight logomark and a flexible, dynamic color palette. ' +
          'Final delivery included a detailed style guide for the forthcoming ' +
          'learning app, social media assets, and various profile formats. The ' +
          'result is immediately recognizable — modern, inviting, and ' +
          'encouraging for chess learners of all levels.',
      },
    ],
    deliverables: ['Brand Strategy', 'App Identity', 'Geometric Logomark', 'Dynamic Color Palette', 'Style Guide'],
    testimonial:
      '"The Checksy brand successfully takes chess out of the library and puts ' +
      'it onto the smart screen. The logo is sharp, the colors are engaging, ' +
      'and the entire identity perfectly captures our vision of making ' +
      'strategic thinking fun and accessible."',
    testimonialAuthor: 'Ben Carter, Chief Technology Officer @ Checksy',
    hero: 'https://framerusercontent.com/images/EaP9tVZpnqiPyw6OH5rBsrrVHZk.jpg',
    thumb: 'https://framerusercontent.com/images/guwz8Kz1qxh3G7tOcTghGLJg48.jpg',
    gallery: [
      'https://framerusercontent.com/images/YG23ksCeiF7GWbCg5vtB35NUkdk.jpg',
      'https://framerusercontent.com/images/guwz8Kz1qxh3G7tOcTghGLJg48.jpg',
      'https://framerusercontent.com/images/EaP9tVZpnqiPyw6OH5rBsrrVHZk.jpg',
      'https://framerusercontent.com/images/2NbiTeEnKfddOCIXhZLUDeRTiSw.jpg',
      'https://framerusercontent.com/images/IxSZPgshtsyxus2ximBNRVASYSQ.jpg',
      'https://framerusercontent.com/images/fm4akmgkHCezegS1t8pqyMzEec.png',
    ],
    image: { from: '#1e3a8a', to: '#facc15', glyph: 'code' },
  },
]

export const experience = [
  {
    id: 'dotbrands',
    company: 'DotBrands',
    role: 'Senior Brand Designer',
    period: '2023 — Present',
    location: 'Brazil',
    bullets: [
      'Leading a 4-designer team through a complete brand architecture overhaul — 8 product lines unified under one scalable visual system.',
      'Site redesign drove +22% conversion.',
      'Teaching the team to close the gap between business meaning and what people see — without me in the room.',
    ],
  },
  {
    id: 'nexus',
    company: 'Nexus Creative Studio',
    role: 'Brand Designer',
    period: '2022 — 2023',
    location: 'US & LATAM',
    bullets: [
      '15+ full identities for tech and luxury clients across the US and LATAM.',
      'Averaged +60% social engagement after launch.',
    ],
  },
  {
    id: 'mybrief',
    company: '_mybrief',
    role: 'Graphic Designer',
    period: '2021 — 2022',
    location: 'Brazil',
    bullets: [
      '550+ static and video assets for 12 tech clients.',
      'Rigorous A/B testing lifted average campaign engagement by 50%.',
    ],
  },
]

export const education = [
  {
    school: 'Humber College, Toronto',
    degree: 'Graphic Design for Print & Web',
    period: '2020',
    detail: 'Graduated top 5% of the class — specialization in Advanced Typography.',
  },
]

// Real repos from github.com/xiskg — the designer's own side projects.
export const devSkills = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Swift', 'Shell'] },
  { group: 'Frameworks & Runtime', items: ['Next.js', 'React', 'SwiftUI', 'Node.js'] },
  { group: 'Tooling & Ops', items: ['Docker', 'Homebrew packaging', 'CasaOS', 'Model Context Protocol (MCP)'] },
]

export const devProjects = [
  {
    id: 'kdash',
    name: 'Lumina E-Ink',
    client: 'Personal Hacker Project',
    year: '2025',
    kind: 'Jailbroken E-Ink Productivity Dashboard',
    tagline: 'Jailbroken E-Ink Productivity Dashboard',
    accent: '#000000',
    private: true,
    stack: ['C++', 'Linux Framebuffer API', 'Deno/TS'],
    url: 'https://github.com/xiskg/kdashboard',
    sections: [
      {
        title: 'The Challenge',
        text: "Kindles are locked ecosystems. Re-purposing an old e-reader as a low-power, ambient smart display without using the sluggish experimental browser required bypassing Amazon's entire GUI.",
      },
      {
        title: 'The Architecture',
        text: 'Built around a two-part architecture: a Deno/TypeScript server running on a local Raspberry Pi fetching weather, tasks, and system data, and a cross-compiled C++ binary running natively on the Kindle to consume and render this data.',
      },
      {
        title: 'The Engineering',
        text: 'Jailbroke the Kindle using standard exploits to gain SSH access. Killed the Amazon framework (`lipc-set-prop`) and wrote a custom C++ application using `libpng` and raw writing to the `/dev/fb0` Linux framebuffer to flip E-ink pixels directly without X11.',
      },
      {
        title: 'The Solution',
        text: 'The device now runs unattended on battery for weeks, waking up via cron to poll the Deno API, refresh the screen in under 200ms, and go back to deep sleep. A beautiful, distraction-free dashboard.',
      },
    ]
  },
  {
    id: 'pimcora',
    name: 'Nexus Edge Engine',
    client: 'Retail Tech',
    year: '2024',
    kind: 'Serverless Edge Architecture & MCP Engine',
    tagline: 'Serverless Edge Architecture & MCP Engine',
    accent: '#f59e0b',
    private: true,
    stack: ['Next.js 16', 'Cloudflare Workers', 'Cloudflare D1', 'MCP API'],
    url: 'https://github.com/xiskg/pimcora-precificacao',
    sections: [
      {
        title: 'The Challenge',
        text: 'A pricing calculator tool that needed to serve hundreds of complex SKU variations with extremely low latency, while maintaining a single source of truth for changing product catalogs.',
      },
      {
        title: 'The Architecture',
        text: 'Transitioned from a monolithic Node.js backend to a globally distributed Cloudflare Workers edge architecture. State is managed via Cloudflare D1 (SQLite at the edge), providing 0ms cold starts.',
      },
      {
        title: 'The Engineering',
        text: 'Built a custom Model Context Protocol (MCP) server integration to allow AI agents to securely query and update the pricing catalog in real-time. Created a highly optimized Next.js 16 App Router frontend with heavy caching strategies.',
      },
      {
        title: 'The Solution',
        text: 'Pricing requests dropped from 400ms to ~30ms globally. The MCP integration allowed internal teams to query complex pricing matrices using natural language via Claude, saving hours of manual spreadsheet lookup.',
      },
    ]
  },
  {
    id: 'clockify',
    name: 'Chrono Native',
    client: 'Productivity Tool',
    year: '2025',
    kind: 'macOS Passive Tracking Daemon',
    tagline: 'macOS Passive Tracking Daemon',
    accent: '#3b82f6',
    private: false,
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'Grand Central Dispatch'],
    url: 'https://github.com/xiskg/clockify-clone-native',
    sections: [
      {
        title: 'The Challenge',
        text: 'Electron-based time trackers (like Clockify) consume excessive RAM and drain laptop batteries. I needed a native macOS application that felt invisible, fast, and fully integrated with the OS.',
      },
      {
        title: 'The Architecture',
        text: '100% native Swift application utilizing SwiftUI for the Menu Bar interface and SwiftData for local, persistent storage. Operates almost entirely as a background daemon.',
      },
      {
        title: 'The Engineering',
        text: 'Leveraged Grand Central Dispatch (GCD) for precise background timers that survive system sleep states. Intercepted global keyboard shortcuts using `NSEvent.addGlobalMonitorForEvents` to allow users to start/stop tracking without opening the app.',
      },
      {
        title: 'The Solution',
        text: 'A lightning-fast, 4MB application that idles at 0% CPU and consumes less than 15MB of RAM. The Menu Bar integration feels exactly like a first-party Apple utility.',
      },
    ]
  },
  {
    id: 'grimoire',
    name: 'Mythos VTT',
    client: 'Gaming Utilities',
    year: '2024',
    kind: 'Realtime Server-Sent Events RPG Client',
    tagline: 'Realtime Server-Sent Events RPG Client',
    accent: '#ef4444',
    private: false,
    stack: ['Next.js 16', 'React 19', 'PostgreSQL', 'SSE'],
    url: 'https://github.com/xiskg/dnd-player-manager',
    sections: [
      {
        title: 'The Challenge',
        text: "Tabletop RPG players needed a synchronized character sheet manager where HP, spell slots, and inventory changes reflect instantly across the Game Master's screen and all players without manual refreshing.",
      },
      {
        title: 'The Architecture',
        text: 'Built on Next.js 16 App Router with a PostgreSQL database. Initially considered WebSockets, but opted for Server-Sent Events (SSE) to dramatically reduce server overhead for uni-directional state pushing.',
      },
      {
        title: 'The Engineering',
        text: 'Implemented optimistic UI updates in React 19 using `useOptimistic` hooks. When a player takes damage, the UI updates instantly locally, while the background mutation resolves to the DB and pushes the SSE event to other connected clients.',
      },
      {
        title: 'The Solution',
        text: 'A highly responsive, real-time gaming tool that handles hundreds of simultaneous state mutations gracefully. The optimistic UI masks network latency completely, providing a native-app feel.',
      },
    ]
  },
  {
    id: 'bunker',
    name: 'Bunker LeadGen',
    client: 'B2B Sales Automation',
    year: '2023',
    kind: 'B2B Maps Scraping & Local LLM Pipeline',
    tagline: 'B2B Maps Scraping & Local LLM Pipeline',
    accent: '#10b981',
    private: true,
    stack: ['Node.js', 'Express', 'Cheerio', 'Puppeteer', 'Ollama'],
    url: 'https://github.com/xiskg/bunker-outrch',
    sections: [
      {
        title: 'The Challenge',
        text: 'The sales team needed to extract thousands of targeted business contacts from Google Maps, clean the data, categorize leads, and generate personalized cold outreach emails automatically.',
      },
      {
        title: 'The Architecture',
        text: 'A Node.js microservice architecture orchestrating headless browser instances, communicating with a local SQLite database, and piping data through an offline LLM (Llama 3 via Ollama) to avoid API costs.',
      },
      {
        title: 'The Engineering',
        text: 'Engineered stealth Puppeteer scripts with randomized human-like delays and proxy rotation to bypass rate limits. Piped the raw HTML through Cheerio for rapid DOM parsing. Built a local inference pipeline using Ollama to categorize businesses and draft context-aware emails.',
      },
      {
        title: 'The Solution',
        text: 'Automated 40 hours of manual SDR work into a 15-minute script. The system runs locally, costs $0 in LLM API fees, and outputs clean CSVs of highly qualified, categorized leads with pre-written outreach drafts.',
      },
    ]
  },
  {
    id: 'antigravity',
    name: 'Antigravity OS',
    client: 'Google Deepmind / Personal',
    year: '2026',
    kind: 'Window Management Simulation Engine',
    tagline: 'Window Management Simulation Engine',
    accent: '#64748b',
    private: false,
    stack: ['React 19', 'Vite', 'Modern CSS', 'Framer Motion'],
    url: 'https://github.com/xiskg/macos-portfolio',
    sections: [
      {
        title: 'The Challenge',
        text: 'Creating a web portfolio that breaks the standard scrolling paradigm by fully simulating a desktop operating system (macOS) in the DOM, complete with window management, draggable UI, and functional applications.',
      },
      {
        title: 'The Architecture',
        text: 'A purely frontend, state-driven architecture using React context to manage an array of complex window objects (Z-index, bounds, maximized state, active focus).',
      },
      {
        title: 'The Engineering',
        text: 'Built a custom dragging and resizing engine from scratch using Pointer Events API to ensure 60fps performance without heavy third-party libraries. Implemented a mock Virtual File System (VFS) to simulate directories, `.txt` files, and `.webloc` links.',
      },
      {
        title: 'The Solution',
        text: 'A stunning, interactive portfolio that serves as a living proof of deep frontend engineering skills. The windowing system handles edge cases like boundary collision, z-index stacking, and responsive reflowing gracefully.',
      },
    ]
  },
  {
    id: 'fgb',
    name: 'Aura Web Framework',
    client: 'Design Agency',
    year: '2024',
    kind: 'Interactive Motion-Driven Framework',
    tagline: 'Interactive Motion-Driven Framework',
    accent: '#8b5cf6',
    private: true,
    stack: ['React 18', 'Vite', 'Framer Motion', 'Zustand'],
    url: 'https://github.com/xiskg/fgb-web',
    sections: [
      {
        title: 'The Challenge',
        text: "A creative agency required an ultra-premium, interactive web platform with complex scroll-jacking, physics-based animations, and seamless page transitions that standard CSS couldn't handle.",
      },
      {
        title: 'The Architecture',
        text: 'Single Page Application (SPA) built with Vite and React, heavily leveraging Framer Motion for orchestration. Global animation states and cursor physics are managed via Zustand for zero-prop-drilling performance.',
      },
      {
        title: 'The Engineering',
        text: 'Engineered a custom physics cursor that morphs based on underlying DOM elements using `getBoundingClientRect` intersections. Synchronized complex stagger animations using `AnimatePresence` and custom SVG path interpolations.',
      },
      {
        title: 'The Solution',
        text: 'An Awwwards-level interactive experience that maintains 60fps even on mobile devices. The framework acts as a reusable foundation for future high-motion agency projects.',
      },
    ]
  },
  {
    id: 'agata',
    name: 'Terminal Scrollytelling',
    client: 'Developer Portfolio',
    year: '2025',
    kind: 'Terminal-styled Scrollytelling Architecture',
    tagline: 'Terminal-styled Scrollytelling Architecture',
    accent: '#000000',
    private: true,
    stack: ['Next.js 16', 'React 19', 'Framer Motion', 'Tailwind'],
    url: 'https://github.com/xiskg/agata-portfolio',
    sections: [
      {
        title: 'The Challenge',
        text: 'Designing a highly technical, command-line inspired portfolio that tells a story through scrolling (scrollytelling) without feeling overwhelming or breaking accessibility standards.',
      },
      {
        title: 'The Architecture',
        text: 'Next.js 16 SSR to ensure fast initial loads of static content, with client-side React 19 hooks capturing scroll progress via `useScroll` to drive Framer Motion progress bars and text reveals.',
      },
      {
        title: 'The Engineering',
        text: "Built a custom 'Typewriter' engine that respects React's concurrent rendering, parsing raw text into AST nodes to apply syntax highlighting and typing animations simultaneously without DOM thrashing.",
      },
      {
        title: 'The Solution',
        text: 'A striking, hyper-nerdy portfolio that performs exceptionally well. The scrollytelling mechanics keep users engaged 3x longer than traditional static resumes.',
      },
    ]
  }
]

// ---------------------------------------------------------------------------
//  Generated documents
// ---------------------------------------------------------------------------

export const resumeText = `${profile.name.toUpperCase()}
${profile.role}
${profile.location}  ·  ${profile.email}

SUMMARY
-------
${profile.aboutShort}

EXPERIENCE
----------
${experience
  .map(
    (j) => `${j.role} — ${j.company} (${j.period})
${j.bullets.map((b) => `  • ${b}`).join('\n')}`
  )
  .join('\n\n')}

SELECTED CASES
--------------
${projects
  .map((p) => `${p.name} (${p.year}) — ${p.tagline}
  Deliverables: ${p.deliverables.join(', ')}`)
  .join('\n\n')}

SKILLS
------
${skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join('\n')}

EDUCATION
---------
${education.map((e) => `${e.degree} — ${e.school} (${e.period})
${e.detail}`).join('\n')}

KEY NUMBERS
-----------
${metrics.map((m) => `${m.value} ${m.label}`).join('\n')}
`

export const devResumeText = `${profile.name.toUpperCase()} — DEV SIDE
${'='.repeat(profile.name.length + 10)}
Brand designer who also ships code. Small tools, real problems, shipped end to end.

STACK
-----
${devSkills.map((s) => `${s.group}: ${s.items.join(', ')}`).join('\n')}

PROJECTS
--------
${devProjects
  .map((p) => `${p.name} (${p.stack.join(', ')})${p.stars ? `  ★ ${p.stars}` : ''}
  ${p.tagline}
  ${p.private ? '[Private Infrastructure]' : p.url}`)
  .join('\n\n')}

Full repo list: ${profile.github}
`

export const creditsText = `MACOS PORTFOLIO — CREDITS
=========================
This whole desktop is a portfolio, built by hand as a working macOS simulation.

MADE BY
-------
${profile.name} — ${profile.role}
${profile.github}

OPEN SOURCE
-----------
This project's source is MIT-licensed — fork it, learn from it, ship your own
version. The one rule: keep the credit above intact. Full terms in LICENSE.

BUILT WITH
----------
React, Vite — no UI framework, hand-tuned CSS throughout.

ACKNOWLEDGMENTS
---------------
· Finder, Safari, Mail, Photos, Terminal, TextEdit and Trash icons are Apple
  Inc.'s own artwork, extracted for this simulation — not covered by the MIT
  license, not affiliated with or endorsed by Apple.
· Case-study photography served from the original portfolio's CDN
  (framerusercontent.com).
· Everything else — wallpapers, glyphs, window chrome, the rest of the icon
  set — is drawn from scratch for this project.
`

// ---------------------------------------------------------------------------
//  Mail app inbox
// ---------------------------------------------------------------------------

export const mailInbox = [
  {
    id: 'welcome',
    from: 'Portfolio Bot',
    fromEmail: 'bot@dealmeida.me',
    to: profile.email,
    subject: 'Welcome to my desktop 👋',
    date: 'Today, 9:41 AM',
    unread: true,
    body:
      `Hi there,\n\n` +
      `Welcome to my little corner of the internet — a portfolio disguised as macOS.\n\n` +
      `A few tips to get you started:\n` +
      `  • Double-click the Portfolio folder to browse the case studies\n` +
      `  • Flip through the artwork in Photos — it's all real project work\n` +
      `  • Press ⌘Space (or click the magnifier) to search everything with Spotlight\n` +
      `  • Open the Terminal and type "neofetch" for a quick summary of who I am\n` +
      `  • Right-click the desktop to change the wallpaper\n\n` +
      `Want to get in touch for real? Hit Compose right here in Mail — it opens your ` +
      `actual mail client, no forms, no gatekeeping.\n\n` +
      `— ${profile.shortName}`,
  },
  {
    id: 'referral',
    from: 'Hugo Marum',
    fromEmail: 'hugo@pradomarum.com.br',
    to: profile.email,
    subject: 'Sending a founder your way',
    date: 'Yesterday, 4:12 PM',
    unread: true,
    body:
      `João,\n\n` +
      `A founder friend of mine is rebranding her fintech and asked who did our ` +
      `identity. I gave her your email — expect a message from a "Marina" this week.\n\n` +
      `The "sophisticated equilibrium" line is still working its magic here, by the ` +
      `way: two new clients this quarter said they picked us because we "looked ` +
      `modern but trustworthy" — your words, basically, just paying rent now.\n\n` +
      `Let's grab coffee next time you're in São Paulo. On me — I still owe you one ` +
      `for talking me out of the navy-and-gold logo.\n\n` +
      `Abraço,\nHugo`,
  },
  {
    id: 'conf',
    from: 'Brand Conf LATAM',
    fromEmail: 'talks@brandconflatam.com',
    to: profile.email,
    subject: 'Talk proposal: “Strategy and craft, one hand”',
    date: 'Monday, 11:03 AM',
    unread: false,
    body:
      `Hi João,\n\n` +
      `We loved the Nutripharme case in your portfolio and would like to invite ` +
      `you to speak at Brand Conf LATAM about building color-coded packaging ` +
      `architectures for large SKU families — it's the kind of unglamorous-sounding ` +
      `problem our audience actually loses sleep over.\n\n` +
      `25 minutes, main stage, São Paulo, October. Travel covered. Interested?\n\n` +
      `— Marília, Programming Committee\nBrand Conf LATAM`,
  },
]

// ---------------------------------------------------------------------------
//  Notification Center
// ---------------------------------------------------------------------------

export const notificationsSeed = [
  {
    app: 'Finder',
    icon: 'finder',
    title: 'Welcome to my portfolio',
    body: 'This whole site is a macOS Tahoe clone. Double-click things — everything opens.',
    time: 'now',
  },
  {
    app: 'Photos',
    icon: 'photos',
    title: 'Real artwork inside',
    body: 'The Photos app is loaded with actual case imagery — Poliana, Prado & Marum, Nutripharme and Checksy.',
    time: '2m ago',
  },
  {
    app: 'Terminal',
    icon: 'terminal',
    title: 'Tip: Terminal',
    body: 'There is a real shell in here. Try `help`, `ls` or `neofetch`.',
    time: '5m ago',
  },
]
