// ** Type Imports
import { OwnerStateThemeType } from './'
import { Skin} from "@/types/LayoutTypes";

const Drawer = (skin: Skin) => {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[skin === 'default' ? 7 : 0]
        })
      }
    }
  }
}

export default Drawer
