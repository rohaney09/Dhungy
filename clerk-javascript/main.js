// import './style.css'

import { Clerk } from '@clerk/clerk-js'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const clerk = new Clerk(clerkPubKey)

const loginBtn = document.getElementById("login-btn")
const signInModal = document.getElementById("clerk-signin-modal")
const userProfileDiv = document.getElementById("user-profile")

// Load Clerk and check if user is already signed in on page load
window.addEventListener("DOMContentLoaded", async () => {
  await clerk.load()
  if (clerk.user) {
    showUserProfile()
  }
})

// Login button click
loginBtn.addEventListener("click", async () => {
  await clerk.load()

  if (clerk.user) {
    showUserProfile()
  } else {
    if (signInModal.style.display === "none") {
      signInModal.style.display = "block"

      clerk.mountSignIn(document.getElementById("sign-in"), {
        afterSignIn: () => {
          signInModal.style.display = "none"
          clearSignIn()
          showUserProfile()
        },
        afterSignUp: () => {
          signInModal.style.display = "none"
          clearSignIn()
          showUserProfile()
        }
      })
    }
  }
})

function showUserProfile() {
  loginBtn.style.display = "none"
  userProfileDiv.style.display = "block"
  clerk.mountUserButton(userProfileDiv)
}

function clearSignIn() {
  document.getElementById("sign-in").innerHTML = ""
}







// // Get elements
// const audio = document.getElementById('audio-player');
// const playBtn = document.getElementById('play-button');
// const pauseBtn = document.getElementById('pause-button');
// const songs = document.querySelectorAll('#playlist .song');


// audio.src = "your-song-url.mp3";
// audio.play();

// // When user clicks on a song
// songs.forEach(song => {
//   song.addEventListener('click', () => {
//     const songUrl = song.getAttribute('data-src');
//     audio.src = songUrl;
//     audio.play();
//     playBtn.style.display = 'none';
//     pauseBtn.style.display = 'inline-block';
//   });
// });

// // Play button
// playBtn.addEventListener('click', () => {
//   audio.play();
//   playBtn.style.display = 'none';
//   pauseBtn.style.display = 'inline-block';
// });

// // Pause button
// pauseBtn.addEventListener('click', () => {
//   audio.pause();
//   pauseBtn.style.display = 'none';
//   playBtn.style.display = 'inline-block';
// });



const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const seekBar = document.getElementById("seek");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const coverImg = document.getElementById("cover-img");

// Song list (same info used in HTML cards)
const playlist = [
    {
      title: "Nasha(From Raid 2)",
      artist: "Tujh mein hi basa hai mera nasha...",
      src: "songs/Nasha - Raid 2.mp3",
      cover: "https://i.scdn.co/image/ab67616d00001e02a118f695487381bae6fbb59b",
    },
    {
      title: "Aaj Ki Raat",
      artist: "Aaj ki raat hona hai jo ho jaane do...",
      src: "songs/Aaj Ki Raat (From _Stree 2_).mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b2735e16168f7e8ff4fb8aace6cf",
    },
    {
      title: "Aayi Nai Stree 2",
      artist: "Aayi nai, aayi nai, aayi nai...",
      src: "songs/Aayi Nai Stree 2.mp3",
      cover: "https://i.scdn.co/image/ab67616d00001e02c617a7ebd0cfe5bdbb26d262",
    },
    {
      title: "Ishq Hai - Mismatched Season 3",
      artist: "Tumse mile to kuch gunguni si...",
      src: "songs/128-Ishq Hai - Mismatched Season 3.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b27379f4a87c23143f0abb14c279",
    },
    {
      title: "Jaane Tu - Chhaava",
      artist: "Jaane tu jaanun main...",
      src: "songs/Jaane Tu - Chhaava.mp3",
      cover: "https://i.scdn.co/image/ab67616d00001e02b4527a77c0288eb6ff168112",
    },
    {
      title: "Millionaire Glory",
      artist: "Main millionaire, tu bhi...",
      src: "songs/Millionaire Glory.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b273aad3f4b601ae8763b3fc4e88",
    },
    {
      title: "Raanjhan Do Patti",
      artist: "Aise na jao piya, aise na...",
      src: "songs/Raanjhan Do Patti.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b273773c5f60bcb309ef8802e4ef",
    },
    {
      title: "Tainu Khabar Nahi Munjya",
      artist: "Ve maahi, tainu khabar nahi...",
      src: "songs/Tainu Khabar Nahi Munjya.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b27367a876fee5cd00ed0f395a9e",
    },
    {
      title: "Tera Chehra Sanam Teri Kasam",
      artist: "Meri bechainiyon ko chain mil...",
      src: "songs/Tera Chehra Sanam Teri Kasam.mp3",
      cover: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLD22Unrk8DUpSRdyIBP5Vte57VmX3XKjZRCkQLmZXq3ovzBYhsKKyZDABmWAwAFhflFgzzjN_r_E5farPM8ZSPS1KcfwOylGvdbzO8u39nGJdT_vr1NpnnvBqp3sOgeNQlSozQLkMGIDpGT0ck2O12Uzc7qV2S44uUkwj4NYoY6vmi1KiLSkwS97pxGPp/w1600/The%20Power%20of%20Fandom!%20Sanam%20Teri%20Kasam.jpg",
    },
    {
      title: "Tu Hain Toh Main Hoon - Sky Force",
      artist: "Tu ishq hai toh main baahon...",
      src: "songs/Tu Hain Toh Main Hoon Sky Force.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b2738405a129d4151b31d13721e0",
    }
  ];
  
