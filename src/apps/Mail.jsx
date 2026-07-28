import { useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import { useDesktop } from '../system/DesktopContext.jsx'
import { mailInbox, profile } from '../content/portfolio.js'
import Icon from '../components/Icon.jsx'

export default function Mail() {
  const { openWindow } = useWindows()
  const [sel, setSel] = useState(mailInbox[0].id)
  const [read, setRead] = useState(() => new Set(mailInbox.filter((m) => !m.unread).map((m) => m.id)))
  const current = mailInbox.find((m) => m.id === sel)

  const select = (id) => {
    setSel(id)
    setRead((r) => new Set([...r, id]))
  }

  const unreadCount = mailInbox.filter((m) => !read.has(m.id)).length

  return (
    <div className="mail">
      <div className="sidebar" style={{ width: 165 }}>
        <div className="sb-section">Mailboxes</div>
        <div className="sb-item active">
          <span className="glyph"><Icon name="mailGlyph" size={16} /></span>
          Inbox
          {unreadCount > 0 && (
            <span style={{ marginLeft: 'auto', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: 11, padding: '0 7px', lineHeight: '17px' }}>
              {unreadCount}
            </span>
          )}
        </div>
        <div className="sb-item disabled"><span className="glyph"><Icon name="external" size={15} /></span>Sent</div>
        <div className="sb-item disabled"><span className="glyph"><Icon name="docSm" size={16} /></span>Drafts</div>
        <div className="sb-item disabled"><span className="glyph"><Icon name="trashGlyph" size={16} /></span>Trash</div>
      </div>

      <div className="mail-list">
        <div className="toolbar" style={{ justifyContent: 'flex-end' }}>
          <button
            className="tbtn"
            title="New Message"
            onClick={() => openWindow('mail-compose', { title: 'New Message' })}
          >
            <Icon name="compose" size={17} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {mailInbox.map((m) => (
            <div key={m.id} className={`mrow${sel === m.id ? ' sel' : ''}`} onClick={() => select(m.id)}>
              {!read.has(m.id) && <div className="unread-dot" />}
              <div className="m-top">
                <span className="m-from">{m.from}</span>
                <span className="m-date">{m.date}</span>
              </div>
              <div className="m-sub">{m.subject}</div>
              <div className="m-prev">{m.body.split('\n')[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {current ? (
        <div className="mail-read">
          <h2>{current.subject}</h2>
          <div className="mh"><b>From:</b> {current.from} &lt;{current.fromEmail}&gt;</div>
          <div className="mh"><b>To:</b> {current.to}</div>
          <div className="mh"><b>Date:</b> {current.date}</div>
          <div className="m-sep" />
          <div className="m-body">{current.body}</div>
        </div>
      ) : (
        <div className="mail-empty">No Message Selected</div>
      )}
    </div>
  )
}

export function MailCompose({ win }) {
  const { closeWindow } = useWindows()
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
    setTimeout(() => closeWindow(win.id), 1500)
  }

  return (
    <div className="compose">
      {sent ? (
        <div className="compose-sent">✓ Message sent — talk soon!</div>
      ) : (
        <>
          <div className="cf">
            <label>To:</label>
            <input value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="cf">
            <label>Subject:</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Let's work together" />
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Hi ${profile.shortName},\n\nI saw your portfolio and…`}
          />
          <div className="cf" style={{ justifyContent: 'flex-end', borderTop: '0.5px solid var(--separator)', borderBottom: 0 }}>
            <button className="abtn" style={{ padding: '5px 18px' }} onClick={send}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  )
}
