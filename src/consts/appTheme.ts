import { baseTheme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { AppThemeColorMode } from 'src/types/appThemeColorMode';

export const appTheme = extendTheme(
    {
        colors: {
            primary: baseTheme.colors.green
        },
        config: {
            initialColorMode: AppThemeColorMode.Dark,
            useSystemColorMode: false
        },
        styles: {
            global: {
                '#app': {
                    height: '100vh',
                    overflow: 'hidden'
                }
            }
        }
    },
    withDefaultColorScheme({ colorScheme: 'primary' })
);
