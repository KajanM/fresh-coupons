import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {CoursesWithDiscount} from './CoursesWithDiscount';
import theme from "../theme"

const Newtab = () => {

  return (
    <ChakraProvider theme={theme}>
      <CoursesWithDiscount/>
    </ChakraProvider>
  );
};

export default Newtab;
