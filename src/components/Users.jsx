import React, { useEffect, useState } from 'react'
import { app } from '../firebaseinit'
import { getFirestore, collection, query, getDocs } from 'firebase/firestore'
import { async } from '@firebase/util';

const Users = () => {
    const db= getFirestore(app);
    const [users, setUsers] = useState(null);
    const getUsers = async() => {
        const q = query(collection(db, 'users'));
        const result = await getDocs(q);
        const rows = [];
        result.forEach((doc) => {
            console.log(doc.data());
            rows.push(doc.data());
        });
        setUsers(rows);
    }

    useEffect(() => {
        getUsers();
    }, []);

    if(users === null) return <h1>로딩중.....</h1>
    return (
        <div>
            <h1>회원목록</h1>
            <div className='users'>
                {users.map(user =>
                    <div key={user.email} className='user'>
                        <div className='photo'>
                            <img src={user.photo} style={{width:'100px'}}/>
                        </div>
                        <div className='info'>
                            <h4>{user.name} : {user.email}</h4>
                            <h4>{user.address}</h4>
                            <h5>{user.phone}</h5>
                            <hr/>
                        </div>
                    </div>    
                )}
            </div>
        </div>
    )
}

export default Users