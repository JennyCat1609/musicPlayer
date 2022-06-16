image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Playlist 1
imageVN = document.querySelector('img');
const titleVN = document.getElementById('titleVN');
const artistVN = document.getElementById('artistVN');
const musicVN = document.querySelector('audioVN');
const progressContainerVN = document.getElementById('progress-containerVN');
const progressVN = document.getElementById('progressVN');
const currentTimeElVN = document.getElementById('current-timeVN');
const durationElVN = document.getElementById('durationVN');
const prevBtnVN = document.getElementById('prevVN');
const playBtnVN = document.getElementById('playVN');
const nextBtnVN = document.getElementById('nextVN');

// Music
const songs = [
    {
        name: 'Korean1',
        displayName: 'Korean Music 1',
        artist: 'ABC 1'
    },
    {
        name: 'Korean2',
        displayName: 'Korean Music 2',
        artist: 'ABC 2'
    },
    {
        name: 'Korean3',
        displayName: 'Korean Music 3',
        artist: 'ABC 3'
    },
    {
        name: 'Korean4',
        displayName: 'Korean Music 4',
        artist: 'ABC 4'
    },

];

// PlaylistVN
const songsvn = [
    {
        name: 'VN1',
        displayName: 'CUỘC SỐNG EM ỔN KHÔNG - ANH TÚ',
        artist: 'ABC 1'
    },
    {
        name: 'VN2',
        displayName: 'Để Cho Em Khóc (Vali Tình Yêu OST)',
        artist: 'ABC 2'
    },
    {
        name: 'VN3',
        displayName: 'DaTungVoGia - MrSiro',
        artist: 'ABC 3'
    },
    {
        name: 'VN4',
        displayName: 'ĐÁNH MẤT EM (MV OFFICIAL) - QUANG ĐĂNG TRẦN X ProD. JvN DUSK MUSIC',
        artist: 'ABC 4'
    },

];

// Check if playing
let isPlaying = false;

// Play Korean songs
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Play Vietnamese songs
function playSongVN() {
    isPlaying = true;
    playBtnVN.classList.replace('fa-play','fa-pause');
    playBtnVN.setAttribute('titleVN', 'Pause');
    musicVN.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Pause VN Songs

function pauseSongVN() {
    isPlaying = false;
    playBtnVN.classList.replace('fa-pause','fa-play');
    playBtnVN.setAttribute('titleVN', 'Play');
    musicVN.pause();
}

// Play or Pause Event Listenter
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
playBtnVN.addEventListener('click', () => (isPlaying ? pauseSongVN() : playSongVN()));


// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

function loadSongVN(songsvn) {
    titleVN.textContent = songsvn.displayName;
    artistVN.textContent = songsvn.artist;
    musicVN.src = `musicVn/${songsvn.name}.mp3`;
    //imageVN.src = `img/${songsvn.name}.jpg`;
}

//Current song
let songIndex = 0;

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);
//loadSongVN(songsvn[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        //console.log('minute', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //console.log('second', durationSeconds);
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        //console.log('minute', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        //console.log('second', currentSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    //console.log(e);
    const width = this.clientWidth;
    //console.log('width', width);
    const clickX = e.offsetX;
    //console.log('clickX', clickX);
    const { duration } = music;
    //console.log(clickX / width);
    //console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
