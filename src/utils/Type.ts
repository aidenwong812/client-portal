export type SubMenu = {
  path: string,
  icon: JSX.Element,
  name: string
}

export type SideMenu = Array<{
  path: string,
  icon: JSX.Element,
  name: string,
  submenu?: SubMenu[]
}>

export type Assistant = {
  id?: string,
  assistant_name: string,
  date?: string
}

export type KnowledgeBase = {
  id?: string,
  name: string,
  assistant_id: string,
  type_of_knowledge: string,
  status: string,
  date?: string,
  file?: File | null
}

export type Prompt = {
  id?: string,
  title?: string,
  prompt: string,
  date?: string
}