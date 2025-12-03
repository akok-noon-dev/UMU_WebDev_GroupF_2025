// books/book.js
// Smooth-scroll to category if query param is present
document.addEventListener('DOMContentLoaded', function() {
	const params = new URLSearchParams(window.location.search);
	const category = params.get('category');
	if (category) {
		const el = document.getElementById(category);
		if (el) {
			// Allow layout to render then scroll
			setTimeout(() => {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// Add a subtle highlight to show which section
				el.classList.add('outline-highlight');
				setTimeout(() => el.classList.remove('outline-highlight'), 2200);
			}, 120);
		}
	}

	// Book descriptions (approx ~100 words each) — used by the More button modal
	const bookDetails = {
		"The Hobbit": `Bilbo Baggins, a comfortable hobbit, is swept into an extraordinary quest when the wizard Gandalf and a company of dwarves recruit him to help reclaim their lost kingdom. Along the way he encounters trolls, goblins, giant spiders, elves, and the creature Gollum, with whom he stakes his fate in a fateful riddle-contest. The journey tests Bilbo's courage, resourcefulness, and heart, transforming him from a timid homebody into a clever and brave adventurer while exploring themes of friendship, greed, and the unexpected capacities within ordinary people.`,
		"The Great Gatsby": `Set during the Roaring Twenties, this novel follows Nick Carraway's observations of Jay Gatsby, a mysterious millionaire who throws lavish parties in the hopes of rekindling a past love. Beneath the glittering surface lies a portrait of longing and moral decay: wealth does not guarantee happiness, and the American Dream can be illusory. Through sharp social critique and lyrical prose, the story examines desire, identity, and disillusionment amid changing social mores, culminating in tragedy that exposes the cost of obsession and the fragility of human hope.`,
		"Pride and Prejudice": `Elizabeth Bennet navigates issues of manners, upbringing, morality, and marriage in early 19th-century England. With wit and keen social observation, the novel explores how first impressions and social expectations can cloud judgment. As Elizabeth and Mr. Darcy confront their misunderstandings and personal pride, they learn empathy and humility. The novel balances romantic plot with satire of class-conscious society, creating enduring characters whose development and eventual mutual recognition highlight themes of self-knowledge, family, and the constraints of social convention.`,
		"To Kill a Mockingbird": `Set in the American South, this novel follows Scout Finch, her brother Jem, and their father Atticus — a principled lawyer who defends a Black man falsely accused of assault. Observed through Scout's innocent but insightful eyes, the narrative examines racism, moral courage, and the complexities of human behavior in a small town. Through trials both legal and personal, characters confront prejudice, injustice, and compassion, and the story emphasizes empathy, moral growth, and the loss of childhood innocence in a society shaped by inequality.`,
		"Moby-Dick": `An epic story of obsession, Moby-Dick chronicles Captain Ahab's monomaniacal pursuit of the white whale that maimed him. Narrated by Ishmael, the tale mixes seafaring adventure with philosophical reflection on fate, nature, and the limits of human knowledge. The Pequod's diverse crew becomes a microcosm of humanity as Ahab's vendetta leads them toward danger. Melville combines vivid descriptions, technical detail, and symbolic depth to examine sacrifice, revenge, and the inscrutable power of the natural world over human ambitions.`,
		"Brave New World": `In a controlled future society, humans are engineered and conditioned to maintain social stability; individual freedom and deep emotion are sacrificed for comfort and order. The novel contrasts this sterile utopia with the experiences of characters who question the system's dehumanizing effects. Through its exploration of technology, mass consumption, and the manipulation of pleasure, the story raises questions about what is lost when efficiency replaces human connection and individuality, challenging readers to consider the ethical limits of scientific progress and social engineering.`,
		"Understanding Economics": `This book introduces core economic principles in accessible language, covering supply and demand, market behavior, policy tools, and real-world applications. By blending theory with concrete examples, readers learn how choices at individual and national levels shape markets and influence living standards. The text emphasizes critical thinking about trade-offs, incentives, and economic outcomes, equipping students with frameworks to analyze policy debates, business decisions, and everyday financial choices with clarity and practical insight.`,
		"Leadership in Practice": `A hands-on guide to leadership that combines case studies, practical frameworks, and reflective exercises. It explores styles of leadership, team dynamics, strategic decision-making, and conflict resolution. Emphasizing adaptability and ethical judgment, the book shows how leaders build trust, communicate vision, and align resources for long-term success. Readers gain tools to assess organizational culture and implement changes that promote collaboration and sustained performance.`,
		"Voices of Memoir": `An anthology of personal narratives from varied lives, this collection offers intimate reflections on family, identity, resilience, and pivotal moments. Each memoirist shares particular experiences — migration, loss, triumph, or transformation — revealing how ordinary moments shape personal history. Through vivid storytelling and honest reflection, the pieces illuminate both unique life paths and shared human themes of memory, meaning, and the search for belonging.`,
		"Learning JavaScript": `A practical guide for programmers learning JavaScript, covering language fundamentals, asynchronous programming, DOM manipulation, and modern tooling. Through examples and exercises, the book helps readers build real web applications and understand best practices. It balances conceptual detail with hands-on projects so learners gain confidence in writing clean, maintainable code while appreciating JavaScript's evolving ecosystem and typical patterns used in production development.`,
		"Engineering Basics": `An introductory survey of engineering principles that bridges theory and practice across disciplines. Topics include statics and dynamics, materials, systems thinking, and problem-solving methodologies. The text emphasizes applying scientific knowledge to design robust solutions while considering constraints like cost, safety, and sustainability. Case studies highlight how engineers iterate on designs, test assumptions, and integrate multidisciplinary knowledge into practical outcomes.`,
		"Data Science Essentials": `A beginner's road map to data analysis that covers data cleaning, visualization, statistical thinking, and introductory machine learning. The book prioritizes practical workflows for extracting insights from data and communicating findings clearly. With examples in common tools and languages, readers learn to frame questions, choose methods, and evaluate results while keeping ethical considerations and reproducibility in focus.`,
		"1984": `A chilling vision of totalitarianism that follows Winston Smith as he navigates life under constant surveillance and ideological control. The novel explores mechanisms of power — censorship, rewriting history, and psychological manipulation — and the ways institutions suppress individuality. Through Winston's struggles for truth and autonomy, the story warns of political abuses and the erosion of human dignity when language and memory are controlled.`,
		"Historical Essays": `A curated set of essays that examine key historical events through archival sources and scholarly interpretation. The collection emphasizes context and causation, exploring economic, cultural, and political forces that shape human affairs. Readers are invited to weigh evidence, consider multiple perspectives, and appreciate the complexity behind events often simplified in popular narratives.`,
		"War & Strategy": `A study of military strategy and its historical application, examining decision-making, logistics, leadership, and the broader political contexts of conflict. By blending theory with battlefield case studies, the book explores how strategic choices have long-term consequences and how technological, geographic, and human factors interact during campaigns.`,
		"Little Explorers": `A bright, illustrated series for young children encouraging curiosity about the natural world. Simple stories and playful activities foster observational skills and early science concepts while celebrating discovery and imagination. The pages are designed for read-aloud interaction between adults and children, supporting language development and curiosity.`,
		"Fun with Colors": `An engaging picture book that teaches colors, shapes, and basic concepts through vibrant artwork and playful text. Designed for early learners, it combines interactive prompts, repetition, and cheerful characters to reinforce recognition and vocabulary while encouraging creative exploration.`,
		"Storytime Adventures": `A collection of short, whimsical stories crafted for read-aloud sessions that spark imagination and social-emotional learning. Each tale features relatable characters who solve small challenges and learn simple lessons, making the collection ideal for caregivers and classroom storytelling.`
	};

	// Modal handling: find all More buttons and show modal with mapped description
	document.querySelectorAll('.btn-outline-primary').forEach(btn => {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			const card = btn.closest('.card');
			if (!card) return;
			const titleEl = card.querySelector('.card-title');
			const title = titleEl ? titleEl.innerText.trim() : 'Book';
			const desc = bookDetails[title] || (card.querySelectorAll('.card-text')[1] ? card.querySelectorAll('.card-text')[1].innerText.trim() : 'No description available.');
			// Populate modal
			const modalTitle = document.getElementById('bookModalLabel');
			const modalDesc = document.getElementById('bookModalDesc');
			modalTitle.innerText = title;
			modalDesc.innerText = desc;
			// attach price to modal dataset (prefer button data-price on the card)
			const modalEl = document.getElementById('bookModal');
			const buyBtnOnCard = card.querySelector('.btn-danger');
			let modalPrice = NaN;
			if (buyBtnOnCard && buyBtnOnCard.dataset && buyBtnOnCard.dataset.price) modalPrice = parseFloat(buyBtnOnCard.dataset.price);
			if (isNaN(modalPrice)) modalPrice = bookPrices[title] || 0;
			modalEl.dataset.price = modalPrice;
			// Show modal
			const modal = new bootstrap.Modal(modalEl);
			modal.show();
		});
	});

	// --- Shopping cart implementation ---

	// Price map (USD)
	const bookPrices = {
		"The Hobbit": 12.99,
		"The Great Gatsby": 9.5,
		"Pride and Prejudice": 8.75,
		"To Kill a Mockingbird": 11.0,
		"Moby-Dick": 13.5,
		"Brave New World": 10.0,
		"Understanding Economics": 18.0,
		"Leadership in Practice": 20.0,
		"Voices of Memoir": 14.0,
		"Learning JavaScript": 24.5,
		"Engineering Basics": 22.0,
		"Data Science Essentials": 26.0,
		"1984": 9.99,
		"Historical Essays": 16.0,
		"War & Strategy": 19.0,
		"Little Explorers": 7.5,
		"Fun with Colors": 6.99,
		"Storytime Adventures": 8.5
	};

	let cart = [];

	function formatPrice(v) {
		return '$' + v.toFixed(2);
	}

	function addToCart(title, price) {
		// prefer explicit price (from DOM) if provided, otherwise lookup
		const resolvedPrice = (typeof price === 'number' && !isNaN(price)) ? price : (bookPrices[title] || 0);
		const existing = cart.find(i => i.title === title);
		if (existing) {
			existing.qty += 1;
		} else {
			cart.push({ title, price: resolvedPrice, qty: 1 });
		}
		updateCartUI();
	}

	function removeFromCart(title) {
		cart = cart.filter(i => i.title !== title);
		updateCartUI();
	}

	function updateCartUI() {
		const container = document.getElementById('cartItems');
		const totalEl = document.getElementById('cartTotal');
		container.innerHTML = '';
		let total = 0;
		if (cart.length === 0) {
			container.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
		}
		cart.forEach(item => {
			total += item.price * item.qty;
			const row = document.createElement('div');
			row.className = 'd-flex justify-content-between align-items-center mb-2';
			row.innerHTML = `
				<div>
					<div><strong>${item.title}</strong></div>
					<div class="text-muted small">${formatPrice(item.price)} x ${item.qty}</div>
				</div>
				<div class="text-end">
					<button class="btn btn-sm btn-outline-secondary me-2" data-action="decrease">-</button>
					<button class="btn btn-sm btn-outline-secondary" data-action="increase">+</button>
					<button class="btn btn-sm btn-link text-danger d-block mt-1" data-action="remove">Remove</button>
				</div>
			`;
			// attach handlers
			const dec = row.querySelector('[data-action="decrease"]');
			const inc = row.querySelector('[data-action="increase"]');
			const rem = row.querySelector('[data-action="remove"]');
			dec.addEventListener('click', () => {
				if (item.qty > 1) item.qty -= 1; else removeFromCart(item.title);
				updateCartUI();
			});
			inc.addEventListener('click', () => {
				item.qty += 1;
				updateCartUI();
			});
			rem.addEventListener('click', () => {
				removeFromCart(item.title);
			});
			container.appendChild(row);
		});
		totalEl.innerText = formatPrice(total);
	}

	// Wire up buy buttons on cards (prefer price from button data-price)
	document.querySelectorAll('.btn-danger').forEach(btn => {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			const card = btn.closest('.card');
			if (!card) return;
			const titleEl = card.querySelector('.card-title');
			const title = titleEl ? titleEl.innerText.trim() : null;
			const priceAttr = btn.dataset && btn.dataset.price ? parseFloat(btn.dataset.price) : NaN;
			if (title) addToCart(title, isNaN(priceAttr) ? undefined : priceAttr);
			// open cart offcanvas
			const offcanvasEl = document.getElementById('cartOffcanvas');
			const off = new bootstrap.Offcanvas(offcanvasEl);
			off.show();
		});
	});

	// modal buy button
	const modalBuy = document.getElementById('modalBuyBtn');
	if (modalBuy) {
		modalBuy.addEventListener('click', function() {
			const title = document.getElementById('bookModalLabel').innerText.trim();
			const modalEl = document.getElementById('bookModal');
			const priceAttr = modalEl && modalEl.dataset && modalEl.dataset.price ? parseFloat(modalEl.dataset.price) : NaN;
			if (title) addToCart(title, isNaN(priceAttr) ? undefined : priceAttr);
			// hide modal and open cart
			const bsModal = bootstrap.Modal.getInstance(modalEl);
			if (bsModal) bsModal.hide();
			const offcanvasEl = document.getElementById('cartOffcanvas');
			const off = new bootstrap.Offcanvas(offcanvasEl);
			off.show();
		});
	}

	// Checkout placeholder
	const checkoutBtn = document.getElementById('checkoutBtn');
	if (checkoutBtn) {
		checkoutBtn.addEventListener('click', () => {
			alert('Checkout not implemented — cart total: ' + document.getElementById('cartTotal').innerText);
		});
	}

	// initialize cart UI
	updateCartUI();

	// --- Interactive hover/focus for cards (JS-driven) ---
	(function attachCardInteraction() {
		const cards = document.querySelectorAll('.card');
		if (!cards.length) return;

		cards.forEach(card => {
			let pointerActive = false;

			function setOn() { card.classList.add('interacting'); }
			function setOff() { card.classList.remove('interacting'); }

			// Pointer events cover mouse, pen, and touch in modern browsers
			card.addEventListener('pointerdown', (e) => {
				pointerActive = true;
				setOn();
			});
			card.addEventListener('pointerup', (e) => {
				pointerActive = false;
				setOff();
			});
			card.addEventListener('pointercancel', () => {
				pointerActive = false;
				setOff();
			});

			// mouseenter / leave for direct hover responsiveness
			card.addEventListener('mouseenter', () => { if (!pointerActive) setOn(); });
			card.addEventListener('mouseleave', () => { if (!pointerActive) setOff(); });

			// keyboard accessibility: focus within a card should show the interaction state
			card.addEventListener('focusin', () => setOn());
			card.addEventListener('focusout', () => setOff());
		});
	})();
});
