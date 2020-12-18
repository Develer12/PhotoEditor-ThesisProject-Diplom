import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';

import './Main.scss';


function Main() {
	const auth = useContext(AuthContext);
	const isAuthenticated = auth.isAuthenticated;

  const selecStyle = (imgUrl) => {

    return {
      backgroundPosition: 'center -12px',
      backgroundImage: 'url(' + imgUrl + ')',
    };
  };

  return (
		<div id='page-wrapper'>
				<header id='header'>
					<h1 id='logo'><a href='/'>Editor</a></h1>
					<nav id='nav'>
						<ul>
              <li>
								{
									!isAuthenticated && 
									<a href='/login' className='button primary'>Sign Up</a>
								}
								{
									isAuthenticated && 
									<>
									<li><a href='/editor'>Try Editor</a></li>
									<li><a href='/account' className='button primary'>Account</a></li>
									</>
								}
							</li>
						</ul>
					</nav>
				</header>

				<section id='banner'>
					<div className='content'>
						<header>
							<h2>The best Editor</h2>
							<p>Edit image with help of Editor.<br />
							Get best results.</p>
							<ul className='actions'>
								<li><a href='/editor' className='button'>Try Editor</a></li>
							</ul>
						</header>
						<span className='image'><img src='logo512.png' alt='' /></span>
					</div>
					<a href='#one' className='goto-next scrolly'>Next</a>
				</section>

        <section id='one' className='spotlight style1 bottom' style={ selecStyle('mainpic1.jpg') } >
					<div className='content'>
						<div className='container'>
							<div className='row'>
								<div className='col-4 col-12-medium'>
									<header>
										<h2>Free online photo editor</h2>
										<p>Just use this app to get edit photo</p>
									</header>
								</div>
								<div className='col-4 col-12-medium'>
									<p>Editor couldn’t be easier to use. No complicated tools or confusing UI – just simple, 
									straightforward tools that transform your photo. Simply drag your photo into the editor 
									to get started.</p>
								</div>
								<div className='col-4 col-12-medium'>
									<p>Enhance your photo in one click with our range of filters. Our filters are customizable, 
									so you can change the brightness, contrast and saturation to get the look you want. And forget 
									about bad lighting and other common problems — Editor helps you fix your photo, fast.</p>
								</div>
							</div>
						</div>
					</div>
					<a href='#two' className='goto-next scrolly'>Next</a>
				</section>

				<section id='two' className='spotlight style2 right' style={ selecStyle('pic04.jpg') } >
					<div className='content'>
						<header>
							<h2>Be be be</h2>
							<p>Editor is a small but powerful photo editing application. 
							If you have some knowledge of photography, you can do a lot with Photo Editor. 
							Now use Photo Editor to edit photos on your mobile phone just like you would on a PC.</p>
						</header>
						<p>I just wanna pass course project.</p>
						<ul className='actions'>
							<li><a href='#' className='button'>Learn Again</a></li>
						</ul>
					</div>
					<a href='#four' className='goto-next scrolly'>Next</a>
				</section>

				<section id='four' className='wrapper style1 special fade-up'>
					<div className='container'>
						<header className='major'>
							<h2>Features</h2>
							<p>Best experience in photo editing</p>
						</header>
						<div className='box alt'>
							<div className='row gtr-uniform'>
								<section className='col-4 col-6-medium col-12-xsmall'>
									<span className='icon solid alt major fa-chart-area'></span>
									<h3>Greate quality</h3>
									<p>You can get your images with no loss.</p>
								</section>
								<section className='col-4 col-6-medium col-12-xsmall'>
									<span className='icon solid alt major fa-comment'></span>
									<h3>Best technologies</h3>
									<p>Modern Node.js server and React.js app.</p>
								</section>
								<section className='col-4 col-6-medium col-12-xsmall'>
									<span className='icon solid alt major fa-flask'></span>
									<h3>Best app</h3>
									<p>You cannot find best diplom than this app.</p>
								</section>
								{/*
								<section className='col-4 col-6-medium col-12-xsmall'>
									<span className='icon solid alt major fa-paper-plane'></span>
									<h3>Non semper interdum</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
								<section className='col-4 col-6-medium col-12-xsmall'>
									<span className='icon solid alt major fa-file'></span>
									<h3>Odio laoreet accumsan</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
								<section className='col-4 col-6-medium col-12-xsmall'>
									<span className='icon solid alt major fa-lock'></span>
									<h3>Massa arcu accumsan</h3>
									<p>Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.</p>
								</section>
								*/}
							</div>
						</div>
						<footer className='major'>
							<ul className='actions special'>
								<li><a href='/editor' className='button'>Try Editor</a></li>
							</ul>
						</footer>
					</div>
				</section>
				{/*
				<section id='five' className='wrapper style2 special fade' >
					<div className='container'>
						<header>
							<h2>Magna faucibus lorem diam</h2>
							<p>Ante metus praesent faucibus ante integer id accumsan eleifend</p>
						</header>
						<form method='post' action='#' className='cta'>
							<div className='row gtr-uniform gtr-50'>
								<div className='col-8 col-12-xsmall'><input type='email' name='email' id='email' placeholder='Your Email Address' /></div>
								<div className='col-4 col-12-xsmall'><input type='submit' value='Get Started' className='fit primary' /></div>
							</div>
						</form>
					</div>
				</section>
				*/}

				<footer id='footer'>
					<ul className='icons'>
						<li><a href='https://www.linkedin.com/in/arseni-matsiukh-1895ab1b3/' className='icon brands alt fa-linkedin-in'><span className='label'>LinkedIn</span></a></li>
						<li><a href='https://www.instagram.com/develer12/' className='icon brands alt fa-instagram'><span className='label'>Instagram</span></a></li>
						<li><a href='https://github.com/Develer12' className='icon brands alt fa-github'><span className='label'>GitHub</span></a></li>
						<li><a href='mailto:armagedondeveler@gmail.com' className='icon solid alt fa-envelope'><span className='label'>Email</span></a></li>
					</ul>
					<ul className='copyright'>
						<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href='https://github.com/Develer12'>Develer12</a></li>
					</ul>
				</footer>
		</div>
  );
}

export default Main;
