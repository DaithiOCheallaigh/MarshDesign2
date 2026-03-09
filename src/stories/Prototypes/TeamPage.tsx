import { useState } from 'react'
import { Icon } from '../../components/Icon'
import styles from './TeamPage.module.css'

interface TeamMember {
  id: string
  username: string
  role: 'Admin' | 'User'
  joined: string
  initials: string
  color: string
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', username: 'davekellydesign', role: 'Admin', joined: 'Jan 16, 2026', initials: 'D', color: '#1565c0' },
  { id: '2', username: 'Dave', role: 'Admin', joined: 'Jan 16, 2026', initials: 'D', color: '#334155' },
  { id: '3', username: 'email', role: 'User', joined: 'Jan 20, 2026', initials: 'E', color: '#1565c0' },
  { id: '4', username: 'example', role: 'Admin', joined: 'Jan 20, 2026', initials: 'E', color: '#1565c0' },
  { id: '5', username: 'nicola.ocallaghan', role: 'User', joined: 'Jan 20, 2026', initials: 'N', color: '#1565c0' },
]

export function TeamPage() {
  const [roles, setRoles] = useState<Record<string, string>>(
    Object.fromEntries(TEAM_MEMBERS.map((m) => [m.id, m.role]))
  )

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <Icon name="group" size={22} color="var(--color-brand-midnight)" />
          <div>
            <h1>Team Members</h1>
            <p className={styles.subtitle}>
              View all team members and their profiles · You can manage roles as an admin
            </p>
          </div>
        </div>
      </div>

      <div className={styles.memberGrid}>
        {TEAM_MEMBERS.map((member) => {
          const currentRole = roles[member.id]
          return (
            <div key={member.id} className={styles.memberCard}>
              <div className={styles.avatar} style={{ background: member.color }}>
                {member.initials}
              </div>
              <span className={styles.memberName}>{member.username}</span>
              <span
                className={[
                  styles.roleBadge,
                  currentRole === 'Admin' ? styles.badgeAdmin : styles.badgeUser,
                ].join(' ')}
              >
                <Icon
                  name={currentRole === 'Admin' ? 'admin-panel-settings' : 'person-outline'}
                  size={12}
                  color="currentColor"
                />
                {currentRole}
              </span>
              <select
                className={styles.roleSelect}
                value={currentRole}
                onChange={(e) =>
                  setRoles((prev) => ({ ...prev, [member.id]: e.target.value }))
                }
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <div className={styles.joinedDate}>
                <Icon name="calendar-today" size={13} color="var(--color-neutral-750)" />
                <span>Joined {member.joined}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
