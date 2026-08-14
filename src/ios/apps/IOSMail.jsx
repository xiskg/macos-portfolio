import { useState } from 'react'
import { useDesktop } from '../../system/DesktopContext.jsx'
import { mailInbox, profile } from '../../content/portfolio.js'
import Icon from '../../components/Icon.jsx'

// ============================================================================
//  Mail for iOS — inbox list → thread. Compose is a sheet that slides up
//  from the bottom and hands off to the real mail client via mailto:.
// ============================================================================

export default function IOSMail() {
  const [sel, setSel] = useState(null)
  const [read, setRead] = useState(() => new Set(mailInbox.filter((m) => !m.unread).map((m) => m.id)))
  const [composing, setComposing] = useState(false)
  const current = mailInbox.find((m) => m.id === sel)

  const openThread = (id) => {
    setSel(id)
    setRead((r) => new Set([...r, id]))
  }

  return (
    <div className="ios-mail">
      {current ? (
        <>
          <div className="ios-navbar">
            <div className="ios-navbar-side">
              <button className="ios-back" onClick={() => setSel(null)}>
                <Icon name="chevL" size={18} /> Inbox
              </button>
            </div>
            <div className="ios-navbar-side right">
              <button className="ios-navbtn" onClick={() => setComposing(true)} aria-label="Compose">
                <Icon name="compose" size={19} />
              </button>
            </div>
          </div>
          <div className="ios-scroll">
            <div className="ios-thread">
              <h2>{current.subject}</h2>
              <div className="ios-thread-head">
                <div className="ios-avatar">{current.from[0]}</div>
                <div>
                  <div className="ios-thread-from">{current.from}</div>
                  <div className="ios-thread-to">To: {current.to}</div>
                </div>
                <span className="ios-thread-date">{current.date}</span>
              </div>
              <div className="ios-thread-body">{current.body}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="ios-navbar">
            <div className="ios-navbar-title">Inbox</div>
            <div className="ios-navbar-side right">
              <button className="ios-navbtn" onClick={() => setComposing(true)} aria-label="Compose">
                <Icon name="compose" size={19} />
              </button>
            </div>
          </div>
          <div className="ios-scroll">
            {mailInbox.map((m) => (
              <button key={m.id} className="ios-mrow" onClick={() => openThread(m.id)}>
                {!read.has(m.id) && <span className="ios-unread-dot" />}
                <span className="ios-mrow-main">
                  <span className="ios-mrow-top">
                    <span className="ios-mfrom">{m.from}</span>
                    <span className="ios-mdate">{m.date}</span>
                  </span>
                  <span className="ios-msub">{m.subject}</span>
                  <span className="ios-mprev">{m.body.split('\n')[0]}</span>
                </span>
                <span className="chev"><Icon name="chevR" size={15} /></span>
              </button>
            ))}
          </div>
        </>
      )}
      {composing && <ComposeSheet close={() => setComposing(false)} />}
    </div>
  )
}

function ComposeSheet({ close }) {
  const { pushNotification } = useDesktop()
  const [to, setTo] = useState(profile.email)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sent, setSent] = useState(false)

  const send = () => {
    const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setSent(true)
    pushNotification({
      app: 'Mail',
      icon: 'mail',
      title: 'Message sent',
      body: `Your message to ${to} is on its way (via your mail client).`,
    })
    setTimeout(close, 1400)
  }

  return (
    <>
      <div className="ios-sheet-backdrop" onClick={close} />
      <div className="ios-sheet">
        <div className="ios-sheet-bar">
          <button className="ios-sheet-btn" onClick={close}>Cancel</button>
          <span className="ios-sheet-title">New Message</span>
          <button className="ios-sheet-btn send" onClick={send}>Send</button>
        </div>
        {sent ? (
          <div className="ios-sheet-sent">✓ Message sent — talk soon!</div>
        ) : (
          <>
            <div className="ios-cf">
              <label>To:</label>
              <input value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className="ios-cf">
              <label>Subject:</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Let's work together" />
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Hi ${profile.shortName},\n\nI saw your portfolio and…`}
            />
          </>
        )}
      </div>
    </>
  )
}
