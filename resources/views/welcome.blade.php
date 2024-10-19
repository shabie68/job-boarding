<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        
        <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>

        <!-- Styles -->
        <style>
            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-t{border-top-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}}
        </style>

        <style>
            body {
                font-family: 'Nunito';
            }

            .bj-bg-one {
                background: #fbfff6;
            }

            .bj-end {
                display: flex;
                justify-content: end;
            }

            .bj-header-img {
                height: 225px;
                display: flex;
                flex-direction: column;
                justify-content: end;
                color: #fbfff6;
                padding: 20px 30px
            }

            .bj-gradient {
                background: linear-gradient(45deg, #238a85, #4f4a47);
            }


            .bj-header-img button {
                font-weight: bold
            }

            .bj-btn {
                padding: 10px 20px;
                border-width: 1px;
                border-style: #dee2e6;
                border-radius: 0.375rem;
                border-color: #8f1d1d00;
            }

            .bj-text-prime {
                color: #fbfff6;
            }

            .bj-btn-prime {
                background: #99902c;
                color: #fbfff6;
            }

            .bg-three {
                background-color: #238a85;
            }

            .bg-secondary {
                background-color: #99902c;
            }


            .bj-text-secondary {
                color: #4f4a47;
            }

            .bg-two {
                background: #4f4a47;
            }

            .bj-p-10 {
                padding: 10px
            }

            .bj-font-logo {
                font-size: 36px;
            }

            .gorgeous-flex {
                display: flex;
            }

            .bj-slider {
                justify-content: space-evenly;

            }

            .bj-justify-between {
                justify-content: space-between;
            }

            .bj-img-container {
                background-repeat: no-repeat;
                background-size: 100%; 
                border-radius: 10px;

            }

            .bj-talent-container[data-idx="1"] div {
                background-image: url('images/health.jpg');
            }

            .bj-talent-container[data-idx="2"] div {
                background-image: url('images/marketing.jpg');
            }

            .bj-talent-container[data-idx="3"] div {
                background-image: url('images/accounting.jpg');
            }

            .bj-talent-container[data-idx="4"] div {
                background-image: url('images/hr.jpg');
            }

            .bj-talent-container[data-idx="5"] div {
                background-image: url('images/programming.jpg');
            }

            .bj-talent-container[data-idx="6"] div {
                background-image: url('images/project-management.jpg');
            }


            .bj-talent-container[data-idx="7"]  div{
                background-image: url('images/ui_ux.jpg');
            }

            .bj-talent-container[data-idx="8"] div {
                background-image: url('images/data_science.jpg');
            }

            .bj-talent-container[data-idx="9"] div {
                background-image: url('images/job.jpg');
            }

            .bj-items-center {
                align-items: center;
            }

            .bj-content-evenly {
                justify-content: space-evenly
            }

            .bj-vertical-middle {
                vertical-align: middle;
            }

            .bj-my-4 {
                margin: 20px 0;
            }

            #bj-next-btn svg path {
                fill: none;
            }
            #bj-next-btn:hover svg path {
                fill: #99902c;
            }

            #bj-prev-btn svg path {
                fill: none;
            }
            #bj-prev-btn:hover svg path {
                fill: #99902c
            }

            .bj-cursor {
                cursor: pointer
            }

            .slide-right {
                transform: translateX(100%);
            }

            .slide-left {
                transform: translateX(-100%);
            }

            .bj-justify-end {
                justify-content: end;

            }

            .bj-justify-center {
                justify-content: center;
            }

            .bj-align-center{
                align-items: center;
            }

            .bj-border-line {
                height: 2px;
                background-color: #238a85;
            }

            .bj-talent-container {
                transition: all 0.3s ease-in-out 0.2s
            }

            .bj-text-three {
                color: #238a85;
            }

            .bj-font-size-18{
                font-size: 18px
            }

            .bj-margin-32 {
                margin-bottom: 32px;

            }

            li {
                margin-bottom: 8px;
            }

            .bj-border-radius {
                border-radius: 10px
            }

            .bj-justify-evenly {
                justify-content: space-evenly;
            }

            .gorgeous-justify-between {
                justify-content: space-between;
            }

            .bj-w-25 {
                width: 25%
            }

            .bj-w-50 {
                width: 50%
            }

            .bj-w-100 {
                width: 100%
            }

            .gorgeous-home-img {
                aspect-ratio: 2;
            }

            .gorgeous-m-0 {
                margin: 0
            }

            .gorgeous-observe {
                visibility: hidden;

            }

            .gorgeous-animate {
                visibility: visible;
                animation: scaleVertical 2s 1;
            }

            .gorgeous-scaleX {
                animation: scaleHorizontalPositive 2s 1;
            }

            .gorgeous-scalex {
                animation: scaleHorizontalNegative 2s 1;
            }

            .slider-wrapper {
                margin-bottom: 32px
            }

            .gorgeous-company-img {
                width: 40%
            }

            .gorgeous-mt-24 {
                margin-top: 24px
            }

            .gorgeous-section-divider {
                display: flex;
                justify-content: space-between;
                color: #4f4a47;
            }

         

            .gorgeous-mb-16 {
                margin-bottom: 16px
            }

            .gorgeous-company-header {
                display: flex;
                width: 100%;
                justify-content: space-between;
            }

            .gorgeous-w-10 {
                width: 10%
            }

            .gorgeous-company-title {
                display: flex;
                justify-content: space-between;
            }


            @media(min-width: 100px) {
                .gorgeous-r-w {
                    width: 100%
                }

                .gorgeous-display {
                    display: block;
                }
                .gorgeous-img-w {
                    width: 75%
                }

                .gorgeous-px {
                    padding: 0;
                    align-self: start
                }
                
                .gorgeous-img-w img {
                    width: 100%
                }

                .gorgeous-desc {
                    margin: auto;
                    width: 100%
                }

                .gorgeous-mt-16 {
                    margin-top: 16px
                }

                .bj-img-container {
                    width: 100px;
                    height: 100px;
                }

                .bj-talent-container {
                    width: 100px;
                    height: 100px;
                }

                .bj-border-line {
                    width: 12.5%;
                }

                .gorgeous-border {
                    width: 75%;
                    text-align: center;
                }

                .gorgeous-px-4 {
                    padding: 0 20px;
                }
            }

            @media(min-width: 768px) {
                .bj-img-container {
                    width: 150px;
                    height: 150px;
                }  

                .bj-talent-container {
                    width: 150px; 
                    height: 150px;
                } 

                .bj-border-line {
                    width: 30%
                }

                .gorgeous-px-4 {
                    padding: 0 60px;
                }

                .gorgeous-img-w {
                    width: 50%
                }

            }

            @media(min-width: 992px) {
                .gorgeous-r-w {
                    width: 50%
                }

                .gorgeous-display {
                    display: flex;
                }

                .gorgeous-img-w {
                    width: 25%
                }

                .gorgeous-px {
                    align-self: start
                }

                .gorgeous-img-w img {
                    width: 100%
                }

                .gorgeous-desc {
                    margin: 0 0 16px 0;
                    width: 85%
                }

                .gorgeous-mt-16 {
                    margin-top: 16px
                }

                .bj-img-container {
                    width: 200px;
                    height: 200px;
                }

                .bj-talent-container {
                    width: 200px; 
                    height: 200px;
                }

                .gorgeous-px-30 {
                    padding: 0 30px;
                }

                .gorgeous-px-4 {
                    padding: 0 80px;
                }
            }

            @keyframes scaleVertical {
                0% {
                    opacity: 0;
                    transform: translateY(50px);
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }


            @keyframes scaleHorizontalPositive {
                0% {
                    opacity: 0;
                    transform: translateX(50%)
                }
                100% {
                    opacity: 1;
                    transform: translateX(0)
                }
            }

            @keyframes scaleHorizontalNegative {
                0% {
                    opacity: 0;
                    transform: translateX(-75%)
                }
                100% {
                    opacity: 1;
                    transform: translateX(0)
                }
            }

        </style>

        
    </head>
    <body class="antialiased bj-bg-one bj-text-prime">
        <div class="relative items-top justify-center min-h-screen sm:items-center sm:pt-0">

            <section class="my-4 bj-gradient bj-header-img">
                @if (Route::has('login'))
                    <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                        @auth
                            <a href="{{ url('/home') }}" class="text-sm text-gray-700 underline">Home</a>
                        @else
                            <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Login</a>

                            @if (Route::has('register'))
                                <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                            @endif
                        @endif
                    </div>
                @endif


                <div>
                    <h3>Gorgeous</h3>
                    <h4>Find the suitable jobs in remote, on site and hybrid</h4>
                </div>
                
                <span><a href="login"><button class="bj-font-size-18 bj-btn bg-secondary bj-text-prime">Get Started</button></a></span>           
            </section>

            <div>
                <section class="text-start gorgeous-px-4 bj-text-secondary">
                    <div class="">
                        <section class="gorgeous-mt-24">

                            <div class="gorgeous-flex bj-content-evenly bj-align-center bj-text-secondary">
                                <span class="bj-border-line "></span>
                                <h4 class="gorgeous-border">Recently registered companies</h4>
                                <span class="bj-border-line"></span>
                            </div>

                            <div class="gorgeous-companies-container">

                            </div>
                            
                        </section>

                        <section>
                            
                            <div class="gorgeous-flex bj-content-evenly bj-align-center bj-text-secondary">
                                <span class="bj-border-line "></span>
                                <h4 class="gorgeous-border">Features that we offers</h4>
                                <span class="bj-border-line"></span>
                            </div>

                            <div class="bj-margin-32 gorgeous-display gorgeous-justify-between bj-items-center gorgeous-desc">
                                
                                <div class="gorgeous-img-w gorgeous-px">
                                    <img src="images/js.jpg" class="bj-border-radius gorgeous-home-img"/>
                                </div>

                                <div class="gorgeous-r-w">
                                    <h4 class="bj-text-three gorgeous-m-0">Find and apply to jobs</h4>
                                    <div>
                                        Candidates can filter, search and apply to jobs they love. Process is very simple
                                        <ul>
                                            <li>Search your desire job</li>
                                            <li>Apply to that job</li>
                                            <li>Complete the application process in just a few steps</li>
                                            <li>Track your application status easily</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div class="bj-margin-32 gorgeous-display gorgeous-justify-between bj-items-center gorgeous-observe gorgeous-desc">
                            <div class="gorgeous-img-w gorgeous-px">
                                <img src="images/message.jpg" class="bj-border-radius gorgeous-home-img" />
                            </div>

                            <div class="gorgeous-r-w">
                                <h4 class="bj-text-three gorgeous-m-0">Message recruiters</h4>
                                <div>
                                    Candidates can engage directly with recruiters through live chat to inquire about the status of their job applications. Benefits include:
                                    <ul>
                                        <li>Get instant feedback from recruiters in real-time.</li>
                                        <li>Apply to that job</li>
                                        <li>Fill the application</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bj-margin-32 gorgeous-display gorgeous-justify-between bj-items-center gorgeous-observe gorgeous-desc">
                            <div class="gorgeous-img-w gorgeous-px">
                                <img src="images/feedback.jpg" class="bj-border-radius gorgeous-home-img" />
                            </div>

                            <div class="gorgeous-r-w">
                                <h4 class="bj-text-three gorgeous-m-0">Review companies</h4>
                                <div>
                                    Candidates can leave feedback for the company they have worked.
                                    <ul>
                                        <li>Authentic and reliable with real experiences shared by employees</li>
                                        <li>Transparent, allowing candidates to read other people's reviews and insights</li>
                                        <li>Helpful for making informed decisions about future job opportunities</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="gorgeous-px-4">
                    <div class="gorgeous-flex bj-content-evenly bj-align-center bj-text-secondary">
                        <span class="bj-border-line "></span>
                        <h4 class="gorgeous-border">Look for the following categories</h4>
                        <span class="bj-border-line"></span>
                    </div>
                    <div class="bj-slider-container bj-text-secondary">

                        <div class="slider-wrapper">
                            <div class="bj-slider gorgeous-flex text-center slider-right">
                                <div class="bj-align-center bj-justify-center bj-talent-container" data-idx="1">
                                    <div class="bj-img-container">

                                    </div>
                                    <strong>Health</strong>
                                </div>

                                <div class="bj-align-center bj-justify-center bj-talent-container" data-idx="2">
                                    <div class="bj-img-container">

                                    </div>
                                    <strong>Marketing</strong>
                                </div>

                                <div class="bj-align-center bj-justify-center bj-talent-container" data-idx="3">
                                    <div class="bj-img-container">

                                    </div>
                                    <strong>Accounting</strong>
                                </div>

                                <div class="bj-align-center bj-justify-center bj-talent-container " data-idx="4">
                                    <div class="bj-img-container">

                                    </div>
                                    <strong>Human Resource</strong>
                                </div>

                                <div class="bj-align-center bj-justify-center bj-talent-container" data-idx="5">
                                    <div class="bj-img-container">

                                    </div>
                                   <strong> Programming</strong>
                                </div>

                                <div class="bj-align-center bj-justify-center bj-talent-container" data-idx="6">
                                    <div class="bj-img-container">

                                    </div>
                                   <strong> Project Management</strong>
                                </div>

                                <div class="bj-align-center bj-justify-center bj-talent-container" data-idx="7">
                                    <div class="bj-img-container">

                                    </div>
                                   <strong> UX/UI Designers</strong>
                                </div>

                                <div class="gorgeous-flex bj-align-center bj-justify-center bj-talent-container" data-idx="8">
                                    <div class="bj-img-container">

                                    </div>
                                    <strong>Data Science</strong>
                                </div>

                                <div class="bj-align-center bj-justify-center bj-talent-container" data-idx="9">
                                    <div class="bj-img-container">

                                    </div>
                                   <strong> Many more</strong>
                                </div>
                            </div>
                        </div>


                        <div class="text-center bj-my-4">

                            <span>
                                <span>Prev</span>
                                <button id="bj-prev-btn" class="bj-cursor bj-vertical-middle bj-bg-one">
                                
                                    <svg fill="#99902c" height="20" width="20" viewBox="0 0 24 24" id="previous" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M17,3V21L5,12Z" style="stroke: #99902c; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg>
                                </button>
                            <span>


                            <span>
                                
                                <button id="bj-next-btn" class="bj-cursor bj-vertical-middle bj-bg-one">
                                    
                                    <svg fill="#99902c" width="20" height="20" viewBox="0 0 24 24" id="next" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color" stroke="#99902c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M17,12,5,21V3Z" style="stroke: #99902c; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg>
                                </button>
                                <span>Next</span>
                            </span>
                        </div>
                    </div>
                </section>

                <section class=" bj-p-10 bj-gradient bj-footer position-relative w-100 bottom-0 bj-text-prime">
                        
                    <div class="gorgeous-flex bj-content-evenly bj-items-center">
                        <div class=" ">
                            <strong class="bj-font-logo bj-text-prime">Gorgeous</strong>
                        </div>
                        <a href="/about-us" class="text-decoration-none bj-text-prime">About</a>
                        <a href="/contact-us" class="text-decoration-none bj-text-prime">Contact us </a>
                        <a href="/faqs" class="text-decoration-none bj-text-prime">Faq's</a>
                    </div>

                    <div class="bj-text-prime text-center">
                        ©2024 Gorgeous All Rights Reserved
                    </div>
                    
                </section>

            </div>
            

            <script>

                let count = 3;

                document.querySelectorAll('.bj-talent-container').forEach((element ) => {
                    let attribute = element.getAttribute('data-idx')
                    if(attribute > 3) {
                        element.style.display = 'none'
                    }
                })

                const next = () => {


                    if( count < 9 ) {
                        // document.querySelector('.bj-talent-container').parentElement.classList.remove('bj-slider')
                        count = count + 3

                        
                        document.querySelectorAll('.bj-talent-container').forEach((element ) => {
                            element.style.display = 'none';

                            let attribute = element.getAttribute('data-idx')
                            if(attribute > (count - 3) && attribute < count + 1 ) {
                                element.style.display = 'block'
                                element.classList.remove('gorgeous-scalex')
                                element.classList.add('gorgeous-scaleX')

                            }
                        })
                    }
                }

                const prev = () => {
                    if(count > 3) {
                        count = count - 3;
                        document.querySelectorAll('.bj-talent-container').forEach((element) => {
                            element.style.display = 'none';
                            let attribute = element.getAttribute('data-idx')

                            if(attribute >= (count - 2) && attribute <= count) {
                                element.style.display = 'block';
                                element.classList.remove('gorgeous-scaleX')
                                element.classList.add('gorgeous-scalex')
                            }
                        })
                    }
                }

                document.querySelector('#bj-next-btn').addEventListener('click', next)

                document.querySelector('#bj-prev-btn').addEventListener('click', prev)

                const animateElements = (entries, observer) => {
                    entries.forEach((entry) => {
                        if(entry.intersectionRatio > 0.75) {
                            entry.target.classList.toggle('gorgeous-animate')
                            observer.unobserve(entry.target)
                        }
                    })
                }

                const options = {
                    rootMargin: "0px",
                    threshold: 0.75
                }

                const observer = new IntersectionObserver(animateElements, options)

                let elementsToObserve = document.querySelectorAll('.gorgeous-observe')
                elementsToObserve.forEach((element) => {
                    observer.observe(element)
                })

                const appendCompanies = async() => {
                   
                    let data = await fetch('/api/get-recent-companies')
                    data = data.json()
                    

                    data.then((response) => {
                        console.log("RESPONSE")
                        console.log(response.companies)

                        response.companies.forEach((company) => {
                            let element = document.createElement('div')
                            element.innerHTML = `
                                <div class="">
                                    
                                    <div class="gorgeous-company-title">
                                        <div>
                                            <h4 class="bj-text-three gorgeous-m-0">${company.title}</h4>
                                            <p>${company.description}</p>
                                        </div>
                                        <div class="gorgeous-w-10"><img src=${'/uploads/images/' + company.logo} class="bj-w-100" /></div>
                                    </div>
                                </div>
                            `

                            document.querySelector('.gorgeous-companies-container').append(element)
                        })
                        

                    })
                    
                }

                appendCompanies()
                /**

                <section class="gorgeous-mt-24">

                            <div class="gorgeous-section-divider gorgeous-company bj-margin-32 gorgeous-display bj-justify-evenly bj-items-center gorgeous-desc">
                                <div class="gorgeous-img-w gorgeous-px">
                                    &nbsp
                                </div>
                                <div class="gorgeous-r-w">
                                    <h3 class="gorgeous-m-0">Recently registered companies</h3>
                                </div>
                            </div>

                            <div class="gorgeous-companies-container">

                            </div>
                            
                        </section>
                        **/
            </script>
    </body>
</html>
