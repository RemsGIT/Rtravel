// ** MUI Imports
import { AvatarProps } from '@mui/material/Avatar'

// ** Types
import { ThemeColor} from "@/types/LayoutTypes";

export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColor
  skin?: 'filled' | 'light' | 'light-static'
}
