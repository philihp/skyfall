import React from 'react'
import Head from 'next/head'
import DataTable from 'react-data-table-component'
import styles from '../styles/Home.module.scss'

const columns = ['a', 'b', 'c', 'd']

const data = []

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Skyfall</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Skyfall</h1>
        <p className={styles.description}>Make every dollar count</p>
        <div className={styles.grid}>
          <DataTable highlightOnHover columns={columns} data={data} />
        </div>
      </main>

      <footer className={styles.footer}>
        Built with <span className={styles.heart}>&hearts;</span> by
        <img
          src="/favicon-32x32.png"
          alt="Data 2 The People"
          className={styles.logo}
        />
        <a href="https://www.data2thepeople.org">Data 2 the People</a>
      </footer>
    </div>
  )
}
