import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { KNOWLEDGE_BASE_API } from '../../utils/serverURL';
import { KnowledgeBase } from '../../utils/Type';

export const getKnowledgeContent = createAsyncThunk('/knowledge/content', async (assistant_id: string) => {
  const response = await axios.post(KNOWLEDGE_BASE_API.GET_KNOWLEDGE_BASE, {
    assistant_id: assistant_id
  }, {
    headers: {
      'ngrok-skip-browser-warning': "1",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://9797-156-220-22-73.ngrok-free.app.env',
    }
  })
  return response.data;
})

export const addNewKnowledge = createAsyncThunk('/knowledge/add', async (knowledge: KnowledgeBase) => {
  if (knowledge.type_of_knowledge === 'URL') {
    const response = await axios.post(KNOWLEDGE_BASE_API.ADD_KNOWLEDGE_BASE, {
      assistant_id: knowledge.assistant_id,
      knowledge_name: knowledge.name,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data;
  } else {
    const response = await axios.post(KNOWLEDGE_BASE_API.ADD_KNOWLEDGE_BASE, {
      assistant_id: knowledge.assistant_id,
      knowledge_name: knowledge.name,
      file: knowledge.file
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data;
  }
})

export const updateKnowledge = createAsyncThunk('/knowledge/update', async (knowledge: KnowledgeBase) => {
  const response = await axios.post(KNOWLEDGE_BASE_API.UPDATE_KNOWLEDGE_BASE, {
    id: knowledge.id,
    knowledge_name: knowledge.name,
    knowledge_type: knowledge.type_of_knowledge
  })
  return response.data;
})

export const deleteKnowledge = createAsyncThunk('/knowledge/delete', async (id: string) => {
  const response = await axios.post(KNOWLEDGE_BASE_API.DELETE_KNOWLEDGE_BASE, {
    id: id
  })
  return response.data;
})

export const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState: {
    isLoading: false,
    knowledges: [{
      id: "",
      name: "",
      type_of_knowledge: "",
      status: "",
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
    builder.addCase(getKnowledgeContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getKnowledgeContent.fulfilled, (state, { payload }) => {
      if (payload?.result === 'Failed!' || payload?.result === 'Not found')
        state.knowledges = [{
          id: "",
          name: "",
          type_of_knowledge: "",
          status: "",
          date: ""
        }]
      else
        state.knowledges = payload
      // state.knowledges = [{ id: "1", name: "https://reactjs.org", type: "URL", status: "success", date: '2023-12-07' },
      // { id: "2", name: "Master Copy of Hospital Cash Price", type: "File(Excel)", status: "pending", date: '2023-12-07' },
      // { id: "3", name: "Master Copy of Hospital Cash Price", type: "File(Excel)", status: "fail", date: '2023-12-07' }]
      state.isLoading = false
    })
    builder.addCase(getKnowledgeContent.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(addNewKnowledge.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewKnowledge.fulfilled, (state, { payload }) => {
      if (state.knowledges.length === 1 && state.knowledges[0].id === "") {
        state.knowledges = [payload];
      }
      else state.knowledges = [...state.knowledges, payload]
      state.isLoading = false
    })
    builder.addCase(addNewKnowledge.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateKnowledge.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateKnowledge.fulfilled, (state, { payload }) => {
      state.knowledges = state.knowledges.map(knowledge => knowledge.id === payload.id ? payload : knowledge)
      state.isLoading = false
    })
    builder.addCase(updateKnowledge.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteKnowledge.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteKnowledge.fulfilled, (state, { payload }) => {
      state.knowledges = state.knowledges.filter(knowledge => knowledge.id !== payload.id)
      state.isLoading = false
    })
    builder.addCase(deleteKnowledge.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default knowledgeSlice.reducer