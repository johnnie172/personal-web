import { AppFooter } from "../../src/components/AppFooter"
import * as React from "react"
import { mount } from 'cypress/react'

describe('<AppFooter>', () => {
    it('mounts', () => {
      mount(AppFooter)
    })
  })