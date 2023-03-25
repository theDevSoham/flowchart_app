import { Button, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

//import classes from './styles/Landing.module.css';

const Landing = () => {
  return (
	<Container minW="100vw" minH="100vh" display="flex" justifyContent="center" alignItems="center">
		<Container mx="auto" display="flex" justifyContent="center" alignItems="center" flexDir="column">
			<Heading mx="auto" my="30px">Flowchart visualizer/creator</Heading>
			<Link to="/form">
				<Button 
					colorScheme="teal"
					variant="solid"
					size="lg"
				>
					<p>Get started</p>
				</Button>
			</Link>
		</Container>
	</Container>
  )
}

export default Landing