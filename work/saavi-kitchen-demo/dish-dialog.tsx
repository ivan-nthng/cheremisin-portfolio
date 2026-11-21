import {Dialog as NativeDialog, type DialogProps} from '@saavi/design-system/components';
export * from '@saavi/design-system/components';

// Presentation boundary for this standalone demo only. Keep the exact native
// editor, focus containment, discard guard and DS enter/exit/backdrop motion.
function DemoDishDialog(props:DialogProps) { return <NativeDialog {...props} modal />; }
export const Dialog=Object.assign(DemoDishDialog,{Header:NativeDialog.Header,Body:NativeDialog.Body,Footer:NativeDialog.Footer});
