import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  counters: [{ id: nanoid(), name: 'Counter 1', value: 0 }],
}

const countersSlice = createSlice({
  name: 'counters',
  initialState,
  reducers: {
    // Add Data
    addCounter: {
      reducer(state, action) {
        state.counters.push(action.payload)
      },
      prepare(name) {
        return { payload: { id: nanoid(), name: name || `Counter ${nanoid(4)}`, value: 0 } }
      },
    },
    // Update Data
    increment(state, action) {
      const c = state.counters.find((c) => c.id === action.payload)
      if (c) c.value += 1
    },
    decrement(state, action) {
      const c = state.counters.find((c) => c.id === action.payload)
      if (c) c.value -= 1
    },
    // Delete Data
    deleteCounter(state, action) {
      state.counters = state.counters.filter((c) => c.id !== action.payload)
    },
  },
})

export const { addCounter, increment, decrement, deleteCounter } = countersSlice.actions

// Display Data
export const selectCounters = (state) => state.counters.counters

export default countersSlice.reducer
