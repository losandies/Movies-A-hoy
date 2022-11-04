import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { PageContainer } from '../components/globalComponents';
import { NavBar } from '../components/navbar';
import { UserContext } from '../contexts/userContext';
import axios from 'axios';

const BASE_URL = '/';

const RegisterPageContainer = styled(PageContainer)`
	${tw`items-center`}
`;
const RegisterForm = styled.form`
	${tw`w-[80%] md:max-w-md flex flex-col justify-center items-center`}
`;
const InputContainer = styled.div`
	${tw`w-full h-16 md:h-auto flex justify-around items-center`}
`;
const ButtonContainer = styled.div`
	${tw`w-full h-32 flex-col flex items-center`}
`;
const ShortInput = styled.input`
	${tw`w-[45%] h-10 md:my-4 p-2 md:py-6 border-2 border-black rounded-sm`}
`;
const LongInput = styled.input`
	${tw`w-[95%] h-10 md:my-4 p-2 md:py-6 border-2 border-black rounded-sm`}
`;
const Select = styled.select`
	${tw`w-[50%] h-10 md:h-[55px] md:my-4 text-sm p-2 md:py-4 border-2 border-black rounded-sm`}
`;
const LabelContainer = styled.div`
	${tw`w-[40%] h-9 flex items-center`}
`;
const LabelText = styled.h3`
	${tw` ml-1 text-base text-white`}
`;
const RegisterText = styled.h2`
	${tw`text-white text-2xl mt-16 md:mt-60`}
`;
const RegisterButton = styled.button`
	${tw`w-[95%] h-12 bg-blue-800 text-xl text-white mb-4`}
`;
const AlternateText = styled.p`
	${tw`text-white text-xs`}
`;
const Separator = styled.div`
	${tw`w-full bg-gray-800 h-[1px] my-6`}
`;

const RegisterPage = () => {
	const [userInfo, setUserInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		favorite_genre: null,
	});

	const { setIsAuthorized } = useContext(UserContext);
	const navigate = useNavigate();

	const { firstName, lastName, email, password, favorite_genre } = userInfo;

	const onChange = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				'http://localhost:9000/auth/register',
				userInfo
			);

			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				setIsAuthorized(true);
				navigate('/home');
			}
		} catch (err) {
			console.log(err.message);
		}
	};

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
						<option value="" disabled hidden>
							Select
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
