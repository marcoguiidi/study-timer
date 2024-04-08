let bgMusic = false;

// Aggiunge un listener per l'evento di submit al form con id 'studyForm'
document.getElementById('studyForm').addEventListener('submit', function(event) {
    // Previene il comportamento di default dell'evento, che sarebbe il submit del form
    event.preventDefault();

    let studing = true;

    let music = document.getElementById("inAudio");
    if(bgMusic){
      music.play();
    }
    // Ottiene il tempo di studio inserito dall'utente e lo converte in un numero intero
    const studyTime = parseInt(document.getElementById('studyTime').value, 10);
    const pauseTime = parseInt(document.getElementById('pauseTime').value, 10);
    const times = parseInt(document.getElementById('times').value, 10);
    // Converte i minuti in secondi per l'animazione
    const animationDuration = studyTime * 60; 
  
    // Imposta l'animazione con durata dinamica per gli pseudo-elementi ::before e ::after
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      body {
        animation: bg ${animationDuration}s 1;
      }

      .hider{
        display: none;
      }

      .timer{
        display:flex;
        animation: timer 5s 1;
      }

      #stop{
        visibility: visible;
        animation: sButton ${animationDuration}s 1;
      }
    `;
    // Aggiunge il foglio di stile creato all'elemento head del documento
    document.head.appendChild(styleSheet);
  
    // Calcola il tempo di fine aggiungendo la durata del timer al tempo corrente
     
  
    
    for (let i = 0; i < times; i++) {
      if(studing){
        // Imposta un intervallo che si ripete ogni secondo
        let endStudyTime = Date.now() + studyTime * 60000;
        const interval = setInterval(function() {
          
          const now = Date.now();
          // Calcola la differenza tra il tempo di fine e il tempo corrente
          var difference = endStudyTime - now;

          // Se la differenza è minore o uguale a 0, ferma l'intervallo
          if (difference <= 0) {
            clearInterval(interval);
            music.pause()
            
            let audio = document.getElementById("endAudio");
            audio.play();
            
            setTimeout(function(){
              audio.pause();

              const styleSheet = document.createElement("style");
              styleSheet.innerText = `
              // .hider{
              //   display: flex;
              // }

              // timer{
              //   display: none;
              // }

              #stop{
                visibility: hidden;
              }

              #clock{
                display: none;
              }

              #pause{
                display: flex;
              }
              `;
              document.head.appendChild(styleSheet);
              
              studing = false;
            }, 3000);
          }

          // Calcola i minuti e i secondi rimanenti
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          // Visualizza il tempo rimanente nell'elemento con id 'timerDisplay'
          //padstart aggiunge uno zero prima della stringa se non raggiunge almeno una lunghezza di 2
          document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
      }

      if(!studing){
        let endPauseTime = Date.now() + pauseTime * 60000;
        music.play();
        const pause = setInterval(function() {
          
          const now = Date.now();
          // Calcola la differenza tra il tempo di fine e il tempo corrente          
          var Pdifference = endPauseTime - now;

          // Se la differenza è minore o uguale a 0, ferma l'intervallo
          if (Pdifference <= 0) {
            clearInterval(pause);
            music.pause();
            
            const styleSheet = document.createElement("style");
            styleSheet.innerText = `
            .hider{
              display: flex;
            }

            .timer{
              display: none;
            }

            #pause{
              display: none;
            }

            #stop{
              visibility: hidden;
            }
            `;
            document.head.appendChild(styleSheet);
            
            // Pulisce il testo dell'elemento con id 'timerDisplay'
            document.getElementById('pauseTimer').textContent = ""; 
          
            studing = true;
          }

          // Calcola i minuti e i secondi rimanenti
          const Pminutes = Math.floor((Pdifference % (1000 * 60 * 60)) / (1000 * 60));
          const Pseconds = Math.floor((Pdifference % (1000 * 60)) / 1000);
          

          document.getElementById('pauseTimer').textContent = `${String(Pminutes).padStart(2, '0')}:${String(Pseconds).padStart(2, '0')}`;
        }, 1000);
      }
    }
    return;
});

document.getElementById("music").addEventListener("click", function(event){
  event.preventDefault();

  //evidenzia il pulsante in maniera differente in base alla selezione
  if (bgMusic){  
    bgMusic = false;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
    #music{
      opacity: 0.6;
    }
    `;
    document.head.appendChild(styleSheet);
  } else {
    bgMusic = true;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
    #music{
      opacity: 1;
    }
    `;
    document.head.appendChild(styleSheet);
  }
});
  