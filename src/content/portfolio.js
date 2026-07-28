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
    id: 'cloud-optimizer',
    name: 'Cloud Optimizer',
    tagline: 'Kills macOS Wi-Fi latency spikes during cloud gaming by managing AWDL and rapportd in real time.',
    stack: ['Swift', 'SwiftUI', 'Shell'],
    stars: 6,
    url: 'https://github.com/xiskg/cloud-optimizer',
    accent: '#f05138',
  },
  {
    id: 'casaos-mcp',
    name: 'CasaOS MCP Server',
    tagline: "Lets AI assistants manage a CasaOS home server's Docker containers directly — 14 native tools, no root access required.",
    stack: ['TypeScript', 'Node.js', 'MCP SDK'],
    stars: 0,
    url: 'https://github.com/xiskg/casaos-mcp',
    accent: '#3178c6',
  },
  {
    id: 'agata-portfolio',
    name: 'Agata Domingues — Portfolio',
    tagline: 'Terminal-styled scrollytelling portfolio built for a backend software engineer client.',
    stack: ['Next.js', 'TypeScript', 'CSS'],
    stars: 0,
    url: 'https://github.com/xiskg/agata-portfolio',
    accent: '#000000',
  },
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
  ${p.url}`)
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
