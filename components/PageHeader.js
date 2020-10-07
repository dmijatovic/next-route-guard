import Link from 'next/link'
import styles from '../styles/Layout.module.css'
import {useRouter} from 'next/router'

export default function PageHeader(){
  const {pathname} = useRouter()
  const routes=[
    {href:"/",label:"Home"},
    {href:"/about",label:"About"},
    {href:"/profile",label:"Profile"},
    {href:"/dashboard",label:"Dashboard"},
  ]
  return (
    <header className={styles.header}>
      <h2>Header title</h2>
      <nav>
        {routes.map(route=>{
          if (route.href === pathname){
            return (
              <Link href={route.href}
                key={route.href}
                className="menu-item active">
                <a className="active">{route.label}</a>
              </Link>
            )
          }else{
            return (
              <Link href={route.href}
                key={route.href}
                className="menu-item">
                <a>{route.label}</a>
              </Link>
            )
          }
        })}
      </nav>
    </header>
  )
}