import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { PageContainer } from '../components/globalComponents';
import { NavBar } from '../components/navbar';

const LoginPageContainer = styled(PageContainer)`
	${tw`items-center`}
`;
const LoginForm = styled.form`
	${tw`w-[80%] flex flex-col justify-center items-center`}
`;
const InputContainer = styled.div`
	${tw`w-full h-16 flex justify-around items-center`}
`;

const ButtonContainer = styled.div`
	${tw`w-full h-32 flex-col flex items-center`}
`;
const LongInput = styled.input`
	${tw`w-[95%] h-10 p-2 border-2 border-black rounded-sm`}
`;
const LoginText = styled.h2`
	${tw`text-white text-2xl mt-16`}
`;
const LoginButton = styled.button`
	${tw`w-[95%] h-12 bg-blue-800 text-xl text-white mb-4`}
`;
const AlternateText = styled.p`
	${tw`text-white text-xs`}
`;
const Separator = styled.div`
	${tw`w-full bg-gray-800 h-[1px] my-6`}
`;

const LoginPage = () => {
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	});

	const { email, password } = userInfo;

	const onChange = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<LoginPageContainer>
			<NavBar />
			<LoginText>Sign In Here</LoginText>
			<LoginForm>
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
					<LoginButton onClick={() => console.log(userInfo)}>
						Sign In
					</LoginButton>
					<AlternateText>
						Don't have an account yet? Sign up{' '}
						<Link to="/register" className="underline">
							here
						</Link>
					</AlternateText>
				</ButtonContainer>
			</LoginForm>
		</LoginPageContainer>
	);
};

export default LoginPage;
