import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import {ColorModeScript} from "@chakra-ui/react";
import theme from "../theme";

render((<>
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  <Newtab />
</>), document.querySelector('#root'));

