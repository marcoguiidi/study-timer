// Aggiunge un listener per l'evento di submit al form con id 'studyForm'
document.getElementById('studyForm').addEventListener('submit', function(event) {
    // Previene il comportamento di default dell'evento, che sarebbe il submit del form
    event.preventDefault();
  
    // Ottiene il tempo di studio inserito dall'utente e lo converte in un numero intero
    const studyTime = parseInt(document.getElementById('studyTime').value, 10);
    // Converte i minuti in secondi per l'animazione
    const animationDuration = studyTime * 60; 


    const audio = new Audio('timer_sound.mp3');
  
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
    const endTime = Date.now() + studyTime * 60000; 
  
    
    // Imposta un intervallo che si ripete ogni secondo
    const interval = setInterval(function() {
      
    const now = Date.now();
    // Calcola la differenza tra il tempo di fine e il tempo corrente
    var difference = endTime - now;

    // Se la differenza è minore o uguale a 0, ferma l'intervallo
    if (difference <= 0) {
      clearInterval(interval);
      
      // audio.play();
      // const delay = (n) => new Promise(r => setTimeout(r, n * 1000));
      // delay(2);
      // audio.pause();

      const styleSheet = document.createElement("style");
      styleSheet.innerText = `
      .hider{
        display: flex;
      }

      .timer{
        display: none;
      }

      #stop{
        visibility: hidden;
      }
      `;
      // Aggiunge il foglio di stile creato all'elemento head del documento
      document.head.appendChild(styleSheet);
      
      // Pulisce il testo dell'elemento con id 'timerDisplay'
      document.getElementById('timerDisplay').textContent = ""; 
      return;
    }

    // Calcola i minuti e i secondi rimanenti
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Visualizza il tempo rimanente nell'elemento con id 'timerDisplay'
    //padstart aggiunge uno zero prima della stringa se non raggiunge almeno una lunghezza di 2
      document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
  });
