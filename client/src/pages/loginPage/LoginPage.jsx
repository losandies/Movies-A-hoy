import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/navbar/Navbar';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import {
	AlternateText,
	ButtonContainer,
	FormContainer,
	GuestLoginButton,
	InputContainer,
	LoginButton,
	LoginForm,
	LoginPageContainer,
	LoginText,
	LongInput,
	Separator,
} from './styles';
import { toast } from 'react-toastify';

const LoginPage = () => {
	const { isLoggedIn } = useContext(UserContext);
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	});

	const { email, password } = userInfo;

	const navigate = useNavigate();

	const onChange = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post('/auth/login', userInfo);

			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				navigate('/');
			}
		} catch (err) {
			toast.error(err.response.data);
		}
	};

	const guestSignIn = () => {
		setUserInfo({
			email: 'guest@gmail.com',
			password: 'guest123',
		});
		onSubmit();
	};

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		}
	});

	return (
		<LoginPageContainer>
			<NavBar />

			<FormContainer>
				<LoginForm onSubmit={onSubmit}>
					<LoginText>Sign In Here</LoginText>
					<Separator />
					<InputContainer>
						<LongInput
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={onChange}
						/>
					</InputContainer>
					<InputContainer>
						<LongInput
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={onChange}
						/>
					</InputContainer>
					<Separator />
					<ButtonContainer>
						<LoginButton>Sign In</LoginButton>
						<GuestLoginButton onClick={guestSignIn}>
							Guest Sign In
						</GuestLoginButton>
						<AlternateText>
							Don't have an account yet? Sign up{' '}
							<Link to="/register" className="underline">
								here
							</Link>
						</AlternateText>
					</ButtonContainer>
				</LoginForm>
			</FormContainer>
		</LoginPageContainer>
	);
};

export default LoginPage;
