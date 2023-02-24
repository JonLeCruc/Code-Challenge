 //henter json filen
 fetch('Json/action.json')
 //en metode der kører efter en promise har fået en værdi
   .then(response => response.json())
   .then(data => {
      //laver en forEach til entries fra json filen
      data.entries.forEach(item => {
       //laver en variable som et card element
       const listItem = document.createElement('card'); 
       //tilføjer en class med værdien 'MovieCard' til variablen
       listItem.classList.add("MovieCard");
       /*(TODO) - juster billederne til samme størrelse*/
      const img = document.createElement('img');
      //laver en variable der indeholder object.values af plprogram$thumbnails, og så [0] [0],
      //så vi får fat i url'en af json filen
               var imgLink = Object.values(Object.values(item.plprogram$thumbnails)[0])[0]
               img.src = `${imgLink}`
               //hvis nogle af billederne ikke virker skal den istedet skrive "Image not found"
               img.alt = "Image not found";
       //tilføjer en eventlistener til img som ved tryk åbner et nyt window
       //(TODO) - istedet for at åbne et nyt window skal den redirect så man bliver i samme fane
       img.addEventListener('click', () => {
        const newWindow = window.open("NewPage.html");
        newWindow.onload = () => {
          //laver et h1 element i html dokumentet og henter titlen fra json filen
          const movieTitle = document.createElement('h1');
          movieTitle.textContent = item.title;

          const Description = document.createElement('h5');
          Description.textContent = "Description: ";

          const movieDescription = document.createElement('p');
          movieDescription.textContent = item.description;
          

          const credits = document.createElement('h5');
          credits.textContent = "Credits: ";

          const movieCredits = document.createElement('p');
          //her kører jeg en foreach som henter alt data fra plprogram$personName fra alle objecter.
          item.plprogram$credits.forEach(element => {
            movieCredits.textContent = movieCredits.textContent + element.plprogram$personName + ", "
          });

          const year = document.createElement('h5');
          year.textContent = "Year: ";

          const movieYear = document.createElement('p');
          movieYear.textContent = item.plprogram$year;

               //henter billedet på samme måde som før, og indsætter det i Details.html
               const movieThumbnail = document.createElement('img');
               var imgLink = Object.values(Object.values(item.plprogram$thumbnails)[0])[0]
               movieThumbnail.src = `${imgLink}`
               movieThumbnail.setAttribute("id", "thumbnail");

               //(TODO) - lav en knap der redirecter tilbage på Code Challenge.html (i samme page)
                // const backButton = document.createElement('button');
                // backButton.textContent = 'Back';
                // backButton.addEventListener('click', () => {
                //  window.open('Code Challenge.html', '_self');
                // });

                //laver et div der bliver wrappet omkring alt dataen
              const detailContainer = document.createElement('div');
              detailContainer.classList.add('detail-container');
              //indsætter det forskelligt data jeg har trukket fra json filen til variablen
              detailContainer.appendChild(movieTitle);
              detailContainer.appendChild(movieThumbnail);
              detailContainer.appendChild(Description);
              detailContainer.appendChild(movieDescription);
              detailContainer.appendChild(credits);
              detailContainer.appendChild(movieCredits);
              detailContainer.appendChild(year);
              detailContainer.appendChild(movieYear);
              // detailContainer.appendChild(backButton);
            
              //indsætter til sidst variablen til body'en i html dokumentet.
              newWindow.document.body.appendChild(detailContainer);
        }
      });
       //henter titlen fra json filen og sætter den til content
       listItem.textContent = `${item.title}`;
       //tilføjer billedet til variablen
       listItem.appendChild(img);

       //indsætter til sidst variablen til body'en af HTML dokumentet
       document.querySelector("#cards-container").appendChild(listItem);
     });
    
   })

