'use strict';
document.documentElement.classList.add('js');

document.querySelectorAll('[data-film]').forEach(player => {
  const start = player.querySelector('.film-start');
  const video = player.querySelector('video');
  start.addEventListener('click', async () => {
    start.hidden = true;
    video.hidden = false;
    try { await video.play(); }
    catch {
      video.hidden = true;
      start.hidden = false;
      start.querySelector('span').lastChild.textContent = ' Try playing again';
    }
  });
});

document.querySelectorAll('[data-tabs]').forEach(group => {
  group.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const panels = [...group.querySelectorAll('[role="tabpanel"]')];
  function select(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(next, true); }
    });
  });
  select(0);
});

const dialog = document.querySelector('.image-dialog');
let viewerImage;
const sizeButton = dialog?.querySelector('.image-size');
let imageOpener;
document.querySelectorAll('[data-enlarge]').forEach(link => {
  link.addEventListener('click', event => {
    if (!dialog?.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    imageOpener = link;
    const image = link.querySelector('img');
    viewerImage = new Image();
    viewerImage.src = link.href;
    viewerImage.alt = image.alt;
    dialog.querySelector('.dialog-image-area').replaceChildren(viewerImage);
    dialog.querySelector('#image-dialog-title').textContent = image.alt;
    dialog.classList.remove('actual-size');
    sizeButton.setAttribute('aria-pressed', 'false');
    sizeButton.textContent = 'Actual size';
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => {
  document.body.style.overflow = '';
  imageOpener?.focus({preventScroll:true});
});
sizeButton?.addEventListener('click', () => {
  const actual = dialog.classList.toggle('actual-size');
  sizeButton.setAttribute('aria-pressed', String(actual));
  sizeButton.textContent = actual ? 'Fit to screen' : 'Actual size';
});

const chapterLinks = [...document.querySelectorAll('.case-index nav a')];
const chapters = chapterLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if (chapters.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top);
    if (!visible.length) return;
    const activeId = visible[0].target.id;
    chapterLinks.forEach(link => {
      if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin:'-10% 0px -60% 0px', threshold:0});
  chapters.forEach(chapter => observer.observe(chapter));
}

document.querySelectorAll('video').forEach(video => {
  video.addEventListener('error', () => {
    if (video.parentElement.querySelector('.video-fallback')) return;
    const fallback = document.createElement('p');
    fallback.className = 'video-fallback';
    const link = document.createElement('a');
    link.href = video.querySelector('source')?.src || video.currentSrc;
    link.textContent = 'Open the walkthrough video';
    fallback.append('The video could not play here. ', link, '. The interface images remain available below.');
    video.after(fallback);
  });
});

document.querySelectorAll('[data-query-study]').forEach(study => {
  const state = {mode: 'guided', deadline: '60', ready: false};
  const modes = [...study.querySelectorAll('[data-mode]')];
  const deadlines = [...study.querySelectorAll('[data-deadline]')];
  const ready = study.querySelector('[data-ready]');
  function render() {
    modes.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === state.mode)));
    study.querySelector('.study-guided').hidden = state.mode !== 'guided';
    study.querySelector('.study-advanced').hidden = state.mode !== 'advanced';
    deadlines.forEach(select => { select.value = state.deadline; });
    ready.checked = state.ready;
    study.querySelector('.study-extra').hidden = !state.ready || state.mode !== 'guided';
    study.querySelector('.study-status').textContent = `${state.mode === 'guided' ? 'Guided' : 'Advanced'} mode. Deadline: ${state.deadline} days. ${state.ready ? 'Ready to bid only remains applied.' : 'No additional conditions.'}`;
  }
  modes.forEach(button => button.addEventListener('click', () => { state.mode = button.dataset.mode; render(); }));
  deadlines.forEach(select => select.addEventListener('change', () => { state.deadline = select.value; render(); }));
  ready.addEventListener('change', () => { state.ready = ready.checked; render(); });
  study.querySelector('[data-remove-ready]').addEventListener('click', () => {
    state.ready = false; render(); modes[0].focus();
  });
  study.querySelector('[data-reset-study]').addEventListener('click', () => {
    state.mode = 'guided'; state.deadline = '60'; state.ready = false; render();
  });
  render();
  study.hidden = false;
});
