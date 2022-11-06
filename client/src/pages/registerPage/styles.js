import styled from 'styled-components';
import tw from 'twin.macro';
import { PageContainer } from '../../components/globalComponents';

export const RegisterPageContainer = styled(PageContainer)`
	${tw`items-center`}
`;
export const RegisterForm = styled.form`
	${tw`w-[80%] md:max-w-md flex flex-col justify-center items-center`}
`;
export const InputContainer = styled.div`
	${tw`w-full h-16 md:h-auto flex justify-around items-center`}
`;
export const ButtonContainer = styled.div`
	${tw`w-full h-32 flex-col flex items-center`}
`;
export const ShortInput = styled.input`
	${tw`w-[45%] h-10 md:my-4 p-2 md:py-6 border-2 border-black rounded-sm`}
`;
export const LongInput = styled.input`
	${tw`w-[95%] h-10 md:my-4 p-2 md:py-6 border-2 border-black rounded-sm`}
`;
export const Select = styled.select`
	${tw`w-[50%] h-10 md:h-[55px] md:my-4 text-sm p-2 md:py-4 border-2 border-black rounded-sm`}
`;
export const LabelContainer = styled.div`
	${tw`w-[40%] h-9 flex items-center`}
`;
export const LabelText = styled.h3`
	${tw` ml-1 text-base text-white`}
`;
export const RegisterText = styled.h2`
	${tw`text-white text-2xl mt-16 md:mt-60`}
`;
export const RegisterButton = styled.button`
	${tw`w-[95%] h-12 bg-blue-800 text-xl text-white mb-4`}
`;
export const AlternateText = styled.p`
	${tw`text-white text-xs`}
`;
export const Separator = styled.div`
	${tw`w-full bg-gray-800 h-[1px] my-6`}
`;
