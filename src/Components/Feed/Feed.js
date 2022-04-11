import React from 'react';
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types'

const Feed = ({user}) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);

  // Estado que controla as paginas, vai adicionar 1,2,3 no array dependendo do scroll
  const [pages, setPages] = React.useState([1]);

  // estado que controla se o scroll infinito deve ocorrer
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    function infiniteScroll() {
      // So ativamos se o infinite for true
      if (infinite) {

        // Macete para a função de scroll nao ativar varias vezes
        let wait = false;

        // Pegando o tamanho da tela
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        // Se o scroll tiver em 75% da tela faz o fetch
        if (scroll > height * 0.75 && !wait) {

          // Pegamos as fotos que ja temos e adicionamos a proxima página
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;

          // Depois de 500 milisegundos voltamos o wait para false
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      } 
    }

    // Eventos de scroll e wheel
    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);

    // Limpando eventos
    return () => {
          window.removeEventListener('wheel', infiniteScroll);
          window.removeEventListener('scroll', infiniteScroll);
    }
  }, [infinite])
  
  // No feedphotos passamos o setInfinite para saber se qual pagina renderizada é a ultima e passamos a pagina, e para numero no no array do estado pages, vamos renderizar uma nova pagina
  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos key={page} user={user} page={page} setModalPhoto={setModalPhoto} setInfinite={setInfinite}/>
      ))}
    </div>
  );
}

Feed.defaultProps = {
  user: 0
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
}

export default Feed



