/* eslint-disable react-hooks/exhaustive-deps */

import { Container } from '@chakra-ui/layout';
import React from 'react'
import { useLocation } from 'react-router-dom'
import DiagramsContainer from './DiagramsContainer';

const Diagram = () => {

	  const schema = useLocation().state?.schema;

	  console.log(schema);


  return (
	<Container width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" >
		<DiagramsContainer array={schema}/>
	</Container>
  )
}

export default Diagram