import { useContext } from 'react';
import Login from '../../pages/index';
import { AuthContext } from './AuthContext';

type Props = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {

    const auth = useContext(AuthContext);

    if (!auth.token || auth.token === "noToken" || auth.token === null) {
        return <Login />
    }

    return children;

}