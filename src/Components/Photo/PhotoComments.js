import React from 'react';
import { UserContext } from '../../UserContext';
import PhotoCommentForm from './PhotoCommentForm';
import styles from './PhotoComments.module.css';

const PhotoComments = ({ id, comments }) => {
  // Formulario só aparece se nosso login do nosso contexto for true.
  const { login } = React.useContext(UserContext);

  //Passamos um callback que roda uma vez e defini o estado inicial, nesse caso os comentarios da foto que estamos recebendo como propriedade
  const [postComments, setPostComments] = React.useState(() => comments);

  const commentsSection = React.useRef(null);

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul ref={commentsSection} className={styles.comments}>
        {postComments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentForm id={id} setPostComments={setPostComments} />}
    </>
  );
};

export default PhotoComments;
