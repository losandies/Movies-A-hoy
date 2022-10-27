import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { PageContainer } from '../components/globalComponents';
import { NavBar } from '../components/navbar';

const RegisterPageContainer = styled(PageContainer)`
	${tw`items-center`}
`;

const RegisterForm = styled.form`
	${tw`w-[95%] flex flex-col justify-center items-center h-1/2 p-4 mt-6`}
`;

const InputContainer = styled.div`
	${tw`w-full h-16 flex justify-around`}
`;

const ShortInput = styled.input`
	${tw`w-[45%] h-10 p-2 border-2 border-black rounded-sm`}
`;

const LongInput = styled.input`
	${tw`w-[95%] h-10 p-2 border-2 border-black rounded-sm`}
`;

const Select = styled.select`
	${tw`w-[50%] h-10 text-sm p-2 border-2 border-black rounded-sm`}
`;
const LabelContainer = styled.div`
	${tw`w-[40%] h-9 flex items-center`}
`;
const LabelText = styled.h3`
	${tw`text-lg text-white`}
`;

const RegisterText = styled.h2`
	${tw`text-white text-2xl mt-16`}
`;

const RegisterButton = styled.button`
	${tw`w-[50%] h-12 mt-8 bg-blue-800 text-xl text-white`}
`;

const Separator = styled.div`
	${tw`w-full bg-gray-800 h-[1px]`}
`;

const RegisterPage = () => {
	const [userInfo, setUserInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		favoriteGenre: '',
	});

	const { firstName, lastName, email, password, favoriteGenre } = userInfo;

	const onChange = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<RegisterPageContainer>
			<NavBar />
			<RegisterText>Register Here</RegisterText>
			<RegisterForm>
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
						name="favoriteGenre"
						value={favoriteGenre}
						onChange={onChange}
					>
						<option value="" disabled selected hidden>
							Select
						</option>
						<option value="35">Comedy</option>
						<option value="28">Action</option>
						<option value="10749">Romance</option>
						<option value="10751">Family</option>
						<option value="16">Animation</option>
						<option value="18">Drama</option>
						<option value="878">Science Fiction</option>
						<option value="9648">Mystery</option>
						<option value="80">Crime</option>
						<option value="53">Thriller</option>
						<option value="27">Horror</option>
						<option value="99">Documentary</option>
						<option value="10752">War</option>
					</Select>
				</InputContainer>
				<Separator />
				<InputContainer>
					<RegisterButton onClick={() => console.log(userInfo)}>
						Register
					</RegisterButton>
				</InputContainer>
			</RegisterForm>
		</RegisterPageContainer>
	);
};

export default RegisterPage;
