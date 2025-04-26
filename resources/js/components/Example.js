import React from 'react';
import ReactDOM from 'react-dom';
import ShowJob from './ShowJob'
import AddJob from './AddJob'
import Apply from './Apply'
import Resume from './Resume'
import Experience from './Experience'
import JobQuestions from './JobQuestions'
import UpdateProfile from './UpdateProfile'
import Company from './Company'
import AddCompany from './AddCompany'
import Profile from './Profile'
import YourJob from './YourJob'
import SingleCompany from './SingleCompany'
import Aboutme from './Aboutme'
import Contact from './Contact'
import Faqs from './Faqs'
import {useEffect, useState} from 'react'
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext.js'
import MessageContext from '../contexts/MessageContext.js'
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

function Example() {

    const [user, setUser] = useState(null)
    const [boardJob, setBoardJob] = useState({user_id: null, board_job_id: null, submission: null, message: null});

    const [messageContext, setMessageContext] = useState([])

    const updateJobContext = (newContextValue) => {
        setBoardJob(newContextValue);
    };

    const updateMessageContext= (context) => {
        setMessageContext(context)
    }
    const logout = () => {

        apiClient.post('http://127.0.0.1:8000/logout').then(response => {
            if (response.status === 204) {
                window.location = '/login'
            }
        })
    };

    const showMenu = () => {
        document.querySelector('.bj-menubar-icon')?.addEventListener('click', () => {
  
            document.querySelector('.menubar-links').classList.add('bj-flex-sm-column')
            document.querySelector('.menubar-links').classList.remove('bj-align-items-center')

            document.querySelector('.bj-menubar-icon').classList.add('d-none');
            document.querySelector('.bj-close').classList.remove('d-none')

            document.querySelector('.menubar-links').classList.add('gorgeous-animate-menu')
            document.querySelectorAll('.bj-menubar-selector').forEach( (element) => {
                element.classList.remove('bj-d-responsive');
                element.classList.add('bj-d-sm-responsive');
                element.classList.add('bj-w-fit-content');
            })
        })
    }

    const closeMenu = () => {
            document.querySelector('.menubar-links').classList.toggle('bj-flex-sm-column')
            document.querySelector('.menubar-links').classList.toggle('bj-align-items-center')
            document.querySelector('.menubar-links').classList.toggle('gorgeous-animate-menu')

            document.querySelector('.bj-menubar-icon').classList.toggle('d-none');
            document.querySelector('.bj-close').classList.toggle('d-none')

            // document.querySelector('.menubar-links').classList.add('bj-align-items-end')
            document.querySelectorAll('.bj-menubar-selector').forEach( (element) => {
                element.classList.toggle('bj-d-responsive');
                element.classList.toggle('bj-d-sm-responsive');
                element.classList.toggle('bj-w-fit-content');
            })
    }




    useEffect(() => {

        const headerHeight = document.querySelector('.menubar-links').offsetHeight;
        const footerHeight = document.querySelector('.bj-footer').offsetHeight+24;
        //20 is padding for footer
        // document.querySelector('.container').style.minHeight = window.outerHeight - (headerHeight + footerHeight - 20) + 'px'
        // document.querySelector('.container').style.minHeight = window.outerHeight - (headerHeight + footerHeight - 20) - headerHeight + 'px'

        addBackgroundGradient()
        

    }, [])

    const addBackgroundGradient = () => {
        if(document.querySelector('body'))
        if(document.body.classList.contains('bj-gradient')){
            document.body.classList.remove('bj-gradient')
        }
    }


    return (

        <BoardJobContext.Provider value={boardJob} >
            <MessageContext.Provider value={messageContext}>
            <BrowserRouter>
                <div className="gorgeous-position d-flex bj-gradient-footer w-100 top-0 bj-px-16 mb-3 text-light menubar-links bj-space-between bj-align-items-center">
                    <a href="/home" className="bj-place-self-start"><strong className="bj-font-logo text-prime">Gorgeous</strong></a>                 
                    
                    <div className="bj-back-mb bj-text-align bj-d-responsive bj-menubar-selector d-md-flex flex-column">
                        <span><svg  width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 22L2 22" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M4 22V9.5" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 9.5V13.5M20 22V17.5" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="#f5f5f5" strokeWidth="1.5"></path> </g></svg></span>
                        <Link className="text-decoration-none text-light" to="/home">Home</Link>
                    </div>

                    <div className="bj-back-mb bj-text-align bj-d-responsive bj-menubar-selector d-md-flex flex-column">
                        <span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 20H21V10C21 8.89543 20.1046 8 19 8H15M11 16H11.01M17 16H17.01M7 16H7.01M11 12H11.01M17 12H17.01M7 12H7.01M11 8H11.01M7 8H7.01M15 20V6C15 4.89543 14.1046 4 13 4H5C3.89543 4 3 4.89543 3 6V20H15Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></span>
                        <Link className="text-decoration-none text-light" to="/companies">Companies</Link>
                    </div>
                    
                    <div className="bj-back-mb bj-text-align bj-d-responsive bj-menubar-selector d-md-flex flex-column">
                        <span><svg width="20" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>profile_round [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="#f5f5f5"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#ffffff]"> </path> </g> </g> </g> </g></svg></span>
                        <Link className="text-decoration-none text-light" to="/user-profile">Profile</Link>
                    </div>

                    <div className="bj-back-mb bj-text-align  bj-d-responsive bj-menubar-selector d-md-flex flex-column">
                        <span><svg fill="#fff" width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 432.144 432.143" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M418.6,353.192l-75.125-75.125c-8.295-8.29-18.948-12.765-29.8-13.443l-25.518-25.52 c37.908-60.272,30.656-141.03-21.773-193.459c-60.858-60.86-159.882-60.858-220.74,0 c-60.859,60.858-60.859,159.882,0.002,220.738c52.428,52.435,133.186,59.688,193.461,21.772l25.514,25.519 c0.684,10.852,5.154,21.506,13.445,29.795l75.127,75.128c18.061,18.063,47.342,18.062,65.405-0.002 C436.656,400.539,436.66,371.254,418.6,353.192z M245.861,219.204c-2.193-9.704-5.543-17.818-10.811-19.913l-44.955-17.923 l-10.527-8.87c-2.779-2.35-6.887-2.177-9.465,0.388l-14.637,14.554l-14.676-14.559c-2.582-2.56-6.682-2.726-9.461-0.383 l-10.525,8.87l-44.957,17.926c-5.043,2.008-8.326,9.54-10.518,18.7C36.09,175.248,40.424,116.27,78.346,78.347 c42.822-42.826,112.506-42.826,155.332,0.004C271.963,116.63,276.021,176.367,245.861,219.204z"></path> <path d="M155.631,61.124v-0.01c-0.043,0-0.076,0.006-0.125,0.006v-0.006c-0.014,0-0.037,0-0.051,0.006 c-0.023-0.006-0.045-0.006-0.061-0.006v0.006c-0.047,0-0.08-0.006-0.121-0.006v0.01c-27.947,0.746-45.104,16.564-44.822,44.236 c0.426,39.886,17.229,64.082,44.865,63.658v0.008c0.023,0,0.049,0,0.072,0c0.014,0,0.025,0,0.049,0c0,0,0.006,0,0.018,0h0.012 c0.016,0,0.033,0,0.033,0c0.033,0,0.057,0,0.08,0v-0.008c27.637,0.424,44.443-23.772,44.871-63.658 C200.736,77.688,183.578,61.87,155.631,61.124z"></path> </g> </g> </g> </g></svg></span>
                        <Link className="text-decoration-none text-light" to="/your-jobs">Your jobs</Link>
                    </div>

                    <div className="bj-back-mb bj-text-align  bj-d-responsive bj-menubar-selector d-md-flex flex-column">
                        <span><svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M8 12H8.009M11.991 12H12M15.991 12H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span>
                        <Link className="text-decoration-none text-light" to="/your-jobs">Messages</Link>
                    </div>

                    <div className="bj-back-mb bj-text-align  bj-d-responsive bj-menubar-selector d-md-flex flex-column">
                        <span><svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.713 7.14977C12.1271 7.13953 12.4545 6.79555 12.4443 6.38146C12.434 5.96738 12.0901 5.63999 11.676 5.65023L11.713 7.14977ZM6.30665 12.193H7.05665C7.05665 12.1874 7.05659 12.1818 7.05646 12.1761L6.30665 12.193ZM6.30665 14.51L6.34575 15.259C6.74423 15.2382 7.05665 14.909 7.05665 14.51H6.30665ZM6.30665 17.6L6.26755 18.349C6.28057 18.3497 6.29361 18.35 6.30665 18.35L6.30665 17.6ZM9.41983 18.35C9.83404 18.35 10.1698 18.0142 10.1698 17.6C10.1698 17.1858 9.83404 16.85 9.41983 16.85V18.35ZM10.9445 6.4C10.9445 6.81421 11.2803 7.15 11.6945 7.15C12.1087 7.15 12.4445 6.81421 12.4445 6.4H10.9445ZM12.4445 4C12.4445 3.58579 12.1087 3.25 11.6945 3.25C11.2803 3.25 10.9445 3.58579 10.9445 4H12.4445ZM11.713 5.65023C11.299 5.63999 10.955 5.96738 10.9447 6.38146C10.9345 6.79555 11.2619 7.13953 11.676 7.14977L11.713 5.65023ZM17.0824 12.193L16.3325 12.1761C16.3324 12.1818 16.3324 12.1874 16.3324 12.193H17.0824ZM17.0824 14.51H16.3324C16.3324 14.909 16.6448 15.2382 17.0433 15.259L17.0824 14.51ZM17.0824 17.6V18.35C17.0954 18.35 17.1084 18.3497 17.1215 18.349L17.0824 17.6ZM13.9692 16.85C13.555 16.85 13.2192 17.1858 13.2192 17.6C13.2192 18.0142 13.555 18.35 13.9692 18.35V16.85ZM10.1688 17.6027C10.1703 17.1885 9.83574 16.8515 9.42153 16.85C9.00732 16.8485 8.67034 17.1831 8.66886 17.5973L10.1688 17.6027ZM10.0848 19.3L10.6322 18.7873L10.6309 18.786L10.0848 19.3ZM13.3023 19.3L12.7561 18.786L12.7549 18.7873L13.3023 19.3ZM14.7182 17.5973C14.7167 17.1831 14.3797 16.8485 13.9655 16.85C13.5513 16.8515 13.2167 17.1885 13.2182 17.6027L14.7182 17.5973ZM9.41788 16.85C9.00366 16.85 8.66788 17.1858 8.66788 17.6C8.66788 18.0142 9.00366 18.35 9.41788 18.35V16.85ZM13.9692 18.35C14.3834 18.35 14.7192 18.0142 14.7192 17.6C14.7192 17.1858 14.3834 16.85 13.9692 16.85V18.35ZM11.676 5.65023C8.198 5.73622 5.47765 8.68931 5.55684 12.2099L7.05646 12.1761C6.99506 9.44664 9.09735 7.21444 11.713 7.14977L11.676 5.65023ZM5.55665 12.193V14.51H7.05665V12.193H5.55665ZM6.26755 13.761C5.0505 13.8246 4.125 14.8488 4.125 16.055H5.625C5.625 15.6136 5.95844 15.2792 6.34575 15.259L6.26755 13.761ZM4.125 16.055C4.125 17.2612 5.0505 18.2854 6.26755 18.349L6.34575 16.851C5.95843 16.8308 5.625 16.4964 5.625 16.055H4.125ZM6.30665 18.35H9.41983V16.85H6.30665V18.35ZM12.4445 6.4V4H10.9445V6.4H12.4445ZM11.676 7.14977C14.2917 7.21444 16.3939 9.44664 16.3325 12.1761L17.8322 12.2099C17.9114 8.68931 15.191 5.73622 11.713 5.65023L11.676 7.14977ZM16.3324 12.193V14.51H17.8324V12.193H16.3324ZM17.0433 15.259C17.4306 15.2792 17.764 15.6136 17.764 16.055H19.264C19.264 14.8488 18.3385 13.8246 17.1215 13.761L17.0433 15.259ZM17.764 16.055C17.764 16.4964 17.4306 16.8308 17.0433 16.851L17.1215 18.349C18.3385 18.2854 19.264 17.2612 19.264 16.055H17.764ZM17.0824 16.85H13.9692V18.35H17.0824V16.85ZM8.66886 17.5973C8.66592 18.4207 8.976 19.2162 9.53861 19.814L10.6309 18.786C10.335 18.4715 10.1673 18.0473 10.1688 17.6027L8.66886 17.5973ZM9.53739 19.8127C10.0977 20.4109 10.8758 20.7529 11.6935 20.7529V19.2529C11.2969 19.2529 10.9132 19.0873 10.6322 18.7873L9.53739 19.8127ZM11.6935 20.7529C12.5113 20.7529 13.2894 20.4109 13.8497 19.8127L12.7549 18.7873C12.4739 19.0873 12.0901 19.2529 11.6935 19.2529V20.7529ZM13.8484 19.814C14.4111 19.2162 14.7211 18.4207 14.7182 17.5973L13.2182 17.6027C13.2198 18.0473 13.0521 18.4715 12.7561 18.786L13.8484 19.814ZM9.41788 18.35H13.9692V16.85H9.41788V18.35Z" fill="#ffffff"></path> </g></svg></span>
                        <Link className="text-decoration-none text-light" to="/your-jobs">Notifications</Link>
                    </div>
                    
                    <div className="bj-back-mb bj-d-responsive bj-text-align bj-menubar-selector d-md-flex flex-column">
                        <span><svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12L13 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></span>
                        <div onClick={logout} className=" text-light" style={{ cursor: 'pointer'}}>
                            Logout
                        </div>
                    </div>

                    <div className="bj-menubar-icon gorgeous-cursor-pointer" onClick={showMenu}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>

                    <span className="gorgeous-cursor-pointer d-none bj-close position-absolute" onClick={closeMenu}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill=""></rect> <path d="M7 17L16.8995 7.10051" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 7.00001L16.8995 16.8995" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </span>
                </div>
            
                <div className="container">
                    <div className="gorgeous-divider-space"></div>
                    <Routes>
                        <Route path="/home" element={<ShowJob user={user} updateMessageContext={updateMessageContext} updateJobContext={updateJobContext} closeMenu={closeMenu}/>} />
                        <Route path="/add-job" element={<AddJob />} />
                        <Route path="/companies" element={<Company closeMenu={closeMenu} />} />
                        <Route path="/add-company" element={<AddCompany />} />
                        <Route path="/apply" element={<Apply user={user} updateJobContext={updateJobContext} />} />
                        <Route path="/resume" element={<Resume user={user} updateJobContext={updateJobContext} />} />
                        <Route path="/experience" element={<Experience user={user} />} />
                        <Route path="/job-questions" element={<JobQuestions user={user} updateJobContext={updateJobContext} />} /> 
                        <Route path="/user-profile" element={<Profile closeMenu={closeMenu}/>} /> 
                        <Route path="/update-profile" element={<UpdateProfile />} /> 
                        <Route path="/your-jobs" element={<YourJob updateJobContext={updateJobContext} closeMenu={closeMenu} />} /> 
                        <Route path="/companies/show-company/:id" element={<SingleCompany />} /> 
                        <Route path="/about-us" element={<Aboutme closeMenu={closeMenu} />} />
                        <Route path="/contact-us" element={<Contact closeMenu={closeMenu} />} />
                        <Route path="/faqs" element={<Faqs closeMenu={closeMenu} />} />
                    </Routes>
                </div>

                <section className="bj-gradient-footer gorgeous-footer bj-p-10 bj-footer position-relative w-100 bottom-0">
                    
                    <div className="d-flex justify-content-evenly align-items-center">
                        <div className=" ">
                            <strong className="bj-font-logo text-prime">Gorgeous</strong>
                        </div>
                        <Link className="text-decoration-none text-light" to="/about-us">About</Link>
                        <Link className="text-decoration-none text-light" to="/contact-us">Contact us</Link>
                        <Link className="text-decoration-none text-light" to="/faqs">Faq's</Link>
                    </div>


                    <div className="text-prime text-center">
                        ©2024 Gorgeous All Rights Reserved
                    </div>
                    
                </section>

            </BrowserRouter>
            </MessageContext.Provider>
            
        </BoardJobContext.Provider>
    
    );
}

export default Example;





// if (document.getElementById('example')) {    
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }
