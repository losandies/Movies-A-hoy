import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/navbar/Navbar';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import {
	RegisterForm,
	RegisterPageContainer,
	RegisterText,
	Separator,
	InputContainer,
	ShortInput,
	LongInput,
	LabelContainer,
	Select,
	LabelText,
	ButtonContainer,
	RegisterButton,
	AlternateText,
} from './styles';
import { toast } from 'react-toastify';

const RegisterPage = () => {
	const [userInfo, setUserInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		favorite_genre: null,
	});

	const { isAuthorized } = useContext(UserContext);
	const navigate = useNavigate();

	const { firstName, lastName, email, password, favorite_genre } = userInfo;

	const onChange = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.value,
		});
	};

	const invalidFields = () => {};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				'http://localhost:9000/auth/register',
				userInfo
			);

			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				navigate('/');
			}
		} catch (err) {
			toast.error(err.response.data);
		}
	};

	useEffect(() => {
		if (isAuthorized) {
			navigate('/');
		}
	});

	return (
		<RegisterPageContainer>
			<NavBar />
			<RegisterText>Register Here</RegisterText>
			<RegisterForm onSubmit={onSubmit}>
				<Separator />
				<InputContainer>
					<ShortInput
						type="text"
						name="firstName"
						value={firstName}
						placeholder="First"
						onChange={onChange}
					/>
					<ShortInput
						type="text"
						name="lastName"
						value={lastName}
						placeholder="Last"
						onChange={onChange}
					/>
				</InputContainer>
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
				<InputContainer>
					<LabelContainer>
						<LabelText>Favorite Genre?</LabelText>
					</LabelContainer>
					<Select
						name="favorite_genre"
						value={favorite_genre}
						onChange={onChange}
					>
						<option value="Select" disabled selected>
							Choose Here
						</option>
						<option value={35}>Comedy</option>
						<option value={28}>Action</option>
						<option value={10749}>Romance</option>
						<option value={10751}>Family</option>
						<option value={16}>Animation</option>
						<option value={18}>Drama</option>
						<option value={878}>Science Fiction</option>
						<option value={9648}>Mystery</option>
						<option value={80}>Crime</option>
						<option value={53}>Thriller</option>
						<option value={27}>Horror</option>
						<option value={99}>Documentary</option>
						<option value={10752}>War</option>
					</Select>
				</InputContainer>
				<Separator />
				<ButtonContainer>
					<RegisterButton>Register</RegisterButton>
					<AlternateText>
						Have an account already? Log in{' '}
						<Link to="/login" className="underline">
							here
						</Link>
					</AlternateText>
				</ButtonContainer>
			</RegisterForm>
		</RegisterPageContainer>
	);
};

export default RegisterPage;
