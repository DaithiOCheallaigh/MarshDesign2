import { useState } from 'react'
import { Icon } from '../../components/Icon'
import styles from './AdminPage.module.css'

const USERS = [
  { id: '1', username: 'davekellydesign', role: 'admin', joined: 'Jan 16, 2026', initials: 'D', color: '#0b4bff' },
  { id: '2', username: 'Dave', role: 'admin', joined: 'Jan 16, 2026', initials: 'D', color: '#000f47' },
  { id: '3', username: 'email', role: 'user', joined: 'Jan 20, 2026', initials: 'E', color: '#0b4bff' },
  { id: '4', username: 'example', role: 'admin', joined: 'Jan 20, 2026', initials: 'E', color: '#0b4bff' },
  { id: '5', username: 'nicola.ocallaghan', role: 'user', joined: 'Jan 20, 2026', initials: 'N', color: '#0b4bff' },
]

function StatCard({
  label, value, sub, icon,
}: {
  label: string; value: string; sub: string; icon: string
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <span className={styles.statLabel}>{label}</span>
        <Icon name={icon} size={18} color="var(--color-neutral-500)" />
      </div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statSub}>{sub}</div>
    </div>
  )
}

export function AdminPage() {
  const [roles, setRoles] = useState<Record<string, string>>(
    Object.fromEntries(USERS.map((u) => [u.id, u.role]))
  )

  return (
    <div>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <div>
            <h1>Admin Dashboard</h1>
            <p className={styles.subtitle}>Manage users and view system activity</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <StatCard label="Total Users" value="5" sub="3 admins, 2 users" icon="group" />
        <StatCard label="Total Clients" value="5" sub="Managed in the system" icon="inventory" />
        <StatCard label="Total Events" value="6" sub="2 currently active" icon="event" />
        <StatCard label="Active Rate" value="33%" sub="Events in progress" icon="trending-up" />
      </div>

      {/* User Management */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Icon name="manage-accounts" size={20} color="var(--color-brand-midnight)" />
          <div>
            <h2 className={styles.sectionTitle}>User Management</h2>
            <p className={styles.sectionSub}>Manage user roles and permissions</p>
          </div>
        </div>

        <div className={styles.tableCard}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((user) => {
                const currentRole = roles[user.id]
                return (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div
                          className={styles.userAvatar}
                          style={{ background: user.color }}
                        >
                          {user.initials}
                        </div>
                        <span className={styles.userName}>{user.username}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={[
                          styles.roleBadge,
                          currentRole === 'admin' ? styles.badgeAdmin : styles.badgeUser,
                        ].join(' ')}
                      >
                        {currentRole}
                      </span>
                    </td>
                    <td className={styles.muted}>{user.joined}</td>
                    <td>
                      <select
                        className={styles.actionSelect}
                        value={currentRole}
                        onChange={(e) =>
                          setRoles((prev) => ({ ...prev, [user.id]: e.target.value }))
                        }
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
