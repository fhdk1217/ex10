import React, { useEffect, useRef, useState } from 'react'
import { app } from '../firebaseinit'
import { getFirestore, doc, setDoc, getDoc }  from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'

const MyPage = ({history}) => {
    const db = getFirestore(app);
    const storage = getStorage(app);

    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        email: sessionStorage.getItem('email'),
        name: '홍길동',
        address: '인천 서구 루원시티 포레나',
        phone: '010-1234-5678',
        photo:''
    });

    const {email, name, address, phone, photo} = form;
    const ref_file = useRef(null);
    const [image, setImage] = useState('http://via.placeholder.com/100x120');
    const onChageFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        console.log(file);
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(!window.confirm('수정내용을 저장하시겠습니까?')) return;
        //이미지업로드
        
        let url="";
        if(file !== null) { //이미지가 있는 경우
            const result = await uploadBytes(ref(storage, `images/${Date.now()}_${file.name}`), file)
            url = await getDownloadURL(result.ref);
        }
        await setDoc(doc(db, 'users', email), {
            ...form,
            photo: url
        });
        history.push('/');
    }

    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const onRead = async() => {
        const user = await getDoc(doc(db, 'users', email));
        //console.log(user.data());
        setForm(user.data());
        setImage(user.data().photo);
    }

    useEffect(() => {
        onRead();
    }, []);

    return (
        <div style={{width:'50%',margin:'0px auto',textAlign:'center'}}>
            <h1>마이페이지</h1>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} 
                    name="name" value={name} placeholder='이름'/>
                <input onChange={onChange}
                    name="address" value={address} placeholder='주소'/>
                <input onChange={onChange}
                    name="phone" value={phone} placeholder='전화'/>
                <img src={image || 'http://via.placeholder.com/100x120'}
                    onClick={()=>ref_file.current.click()}
                    style={{width:'30%'}}/>
                <input onChange={onChageFile}
                    ref={ref_file} 
                    type="file" accept='image/*' style={{display:'none'}}/>
                <hr/>
                <button>정보수정</button>
            </form>
        </div>
    )
}

export default MyPage