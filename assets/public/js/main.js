/*
=====================================================
SCRIPT PRINCIPAL DO SITE
Todo o código é executado após o carregamento do DOM
=====================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  /*
  =====================================================
  CONTADOR REGRESSIVO (COUNTDOWN)
  =====================================================
  Existem duas datas:
  - Primeira data do evento
  - Segunda data do evento

  Quando a primeira termina, o contador inicia a segunda.
  */

  const countdownDate1 = new Date('2026-03-28T14:00:00').getTime();
  const countdownDate2 = new Date('2026-03-29T14:00:00').getTime();

  let activeCountdown = 1;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  let timer;

  function updateCountdown(targetDate) {

    const now = new Date().getTime();
    const distance = targetDate - now;

    /*
    Se o contador terminar
    */
    if (distance <= 0) {

      if (activeCountdown === 1) {

        /*
        Inicia o segundo contador
        */
        activeCountdown = 2;
        startCountdown(countdownDate2);

      } else {

        /*
        Finaliza completamente
        */
        clearInterval(timer);

        if (daysEl) {
          daysEl.textContent =
            hoursEl.textContent =
            minutesEl.textContent =
            secondsEl.textContent = "00";
        }

      }

      return;
    }

    /*
    Cálculo de tempo restante
    */
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) /
      1000
    );

    /*
    Atualiza elementos do DOM
    */
    if (daysEl) {

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");

    }

  }

  function startCountdown(date) {

    clearInterval(timer);

    updateCountdown(date);

    timer = setInterval(() => {
      updateCountdown(date);
    }, 1000);

  }

  startCountdown(countdownDate1);


  /*
  =====================================================
  NAVBAR - ALTERAR COR AO FAZER SCROLL
  =====================================================
  Quando o usuário rola a página,
  a navbar recebe a classe "scrolled"
  */

  const navbar = document.querySelector(".navbar");

  if (navbar) {

    window.addEventListener("scroll", function () {

      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

    });

  }


  /*
  =====================================================
  CARREGAMENTO DOS PRELETORES
  =====================================================
  Os dados são carregados a partir de um arquivo JSON
  */
  fetch('assets/public/json/preletores.json')
    .then(result => result.json())
    .then(dados => {

      const container = document.querySelector('#preletores-line');

      if (!container) return;

      dados.forEach(preletor => {

        const cardPreletor = document.createElement('div');

        cardPreletor.className =
          'col-6 col-sm-4 col-md-3 col-lg-2 bg-white preletoresCard';

        /* gera o conteúdo do CV se existir */
        let cvHtml = "";

        if (preletor.cv) {

          cvHtml = `
          <ul class="cvList">
            ${preletor.cv.map(item =>
            `<li class="text-primary">${item}</li>`
          ).join("")}
          </ul>
        `;

        }

        cardPreletor.innerHTML = `
        <img src="${preletor.imgSrc}" alt="${preletor.nome}">

        <h6 class="mt-2 nomePreletor">
          ${preletor.nome}
          ${cvHtml}
        </h6>

        <div class="infosPreletores p-4">
        </div>
      `;

        /*
        Efeito hover
        */

        cardPreletor.addEventListener('mouseover', () => {

          cardPreletor
            .querySelector('.nomePreletor')
            .classList.add('top');

          cardPreletor
            .querySelector('.infosPreletores')
            .classList.add('active');

        });

        cardPreletor.addEventListener('mouseleave', () => {

          cardPreletor
            .querySelector('.nomePreletor')
            .classList.remove('top');

          cardPreletor
            .querySelector('.infosPreletores')
            .classList.remove('active');

        });

        container.appendChild(cardPreletor);

      });

    })
    .catch(error => {
      console.error("Erro ao carregar preletores:", error);
    });


  /*
  =====================================================
  CARREGAMENTO DOS VÍDEOS
  =====================================================
  */

  fetch('assets/public/json/videos.json')
    .then(result => result.json())
    .then(dados => {

      const container = document.querySelector('#videos-line');

      if (!container) return;

      dados.forEach(video => {

        const cardVideo = document.createElement('div');

        cardVideo.className =
          'cardVideo col-6 col-sm-4 col-md-3 col-lg-2';

        cardVideo.innerHTML = `
          <div class="cardVideoItem" data-video="${video.vidSrc}">
              <img src="assets/public/images/play-circle.svg" class="play-circle">
              <div class="degrade"></div>
              <img class="sec-video-img" alt="" src="${video.videoImg}">
          </div>
        `;

        cardVideo.addEventListener('mouseover', () => {

          cardVideo
            .querySelector('.degrade')
            .classList.add('active');

          cardVideo
            .querySelector('.play-circle')
            .classList.add('blue');

        });

        cardVideo.addEventListener('mouseleave', () => {

          cardVideo
            .querySelector('.degrade')
            .classList.remove('active');

          cardVideo
            .querySelector('.play-circle')
            .classList.remove('blue');

        });

        container.appendChild(cardVideo);

      });

      container.style.justifyContent = 'center';

      $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
          loop: true,
          margin: 20,
          dots: false,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          responsive: {
            0: {
              items: 2
            },
            768: {
              items: 4
            },
            1024: {
              items: 6
            }
          }
        });
      });
    })
    .catch(error => {
      console.error("Erro ao carregar vídeos:", error);
    });


  document.addEventListener("click", function (e) {

    const videoItem = e.target.closest(".cardVideoItem");
    if (!videoItem) return;

    let videoSrc = videoItem.dataset.video;

    // Convertir URL de YouTube a embed
    if (videoSrc.includes("youtube.com/watch")) {
      const id = videoSrc.split("v=")[1].split("&")[0];
      videoSrc = `https://www.youtube.com/embed/${id}?autoplay=1`;
    }

    const frame = document.getElementById("videoFrame");
    frame.src = videoSrc;

    const modal = new bootstrap.Modal(document.getElementById('videoModal'));
    modal.show();

  });

  const modalElement = document.getElementById('videoModal');

  modalElement.addEventListener('hidden.bs.modal', function () {

    const frame = document.getElementById("videoFrame");
    frame.src = "";

  });


  /*
  =====================================================
  CARREGAMENTO DAS SÍNTESES
  =====================================================
  */

  fetch('assets/public/json/sintese.json')
    .then(result => result.json())
    .then(data => {

      const container = document.querySelector('#natal');

      if (!container) return;

      data.forEach(sintese => {

        const sinteseCard = document.createElement('div');

        sinteseCard.className = 'sintese-card';

        sinteseCard.innerHTML = `
          <img src="${sintese.imgSrc}" class="sinteseImg">

          <div class="sinteseData w-75">

            <h3>${sintese.class}</h3>
            <h5 class="fw-medium">${sintese.lesson}</h5>

            <div class="sinteseMeta">
              <div class="metaItem">
                <img class="sinteseIcon" src="assets/public/images/user.svg">
                <p>${sintese.teacherName}</p>
              </div>
              <div class="metaItem">
                <img class="sinteseIcon" src="assets/public/images/clock.svg">
                <p>${sintese.time}</p>
              </div>
              <div class="metaItem">
                <img class="sinteseIcon" src="assets/public/images/place.svg">
                <p>${sintese.place}</p>
              </div>
            </div>

          </div>

          <a href="${sintese.link}" class="btn btn-warning btn-md d-flex align-items-center gap-2">
            <p class="m-0">
              <span>Inscreva-se</span>
            </p>
            <img class="sinteseIcon"
            src="assets/public/images/arrow.svg">
          </a>
        `;

        container.appendChild(sinteseCard);

      });

    })
    .catch(error => {
      console.error("Erro ao carregar sínteses:", error);
    });




  fetch('assets/public/json/sintese-ms.json')
    .then(result => result.json())
    .then(data => {

      const container = document.querySelector('#oeste');

      if (!container) return;

      data.forEach(sintese => {

        const sinteseCard = document.createElement('div');

        sinteseCard.className = 'sintese-card';

        sinteseCard.innerHTML = `
          <img src="${sintese.imgSrc}" class="sinteseImg">

          <div class="sinteseData w-75">

            <h2>${sintese.class}</h2>
            <h4 class="fw-medium">${sintese.lesson}</h4>

            <div class="sinteseMeta">
              <div class="metaItem">
                <img class="sinteseIcon" src="assets/public/images/user.svg">
                <p>${sintese.teacherName}</p>
              </div>
              <div class="metaItem">
                <img class="sinteseIcon" src="assets/public/images/clock.svg">
                <p>${sintese.time}</p>
              </div>
              <div class="metaItem">
                <img class="sinteseIcon" src="assets/public/images/place.svg">
                <p>${sintese.place}</p>
              </div>
            </div>

          </div>

          <a href="${sintese.link}" class="btn btn-warning btn-md d-flex align-items-center gap-2">
            <p class="m-0">
              <span>Inscreva-se</span>
            </p>
            <img class="sinteseIcon"
            src="assets/public/images/arrow.svg">
          </a>
        `;

        container.appendChild(sinteseCard);

      });

    })
    .catch(error => {
      console.error("Erro ao carregar sínteses:", error);
    });
});


const video = document.getElementById("videoEBD");
const btn = document.getElementById("videoBtn");
const overlay = document.getElementById("videoOverlay");
const wrapper = document.getElementById("videoWrapper");

let hideTimer = null;

function toggleVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

btn.addEventListener("click", toggleVideo);
video.addEventListener("click", toggleVideo);

video.addEventListener("play", () => {

  overlay.classList.add("hidden");
  btn.innerHTML = '<i class="bi bi-pause-fill"></i>';

  hideTimer = setTimeout(() => {
    btn.classList.add("hidden");
  }, 1500);

});

video.addEventListener("pause", () => {

  overlay.classList.remove("hidden");
  btn.innerHTML = '<i class="bi bi-play-fill"></i>';
  btn.classList.remove("hidden");

  if (hideTimer) {
    clearTimeout(hideTimer);
  }

});

wrapper.addEventListener("mousemove", () => {

  if (!video.paused) {

    btn.classList.remove("hidden");

    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    hideTimer = setTimeout(() => {
      btn.classList.add("hidden");
    }, 1500);

  }

});
