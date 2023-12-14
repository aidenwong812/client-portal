import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PROMPT_API } from '../../utils/serverURL';
import { Prompt } from '../../utils/Type';

export const getCloserPromptsContent = createAsyncThunk('/closerprompts/content', async () => {
  const response = await axios.get(PROMPT_API.GET_CLOSER_PROMPTS, {
    headers: {
      'ngrok-skip-browser-warning': "1",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': import.meta.env.VITE_SERVER_ENDPOINT,
    }
  })
  return response.data;
})

export const addNewCloserPrompt = createAsyncThunk('/closerprompts/add', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.ADD_CLOSER_PROMPT, {
    title: prompt.title,
    prompt: prompt.prompt
  })
  return response.data;
})

export const updateCloserPrompt = createAsyncThunk('/closerprompts/update', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.UPDATE_CLOSER_PROMPT, {
    id: prompt.id,
    title: prompt.title,
    prompt: prompt.prompt
  })
  return response.data;
})

export const deleteCloserPrompt = createAsyncThunk('/closerprompts/delete', async (id: string) => {
  const response = await axios.post(PROMPT_API.DELETE_CLOSER_PROMPT, {
    id: id
  })
  return response.data;
})

export const closerPromptsSlice = createSlice({
  name: 'closerPrompts',
  initialState: {
    isLoading: false,
    closerPrompts: [{
      id: "",
      title: "",
      prompt: "",
      date: ""
    }]
  },
  reducers: {
    // addNewPrompt: (state, action) => {
    //   let { newLeadObj } = action.payload
    //   state.prompts = [...state.prompts, newLeadObj]
    // },

    // deletePrompt: (state, action) => {
    //   let { id } = action.payload
    //   state.prompts.splice(id, 1)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getCloserPromptsContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCloserPromptsContent.fulfilled, (state, { payload }) => {
      state.closerPrompts = payload
      state.isLoading = false
    })
    builder.addCase(getCloserPromptsContent.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(addNewCloserPrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewCloserPrompt.fulfilled, (state, { payload }) => {
      state.closerPrompts = [...state.closerPrompts, payload]
      state.isLoading = false
    })
    builder.addCase(addNewCloserPrompt.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateCloserPrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateCloserPrompt.fulfilled, (state, { payload }) => {
      state.closerPrompts = state.closerPrompts.map(prompt => prompt.id === payload.id ? payload : prompt)
      state.isLoading = false
    })
    builder.addCase(updateCloserPrompt.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteCloserPrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteCloserPrompt.fulfilled, (state, { payload }) => {
      state.closerPrompts = state.closerPrompts.filter(prompt => prompt.id !== payload.id)
      state.isLoading = false
    })
    builder.addCase(deleteCloserPrompt.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default closerPromptsSlice.reducer