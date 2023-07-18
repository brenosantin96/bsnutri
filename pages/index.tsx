import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { InputMain } from '../components/InputMain'
import { ButtonSecondary } from '../components/ButtonSecondary'
import { Icon } from '@/components/Icon'
import HealthyWoman from '../public/woman2.png'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { useApi } from '@/libs/useApi'
import { useRouter } from 'next/router'
import { AuthContext } from '@/contexts/Auth/AuthContext'
import { setCookie } from 'cookies-next';


const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = useContext(AuthContext);


  const api = useApi();
  const router = useRouter();

  const handleLogin = async () => {
    const res = await auth.signIn(email, password);
    if (!res) {
      alert("Correo electrónico y/o contraseña incorrectos.")
    }
    if (res) {
      router.push('/calendar');
    }
  }


  useEffect(() => {
    if (auth.token !== "") { setCookie("token", auth.token); }
  }, [auth.token])

  return (
    <>
      <Head>
        <title>BSNutri | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.headerLogin}>
          <Icon svg='logo' width={54} height={64} />
        </div>
        <div className={styles.midarea}>
          <div className={styles.TextMidArea}>
            <p id='textRegisterPage'>Comer bien, Vivir mejor, Ser mas feliz</p>
          </div>
          <div className={styles.imageMidArea}>
            <Image src={HealthyWoman} alt="Image Chica" />
          </div>
        </div>
        <div className={styles.registerArea}>
          <div className={styles.formArea}>
            <InputMain onChange={e => setEmail(e)} fontSizeLabel={12} name={`emailInputLogin`} textLabel={'Email'} widthInput={262} typeInput="text" />
            <InputMain onChange={e => setPassword(e)} fontSizeLabel={12} name={`passwordInputLogin`} textLabel={'Password'} widthInput={262} typeInput="password" />
            <div className={styles.forgotPasswordText}>
              ¿Ha olvidado su contraseña? <Link legacyBehavior href={`/forgotPassword`}><a>Pulse aquí</a></Link>
            </div>
          </div>
          <div className={styles.buttonLoginArea}>
            <ButtonSecondary onClick={handleLogin} textButton='Acceder' />
          </div>
          <div className={styles.registerAreaText}>
            <Link legacyBehavior href={`/register`}><a>¿No tiene una cuenta? Regístrese</a></Link>
          </div>
        </div>
      </main>
    </>
  )
}


export default Login;
