import Logo from './logo.svg'
import Back from './back.svg'
import Menu from './menu.svg'

type Props = {
    svg: string;
    width: number;
    height: number
    color?: string;
}

export const Icon = ({ svg, color, width, height }: Props) => {
    return (
        <div style={{ width, height }}>
            {svg === 'logo' && <Logo color={color} />}
            {svg === 'back' && <Back color={color} />}
            {svg === 'menu' && <Menu color={color} />}
        </div>
    )
}