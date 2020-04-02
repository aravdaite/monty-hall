import React, { Component } from 'react';
import { Logo, NavigationItem } from '../../components';

export class Toolbar extends Component {
    render() {
        return (
            <header className="header">
                <div>
                    <Logo />
                    <div className="ToolbarText">Test Monty Hall riddle!</div>
                </div>
                <nav className="navigation">
                    <ul className="navigation-list">
                        <li><NavigationItem href="/" css_classActive="NavigationItem-active" css_class="NavigationItem">{"Monty"}</NavigationItem></li>
                        <li><NavigationItem href="/about" css_classActive="NavigationItem-active" css_class="NavigationItem">{"About"}</NavigationItem></li>
                    </ul>
                </nav>
            </header>
        )
    }
}