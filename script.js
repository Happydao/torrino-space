const revealItems = document.querySelectorAll('.reveal');
const infoCards = document.querySelectorAll('.info-card');
const infoCloseButtons = document.querySelectorAll('.info-card__close');
const faqCards = document.querySelectorAll('.faq-grid details');
const collectionCards = document.querySelectorAll('details.collection-card');
const govCards = document.querySelectorAll('.gov-card');
const canvas = document.querySelector('.bg__canvas');
const treasuryValue = document.querySelector('[data-treasury-value]');
const treasuryUpdated = document.querySelector('[data-treasury-updated]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const closeInfoCards = (currentCard = null) => {
  infoCards.forEach((card) => {
    if (card !== currentCard) card.removeAttribute('open');
  });
};

const closeCollectionCards = (currentCard = null) => {
  collectionCards.forEach((card) => {
    if (card !== currentCard) card.removeAttribute('open');
  });
};

const closeGovCards = (currentCard = null) => {
  govCards.forEach((card) => {
    if (card !== currentCard) card.removeAttribute('open');
  });
};

const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

if (hoverQuery.matches) {
  infoCards.forEach((card) => {
    const summary = card.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', (event) => event.preventDefault());
    }
    card.addEventListener('mouseenter', () => {
      closeInfoCards(card);
      card.setAttribute('open', '');
    });
    card.addEventListener('mouseleave', () => {
      card.removeAttribute('open');
    });
  });

  collectionCards.forEach((card) => {
    const summary = card.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', (event) => event.preventDefault());
    }
    card.addEventListener('mouseenter', () => {
      closeCollectionCards(card);
      card.setAttribute('open', '');
    });
    card.addEventListener('mouseleave', () => {
      card.removeAttribute('open');
    });
  });
} else {
  infoCards.forEach((card) => {
    card.addEventListener('toggle', () => {
      if (!card.open) return;
      closeInfoCards(card);
    });
  });

  infoCloseButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const card = button.closest('.info-card');
      if (card) card.removeAttribute('open');
    });
  });

  collectionCards.forEach((card) => {
    const summary = card.querySelector('summary');
    if (!summary) return;
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = card.hasAttribute('open');
      closeCollectionCards();
      if (!isOpen) {
        card.setAttribute('open', '');
      }
    });
  });
}

collectionCards.forEach((card) => {
  card.addEventListener('toggle', () => {
    if (!card.open) return;
    closeCollectionCards(card);
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.info-card')) {
    closeInfoCards();
  }
  if (!event.target.closest('.collection-card')) {
    closeCollectionCards();
  }
  if (!event.target.closest('.gov-card')) {
    closeGovCards();
  }
  if (!event.target.closest('.qa-card')) {
    faqCards.forEach((card) => card.removeAttribute('open'));
  }
});

faqCards.forEach((card) => {
  card.addEventListener('toggle', () => {
    if (!card.open) return;
    faqCards.forEach((other) => {
      if (other !== card) other.removeAttribute('open');
    });
  });
});

if (canvas) {
  const ctx = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let nodes = [];
  let width = 0;
  let height = 0;
  const nodeCount = 36;
  const maxDist = 180;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const alpha = 1 - dist / maxDist;
          ctx.strokeStyle = `rgba(90, 209, 255, ${alpha * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((n) => {
      ctx.fillStyle = 'rgba(76, 229, 210, 0.55)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const tick = () => {
    if (!prefersReduced) {
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });
    }
    draw();
    if (!prefersReduced) requestAnimationFrame(tick);
  };

  resize();
  draw();
  if (!prefersReduced) requestAnimationFrame(tick);
  window.addEventListener('resize', resize);
}

if (treasuryValue && treasuryUpdated) {
  fetch('data/data.json')
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data) return;
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(data.treasuryValue || 0);
      treasuryValue.textContent = formattedValue;
      treasuryUpdated.textContent = data.lastUpdated || '--/--/--';
    })
    .catch(() => {});
}
