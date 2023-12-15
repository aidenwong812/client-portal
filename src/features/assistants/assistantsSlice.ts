import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ASSISTANT_API } from '../../utils/serverURL';
import { Assistant } from '../../utils/Type';

export const getAssistantContent = createAsyncThunk('/assistant/content', async () => {
  const response = await axios.get(ASSISTANT_API.GET_ASSISTANT, {
    headers: {
      'ngrok-skip-browser-warning': "1",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://9797-156-220-22-73.ngrok-free.app.env',
    }
  })
  return response.data;
})

export const addNewAssistant = createAsyncThunk('/assistant/add', async (assistant: Assistant) => {
  const response = await axios.post(ASSISTANT_API.ADD_ASSISTANT, {
    assistant_name: assistant.assistant_name,
  })
  return response.data;
})

export const updateAssistant = createAsyncThunk('/assistant/update', async (assistant: Assistant) => {
  const response = await axios.post(ASSISTANT_API.UPDATE_ASSISTANT, {
    id: assistant.id,
    assistant_name: assistant.assistant_name,
  })
  return response.data;
})

export const deleteAssistant = createAsyncThunk('/assistant/delete', async (id: string) => {
  const response = await axios.post(ASSISTANT_API.DELETE_ASSISTANT, {
    id: id
  })
  return response.data;
})

export const assistantsSlice = createSlice({
  name: 'assistants',
  initialState: {
    isLoading: false,
    assistants: [{
      id: "",
      assistant_name: "",
      description: "",
      mainColor: "blue",
      launcherImage: "/logo.png",
      assistantImage: "/logo.png",
      assistantAvatar: "/logo.png",
      greeting: "How can I help you",
      date: ""
    }]
  },
  reducers: {
    // addNewKnowledge: (state, action) => {
    //   let { newKnowledgeObj } = action.payload
    //   state.knowledge = [...state.knowledge, newKnowledgeObj]
    // },

    // deleteKnowledge: (state, action) => {
    //   let { id } = action.payload
    //   state.knowledge.splice(id, 1)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getAssistantContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAssistantContent.fulfilled, (state, { payload }) => {
      state.assistants = payload
      state.isLoading = false
    })
    builder.addCase(getAssistantContent.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(addNewAssistant.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewAssistant.fulfilled, (state, { payload }) => {
      if (payload?.id)
        state.assistants = [...state.assistants, payload]
      state.isLoading = false
    })
    builder.addCase(addNewAssistant.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateAssistant.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateAssistant.fulfilled, (state, { payload }) => {
      state.assistants = state.assistants.map(assistant => assistant.id === payload.id ? payload : assistant)
      state.isLoading = false
    })
    builder.addCase(updateAssistant.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteAssistant.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteAssistant.fulfilled, (state, { payload }) => {
      state.assistants = state.assistants.filter(assistant => assistant.id !== payload.id)
      state.isLoading = false
    })
    builder.addCase(deleteAssistant.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default assistantsSlice.reducer