import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div data-cy="siteFooter" className="Footer--footer--sN8PW">
                <div className="Footer--footer__container--3Vx6n">
                    <div className="Footer--footer__logo--3SYzQ">
                        <a title="Shortcut Homepage" href="/" className="Footer--footer__logoLink--1YHWI">
                            <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" className="Footer--footer__logoSvg--Rouwg">
                                <title>Shortcut</title>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Shortcut" fill="currentColor" fill-rule="nonzero">
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <div className="Footer--footer__menus--3zYfD"><div><h4 className="Footer--footer__heading--gUK8w">Features</h4>
                        <ul className="Footer--footer__list--3wiuX"><li>
                            <Link to="/product/boards" className="Footer--footer__link--13b8S">Boards</Link></li>
                            <li>
                                <Link to="/product/roadmap" className="Footer--footer__link--13b8S">Roadmap</Link>
                            </li>
                            <li>
                                <Link to="/product/docs" className="Footer--footer__link--13b8S">Docs</Link>
                            </li>

                            <li>
                                <Link to="/product/teams" className="Footer--footer__link--13b8S">Teams</Link>
                            </li>
                        </ul>
                    </div>
                        
                        <div>
                            <h4 className="Footer--footer__heading--gUK8w">Company</h4>
                            <ul className="Footer--footer__list--3wiuX">
                                <li>
                                    <Link to="/About" className="Footer--footer__link--13b8S">About Us</Link>
                                </li>
                                <li>
                                    <Link aria-current="page" to="/careers" className="Footer--footer__link--13b8S">Careers</Link>
                                </li>
                                <li>
                                    <Link to="/Contact" className="Footer--footer__link--13b8S">Contact</Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="Footer--footer__link--13b8S">FAQ</Link>
                                </li>
                                <li>
                                    <Link to="/open-source-projects" className="Footer--footer__link--13b8S">Open Source Projects</Link>
                                </li>
                            </ul>
                            
                        </div>
                        <div className="Social--social--33cW0 Footer--footer__socials--3_A2l">
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" title="GitHub" className="Social--social__link--H1epB Social--social__linkGithub--1K-95">
                                <svg viewBox="0 0 29 29" className="Social--social__github--13nkj">
                                    <path d="M14.499 0C6.493 0 0 6.656 0 14.867c0 6.569 4.154 12.14 9.916 14.107.726.137.99-.323.99-.717 0-.352-.012-1.288-.02-2.528-4.033.898-4.884-1.993-4.884-1.993-.66-1.718-1.61-2.175-1.61-2.175-1.317-.922.1-.904.1-.904 1.455.105 2.22 1.533 2.22 1.533 1.294 2.271 3.395 1.615 4.22 1.235.132-.96.507-1.616.921-1.987-3.22-.375-6.605-1.651-6.605-7.348 0-1.623.566-2.95 1.493-3.99-.15-.375-.647-1.888.142-3.934 0 0 1.217-.4 3.987 1.524a13.567 13.567 0 0 1 3.63-.5c1.232.005 2.472.17 3.63.5 2.769-1.924 3.984-1.524 3.984-1.524.791 2.046.294 3.559.145 3.935.93 1.038 1.49 2.366 1.49 3.989 0 5.711-3.39 6.968-6.62 7.336.52.459.984 1.366.984 2.753 0 1.987-.018 3.59-.018 4.078 0 .398.262.86.997.716C24.849 27.003 29 21.434 29 14.867 29 6.657 22.507 0 14.499 0" fill="currentColor" fill-rule="evenodd"></path></svg>
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter" className="Social--social__link--H1epB Social--social__linkTwitter--2a9HS">
                                <svg viewBox="0 0 23 20" className="Social--social__twitter--1T4MQ">
                                    <path d="M23 2.368a8.958 8.958 0 0 1-2.71.795A5.019 5.019 0 0 0 22.365.369a9.085 9.085 0 0 1-2.997 1.225C18.508.614 17.281 0 15.924 0c-2.606 0-4.719 2.26-4.719 5.049 0 .396.042.781.122 1.15C7.405 5.99 3.928 3.98 1.601.925a5.297 5.297 0 0 0-.639 2.539c0 1.751.833 3.297 2.1 4.202a4.468 4.468 0 0 1-2.138-.631v.063c0 2.446 1.626 4.487 3.785 4.95a4.436 4.436 0 0 1-2.13.087c.6 2.006 2.342 3.466 4.407 3.507-1.615 1.354-3.65 2.161-5.86 2.161-.381 0-.757-.024-1.126-.07C2.088 19.164 4.569 20 7.233 20c8.68 0 13.426-7.694 13.426-14.366 0-.219-.005-.436-.014-.653A9.99 9.99 0 0 0 23 2.368" fill="currentColor" fill-rule="evenodd">
                                    </path>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="Social--social__link--H1epB Social--social__linkLinkedIn--2rERS">
                                <svg viewBox="0 0 20 20" version="1" className="Social--social__linkedin--UG_HV">
                                    <g fill="none" fill-rule="evenodd">
                                        <g transform="translate(-524 -3687)" fill="currentColor">
                                            <g transform="translate(524 3687)">
                                                <path d="M20 20h-4v-6c0-2 0-4-2-4s-3 2-3 3v7H7V7h4v2l4-2c4 0 5 2 5 6v7zM3 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z">
                                                </path>
                                                <polygon points="0.988148148 19.76 4.94740741 19.76 4.94740741 7.03407407 0.988148148 7.03407407">
                                                </polygon>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="Footer--footer__smallPrint--3pAsy">
                        <h4 className="Footer--footer__copyright--MmRY-">© 2023 D-MAP
                        </h4>
                        <ul className="Footer--footer__legal--181Kg">
                            <li>
                                <Link to="/privacy" className="Footer--footer__link--13b8S">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/terms" className="Footer--footer__link--13b8S">Terms of Use</Link>
                            </li>
                            <li>
                                <Link to="/security" className="Footer--footer__link--13b8S">Security</Link>
                            </li>
                            <li>
                                <Link to="#" className="Footer--footer__link--13b8S">Your Cookies</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer