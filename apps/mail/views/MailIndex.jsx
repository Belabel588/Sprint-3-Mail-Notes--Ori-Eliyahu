const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from './MailList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { getMailImageDataUrls } from '../services/MailImg.service.js'
import { MailSentList } from '../views/MailSentList.jsx'
import { MailBin } from '../views/MailBIn.jsx'



export function MailIndex() {
    const [mails, setMails] = useState([])
    const [search, setSearch] = useState('')
    const [view, setView] = useState('inbox')
    // console.log(search)
    const imgs = getMailImageDataUrls()


    useEffect(() => {
        mailService.query()
            .then(mails => {
                // console.log(mails);
                setMails(mails)
            })
    }, [mails])



    function onSearch(ev) {
        setSearch(ev.target.value)
    }


    function onMarkAsRead(updatedMail) {
        // console.log(updatedMail)
        // console.log(mails)
        mailService.put(updatedMail)
            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
            })
    }

    function onMarkAsUnread(updatedMail) {
        mailService.put(updatedMail)
            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
            })
    }

    function onDeleteMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
            })
    }


    function onSendToBin(updatedMail) {
        mailService.put(updatedMail)
            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
            })
    }

    function handleInboxClick() {
        setView('inbox')
    }


    function handleSentClick() {
        setView('sent')
    }
    function handleBinClick() {
        setView('bin')
    }



    // ! HTML

    return (

        <div className="mail-app">
            <MailHeader onSearch={onSearch} />

            <div className="mails-boxes">
                <SideBar className="side-bar" mails={mails} onInboxClick={handleInboxClick} onSentClick={handleSentClick} onBinClick={handleBinClick} />



                {/* {console.log(mails)} */}
                {view === 'inbox' && <MailList className="mails-list" mails={mails} search={search} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} onSendToBin={onSendToBin} onDeleteMail={onDeleteMail} />}
                {view === 'sent' && < MailSentList className="mails-list" onInboxClick={handleInboxClick} onSentClick={handleSentClick} onSearch={onSearch} onSendToBin={onSendToBin} onDeleteMail={onDeleteMail} />}
                {view === 'bin' && < MailBin className="mails-list" onSendToBin={onSendToBin} onDeleteMail={onDeleteMail} />}




            </div>
            <Outlet />

        </div >
    )
}

