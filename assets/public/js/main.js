document.addEventListener('DOMContentLoaded', function () {
    const countdownDate1 = new Date('2026-03-28T14:00:00').getTime();
    const countdownDate2 = new Date('2026-03-29T14:00:00').getTime();
    let activeCountdown = 1;
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown(targetDate) {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance <= 0) {
            if (activeCountdown === 1) {
                activeCountdown = 2;
                startCountdown(countdownDate2);
            } else {
                clearInterval(timer);
                daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
                }
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    let timer;
    function startCountdown(date) {
        clearInterval(timer);
        updateCountdown(date);
        timer = setInterval(() => updateCountdown(date), 1000);
}

    startCountdown(countdownDate1);
});

// === Navbar 

function createThreshold (numMin, numMax) {
  const list = []; 
  for (let i = numMin; i<numMax; i += 0.001) {
    list.push (i/100); 
  }
  return list;
}

const nav = document.querySelector ('.navbar'); 

function navCallback(entries) {

  const ratio = entries[0].intersectionRatio*10000/8

  console.log (ratio)

  if (ratio > 70) {
    nav.style.backgroundSize =  `100% 0%`; 
    return; 
  }

  if (ratio < 20) {
      nav.style.backgroundSize =  `100% 100%`;
      return;  
  }

  nav.style.backgroundSize =  `100% ${100 - ratio}%`;
  
}

const navOptions = {threshold: createThreshold (0,8)}; 

const navObs = new IntersectionObserver(navCallback, navOptions);

navObs.observe (document.querySelector('.hero'));

// ==== Preletores

fetch('assets/public/json/preletores.json')
  .then(
    result => result.json()
  )
  .then(dados => {
    console.log (dados);
    dados.forEach(preletor => {
      const cardPreletor = document.createElement('div');
      cardPreletor.className = 'col-6 col-sm-4 col-md-3 col-lg-2 preletoresCard';
      
      cardPreletor.innerHTML = `
        <img src="${preletor.imgSrc}" alt="preletor">
        <h6 class="mt-2 nomePreletor">${preletor.nome}</h6>
        <div class="infosPreletores"> 
          <p class=""> </p>
        </div>
      `;

      cardPreletor.addEventListener ('mouseover', (event) => {
          event.preventDefault();
          
          cardPreletor.querySelector('.nomePreletor').classList.add ('top'); 
          cardPreletor.querySelector('.infosPreletores').classList.add ('active'); 
      });
      cardPreletor.addEventListener ('mouseleave', (event) => {
          event.preventDefault();
          
          cardPreletor.querySelector('.nomePreletor').classList.remove ('top'); 
          cardPreletor.querySelector('.infosPreletores').classList.remove ('active');
      });
      
      document.querySelector('#preletores-line').appendChild(cardPreletor);
    });
});

// === Videos

fetch('assets/public/json/videos.json')
  .then(
    result => result.json()
  )
  .then(dados => {
    console.log (dados);
    dados.forEach(video => {
      const cardVideo = document.createElement('div');
      cardVideo.className = 'cardVideo col-6 col-sm-4 col-md-3 col-lg-2';
      
      cardVideo.innerHTML = `
        <a href="${video.vidSrc}" alt="" class="cardVideo">
          <img src="assets/public/images/play-circle.svg" class="play-circle">
          <div class="degrade"> </div>
          <img class="sec-video-img" alt="" src=${video.videoImg}>
        </a>
        
        <div class>

      `;

      cardVideo.addEventListener ('mouseover', (event) => {
        event.preventDefault(); 
        cardVideo.querySelector ('.degrade').classList.add('active'); 
        cardVideo.querySelector ('.play-circle').classList.add('blue'); 

      })

      cardVideo.addEventListener ('mouseleave', (event)=> {
        event.preventDefault();
        cardVideo.querySelector ('.degrade').classList.remove('active'); 
        cardVideo.querySelector ('.play-circle').classList.remove('blue'); 

      })
      
      document.querySelector('#videos-line').appendChild(cardVideo);
    });
    document.querySelector('#videos-line').style.justifyContent = 'center'
  }
);

// === Sínteses

fetch ('assets/public/json/sintese.json').then(result => result.json()).then(data => {
    data.forEach (sintese => {
      const sinteseCard = document.createElement ('div');

      sinteseCard.className = 'sintese-card'; 
      
      sinteseCard.innerHTML = `
        <img src='${sintese.imgSrc}' class='sinteseImg'>
        <div class='sinteseData w-75'> 
          <h2 class=''> ${sintese.class} </h2>
          <h4 class='fw-medium'> ${sintese.lesson} </h2>
          <div class='container d-flex align-items-centerd> 
            <img class='sinteseIcon' src='assets/public/images/user.svg'>
            <p class='m-0 me-4 ms-2'> ${sintese.teacherName}</p>

            <img class='sinteseIcon' src='assets/public/images/clock.svg'>
            <p class='m-0 me-4 ms-2'> ${sintese.time}</p>

            <img class='sinteseIcon' src='assets/public/images/place.svg'>
            <p class='m-0 me-4 ms-2'> ${sintese.place}</p>
          
          </div>        
        </div>
        <a href='' class='btn btn-warning btn-md d-flex align-items-center gap-2'> <p class='m-0' > <span>Inscreva-se</span> </p> <img class="sinteseIcon" src='assets/public/images/arrow.svg'> </a>

      `

      document.querySelector('#natal').appendChild(sinteseCard);
    });
    


});

