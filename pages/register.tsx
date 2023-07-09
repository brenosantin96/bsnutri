import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Register.module.css'
import { InputMain } from '../components/InputMain'
import { ButtonSecondary } from '../components/ButtonSecondary'
import { Icon } from '@/components/Icon'
import FamilyImage from '../public/family.png'


const Register = () => {
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
                        <InputMain  fontSizeLabel={12} name={`nameInput`} textLabel={'Nome'} widthInput={262} typeInput="text" />
                        <InputMain fontSizeLabel={12} name={`emailInput`} textLabel={'Email'} widthInput={262} typeInput="text" />
                        <InputMain fontSizeLabel={12} name={`passwordInput`} textLabel={'Password'} widthInput={262} typeInput="password" />
                    </div>
                    <ButtonSecondary textButton='Inscríbete' />
                </div>
            </main>
        </>
    )
}


export default Register;
