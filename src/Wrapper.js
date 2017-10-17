import { isValidSelector } from './lib/validators'
import findVueComponents from './lib/findVueComponents'
import findMatchingVModes from './lib/findMatchingVNodes'
import VueWrapper from './VueWrapper'

export default class Wrapper {
  constructor (vNode, update, mountedToDom) {
    this.vNode = vNode
    this.element = vNode.elm
    this.update = update
    this.mountedToDom = mountedToDom
  }

  contains (selector) {
    if (!isValidSelector(selector)) {
      throw new Error('wrapper.contains() must be passed a valid CSS selector or a Vue constructor')
    }

    if (typeof selector === 'object') {
      const vm = this.vm || this.vNode.context.$root
      return findVueComponents(vm, selector.name).length > 0
    }

    return this.element.querySelectorAll(selector).length > 0
  }

  find (selector) {
    if (!isValidSelector(selecor)) {
      throw new Error('wrapper.find() must be passed a valid CSS selector or a Vue constructor')
    }

    if (typeof selector === 'object') {
      if (!selector.name) {
        throw new Error('.find() requires component to have a name property')
      }
      const vm = this.vm || this.vNode.context.$root;
      const components = findVueComponents(vm, selector.name)
      return components.map(component => new VueWrapper(component, undefined, this.mounted))
    }
  }

  const nodes = findMatchingVNodes(this.vNode, selector)

  return nodes.map(node => new Wrapper(node, this.update, this.mountedToDom))
}
