import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
} from '@/components/ui/combobox'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Combobox>

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Select coverage type..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="property">Property</ComboboxItem>
          <ComboboxItem value="marine">Marine</ComboboxItem>
          <ComboboxItem value="aviation">Aviation</ComboboxItem>
          <ComboboxItem value="liability">Liability</ComboboxItem>
          <ComboboxItem value="cyber">Cyber Risk</ComboboxItem>
          <ComboboxItem value="do">Directors &amp; Officers</ComboboxItem>
        </ComboboxList>
        <ComboboxEmpty>No coverage type found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Search line of business..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Property & Casualty</ComboboxLabel>
            <ComboboxItem value="property">Property</ComboboxItem>
            <ComboboxItem value="casualty">Casualty</ComboboxItem>
            <ComboboxItem value="liability">General Liability</ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Specialty Lines</ComboboxLabel>
            <ComboboxItem value="marine">Marine Cargo</ComboboxItem>
            <ComboboxItem value="aviation">Aviation</ComboboxItem>
            <ComboboxItem value="cyber">Cyber Risk</ComboboxItem>
            <ComboboxItem value="do">Directors &amp; Officers</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
        <ComboboxEmpty>No line of business found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithClear: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Select coverage type..." showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="property">Property</ComboboxItem>
          <ComboboxItem value="marine">Marine</ComboboxItem>
          <ComboboxItem value="aviation">Aviation</ComboboxItem>
          <ComboboxItem value="liability">Liability</ComboboxItem>
          <ComboboxItem value="cyber">Cyber Risk</ComboboxItem>
        </ComboboxList>
        <ComboboxEmpty>No coverage type found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  ),
}
