
import { Header } from './components/header';
import { Post } from './components/Post';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';

import './global.css';

const posts = [
  {
    id: 1,
    author: {
     avatarUrl:'https://avatars.githubusercontent.com/u/138160699?v=4',
     name: 'Paulo ROberto',
     role:'Web Developer',
    },
   content: [
     {type:'paragraph', content:'Fala galeraa 👋'},
     {type:'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
     {type:'link', content:'jane.design/doctorcare'},
     {type:'paragraph', content:''},
    ],
    publishedAt: new Date('2023-07-28 10:00:00'),

  },
  {
    id: 2,
    author: {
     avatarUrl:'https://avatars.githubusercontent.com/u/46730164?v=4',
     name: 'Manoel',
     role:'Web FullStack Developer',
    },
   content: [
     {type:'paragraph', content:'Fala galeraa 👋'},
     {type:'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
     {type:'link', content:'jane.design/doctorcare'},
     {type:'paragraph', content:''},
    ],
    publishedAt: new Date('2023-07-29 07:00:00'),

  }
]

{/*iteração->é a gente repetir alguma coisa*/}


export function App() {
  return (
    <div>
      <Header />
       <div className={styles.wrapper}>
         <Sidebar />
         <main>
          {posts.map(post => {
              return (
                <Post 
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              )
          })  }
         </main>
      </div>
    </div>
  )
}


