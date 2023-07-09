import Logo from './logo.svg'

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
        </div>
    )
}