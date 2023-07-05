import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { InputMain } from '../components/InputMain'
import { ButtonSecondary } from '../components/ButtonSecondary'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BSNutri | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <InputMain fontSizeLabel={12} name={`loginInput`} textLabel={'Login'} widthInput={262} />
        <ButtonSecondary textButton='Cadastrar' />
      </main>
    </>
  )
}
