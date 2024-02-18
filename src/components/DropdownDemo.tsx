import { Dropdown } from './dropdown'

export const DropdownDemo = () => {
  const handleNewTabClick = () => {
    console.log('new tab')
  }

  const handleNewWindowClick = () => {
    console.log('new window click')
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button className="button">Open Menu</button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item onClick={handleNewTabClick}>New Tab</Dropdown.Item>
        <Dropdown.Item onClick={handleNewWindowClick}>New Window</Dropdown.Item>
        <Dropdown.Item>New Private Window</Dropdown.Item>
        <Dropdown.Item>More Tools</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  )
}
