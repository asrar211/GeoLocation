let frontCamera = true; // Flag to track the active camera

const video = document.getElementById('video');
const openCameraBtn = document.getElementById('openCameraBtn');
const takePhotoBtn = document.getElementById('takePhotoBtn');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const downloadLink = document.getElementById('downloadLink');
const switchCameraBtn = document.getElementById('switchCameraBtn');

openCameraBtn.addEventListener('click', () => {
  const constraints = {
    video: {
      facingMode: frontCamera ? 'user' : 'environment'
    }
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      takePhotoBtn.style.display = 'inline'; // Show the take photo button
      switchCameraBtn.style.display = 'inline'; // Show the switch camera button
    })
    .catch(error => {
      console.error('Error accessing the camera:', error);
    });
});

takePhotoBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  context.drawImage(video, 0, 0, width, height);
  
  // Show the captured photo
  photo.src = canvas.toDataURL('image/png');
  photo.style.display = 'inline';

  // Create a download link for the photo
  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.download = 'captured_photo.png';
  downloadLink.style.display = 'inline';
});

switchCameraBtn.addEventListener('click', () => {
  frontCamera = !frontCamera; // Toggle between front and back cameras
  openCameraBtn.click(); // Reopen the camera with the new facing mode
});
