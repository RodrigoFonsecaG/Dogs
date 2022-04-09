import React from 'react';
import { COMMENT_POST } from '../../Api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import Error from '../Helper/Error.js'
import useFetch from '../../Hooks/useFetch';
import styles from './PhotoCommentForm.module.css';

const PhotoCommentForm = ({ id, setPostComments, single }) => {
  const [comment, setComment] = React.useState('');
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment('');

      //Enviamos json ja que o comentario é um objeto
      setPostComments((comments) => [...comments, json]);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${single ? styles.single : ''}`}>
      <textarea
        className={styles.textarea}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        name="comment"
        id="comment"
        placeholder="Comente..."
      />

      <button className={styles.button}>
        <Enviar />
      </button>
      {error && <Error error={error} />}
    </form>
  );
};

export default PhotoCommentForm;
