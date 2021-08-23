import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CoursesWithDiscount } from './CoursesWithDiscount';

const Newtab = () => {
  return (
    <ChakraProvider>
      <div className="App">
        <header className='App-header'>
          <CoursesWithDiscount />
        </header>
      </div>
    </ChakraProvider>
  );
};

export default Newtab;