let currentSongIndex = 0;

function loadSong(index) {
  const song = playlist[index];
  audioPlayer.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  coverImg.src = song.cover;
  seekBar.value = 0;
}

function playSong() {
  audioPlayer.play();
  playButton.style.display = "none";
  pauseButton.style.display = "inline";
}

function pauseSong() {
  audioPlayer.pause();
  playButton.style.display = "inline";
  pauseButton.style.display = "none";
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  playSong();
}

function changeSong(title, artist, src, cover) {
  const index = playlist.findIndex(song => song.src === src);
  if (index !== -1) currentSongIndex = index;
  audioPlayer.src = src;
  songTitle.textContent = title;
  songArtist.textContent = artist;
  coverImg.src = cover;
  playSong();
}

audioPlayer.addEventListener("loadedmetadata", () => {
  seekBar.max = audioPlayer.duration;
  totalTimeEl.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener("timeupdate", () => {
  seekBar.value = audioPlayer.currentTime;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

seekBar.addEventListener("input", () => {
  audioPlayer.currentTime = seekBar.value;
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

// Event Listeners
playButton.addEventListener("click", playSong);
pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

// Load first song
loadSong(currentSongIndex);

// Expose changeSong to global for card click
window.changeSong = changeSong;











// function showComingSoon() {
//     const div = document.getElementById("comingSoon");
//     div.classList.remove("hidden");
//     div.classList.add("active");
//   }
  
//   function closeComingSoon() {
//     const div = document.getElementById("comingSoon");
//     div.classList.remove("active");
//     div.classList.add("hidden");
//   }
  



    // Sample song list
    const songs = {
        "Nasha": "songs/Nasha - Raid 2.mp3",
        "Aaj Ki Raat": "songs/Aaj Ki Raat (From _Stree 2_).mp3",
        // Add more songs as needed
    };

    const input = document.querySelector('.search-bar');
    const audio = new Audio();

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const songName = input.value.trim();
            if (songs[songName]) {
                audio.src = songs[songName];
                audio.play();
            } else {
                alert("Song not found!");
            }
        }
    });



document.getElementById("homeBtn").addEventListener("click", (e) => {
      e.preventDefault(); // prevent default link behavior if needed
      location.reload(); // reloads the page just like pressing F5
});
    
    



    // function showComingSoon() {
    //   alert("hello")
    //   document.getElementById("comingSoon").classList.remove("hidden");
    //   document.getElementById("comingSoon").classList.add("active");
    //   document.querySelector(".right").classList.add("blur");
    // }
    
    // function closeComingSoon() {
    //   document.getElementById("comingSoon").classList.remove("active");
    //   document.getElementById("comingSoon").classList.add("hidden");
    //   document.querySelector(".right").classList.remove("blur");
    // }
    
    
  