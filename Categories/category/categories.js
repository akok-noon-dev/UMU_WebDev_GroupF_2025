    // Simple JS: Highlight card on click and show category name
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        alert('You selected: ' + card.querySelector('h3').innerText);
      });
    });
      // Inspirational quotes rotator
    const quotes = [
      'Knowledge is the key to unlocking your potential.',
      'A library is not a luxury but one of the necessities of life.',
      'Learning never exhausts the mind. — Leonardo da Vinci',
      'Today a reader, tomorrow a leader.',
      'Education is the most powerful weapon you can use to change the world. — Nelson Mandela'
    ];

    let quoteIndex = 0;
    const quoteBox = document.createElement('div');
    quoteBox.style.position = 'fixed';
    quoteBox.style.bottom = '20px';
    quoteBox.style.right = '20px';
    quoteBox.style.background = '#003366';
    quoteBox.style.color = 'white';
    quoteBox.style.padding = '15px 20px';
    quoteBox.style.borderRadius = '12px';
    quoteBox.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    quoteBox.style.maxWidth = '260px';
    quoteBox.style.fontSize = '14px';
    quoteBox.style.transition = 'opacity 0.5s ease';
    quoteBox.innerText = quotes[quoteIndex];
    document.body.appendChild(quoteBox);

    setInterval(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteBox.style.opacity = 0;
      setTimeout(() => {
        quoteBox.innerText = quotes[quoteIndex];
        quoteBox.style.opacity = 1;
      }, 500);
    }, 5000);

    // Card hover sound effect
    const hoverSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_7acdfd16b2.mp3');

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
      });
    });
  