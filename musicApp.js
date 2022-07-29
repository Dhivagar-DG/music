// GLobal Variable
let songImage = document.querySelector('#songImg');

let pausePlay = document.querySelector('#pausePlay');
let play = document.querySelector('#play');
let pause = document.querySelector('#pause');

let backward = document.querySelector('#backward');
let forward = document.querySelector('#forward');

let songName = document.querySelector('#songName');
let sungBy = document.querySelector('#sungBy');

let songRange = document.querySelector('#songRange');

const sound = document.querySelector('#audio');

let songIndex = 0;


const songList = [
    {song: 'Andha Kanna Paathaakaa', singers : 'Yuvan Shankar Raja', path: 'Master/Andha Kanna Paathaakaa-Masstamilan.In.mp3', imgPath: 'Master/andha.png'},
    {song: 'Kutty Story', singers : 'Thalapathy Vijay & Anirudh Ravichandar', path: 'Master/Kutti Story-Masstamilan.In.mp3', imgPath : 'Master/story.jpg'},
    {song: 'Polakatum Para Para', singers: 'Santhosh Narayanan', path: 'Master/Polakatum Para Para-Masstamilan.In.mp3', imgPath: 'Master/pola.jpg'},
    {song: 'Vaathi Coming', singers: 'Anirudh Ravichandar & Gana Balachandar', path: 'Master/Vaathi Coming-Masstamilan.In.mp3', imgPath: 'Master/vaathi.jpg'},
    {song : 'Pathala Pathala', singers : 'Anirudh Ravichandar , kamal hasan', path: 'vikram/Pathala Pathala-Masstamilan.in.mp3', imgPath : 'Vikram/pathala.jpg' },
    {song : 'Wasted', singers : 'Anirudh Ravichandar', path: 'vikram/Wasted-MassTamilan.in.mp3', imgPath : 'Vikram/wasted.jpg'},
    {song : 'Vikram-Title-Track', singers : 'Anirudh Ravichandar', path: 'vikram/Vikram-Title-Track-MassTamilan.in.mp3', imgPath : 'Vikram/title.jpg'},
    {song : 'Porkanda-Singam', singers : 'Anirudh Ravichandar', path: 'vikram/Porkanda-Singam-MassTamilan.in.mp3', imgPath : 'Vikram/por.jpg'},
    {song : 'Once-Upon-a-Time', singers : 'Anirudh Ravichandar', path : 'vikram/Once-Upon-a-Time-MassTamilan.in.mp3', imgPath : 'Vikram/once.jpg'}
];


pausePlay.addEventListener('click', function(){
   if(play.getAttribute('class')){
        play.removeAttribute('class');
        pause.setAttribute('class','d-none');
        sound.pause();
        clearInterval(setSongRange);
} else {
        pause.removeAttribute('class');
        play.setAttribute('class','d-none');
        sound.play();
   }
});


//Click Backward button 
backward.addEventListener('click', function(){
    songIndex == 0 ? songIndex = songList.length-1 : songIndex--;
    pause.removeAttribute('class');
    play.setAttribute('class','d-none');
    playCurrentSong(songIndex);
});


// Click Forward button
forward.addEventListener('click', function(){
    songIndex == songList.length-1 ? songIndex = 0 : songIndex++;
    pause.removeAttribute('class');
    play.setAttribute('class','d-none');
    playCurrentSong(songIndex);
});


// Mute
document.getElementById('mute-group').addEventListener('click', function(){
    if(document.getElementById('mute').getAttribute('class')){
        document.getElementById('mute').removeAttribute('class');
        document.getElementById('muted').setAttribute('class','d-none');
        sound.muted = false;
    }else{
        document.getElementById('mute').setAttribute('class','d-none');
        document.getElementById('muted').removeAttribute('class');
        sound.muted = true;
    }
});


// Play Current Song
function playCurrentSong(songIndex){
    sound.src = songList[songIndex].path;
    songImage.src = songList[songIndex].imgPath;
    songName.textContent = songList[songIndex].song;
    sungBy.textContent = songList[songIndex].singers;
    resetRange();
    sound.autoplay = true;
    setInterval(setSongRange, 1000);
}

// Set Song Range
function setSongRange(){
    if(play.getAttribute('class')) {
        songRange.value = sound.currentTime;
        songRange.setAttribute('max',sound.duration);
        songRange.style.width = sound.currentTime; 
        if ( songRange.value == parseInt(sound.duration)){
            songIndex < songList.length - 1 ? playCurrentSong(++songIndex) : "";
        }
    }
} 


// Song Range
function resetRange(){
    songRange.value = 0;
}


//Change duration
songRange.addEventListener('click', function(){
    sound.currentTime = songRange.value;
});

//When document ready
document.onreadystatechange = ()=>{
    if( document.readyState == "complete" ){
        playCurrentSong(songIndex);
        sound.autoplay = false;
    }
};