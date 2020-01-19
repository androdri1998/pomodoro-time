import React,{Component} from 'react';
import {
    Navbar
    ,Icon
    ,NavItem} from 'react-materialize';

export default class Header extends Component{
    render(){
        return (
            <Navbar brand='PomodorTimeNow' right>
                <NavItem href='#'><Icon>more_vert</Icon></NavItem>
            </Navbar>
        );
    }
}
