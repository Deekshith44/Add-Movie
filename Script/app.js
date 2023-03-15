const addMovieModa=document.getElementById('add-modal');
const startAddMovieButton=document.querySelector('header button');
const backdrop=document.getElementById('backdrop');
const cancelMovieButton=addMovieModa.querySelector('.btn--passive');
const confirmAddButton=cancelMovieButton.nextElementSibling;
const userInputs=addMovieModa.querySelectorAll('input');
const movies=[];
const entryTextSection=document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');


const updateUI=()=>{
   if(movies.length===0)
   {
       entryTextSection.style.display='block';
   }
   else{
       entryTextSection.style.display='none';
   }

};


const toggleBackdrop=()=>{
    backdrop.classList.toggle('visible');
};

const showMovieModal=()=>{
addMovieModa.classList.add('visible');
toggleBackdrop();
};

const cancelMovieButtonHandler=()=>{
    toggleBackdrop();
    addMovieModa.classList.remove('visible');
};

const backdropHandler=()=>{
    
    cancelMovieButtonHandler();

};

const renderNewMovie=(id,title,imageURL,ratings)=>{
const newMovieElement=document.createElement('li');
newMovieElement.className='movie-element';
newMovieElement.innerHTML=`
  <div class="movie-element__image">
    <img src="${imageURL}" alt="${title}">
  </div>
  <div class="movie-element__info">
   <h2>${title}</h2>
   <p>${ratings}</p>
  </div>

`;
newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );
const listroot=document.getElementById('movie-list');
listroot.append(newMovieElement);

};

const deleteMovieHandler = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
      if (movie.id === movieId) {
        break;
      }
      movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
    cancelMovieButtonHandler();
    updateUI();
  };

  const startDeleteMovieHandler = movieId => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
  
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  
    // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId)); // will not work :(
      
    cancelDeletionButton.removeEventListener('click', cancelMovieButtonHandler);
  
    cancelDeletionButton.addEventListener('click', cancelMovieButtonHandler);
    confirmDeletionButton.addEventListener(
      'click',
      deleteMovieHandler.bind(null, movieId)
    );
  };


const addMovehandler=()=>
{
  const titlevalue=userInputs[0].value;
  const ImageValue=userInputs[1].value;
  const ratingvalue=userInputs[2].value;

  if(titlevalue.trim()===''||ImageValue.trim()===''||ratingvalue.trim()===''||+ratingvalue<1||+ratingvalue>5)
  {
      alert('enter valid inputs')
  }
    
  const newMovies={
      id:Math.random().toString(),
      title:titlevalue,
      image:ImageValue,
      rate:ratingvalue
  };
  movies.push(newMovies);
  console.log(movies);
  cancelMovieButtonHandler();
   renderNewMovie(
        newMovies.id,
        newMovies.title,
        newMovies.image,
        newMovies.rate
  );
    updateUI();

};


startAddMovieButton.addEventListener('click',showMovieModal);
cancelMovieButton.addEventListener('click',cancelMovieButtonHandler);
backdrop.addEventListener('click',backdropHandler);
confirmAddButton.addEventListener('click',addMovehandler);
