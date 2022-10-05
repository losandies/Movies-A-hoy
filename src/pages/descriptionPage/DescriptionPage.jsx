import React, { useContext } from 'react';
import { PageContainer } from '../../components/globalComponents';
import { MoviesContext } from '../../contexts/moviesContext';

const DescriptionPage = () => {
	const { currentMovie } = useContext(MoviesContext);

	return (
		<PageContainer>{currentMovie.title || currentMovie.name}</PageContainer>
	);
};

export default DescriptionPage;
