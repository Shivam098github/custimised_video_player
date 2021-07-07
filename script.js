// grab the elements
const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipButtons=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');


//functions

function togglePlay(){
    
    if(video.paused)
    video.play();
    else
    video.pause();
}


function updateButton(){
    const icon=this.paused ? '►' : '❚ ❚';
    // console.log(icon);
    toggle.textContent=icon;
    
}


function skip(){
    // console.log(this.dataset.skip);
    video.currentTime+=parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    // console.log(e);
    video[this.name]=this.value;
}


function handleProgress(){
    let percent=(video.currentTime/video.duration)*100;
    // console.log(video.startDate);
    progressBar.style.flexBasis=`${percent}%`;

}

function scrub(e){
    video.currentTime=(e.offsetX/progress.offsetWidth)*video.duration;
}
//eventlisteners


video.addEventListener('pause',updateButton);
video.addEventListener('play',updateButton);
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range=>range.addEventListener('mousemove',handleRangeUpdate));
video.addEventListener('timeupdate',handleProgress);
let mousedown=false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=>{
    if(mousedown)
    scrub(e);
});
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);
// progress.addEventListener('mouseout',()=>mousedown=false);

