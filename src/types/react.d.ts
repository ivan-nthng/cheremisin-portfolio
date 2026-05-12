/// <reference types="react" />
/// <reference types="react-dom" />

import 'react'

declare module 'react' {
    export type FC<P = {}> = React.FunctionComponent<P>
    export interface JSX {
        IntrinsicElements: {
            [elemName: string]: any
        }
    }
}
