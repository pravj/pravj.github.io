// Simple lightbox functionality
function enlarge(img) {
  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
  `;
  
  // Create enlarged image
  const enlargedImg = document.createElement('img');
  enlargedImg.src = img.src;
  enlargedImg.alt = img.alt;
  enlargedImg.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
  `;
  
  // Add image to lightbox
  lightbox.appendChild(enlargedImg);
  
  // Add lightbox to document
  document.body.appendChild(lightbox);
  
  // Close lightbox when clicked
  lightbox.addEventListener('click', function() {
    document.body.removeChild(lightbox);
  });
  
  // Close lightbox with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('lightbox')) {
      document.body.removeChild(lightbox);
    }
  });
}
