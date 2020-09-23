import React from 'react'
import DataTable from 'react-data-table-component'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { readData, readColumns } from '../lib/readData'

const Index = ({ data, columns }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Donate with Data2thePeople</title>
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
        <h1 className={styles.title}>Donate</h1>
        <p className={styles.description}>Make every dollar count</p>
        <div className={styles.grid}>
          <DataTable highlightOnHover noHeader columns={columns} data={data} />
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

export const getStaticProps = async () => {
  const data = await readData()
  const columns = await readColumns()
  return {
    props: {
      data,
      columns,
    },
  }
}

export default Index
