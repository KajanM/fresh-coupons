import {extendTheme, ThemeConfig} from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config, styles: {
    global: {
      "#fresh-coupons-root *, .chakra-portal *": {
        fontSize: '1em !important',
      }
    },
  }
})

export default theme
