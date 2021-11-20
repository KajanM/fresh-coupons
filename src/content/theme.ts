import {extendTheme, ThemeConfig} from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config, styles: {
    global: {
      ".chakra-portal h2.course-list-title": {
        fontSize: '2em !important',
      },
      ".chakra-portal h2": {
        fontSize: '1.1em !important',
      },
      "#fresh-coupons-root *, .chakra-portal *": {
        fontSize: '1em !important',
      }
    },
  }
})

export default theme
