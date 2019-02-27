import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 1, text: 'Character', value: "character" },
  { key: 2, text: 'Game Series', value: "series" },
  { key: 3, text: 'Type', value: "type" },
]

const DropdownExampleSelection = () => (
  <Dropdown placeholder='Select Criteria' fluid selection options={options} id="filterMenu" />
)

export default DropdownExampleSelection