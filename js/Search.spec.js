import React from 'react'
import Search from './Search'
import ShowCard from './ShowCard'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import preload from '../public/data.json'

test('Search snapshot test', () => {
  const component = shallow(<Search />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('Search should render a ShowCard for each show', () => {
  const component = shallow(<Search />)
  expect(preload.shows.length).toEqual(component.find(ShowCard).length)
})

test('Search should render a correct amount of shows based on search', () => {
  const searchWord = 'house'
  const component = shallow(<Search />)
  component.find('input').simulate('change', {target: {value: searchWord}})
  const showCount = preload.shows.filter((show) => {
    return `${show.title} ${show.description}`.toUpperCase().indexOf(this.state.searchWord.toUpperCase()) >= 0
  }).length

  expect(component.find(ShowCard).length).toEqual(showCount)
})
