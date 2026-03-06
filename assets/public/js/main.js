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

fetch('assets/public/json/preletores.json')
  .then(
    result => result.json()
  )
  .then(dados => {
    console.log (dados);
    dados.forEach(preletor => {
      const cardPreletor = document.createElement('div');
      cardPreletor.className = 'col-6 col-sm-4 col-md-3 col-lg-2';
      
      cardPreletor.innerHTML = `
        <img src="${preletor.imgSrc}" alt="">
        <h6 class="mt-2">${preletor.nome}</h6>
        <div class>

      `;
      
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

fetch ('assets/public/json/sinteses').then(result => result.json()).then(data => {
    data.forEach (sintese => {
      const sinteseCard = document.createElement ('div');

      sinteseCard.className = 'sinteseCard'; 

      sinteseCard.innerHTML = `
        <img src='${sintese.imgSrc}' class='sinteseImg'>
        <div class='sinteseData'> 
          <h2 class=''> ${sintese.class} </h2>
          <h3 class=''> ${sintese.lesson} </h2>
          <div class='sinteseInfo'> 
            <img class='sinteseIcon' src='assets/public/images/user.svg'>
            <p> ${sintese.teacherName}</p>

            <img class='sinteseIcon' src='assets/public/images/clock.svg'>
            <p> ${sintese.time}</p>

            <img class='sinteseIcon' src='assets/public/images/place.svg'>
            <p> ${sintese.place}</p>
          
          </div>
          <a href='' class=''> <p> Inscreva-se </p> <img src='assets/public/images/arrow.svg'> </a>
        
        </div>
      `


    });
    


});

