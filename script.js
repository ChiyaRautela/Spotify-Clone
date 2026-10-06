console.log("Welcome to Spotify");

let songIndex=0;
let audioElement=new Audio("songs/1.m4a");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItems=Array.from(document.getElementsByClassName("songItem"));

let songs = [
{songName:"The Fate of Ophelia",filePath:"songs/1.m4a",coverPath:"covers/1.png"},
{songName:"Cruel Summer",filePath:"songs/2.mp3",coverPath:"covers/2.png"},
{songName:"Style",filePath:"songs/3.m4a",coverPath:"covers/3.png"},
{songName:"Speak Now",filePath:"songs/4.m4a",coverPath:"covers/4.png"},
{songName:"Begin Again",filePath:"songs/5.m4a",coverPath:"covers/5.png"},
{songName:"Timeless (Taylor's Version)",filePath:"songs/6.m4a",coverPath:"covers/6.png"},
{songName:"If This Was A Movie",filePath:"songs/7.m4a",coverPath:"covers/7.png"},
{songName:"Red",filePath:"songs/8.m4a",coverPath:"covers/8.png"},
{songName:"Clean",filePath:"songs/9.m4a",coverPath:"covers/9.png"},
{songName:"The Other Side of the Door",filePath:"songs/10.m4a",coverPath:"covers/10.png"}
];

songItems.forEach((element,i)=>{
element.getElementsByTagName("img")[0].src=songs[i].coverPath;
element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

masterPlay.addEventListener("click",()=>{
if(audioElement.paused||audioElement.currentTime<=0){
audioElement.play();
masterPlay.classList.remove("fa-circle-play");
masterPlay.classList.add("fa-circle-pause");
gif.style.opacity=1;
}else{
audioElement.pause();
masterPlay.classList.remove("fa-circle-pause");
masterPlay.classList.add("fa-circle-play");
gif.style.opacity=0;
}
});

audioElement.addEventListener("timeupdate",()=>{
if(audioElement.duration){
let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value=progress;
}
});

myProgressBar.addEventListener("input",()=>{
if(audioElement.duration){
audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
}
});

audioElement.addEventListener("ended",()=>{
masterPlay.classList.remove("fa-circle-pause");
masterPlay.classList.add("fa-circle-play");
gif.style.opacity=0;
myProgressBar.value=0;
});

function makeAllPlays(){
Array.from(document.getElementsByClassName("songItemPlay")).forEach(element=>{
element.classList.remove("fa-circle-pause");
element.classList.add("fa-circle-play");
});
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach(element=>{
element.addEventListener("click",e=>{
makeAllPlays();
songIndex=parseInt(e.target.id);
e.target.classList.remove("fa-circle-play");
e.target.classList.add("fa-circle-pause");
audioElement.src=songs[songIndex].filePath;
masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove("fa-circle-play");
masterPlay.classList.add("fa-circle-pause");
});
});

document.getElementById("next").addEventListener("click",()=>{
if(songIndex>=songs.length-1){
songIndex=0;
}else{
songIndex++;
}
playSelectedSong();
});

document.getElementById("previous").addEventListener("click",()=>{
if(songIndex<=0){
songIndex=songs.length-1;
}else{
songIndex--;
}
playSelectedSong();
});

function playSelectedSong(){
audioElement.src=songs[songIndex].filePath;
masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
myProgressBar.value=0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove("fa-circle-play");
masterPlay.classList.add("fa-circle-pause");
makeAllPlays();

let songButtons=document.getElementsByClassName("songItemPlay");

if(songButtons[songIndex]){
songButtons[songIndex].classList.remove("fa-circle-play");
songButtons[songIndex].classList.add("fa-circle-pause");
}
}