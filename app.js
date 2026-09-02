const gallery = document.getElementById('main-content');
const detail = document.getElementById('detail-content');
const cards = Array.from(document.querySelectorAll('.principle-card'));

function slugify(title) {
	return title.toLowerCase()
		.replace(/&amp;|&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

function prepareCards() {
	cards.forEach((card) => {
		const existingLink = card.querySelector('.principle-link');
		if (existingLink) {
			return;
		}

		const title = card.querySelector('h2').textContent;
		const link = document.createElement('a');
		link.className = 'principle-link';
		link.href = `#principle/${slugify(title)}`;
		link.setAttribute('aria-label', `Open ${title}`);

		while (card.firstChild) {
			link.appendChild(card.firstChild);
		}
		card.appendChild(link);
	});
}

function showGallery() {
	gallery.hidden = false;
	detail.hidden = true;
	document.title = 'THE ILLUSION OF LIFE — 12 Principles of Animation';
}

function showDetail(slug) {
	const link = cards
		.map((card) => card.querySelector('.principle-link'))
		.find((cardLink) => cardLink && cardLink.hash === `#principle/${slug}`);

	if (!link) {
		showGallery();
		return;
	}

	const image = link.querySelector('img');
	const title = link.querySelector('h2').textContent;
	const back = document.createElement('a');
	back.className = 'back-link';
	back.href = '#';
	back.textContent = 'Back';
	back.setAttribute('aria-label', 'Back to all principles');

	const figure = document.createElement('figure');
	figure.className = 'detail-animation';
	const detailImage = image.cloneNode();
	detailImage.removeAttribute('loading');
	detailImage.alt = `${title} animation`;
	const caption = document.createElement('figcaption');
	caption.textContent = title;
	figure.append(detailImage, caption);

	detail.replaceChildren(back, figure);
	gallery.hidden = true;
	detail.hidden = false;
	document.title = `${title} — The Illusion of Life`;
}

function renderRoute() {
	const match = window.location.hash.match(/^#principle\/(.+)$/);
	if (match) {
		showDetail(match[1]);
	} else {
		showGallery();
	}
}

prepareCards();
window.addEventListener('hashchange', renderRoute);
renderRoute();
