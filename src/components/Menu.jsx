import React, { useState } from 'react'
import { NavLink, Route, Router, Switch, withRouter } from 'react-router-dom'
import Home from './Home'
import Join from './Join'
import Login from './Login'
import MyPage from './MyPage'
import Product from './Product'
import Users from './Users'

const Menu = ({history}) => {
    const onLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('email');
        history.push('/');
    }

    return (
        <div>
            <div className='menu'>
                <NavLink to="/" exact={true}>Home</NavLink>
                <NavLink to="/users">회원목록</NavLink>
                {sessionStorage.getItem('email') ?
                    <NavLink to="#" onClick={onLogout}>로그아웃</NavLink>
                    :
                    <NavLink to="/login">로그인</NavLink>
                }
                {sessionStorage.getItem('email')
                    && <NavLink to="/mypage">마이페이지</NavLink>}
                {sessionStorage.getItem('email') && <span>{sessionStorage.getItem('email')}</span>}
            </div>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/products" component={Product}/>
                <Route path="/login" component={Login}/>
                <Route path="/join" component={Join}/>
                <Route path="/mypage" component={MyPage}/>
                <Route path="/users" component={Users}/>
                <Route render={({location})=><h3>{location.pathname} 페이지는 존재하지 않습니다.</h3>}/>
            </Switch>
        </div>
    )
}

export default withRouter(Menu)