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
          'col-6 col-sm-4 col-md-3 col-lg-2 preletoresCard';

        cardPreletor.innerHTML = `
          <img src="${preletor.imgSrc}" alt="preletor">
          <h6 class="mt-2 nomePreletor">${preletor.nome}</h6>
          <div class="infosPreletores">
            <p></p>
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
          <a href="${video.vidSrc}" class="cardVideo">
            <img src="assets/public/images/play-circle.svg" class="play-circle">
            <div class="degrade"></div>
            <img class="sec-video-img" alt="" src="${video.videoImg}">
          </a>
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

    })
    .catch(error => {
      console.error("Erro ao carregar vídeos:", error);
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

            <h2>${sintese.class}</h2>

            <h4 class="fw-medium">${sintese.lesson}</h4>

            <div class="container d-flex align-items-center">

              <img class="sinteseIcon"
              src="assets/public/images/user.svg">

              <p class="m-0 me-4 ms-2">
                ${sintese.teacherName}
              </p>

              <img class="sinteseIcon"
              src="assets/public/images/clock.svg">

              <p class="m-0 me-4 ms-2">
                ${sintese.time}
              </p>

              <img class="sinteseIcon"
              src="assets/public/images/place.svg">

              <p class="m-0 me-4 ms-2">
                ${sintese.place}
              </p>

            </div>

          </div>

          <a href=""
          class="btn btn-warning btn-md d-flex align-items-center gap-2">

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
