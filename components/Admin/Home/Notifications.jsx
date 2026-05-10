'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Mail, Check } from 'lucide-react'

const initialNotifications = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: 'Your case request has been accepted.',
  description: 'Attorney Ahmed Hassan accepted the request for a "commercial dispute" case.',
  time: `${i + 1}d ago`,
  read: i % 3 !== 0,
  hasAttachment: i % 4 === 0,
}))

export default function NotificationPanel() {
  const [tab, setTab] = useState('Unread')
  const [notifications, setNotifications] = useState(initialNotifications)

  const filtered = notifications.filter((n) =>
    tab === 'Read' ? n.read : !n.read
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell size={15} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900">Notification</h2>
          {unreadCount > 0 && (
            <span className="text-[10px] bg-gray-900 text-white font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {tab === 'Unread' && unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[10px] text-yellow-500 hover:text-yellow-600 font-semibold transition-colors"
            >
              Mark all read
            </button>
          )}
          <div className="flex items-center gap-0.5 text-xs font-semibold bg-gray-100 rounded-full p-0.5">
            {['Unread', 'Read'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                  tab === t
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_2fr_auto] gap-2 px-1 mb-1">
        {['Title', 'Description', 'Time'].map((h) => (
          <span key={h} className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
            {h}
          </span>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 max-h-85">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 text-gray-300"
            >
              <Bell size={28} className="mb-2" />
              <p className="text-xs">No {tab.toLowerCase()} notifications</p>
            </motion.div>
          ) : (
            filtered.map((n, i) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2, delay: i * 0.025 }}
                className="group grid grid-cols-[1fr_2fr_auto] gap-2 items-start px-1 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* Title */}
                <div className="flex items-start gap-1.5">
                  <div className="mt-0.5 shrink-0">
                    {n.hasAttachment ? (
                      <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center">
                        <Mail size={10} className="text-gray-500" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center">
                        <Bell size={9} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-700 leading-tight line-clamp-2">{n.title}</p>
                </div>

                {/* Description */}
                <p className="text-[10px] text-gray-400 leading-tight line-clamp-2">{n.description}</p>

                {/* Time + mark read */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
                  {!n.read && (
                    <button
                      onClick={(e) => { e.stopPropagation(); markRead(n.id) }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full bg-gray-900 text-white"
                      title="Mark as read"
                    >
                      <Check size={8} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}