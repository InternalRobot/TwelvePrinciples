/**
 * THE ILLUSION OF LIFE — 12 Principles of Animation
 * Interactive viewer and navigation controller
 */

const PRINCIPLES = [
  {
    number: "01",
    title: "Squash & Stretch",
    image: "assets/01_squash_and_stretch.gif",
    description: "Squash and stretch is considered the most important principle. It gives a sense of weight, flexibility, and elasticity to drawn objects. When an object moves, hits an obstacle, or lands on a surface, squashing and stretching accentuates speed, impact, and mass without ever altering the object's total volume."
  },
  {
    number: "02",
    title: "Anticipation",
    image: "assets/02_anticipation.gif",
    description: "Anticipation prepares the audience for a major action the character is about to perform. A dancer bending their knees before a jump, or a pitcher winding up before throwing a ball, cues the viewer's eyes so the subsequent rapid motion is clear and understandable."
  },
  {
    number: "03",
    title: "Staging",
    image: "assets/03_staging.gif",
    description: "Staging directs the viewer's attention and makes an idea unmistakably clear. Through deliberate camera placement, lighting, composition, and acting poses, staging ensures the focus remains entirely on what is story-relevant while avoiding clutter or confusion."
  },
  {
    number: "04",
    title: "Straight Ahead & Pose to Pose",
    image: "assets/04_straight_ahead_and_pose_to_pose.gif",
    description: "These are two distinct animation methodologies. 'Straight Ahead' animates frame-by-frame from start to finish, yielding spontaneous, fluid action ideal for fast movement and effects. 'Pose to Pose' plans key milestone poses first, providing precise control over proportion, composition, and timing."
  },
  {
    number: "05",
    title: "Follow Through & Overlapping",
    image: "assets/05_follow_through_and_overlapping.gif",
    description: "Follow through and overlapping action simulate natural inertia. When a character stops moving, loose parts (hair, cloth, ears, tails) continue moving past the stopping point before settling. Overlapping action means separate parts move at different rates and offsets."
  },
  {
    number: "06",
    title: "Slow In & Slow Out",
    image: "assets/06_slow_in_and_slow_out.gif",
    description: "Real-world objects require time to accelerate and decelerate. Slow in and slow out (ease in and ease out) is achieved by drawing more frames near the start and end of a motion curve and fewer in the middle, giving movement natural weight and physics."
  },
  {
    number: "07",
    title: "Arcs",
    image: "assets/07_arcs.gif",
    description: "Almost all natural human, animal, and mechanical movements follow circular or curved paths of action. Animating movement along arched trajectories prevents mechanical, robotic stiffness and imparts organic realism and grace."
  },
  {
    number: "08",
    title: "Secondary Action",
    image: "assets/08_secondary_action.gif",
    description: "Secondary action consists of additional subordinate motions that support and enrich the primary action. A character swinging their arms while walking, or tapping a foot while impatiently waiting, adds depth and character without distracting from the main action."
  },
  {
    number: "09",
    title: "Timing",
    image: "assets/09_timing.gif",
    description: "Timing refers to the number of drawings or frames allotted to a given action. Timing determines the physical speed, weight, mass, inertia, and emotional temperament of a subject. A heavy object moves slowly, while a feather or light object responds immediately."
  },
  {
    number: "10",
    title: "Exaggeration",
    image: "assets/10_exaggeration.gif",
    description: "Exaggeration pushes expressions, movement, and physical distortion beyond absolute reality to achieve greater dramatic impact, comedy, and emotional clarity, while maintaining internal believability."
  },
  {
    number: "11",
    title: "Solid Drawings",
    image: "assets/11_solid_drawings.gif",
    description: "Solid drawing requires understanding three-dimensional volume, anatomy, perspective, weight, balance, and illumination. A well-constructed shape feels tangible and solid from every angle as it rotates in space."
  },
  {
    number: "12",
    title: "Appeal",
    image: "assets/12_appeal.gif",
    description: "Appeal is the charisma and magnetic presence of an animated subject. Whether a protagonist, villain, or an abstract shape, appealing design has pleasing proportions, readability, and distinct personality that captivates the viewer."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;

  // DOM Elements
  const cards = document.querySelectorAll('.principle-card');
  const detailModal = document.getElementById('detail-modal');
  const aboutModal = document.getElementById('about-modal');
  
  const modalNumber = document.getElementById('modal-number');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalImage = document.getElementById('modal-image');
  
  const prevBtn = detailModal.querySelector('.prev-btn');
  const nextBtn = detailModal.querySelector('.next-btn');
  const closeBtns = document.querySelectorAll('.modal-close, .modal-backdrop');

  const navAboutLink = document.querySelector('a[data-target="about-modal"]');
  const navHomeLink = document.querySelector('a[data-target="home"]');

  // Open Detail Modal
  function showPrinciple(index) {
    if (index < 0) index = PRINCIPLES.length - 1;
    if (index >= PRINCIPLES.length) index = 0;
    currentIndex = index;

    const data = PRINCIPLES[currentIndex];
    modalNumber.textContent = `PRINCIPLE ${data.number}`;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalImage.src = data.image;
    modalImage.alt = `${data.title} animation`;

    openModal(detailModal);
  }

  // Generic Open/Close Modal
  function openModal(modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    closeModal(detailModal);
    closeModal(aboutModal);
  }

  // Attach card click handlers
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      showPrinciple(idx);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(card.getAttribute('data-index'), 10);
        showPrinciple(idx);
      }
    });
  });

  // Modal navigation
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrinciple(currentIndex - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrinciple(currentIndex + 1);
  });

  // Close buttons
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  // About link
  if (navAboutLink) {
    navAboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(detailModal);
      openModal(aboutModal);
    });
  }

  if (navHomeLink) {
    navHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllModals();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Global Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (detailModal.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeAllModals();
      } else if (e.key === 'ArrowLeft') {
        showPrinciple(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showPrinciple(currentIndex + 1);
      }
    } else if (aboutModal.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    }
  });
});
