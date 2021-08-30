import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {CoursesWithDiscount} from './CoursesWithDiscount';

const Newtab = () => {
  return (
    <ChakraProvider>
      <CoursesWithDiscount/>
    </ChakraProvider>
  );
};

export default Newtab;
