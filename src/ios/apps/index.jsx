import IOSSafari from './IOSSafari.jsx'
import IOSPhotos from './IOSPhotos.jsx'
import IOSMail from './IOSMail.jsx'
import IOSNotes from './IOSNotes.jsx'
import IOSFiles from './IOSFiles.jsx'
import IOSTerminal from './IOSTerminal.jsx'
import IOSSettings from './IOSSettings.jsx'

// ============================================================================
//  iOS app registry — the counterpart of APP_COMPONENTS on the desktop.
// ============================================================================

export const IOS_APP_COMPONENTS = {
  safari: IOSSafari,
  mail: IOSMail,
  photos: IOSPhotos,
  notes: IOSNotes,
  files: IOSFiles,
  terminal: IOSTerminal,
  settings: IOSSettings,
}
