let prevMouseX, prevMouseY,
dir = 1,
index = 1,
selectedArray = Math.floor(Math.random() * 3) + 1,
vid = document.querySelector('.video'),
audio = document.querySelector('audio'),
section = document.querySelector('section');

window.onload = () => {
    for(let i = 2; i < 21; i++) {
        let vv = document.createElement('video');
        vv.src = `S${selectedArray}/${i}.mp4`
        vv.preload = 'auto';
        vv.autoplay = true;
        vv.muted = true;
        vv.load();
        document.querySelector('body').appendChild(vv);
    }
    vid.style.display = 'none';
};

// 1 = right; 2 = top; 3 = down; 4 = left
vid.onmousemove = function moving(e) {
    if(dir === 1) {
        if(prevMouseX - e.offsetX < -30) {
            changeVid(e);
            ++dir;
            vid.onmousemove = eventt => {moving(eventt)};
        }
    } else if(dir === 2) {
        if(prevMouseY - e.offsetY > 30) {
            changeVid(e);
            ++dir;
            vid.onmousemove = eventt => {moving(eventt)};
        }
    } else if(dir === 3) {
        if(e.offsetY - prevMouseY > 30) {
            changeVid(e);
            ++dir;
            vid.onmousemove = eventt => {moving(eventt)};
        }
    } else if(dir === 4) {
        if(prevMouseX - e.offsetX > 30) {
            changeVid(e);
            dir = 1;
            vid.onmousemove = eventt => {moving(eventt)}
        }
    };
};

function changeVid(e) {
    ++index;
    vid.removeAttribute('class');
    document.querySelector(`[src='S${selectedArray}/${index}.mp4']`).classList.add('video');
    vid = document.querySelector('.video');
    vid.play()
    index = index === 20 ? 0 : index;
    document.querySelector('#mainVid').style.display = 'none';
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
};

window.onerror = function () {
    location.reload();
};

function start() {
    audio.play();
    let btn = document.querySelector('button');
    btn.style.opacity = '0';
    setTimeout(() => {
        btn.style.display = 'none';
        let readyMessage = document.createElement('h1');
        readyMessage.innerHTML = 'READY';
        readyMessage.style.transform = 'translateY(-50%)';
        section.appendChild(readyMessage);
    }, 14000)
    setTimeout(() => {
        section.style.display = 'none';
        vid.style.display = 'block';
        vid.addEventListener('mouseenter', e => {
            prevMouseX = e.offsetX;
            prevMouseY = e.offsetY;
        })
    }, 16000)
};

audio.addEventListener('ended', () => {
    vid.style.display = 'none';
    section.innerHTML = '<h1>The Music Is Over</h1>'
    section.style.display = 'flex';
    setTimeout(() => {location.reload()}, 2000);
});

