"""Build static pages from the approved portfolio manuscript. No runtime dependencies."""
from pathlib import Path
from html import escape
import re, shutil, json

ROOT = Path(__file__).resolve().parent
DIST = ROOT.parent / 'public' / 'product-design'
BASE_PATH = '/product-design'
ORIGIN = 'https://dealmeida.me'
CONTENT = ROOT / 'content'
if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir(parents=True, exist_ok=True)
shutil.copytree(ROOT / 'assets', DIST / 'assets', dirs_exist_ok=True,
                ignore=shutil.ignore_patterns('*.json'))
for name in ['styles.css', 'app.js', 'favicon.svg']:
    shutil.copy2(ROOT / name, DIST / name)
video = ROOT / 'assets' / 'video' / 'fastgovbid-walkthrough.mp4'
if video.stat().st_size > 8 * 1024 * 1024:
    raise ValueError('Walkthrough exceeds the media handler limit; use object storage for a larger film.')
(ROOT.parent / 'worker' / 'video-meta.json').write_text(json.dumps({'byteLength': video.stat().st_size})+'\n')

def inline(s):
    s = escape(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', s)
    return s

def sections(name):
    text = (CONTENT / name).read_text()
    parts = re.split(r'^## ', text, flags=re.M)
    result = {'intro': parts[0]}
    for part in parts[1:]:
        heading, _, body = part.partition('\n')
        result[heading.strip()] = body.strip()
    return result

def blocks(text):
    return [p.replace('\n', ' ').strip() for p in re.split(r'\n\s*\n', text) if p.strip()]

def paras(text, omit_caption=True):
    return [f'<p>{inline(p)}</p>' for p in blocks(text)
            if not p.startswith('#') and not (omit_caption and p.startswith('*') and not p.startswith('**'))]

H = sections('HOME-PORTFOLIO-EN.md')
C = sections('CASE-FASTGOVBID-EN.md')
ARROW = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
UPRIGHT = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>'
ZOOM = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 4H4v4m12-4h4v4M4 16v4h4m8 0h4v-4"/></svg>'
EMAIL = 'joaoadriano.psd@gmail.com'
CV = '/assets/documents/joao-de-almeida-resume.pdf'
LINKEDIN = 'https://www.linkedin.com/in/jojoao/'
ASSETS = {a['file']: a for a in json.loads((ROOT/'asset-manifest.json').read_text())['assets']} if (ROOT/'asset-manifest.json').exists() else {}

def header(case=False):
    return f'''<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><a class="wordmark" href="/" aria-label="João de Almeida, home">João de Almeida<span class="wordmark-dot" aria-hidden="true">.</span></a>
<nav aria-label="Main navigation"><a href="{'/#work' if case else '#work'}">Work</a><a href="{'/#about' if case else '#about'}">About</a><a href="{CV}" target="_blank" rel="noopener">Resume {UPRIGHT}</a><a class="nav-contact" href="mailto:{EMAIL}">Let's talk {UPRIGHT}</a></nav></header>'''

def footer():
    return f'''<footer class="contact" id="contact"><div class="contact-inner"><h2>Let's talk about<br>a product design role.</h2><div class="contact-copy"><p>If you're hiring, I'd be glad to talk about how I could contribute.</p><a class="email-link" href="mailto:{EMAIL}">Email me {UPRIGHT}</a><div class="contact-links"><a href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn {UPRIGHT}</a><a href="{CV}" target="_blank" rel="noopener">View resume {UPRIGHT}</a></div></div><div class="footer-line"><span>João de Almeida</span><span>Based in Brazil · Working internationally</span><a href="#top">Back to top ↑</a></div></div></footer>'''

def shell(title, description, body, path='/'):
    # Keep local links and media inside this mount; leave external links intact.
    body = re.sub(r'\b(href|src)="/(?!/)', lambda m: m[1]+'="'+BASE_PATH+'/', body)
    origin = ORIGIN + BASE_PATH
    return f'''<!doctype html>
<html lang="en" id="top"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#ffffff"><title>{escape(title)}</title><meta name="description" content="{escape(description)}"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(description)}"><meta property="og:type" content="website"><meta property="og:image" content="{origin}/assets/video/poster.png"><meta property="og:url" content="{origin}{path}"><link rel="canonical" href="{origin}{path}"><link rel="icon" type="image/svg+xml" href="{BASE_PATH}/favicon.svg"><link rel="preload" href="{BASE_PATH}/assets/fonts/Archivo.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="{BASE_PATH}/styles.css"><script src="{BASE_PATH}/app.js" defer></script></head><body>{body}<dialog class="image-dialog" aria-labelledby="image-dialog-title"><div class="dialog-toolbar"><p id="image-dialog-title">Interface detail</p><div><button type="button" class="image-size" aria-pressed="false">Actual size</button><button type="button" class="dialog-close" aria-label="Close image">Close <span aria-hidden="true">×</span></button></div></div><div class="dialog-image-area"></div></dialog></body></html>'''

def shot(name, alt, caption='', cls='', eager=False):
    thumb = name+'-detail' if (DIST/'assets'/'screens'/(name+'-detail.webp')).exists() else name
    dims = ASSETS.get(thumb+'.webp', {}).get('outputDimensions', {})
    dimensions = f' width="{dims["width"]}" height="{dims["height"]}"' if dims else ''
    return f'''<figure class="screen-figure {cls}"><a class="image-open" href="/assets/screens/{name}.webp" data-enlarge aria-label="Enlarge: {escape(alt)}"><img src="/assets/screens/{thumb}.webp"{dimensions} alt="{escape(alt)}" loading="{'eager' if eager else 'lazy'}" decoding="async"><span class="enlarge-label">{ZOOM}<span>View detail</span></span></a>{f'<figcaption>{inline(caption)}</figcaption>' if caption else ''}</figure>'''

def comparison(kind, items, caption):
    tabs = ''.join(f'<button type="button" id="{kind}-tab-{i}" role="tab" aria-controls="{kind}-panel-{i}" aria-selected="{str(i==0).lower()}" tabindex="{0 if i==0 else -1}">{label}</button>' for i,(label,_,_) in enumerate(items))
    panels = ''.join(f'<div role="tabpanel" id="{kind}-panel-{i}" aria-labelledby="{kind}-tab-{i}" tabindex="0">{shot(name,alt)}</div>' for i,(_,name,alt) in enumerate(items))
    return f'<div class="comparison" data-tabs><div class="tablist" role="tablist" aria-label="{kind.capitalize()} design comparison">{tabs}</div>{panels}<p class="comparison-caption">{caption}</p></div>'

home_intro = blocks(H['intro'])[1:]
home_bio = next(p for p in home_intro if p.startswith("I'm"))
home = f'''{header()}<main id="main"><section class="home-intro wrap"><h1>Product design for work<br class="desktop-break"> with a lot of <span>moving parts.</span></h1><div class="intro-bottom"><p>{inline(home_bio)}</p><div class="intro-actions"><a class="text-link" href="#work">View my work {ARROW}</a><span>Based in Brazil · Open to remote roles</span></div></div></section>
<section class="work-preview wrap" id="work"><a class="project-cover" href="/work/fastgovbid/" aria-label="Explore the FastGovBid case"><div class="cover-mat"><img src="/assets/screens/proposal-editor.webp" width="2160" height="1350" alt="FastGovBid proposal editor, with section navigation, an active draft and contextual tools." fetchpriority="high"><span class="cover-corner" aria-hidden="true">{UPRIGHT}</span></div><div class="project-caption"><h2>FastGovBid</h2><div><h3>One opportunity,<br>from search to proposal.</h3><p>Product and interface design · 2026</p></div><span class="project-action">Explore the case {ARROW}</span></div></a><p class="project-scope">Product and interface design across two search modes, pursuit tracking and proposal authoring, with related work in onboarding, documents, settings and the visual system.</p><a class="text-link walkthrough-link" href="/work/fastgovbid/#walkthrough">Watch the 60-second walkthrough {ARROW}</a></section>
<section class="about wrap" id="about"><div><h2>How I work</h2>{''.join(paras(H['How I work']))}</div><div class="more-work"><h2>More visual and<br>interaction work</h2>{''.join(paras(H['More visual and interaction work'])[:-1])}<a class="text-link" href="https://dealmeida.me/" target="_blank" rel="noopener">Explore more work {UPRIGHT}</a></div></section></main>{footer()}'''

search = paras(C['Search that keeps its place'])
proposal = paras(C['A proposal workspace for the unfinished draft'])
prime = paras(C['Reframing partner discovery'])
support = paras(C['The systems around the journey'])
case_intro = next(p for p in blocks(C['intro']) if p.startswith('I designed'))
index = '<aside class="case-index"><nav aria-label="Case chapters"><span class="index-title">In this case</span><a href="#context">The work</a><a href="#search">Search</a><a href="#authoring">Proposal authoring</a><a href="#partners">Partner discovery</a><a href="#product-system">Around the journey</a><a href="#next">What comes next</a></nav><a class="index-resume" href="'+CV+'" target="_blank" rel="noopener">View resume '+UPRIGHT+'</a></aside>'

status_summary = '''<div class="delivery-summary"><h3>What this case demonstrates</h3><dl><div><dt>Proposal workspace</dt><dd>Design delivered; engineering implementation merged in May 2026. Document Preview remained a follow-up.</dd></div><div><dt>Two search modes</dt><dd>Design specification, dated August 4. Shared-query behavior demonstrated below.</dd></div><div><dt>Prime List</dt><dd>Design proposal based on the September 3 brief. Includes source freshness and exception states.</dd></div></dl></div>'''

search_study = '''<div class="interaction-study" data-query-study hidden><h3>Try switching search modes</h3><p>Change a deadline, add a condition in Advanced, then switch back. The criteria should stay with you.</p><div class="study-controls" role="group" aria-label="Search mode demonstration"><button type="button" data-mode="guided" aria-pressed="true">Guided</button><button type="button" data-mode="advanced" aria-pressed="false">Advanced</button></div><fieldset class="study-guided"><legend>Guided search criteria</legend><p>I want <strong>building &amp; facility services</strong> contracts in <strong>Texas and Ohio</strong> that close in the <label for="guided-deadline">next <select id="guided-deadline" data-deadline><option value="30">30 days</option><option value="60" selected>60 days</option><option value="90">90 days</option></select></label>.</p></fieldset><fieldset class="study-advanced" hidden><legend>Advanced search criteria</legend><div class="study-fields"><p><span>Work</span><strong>Building &amp; facility services</strong></p><p><span>Location</span><strong>Texas and Ohio</strong></p><label for="advanced-deadline">Closes within<select id="advanced-deadline" data-deadline><option value="30">30 days</option><option value="60" selected>60 days</option><option value="90">90 days</option></select></label></div><label class="study-checkbox"><input type="checkbox" data-ready> Ready to bid only</label></fieldset><div class="study-extra" hidden><span>Additional condition still applied</span><p>Ready to bid only <button type="button" data-remove-ready aria-label="Remove Ready to bid only condition">Remove</button></p></div><p class="study-status" role="status" aria-live="polite" aria-atomic="true">Guided mode. Deadline: 60 days. No additional conditions.</p><p class="study-caption">Interactive specification demo rebuilt for this case from the August 4 design record. Sample criteria; no live search or account data.</p><button type="button" class="study-reset" data-reset-study>Reset example</button></div>
<details class="handoff-notes"><summary>Read the handoff rules</summary><p>Condensed from the search decision record. These are acceptance conditions for the design, rather than production-test results.</p><div class="notes-table-wrap"><table><caption>Mode switching: acceptance examples</caption><thead><tr><th scope="col">Starting state</th><th scope="col">Action</th><th scope="col">Expected behavior</th></tr></thead><tbody><tr><td>Work, location and deadline chosen in Guided</td><td>Open Advanced</td><td>The same criteria appear in the query. Switching views does not clear them.</td></tr><tr><td>An additional filter chosen in Advanced</td><td>Return to Guided</td><td>The condition remains applied and named below the sentence.</td></tr><tr><td>A saved search</td><td>Open it from either mode</td><td>Use the same query object; do not duplicate the saved search by mode.</td></tr></tbody></table></div></details>'''

review_timeline = '<div class="review-record"><h3>From review to implementation</h3><p class="record-source">Summarized from the project discussion and delivery records, April–May 2026.</p><ol>'+''.join(f'<li>{p}</li>' for p in paras(C['From review to implementation']))+'</ol></div>'

validation_plan = '''<div class="validation-plan"><h3>The next evaluation</h3><p>Before inviting people who prepare bids, I would confirm which screens are available in the current build. The session would record task completion, help needed and misunderstandings, then inform the next revision.</p><div class="notes-table-wrap"><table><caption>Proposed tasks and observations</caption><thead><tr><th scope="col">Task</th><th scope="col">What to observe</th><th scope="col">What it informs</th></tr></thead><tbody><tr><td>Change search mode with an extra filter applied</td><td>Can the person identify every active criterion without help?</td><td>Placement and explanation of additional conditions</td></tr><tr><td>Return to an unfinished proposal</td><td>Can they find the draft, identify the next section and resume?</td><td>Draft discovery, section states and recovery</td></tr><tr><td>Share a folder with a colleague</td><td>Can they explain who can open the folder and its files?</td><td>Permission hierarchy and sharing language</td></tr></tbody></table></div></div>'''

case = f'''{header(True)}<main id="main"><section class="case-hero wrap"><a class="back-link" href="/#work">← Selected work</a><h1>One opportunity,<br>from search to proposal.</h1><div class="case-intro"><h2>FastGovBid</h2><p>{inline(case_intro)}</p></div></section>
<section class="walkthrough wrap" id="walkthrough" aria-label="FastGovBid interaction walkthrough"><div class="film-player" data-film><button class="film-start" type="button" aria-label="Play the 60-second FastGovBid walkthrough"><img src="/assets/video/poster.png" width="1920" height="1080" alt="Details of a demonstration opportunity in the FastGovBid workspace."><span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 11 7-11 7V5Z"/></svg>Play walkthrough</span></button><video controls playsinline muted preload="metadata" hidden aria-label="FastGovBid: an opportunity from search to proposal. Animated interaction prototype using demonstration data."><source src="/assets/video/fastgovbid-walkthrough.mp4" type="video/mp4"></video></div><p>Animated walkthrough of intended interactions, using demonstration data. <span>60 seconds · Sound optional</span></p></section>
<div class="meta-strip wrap"><dl class="project-meta"><div><dt>My role</dt><dd>Product and interface design</dd></div><div><dt>Team</dt><dd>Go Creative Studios<br>Product stakeholders &amp; engineers</dd></div><div><dt>Scope</dt><dd>Interaction, information architecture,<br>visual design &amp; engineering handoff</dd></div><div><dt>Year</dt><dd>2026</dd></div></dl></div>
<div class="case-layout wrap">{index}<article class="case-content"><section id="context" class="chapter"><h2>Following the work</h2>{''.join(paras(C['Following the work']))}{status_summary}<div class="contribution"><h3>My contribution</h3>{''.join(paras(C['My contribution']))}</div><div class="contribution"><h3>What informed the design</h3>{''.join(paras(C['What informed the design']))}</div></section>
<section id="search" class="chapter"><h2>Search that<br>keeps its place.</h2>{search[0]}{comparison('search',[('Guided search','search-guided','Guided search with editable phrases and a list of matching opportunities.'),('Advanced search','search-advanced','Advanced search showing the query and active filter chips.')],'The design carries guided-search choices into Advanced search and keeps extra filters visible on return.')}{''.join(search[1:])}{search_study}</section>
<section id="authoring" class="chapter"><h2>A place for the<br>unfinished draft.</h2>{proposal[0]}{shot('proposal-editor','Proposal editor with an outline on the left, the active draft in the center and contextual tools on the right.','The outline, active draft and contextual panel stay in view together while a section is being edited.','editor-plate')}{''.join(proposal[1:3])}{shot('proposal-review','Proposal review listing incomplete sections and the contents of the document package.','The design makes unfinished sections visible at final review, before generation.','review-plate')}{''.join(proposal[3:])}{review_timeline}</section>
<section id="partners" class="chapter"><h2>Reframing<br>partner discovery.</h2>{''.join(prime[:2])}{comparison('partners',[('Browse','prime-browse','Contractor catalog with search, filters and company rows.'),('For You','prime-for-you','Proposed contractor recommendations based on a company matching profile.')],'Prime List proposal: browse before setting up a matching profile; For You adds recommendations.')}{''.join(prime[2:])}{shot('prime-detail','Prime contractor detail showing award history and dated source information.','A dated record supports a decision without promising what a company will do next.','prime-detail-plate')}</section>
<section id="product-system" class="chapter supporting"><h2>The systems<br>around the journey.</h2>{support[0]}<div class="support-item"><h3>Documents and access</h3>{support[2]}{shot('documents-share','Folder-sharing dialog showing who has access to a shared folder.','Sharing controls show who has access.')}</div><div class="support-pair"><div class="support-item"><h3>Capability Statement</h3>{support[3]}{shot('capability','Capability-statement proposal with service choices and a document preview.','Proposed flow: use company information already held in the profile, then add what is missing.')}</div><div class="support-item"><h3>Industry news</h3>{support[4]}{shot('newsfeed','Proposed industry-news feed showing rule changes as dated information cards.','V4 proposal: rule changes use dated information cards, with filters and source details.')}</div></div><div class="support-item onboarding-item"><div><h3>Onboarding and settings</h3>{support[1]}</div>{shot('onboarding','Workspace setup showing opportunity-targeting preferences.','Workspace and targeting setup within the onboarding journey.')}</div><div class="support-item"><h3>A shared visual system</h3>{support[5]}{shot('system','FastGovBid design-system specimen showing typography, colors and reusable interface components.','Tokens and reusable patterns support a consistent foundation across the product.','system-plate')}</div></section>
<section id="next" class="chapter next-chapter"><h2>What I would<br>look at next.</h2>{''.join(paras(C['What I would look at next'])[:2])}{validation_plan}<a class="text-link" href="mailto:{EMAIL}">Talk about this work {UPRIGHT}</a></section></article></div></main>{footer()}'''

DIST.mkdir(exist_ok=True)
(DIST/'index.html').write_text(shell('João de Almeida — Product Designer','Product and interface design for complex B2B workflows. Explore FastGovBid, from search to proposal.',home))
case_dir = DIST/'work'/'fastgovbid'
case_dir.mkdir(parents=True,exist_ok=True)
def mobile_table_labels(match):
    table = match.group(0)
    headings = re.findall(r'<th scope="col">([^<]+)</th>', table)
    def annotate_row(row):
        cells = iter(headings)
        return re.sub(r'<td>', lambda _: '<td data-label="'+escape(next(cells, ''), quote=True)+'">', row.group(0))
    return re.sub(r'<tr>.*?</tr>', annotate_row, table, flags=re.S)

case = re.sub(r'<table>.*?</table>', mobile_table_labels, case, flags=re.S)
(case_dir/'index.html').write_text(shell('FastGovBid — João de Almeida','One opportunity, from search to proposal. Interface and interaction design across a government contracting platform.',case,'/work/fastgovbid/'))
(DIST/'404.html').write_text(shell('Page not found — João de Almeida','Find product design work by João de Almeida.',f'{header()}<main id="main" class="not-found wrap"><h1>That page<br>has moved.</h1><a class="text-link" href="/">Back to the work {ARROW}</a></main>{footer()}'))
print('Built home, FastGovBid case and 404 from approved copy.')
