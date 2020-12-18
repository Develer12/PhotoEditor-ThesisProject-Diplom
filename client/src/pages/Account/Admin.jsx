import React, { useContext, useEffect, useCallback, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Ajax } from '../../hooks/Ajax';

function Admin() {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = Ajax();
	const [clientInfo, setClientInfo] = useState({});
	const [subsInfo, setSubsInfo] = useState([]);

	let sNameRef = useRef(null), fNameRef = useRef(null); 

	const getInfo = useCallback(async () => {
    try {
			const data = await request('/api/account/info', 'GET');
			data.subDate = data.subDate.substr(0, 10);

			setClientInfo(data);
			fNameRef.current.value = data.fName;
			sNameRef.current.value = data.sName;
    } 
    catch (e) {
      console.log(e.message);
    }
	});
	
	const getSubInfo = useCallback(async () => {
    try {
			const data = await request('/api/admin/client/all', 'GET');
			console.log(data)
			setSubsInfo(data);
    } 
    catch (e) {
      console.log(e.message);
    }
  });

	const updateSubInfo = async (form) => {
		form.preventDefault();
		try {
			let formData = new FormData(form.target);
			form = {};
			formData.forEach((value, key) => { 
					form[key] = value;
			});

			if(!!!form) {
				throw new Error('Form is empty, set valid values');
			}

			const body = {
				_id: form._id,
				isAdmin: !!form.isAdmin,
				isSub: !!form.isSub
			}			
			const data = await request('/api/admin/client/permission', 'PUT', 'application/json', body);
		} 
		catch (e) {
			console.log(e.message)
		}

		return false;
	}
	
	const updateInfo = async (form) => {
		form.preventDefault();
		try {
			let formData = new FormData(form.target);
			form = {};
			formData.forEach((value, key) => { 
					form[key] = value;
			});

			if(!!!form) {
				throw new Error('Form is empty, set valid values');
			}

			if(
				(!!!form.sName || !!!form.fName) ||
				(form.fName === clientInfo.fName && form.sName === clientInfo.sName)
			) {
				throw new Error('One of the fields is empty or have invalid value');
			}

			const data = await request('/api/account/info', 'PUT', 'application/json', {...form});
			if(!!data){
				setClientInfo(data);
				fNameRef.current.value = data.fName;
				sNameRef.current.value = data.sName;
			}
		} 
		catch (e) {
			console.log(e.message)
		}

		return false;
	}

	const DeleteAcc = async () => {
		try {
			if (window.confirm("Are you sure, that you wanna delete your account?")) {
				const data = await request('/api/account/info', 'DELETE');
				auth.logout();
			}
		} 
		catch (e) {
			console.log(e.message)
		}
	}
  
  useEffect(() => { 
		getInfo();
		getSubInfo();
  }, []);

  return(
		<div className="container">
			<header className="major">
				<h2>Welcome { clientInfo.fName } { clientInfo.sName }</h2>
				<p>This is your Administrator page</p>
			</header>
			<div className="row gtr-150">
				<div className="col-8 col-12-medium">
					<section id="content">
						<h3>Accounts info</h3>
						<p>At this form you can change other account permission</p>
						<div className='account-div'>
							{
								subsInfo.map(elem => { return(
									<form key={ `form_${ elem._id }` } onSubmit={ updateSubInfo } className="spotlight style1 bottom cta" >
										<input type='text' name='_id' value={ elem._id } placeholder='ID' className='col-8 col-12-xsmall' readOnly/>
										<div className='form-space'>
											<input type='text' name='fName' value={ elem.fName } placeholder='First name' className='col-8 col-12-xsmall' readOnly/>
											<input type='text' name='sName' value={ elem.sName } placeholder='Second name' className='col-8 col-12-xsmall' readOnly/>
										</div>
										<div className='form-space'>
											<div>
												<h3>Is Admin</h3>
												<label className="switch">
													<input type="checkbox" name='isAdmin' defaultChecked={ elem.isAdmin } />
													<span className="slider round"></span>
												</label>
											</div>
											<div>
												<h3>Is Subscriber</h3>
												<label className="switch">
													<input type="checkbox" name='isSub' defaultChecked={ elem.isSub } />
													<span className="slider round"></span>
												</label>
											</div>
										</div>
										<input type='submit' value='Change' className='col-4 col-12-xsmall' />
										<hr/>
									</form>
								)})
							}
						</div>
						<hr />
					</section>
					<section id="content">
						<h3>Your info</h3>
						<div className='account-div'>
							<form onSubmit={ updateInfo } className="spotlight style1 bottom cta" >
								<input type='text' name='fName' placeholder='First name' ref={ fNameRef } className='col-8 col-12-xsmall' />
								<input type='text' name='sName' placeholder='Second name' ref={ sNameRef } className='col-8 col-12-xsmall' />
								<input type='submit' value='Change' className='col-4 col-12-xsmall' />
							</form>
						</div>
						<hr />
					</section>
				</div>
				<div className="col-4 col-12-medium">
					<section id="sidebar">
						<section>
							<a href="#" className="image fit"><img src="images/pic07.jpg" alt="" /></a>
							<h3>Subscriber info</h3>
								<ul>
								<li>E-mail: { clientInfo.email }</li><br/>
								<li>Is Subscriber: { (!!clientInfo.isSub).toString() }</li><br/>
								<li>Is Admin: { (!!clientInfo.isAdmin).toString() }</li><br/>
								<li>Subscription date: { clientInfo.subDate }</li><br/>
							</ul>
							<hr />
							<section>
								<h3>Delete account</h3>
								<p>After click on "Delete" button you cannot undo this decision</p>
								<footer>
									<ul className="actions">
										<li><a onClick={ DeleteAcc } className="button">Delete</a></li>
									</ul>
								</footer>
							</section>
							<hr />
						</section>
					</section>
				</div>
			</div>
		</div>
  );
}

export default Admin;