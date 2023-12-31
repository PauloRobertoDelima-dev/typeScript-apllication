import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

interface Author{
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post ({ author, publishedAt, content }:PostProps) {

    const [comments, setComments] = useState ([
     "post muito bacana",
    ])  

    const [newCommentText, setNewCommentText] = useState ('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h' ", {
      locale: ptBr,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
      locale: ptBr,
      addSuffix: true,
    })

    function handleCreateNewComment (event: FormEvent) { {/*isso serve para que o html não faça a função padrão que é direcionar o user para outra page*/}
      event.preventDefault() 

      //const newCommentText = event.target.comment.value

      setComments ([...comments, newCommentText]);
      setNewCommentText('');

      //event.target.comment.value = '';    
    }

    function handleNewCommentChange (event:ChangeEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('');
      setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event:InvalidEvent <HTMLTextAreaElement>) {
      event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete:string) {
      const commentsWithoutDeletedOne = comments.filter( comment => {
        return comment !== commentToDelete;



      })
      setComments(commentsWithoutDeletedOne);

    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
           <header>
              <div className={styles.author}>
                <Avatar 
                 src={author.avatarUrl} 
                />
                <div className={styles.authorinfo}>
                    <strong>{author.name}</strong>
                    <span>{author.role}</span>
                </div>
              </div>
              <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                  {publishedDateRelativeToNow}
              </time>
                {/*instalar a biblioteca : npm i date-fns*/}
                
        
           </header>
           <div className={styles.content}>
            {content.map(line => {
              if (line.type === 'paragraph') {
                return <p key={line.content} >{line.content}</p>
              } else if (line.type === 'link') {
                return <p key={line.content} ><a href="#">{line.content}</a></p>;
              }


            })}

             {/*
              <p>Fala galeraa 👋</p>
             <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
             <p>👉{' '} <a href="">jane.design/doctorcare</a></p>
             <p> 
                <a href="">#novoprojeto</a>{' '}
                <a href=""> #nlw</a>{' '}
                <a href="">#rocketseat</a>{' '}
                
             </p>
                */}
           </div>
           <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
              <strong>Deixe seu feedback</strong>
              
              <textarea
                 name="comment"
                 placeholder="Deixe um comentário"
                 value={newCommentText}
                 onChange={handleNewCommentChange}
                 onInvalid={handleNewCommentInvalid}
                 required
              />
              <footer>
                  <button type="submit" disabled={isNewCommentEmpty}>
                    Publicar
                  </button> 
              </footer>             
                 
            </form>
            <div className={styles.commentList}>
              {comments.map(comment =>{
                return (
                 <Comment
                   key={comment} 
                   content={comment} 
                   onDeleteComment={deleteComment}
                 
                  />
                )
              })}
            </div>
        </article>
    )
}