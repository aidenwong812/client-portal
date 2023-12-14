import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import prePromptsSlice from '../features/prompts/prePromptsSlice'
import closerPromptsSlice from '../features/prompts/closerPromptsSlice'
import pushPromptsSlice from '../features/prompts/pushPromptsSlice'
import knowledgeSlice from '../features/knowledge/knowledgeSlice'
import assistantsSlice from '../features/assistants/assistantsSlice'

const combinedReducer = {
  header: headerSlice,
  modal: modalSlice,
  prePrompt: prePromptsSlice,
  closerPrompt: closerPromptsSlice,
  pushPrompt: pushPromptsSlice,
  knowledge: knowledgeSlice,
  assistant: assistantsSlice
}

export const store = configureStore({
  reducer: combinedReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch