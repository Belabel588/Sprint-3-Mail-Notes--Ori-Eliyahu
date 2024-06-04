
import { getMailImageDataUrls } from '../apps/mail/services/MailImg.service.js'

const { Link, NavLink } = ReactRouterDOM

export function Home() {
    const imgs = getMailImageDataUrls()

    return <section claasName="home-section">
        <div className="home-page">



            <div className="home-body">


                <div>
                    <h1 className="home-header">YuHalfus <br></br> your life-managment <br></br> app!</h1>
                </div>

                <div className="home-links">
                    <NavLink to="/mail"><button className="home-icon-btn"><img className="mail-home-icon" src={imgs.homeMailIcon} alt="" /></button></NavLink>
                    <NavLink to="/note"> <button className="home-icon-btn"><img className="mail-note-icon" src={imgs.homeNoteIcon} alt="" /></button></NavLink>
                </div>

            </div>

        </div>
    </section >
}