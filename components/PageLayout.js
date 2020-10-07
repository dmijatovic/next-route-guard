
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
import styles from '../styles/Layout.module.css'


export default function PageLayout({children,...props}){
  return(
    <article className={styles.container}>
      <PageHeader {...props} />
      <main className={styles.main}>
       {children}
      </main>
      <PageFooter {...props}/>
    </article>
  )
}