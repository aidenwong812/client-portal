import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    title: "",  // current  title state management
    isOpen: false,   // modal state management for opening closing
    bodyType: "",   // modal content management
    size: "",   // modal content management
    extraObject: {
      message: "",
      type: "",
      id: "",
      assistant_id: "",
      assistant_name: "",
      description: "",
      mainColor: "blue",
      launcherImage: "/logo.png",
      assistantImage: "/logo.png",
      assistantAvatar: "/logo.png",
      greeting: "How can I help you",
      title: "",
      prompt: "",
      name: "",
      status: "",
    },
  },
  reducers: {

    openModal: (state, action) => {
      const { title, bodyType, extraObject, size } = action.payload
      state.isOpen = true
      state.bodyType = bodyType
      state.title = title
      state.size = size || 'md'
      state.extraObject = extraObject
    },

    closeModal: (state) => {
      state.isOpen = false
      state.bodyType = ""
      state.title = ""
      state.extraObject = {
        message: "",
        type: "",
        id: "",
        assistant_id: "",
        assistant_name: "",
        description: "",
        mainColor: "blue",
        launcherImage: "/logo.png",
        assistantImage: "/logo.png",
        assistantAvatar: "/logo.png",
        greeting: "How can I help you",
        title: "",
        prompt: "",
        name: "",
        status: ""
      }
    },

  }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer