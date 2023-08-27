import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import  styles from './Comment.module.css';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps){
  const [likeCount, setLikeCount] = useState (0);

  function handleDeleteComment () {

    onDeleteComment(content);

  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    });
  }

   return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} 
             src="https://avatars.githubusercontent.com/u/138160699?v=4" 
             alt="" 
             /> 
              
            <div className={styles.commentBox}>
              <div className={styles.commentContent}>
                 <header>
                   <div className={styles.authorAndTime}>
                     <strong>Paulo Roberto</strong>
                     <time title='23 de Julho as 08hs e 14 min' dateTime="2023-07-23 08:14:32">Cerca de 1h atrás</time>
                   </div>
                   <button onClick={handleDeleteComment} title='Deletar comentário'>
                     <Trash size={24} /> 
                   </button>
                 </header>

                 <p> {content}</p>
                   
               </div>               
              <footer>
                 <button onClick={handleLikeComment} >
                  <ThumbsUp />
                  Aplaudir <span>{likeCount}</span>
                 </button>
              </footer>     
            </div>
         </div>
     )
}