import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PROMPT_API } from '../../utils/serverURL';
import { Prompt } from '../../utils/Type';

export const getPrePromptsContent = createAsyncThunk('/preprompts/content', async () => {
  const response = await axios.get(PROMPT_API.GET_PRE_PROMPTS, {
    headers: {
      'ngrok-skip-browser-warning': "1",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': import.meta.env.VITE_SERVER_ENDPOINT,
    }
  })
  return response.data;
})

export const addNewPrePrompt = createAsyncThunk('/preprompts/add', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.ADD_PRE_PROMPT, {
    title: prompt.title,
    prompt: prompt.prompt
  })
  return response.data;
})

export const updatePrePrompt = createAsyncThunk('/preprompts/update', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.UPDATE_PRE_PROMPT, {
    id: prompt.id,
    title: prompt.title,
    prompt: prompt.prompt
  })
  return response.data;
})

export const deletePrePrompt = createAsyncThunk('/preprompts/delete', async (id: string) => {
  const response = await axios.post(PROMPT_API.DELETE_PRE_PROMPT, {
    id: id
  })
  return response.data;
})

export const prePromptsSlice = createSlice({
  name: 'prePrompts',
  initialState: {
    isLoading: false,
    prePrompts: [{
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
    builder.addCase(getPrePromptsContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPrePromptsContent.fulfilled, (state, { payload }) => {
      state.prePrompts = payload
      state.isLoading = false
    })
    builder.addCase(getPrePromptsContent.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(addNewPrePrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewPrePrompt.fulfilled, (state, { payload }) => {
      state.prePrompts = [...state.prePrompts, payload]
      state.isLoading = false
    })
    builder.addCase(addNewPrePrompt.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(updatePrePrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updatePrePrompt.fulfilled, (state, { payload }) => {
      state.prePrompts = state.prePrompts.map(prompt => prompt.id === payload.id ? payload : prompt)
      state.isLoading = false
    })
    builder.addCase(updatePrePrompt.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(deletePrePrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deletePrePrompt.fulfilled, (state, { payload }) => {
      state.prePrompts = state.prePrompts.filter(prompt => prompt.id !== payload.id)
      state.isLoading = false
    })
    builder.addCase(deletePrePrompt.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default prePromptsSlice.reducer