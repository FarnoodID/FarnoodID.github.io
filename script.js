const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const themeBtn = document.getElementById('themeToggle');
const menuBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('nav-links');

function setTheme(dark) {
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeBtn) {
      themeBtn.dataset.state = "dark";
      themeBtn.setAttribute("aria-pressed", "true");
    }
    localStorage.setItem('theme-dark', '1');
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeBtn) {
      themeBtn.dataset.state = "light";
      themeBtn.setAttribute("aria-pressed", "false");
    }
    localStorage.setItem('theme-dark', '0');
  }
}

(function initTheme() {
  const saved = localStorage.getItem('theme-dark');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved === '1' || (!saved && prefersDark));
})();

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.hasAttribute('data-theme');
    setTheme(!isCurrentlyDark);
  });
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const active = navLinks.classList.toggle('active');
    menuBtn.classList.toggle('open', active);
    menuBtn.setAttribute('aria-expanded', active ? 'true' : 'false');
  });

  function closeMenu() {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('active')) {
      return;
    }
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  });

  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      closeMenu();
    })
  );
}

const fadeSections = document.querySelectorAll('.fade-section');

function revealOnScroll() {
  fadeSections.forEach(sec => {
    
    if (!sec.classList.contains('visible')) {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        sec.classList.add('visible');
      }
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

window.addEventListener('load', revealOnScroll);


document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalPanel = document.getElementById('projectModalPanel');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContentHost = document.getElementById('modalContentHost');
  const projectLinks = document.querySelectorAll('.project-link');

  function openModal(projectId) {
    if (!modalContentHost) return;

    const template = document.getElementById(projectId);
    if (!template) {
      console.error(`Modal content not found for project: ${projectId}`);
      return;
    }

    const content = template.content.cloneNode(true);

    modalContentHost.innerHTML = '';
    modalContentHost.appendChild(content);

    modalOverlay.classList.add('visible');
    modalPanel.classList.add('visible');
    document.body.classList.add('modal-open');
    
    modalPanel.scrollTop = 0;
  }

  function closeModal() {
    modalOverlay.classList.remove('visible');
    modalPanel.classList.remove('visible');
    document.body.classList.remove('modal-open');

    setTimeout(() => {
      if (modalContentHost) {
        modalContentHost.innerHTML = '';
      }
    }, 320);
  }

  if (modalOverlay && modalPanel && modalCloseBtn && projectLinks.length > 0) {
    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.dataset.projectId;
        if (projectId) {
          openModal(projectId);
        }
      });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    modalPanel.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('visible')) {
        closeModal();
      }
    });
  }

  
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      
      if (href.length > 1) {
        try {
          const targetElement = document.querySelector(href);
          
          
          if (targetElement && targetElement.classList.contains('fade-section')) {
            
            
            targetElement.classList.add('no-transition');
            
            targetElement.classList.add('visible');
            
            
            
            setTimeout(() => {
              if (targetElement) { 
                targetElement.classList.remove('no-transition');
              }
            }, 900); 
          }
        } catch (error) {
          
          console.warn('Could not find or process anchor link target:', href, error);
        }
      }
    });
  });
  


  const typingContainer = document.getElementById('typing-container');
  const cursorElement = document.querySelector('.cursor');
  
  if (typingContainer && cursorElement) {
    const fullText = "I'm |Farnood";
    let charIndex = 0;
    let htmlContent = "";
    let inSpan = false;

    function typeChar() {
      if (charIndex < fullText.length) {
        
        if (charIndex === 0) {
           cursorElement.style.display = 'inline-block';
        }

        const char = fullText[charIndex];
        
        if (char === '|') {
          htmlContent += "<span>";
          inSpan = true;
        } else {
          htmlContent += char;
        }
        
        if (inSpan) {
          typingContainer.innerHTML = htmlContent + '</span>';
        } else {
          typingContainer.innerHTML = htmlContent;
        }
        
        charIndex++;
        setTimeout(typeChar, 100);
      } else {
        cursorElement.style.display = 'none';
      }
    }
    
    setTimeout(typeChar, 500);
  }
});