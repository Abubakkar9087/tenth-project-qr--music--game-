// Select the required elements
const playPauseBtn = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const songTitleElement = document.querySelector('.song-details h3');
const songArtistElement = document.querySelector('.song-details p');

// Next and Previous buttons
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

// Playlist array of songs
const songs = [
    {
        img: 'img/1.jfif',
        title: 'Sooraj Dooba hain',
        artist: 'Arijit Singh',
        src: 'song/song1.mp3',
        duration: '4:07'
    },
    {
        title: 'Kabhi Jo Badal Barse',
        artist: 'Arijit Singh',
        src: 'song/song2.mp3',
        duration: '3:06'
    },
    {
        title: 'Shayed',
        artist: 'Arijit Singh',
        src: 'song/song3.mp3',
        duration: '4:08'
    }
];

// Track the current song index
let currentSongIndex = 0;
let isPlaying = false;

// Create a new audio element
let audio = new Audio();

// Load the current song details and set the audio source
function loadSong(songIndex) {
    const song = songs[songIndex];
    songTitleElement.textContent = song.title;
    songArtistElement.textContent = song.artist;
    durationElement.textContent = song.duration;
    audio.src = song.src;
}

// Initial load of the first song
loadSong(currentSongIndex);

// Toggle play/pause functionality
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
    isPlaying = !isPlaying;
});

// Update progress bar as the song plays
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
    updateTime();
});

// Update the displayed time of the song
function updateTime() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    if (audio.duration) {
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60);
        durationElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }
}

// Seek through the song when progress bar is clicked
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    updateTime();
});

// Play next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to next song, loop back if it's the last
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();  // Continue playing if already playing
    }
    playIcon.style.display = isPlaying ? 'none' : 'block';
    pauseIcon.style.display = isPlaying ? 'block' : 'none';
});

// Play previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Move to previous song, loop to last if it's the first
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();  // Continue playing if already playing
    }
    playIcon.style.display = isPlaying ? 'none' : 'block';
    pauseIcon.style.display = isPlaying ? 'block' : 'none';
});

// Automatically update the progress bar and duration
audio.addEventListener('loadedmetadata', () => {
    updateTime();
});

// Reset progress when song ends
audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    progress.value = 0;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    isPlaying = false;
});
