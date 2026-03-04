import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Insurance Lines</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-96 gap-3 p-4 md:grid-cols-2">
              {[
                { title: 'Property', desc: 'Commercial property coverage' },
                { title: 'Marine', desc: 'Cargo and hull insurance' },
                { title: 'Aviation', desc: 'Aircraft and liability' },
                { title: 'Liability', desc: 'General and professional liability' },
              ].map(({ title, desc }) => (
                <li key={title}>
                  <NavigationMenuLink asChild>
                    <a href="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">{title}</div>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="#" className={navigationMenuTriggerStyle()}>Claims</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="#" className={navigationMenuTriggerStyle()}>Reports</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <div className="w-full rounded-lg border overflow-hidden">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-3 border-b bg-background">
        <img src="/marsh-logo-navy.png" alt="Marsh" width={466} height={102} className="h-7 w-auto object-contain" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Insurance Lines</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-96 gap-3 p-4 md:grid-cols-2">
                  {[
                    { title: 'Property', desc: 'Commercial property coverage' },
                    { title: 'Marine', desc: 'Cargo and hull insurance' },
                    { title: 'Aviation', desc: 'Aircraft and liability' },
                    { title: 'Liability', desc: 'General and professional liability' },
                  ].map(({ title, desc }) => (
                    <li key={title}>
                      <NavigationMenuLink asChild>
                        <a href="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium">{title}</div>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className={navigationMenuTriggerStyle()}>Claims</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className={navigationMenuTriggerStyle()}>Reports</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <div className="p-6 text-sm text-muted-foreground">Page content area</div>
    </div>
  ),
}

export const DarkHeader: Story = {
  render: () => (
    <div className="w-full rounded-lg border overflow-hidden">
      <header className="flex items-center justify-between px-6 py-3 bg-[#0C103D]">
        <img src="/marsh-logo-white.png" alt="Marsh" width={434} height={95} className="h-7 w-auto object-contain" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10">
                Insurance Lines
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-96 gap-3 p-4 md:grid-cols-2">
                  {[
                    { title: 'Property', desc: 'Commercial property coverage' },
                    { title: 'Marine', desc: 'Cargo and hull insurance' },
                    { title: 'Aviation', desc: 'Aircraft and liability' },
                    { title: 'Liability', desc: 'General and professional liability' },
                  ].map(({ title, desc }) => (
                    <li key={title}>
                      <NavigationMenuLink asChild>
                        <a href="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium">{title}</div>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white`}>
                  Claims
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white`}>
                  Reports
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <div className="p-6 text-sm text-muted-foreground">Page content area</div>
    </div>
  ),
}
