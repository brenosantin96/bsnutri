import { useApi } from '@/libs/useApi'
import { User } from '@/types/User'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

const TestPage = (data: ServerProps) => {

    const [users, setUsers] = useState<User[]>(data.users);




    return (

        <div>
            {users.map((item, index) => (
                <div key={index}>
                    {item.name} - {item.email}
                </div>
            ))}

        </div>
    )
}

export default TestPage


type ServerProps = {
    users: User[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const api = useApi();

    //Get products
    const users = await api.getUsers();


    return {
        props: {
            users
        }
    }
}