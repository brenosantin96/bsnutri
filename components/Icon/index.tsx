import Logo from './logo.svg'
import Back from './back.svg'
import Menu from './menu.svg'
import Meat from './meat.svg'
import Meal from './meal.svg'
import Book from './book.svg'
import Fav from './fav.svg'
import Logout from './logout.svg'
import Lupa from './lupa.svg'
import LeftArrow from './leftArrow.svg'
import RightArrow from './rightArrow.svg'
import BlankBox from './blank24x24.svg'

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
            {svg === 'meat' && <Meat color={color} />}
            {svg === 'meal' && <Meal color={color} />}
            {svg === 'book' && <Book color={color} />}
            {svg === 'fav' && <Fav color={color} />}
            {svg === 'logout' && <Logout color={color} />}
            {svg === 'lupa' && <Lupa color={color} />}
            {svg === 'leftArrow' && <LeftArrow color={color} />}
            {svg === 'rightArrow' && <RightArrow color={color} />}
            {svg === 'blank' && <BlankBox color={color} />}
        </div>
    )
}