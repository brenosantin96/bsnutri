import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Register.module.css'
import { InputMain } from '../components/InputMain'
import { ButtonSecondary } from '../components/ButtonSecondary'
import { Icon } from '@/components/Icon'
import FamilyImage from '../public/family.png'
import { useState } from 'react'
import { User } from '@/types/User'
import { useApi } from '@/libs/useApi'
import { useRouter } from 'next/router'


const Register = () => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const api = useApi();
    const router = useRouter();

    const handleRegister = async () => {
        api.createUser({id: 1, email, name, password});
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>BSNutri | Inscribir</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={styles.headerLogin}>
                    <Icon svg='logo' width={54} height={64} />
                </div>
                <div className={styles.midarea}>
                    <div className={styles.imageMidArea}>
                        <Image src={FamilyImage} alt="Image Familia" />
                    </div>
                    <div className={styles.TextMidArea}>
                        <p id='textRegisterPage'>Ven y vive, sientete bien, se mejor, Inscribete</p>
                    </div>
                </div>
                <div className={styles.registerArea}>
                    <div className={styles.formArea}>
                        <InputMain onChange={e => setName(e)} fontSizeLabel={12} name={`nameInput`} textLabel={'Nome'} widthInput={262} typeInput="text" />
                        <InputMain onChange={e => setEmail(e)} fontSizeLabel={12} name={`emailInput`} textLabel={'Email'} widthInput={262} typeInput="text" />
                        <InputMain onChange={e => setPassword(e)} fontSizeLabel={12} name={`passwordInput`} textLabel={'Password'} widthInput={262} typeInput="password" />
                    </div>
                    <ButtonSecondary onClick={handleRegister} textButton='Inscríbete' />
                </div>
            </main>
        </>
    )
}


export default Register;
