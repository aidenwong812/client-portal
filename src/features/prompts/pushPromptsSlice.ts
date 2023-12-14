import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PROMPT_API } from '../../utils/serverURL';
import { Prompt } from '../../utils/Type';

export const getPushPromptsContent = createAsyncThunk('/pushprompts/content', async () => {
  const response = await axios.get(PROMPT_API.GET_PUSH_PROMPTS, {
    headers: {
      'ngrok-skip-browser-warning': "1",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': import.meta.env.VITE_SERVER_ENDPOINT,
    }
  })
  return response.data;
})

export const addNewPushPrompt = createAsyncThunk('/pushprompts/add', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.ADD_PUSH_PROMPT, {
    title: prompt.title,
    prompt: prompt.prompt
  })
  return response.data;
})

export const updatePushPrompt = createAsyncThunk('/pushprompts/update', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.UPDATE_PUSH_PROMPT, {
    id: prompt.id,
    title: prompt.title,
    prompt: prompt.prompt
  })
  return response.data;
})

export const deletePushPrompt = createAsyncThunk('/pushprompts/delete', async (id: string) => {
  const response = await axios.post(PROMPT_API.DELETE_PUSH_PROMPT, {
    id: id
  })
  return response.data;
})

export const pushPromptsSlice = createSlice({
  name: 'pushPrompts',
  initialState: {
    isLoading: false,
    pushPrompts: [{
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
    builder.addCase(getPushPromptsContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPushPromptsContent.fulfilled, (state, { payload }) => {
      state.pushPrompts = payload
      state.isLoading = false
    })
    builder.addCase(getPushPromptsContent.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(addNewPushPrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewPushPrompt.fulfilled, (state, { payload }) => {
      state.pushPrompts = [...state.pushPrompts, payload]
      state.isLoading = false
    })
    builder.addCase(addNewPushPrompt.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(updatePushPrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updatePushPrompt.fulfilled, (state, { payload }) => {
      state.pushPrompts = state.pushPrompts.map(prompt => prompt.id === payload.id ? payload : prompt)
      state.isLoading = false
    })
    builder.addCase(updatePushPrompt.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(deletePushPrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deletePushPrompt.fulfilled, (state, { payload }) => {
      state.pushPrompts = state.pushPrompts.filter(prompt => prompt.id !== payload.id)
      state.isLoading = false
    })
    builder.addCase(deletePushPrompt.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default pushPromptsSlice.reducer