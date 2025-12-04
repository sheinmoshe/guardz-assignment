import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import UsersView from './usersView.vue'

// Spies for composable methods
const getUsersSpy = vi.fn()
const updateUserSpy = vi.fn()

// Mock the composable used by the view
vi.mock('@/composables/use-user.ts', () => {
  return {
    useUser: () => {
      const allUsers = ref([
        { id: 1, username: 'alice', age: 30, hobbies: 'reading' },
        { id: 2, username: 'bob', age: 25, hobbies: 'gaming' },
      ])
      return { allUsers, getUsers: getUsersSpy, updateUser: updateUserSpy }
    },
  }
})

// Lightweight stubs for PrimeVue components
const DataTableStub = {
  name: 'DataTable',
  props: ['editingRows', 'value', 'editMode', 'dataKey', 'bodyStyle', 'rowEditor'],
  emits: ['row-edit-save', 'update:editingRows'],
  template: '<div class="datatable"><slot></slot></div>',
}

const ColumnStub = {
  name: 'Column',
  props: ['field', 'header', 'style', 'rowEditor', 'bodyStyle'],
  template: '<div class="column"><slot></slot></div>',
}

const mountView = () =>
  mount(UsersView, {
    global: {
      stubs: {
        DataTable: DataTableStub,
        Column: ColumnStub,
      },
    },
  })

describe('usersView.vue', () => {
  beforeEach(() => {
    getUsersSpy.mockClear()
    updateUserSpy.mockClear()
  })

  it('calls getUsers on component creation/mount', () => {
    mountView()
    expect(getUsersSpy).toHaveBeenCalledTimes(1)
  })

  it('binds allUsers to DataTable value prop', () => {
    const wrapper = mountView()
    const dt = wrapper.findComponent({ name: 'DataTable' })
    expect(dt.exists()).toBe(true)
    const value = (dt.props() as any).value
    expect(Array.isArray(value)).toBe(true)
    expect(value.length).toBe(2)
    expect(value[0]).toMatchObject({ id: 1, username: 'alice' })
  })

  it('emits row-edit-save and calls updateUser with new data', async () => {
    const wrapper = mountView()
    const dt = wrapper.findComponent({ name: 'DataTable' })
    const updated = { id: 2, username: 'bob', age: 26, hobbies: 'gaming' }
    dt.vm.$emit('row-edit-save', { newData: updated })
    expect(updateUserSpy).toHaveBeenCalledTimes(1)
    expect(updateUserSpy).toHaveBeenCalledWith(updated)
  })
})
