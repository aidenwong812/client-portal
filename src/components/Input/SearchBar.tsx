type PropTypes = {
  searchText: string,
  styleClass: string,
  placeholderText?: string,
  setSearchText: (value: string) => void
}

function SearchBar({ searchText, styleClass, placeholderText, setSearchText }: PropTypes) {
  const updateSearchInput = (value: string) => {
    setSearchText(value)
  }

  return (
    <div className={"inline-block " + styleClass}>
      <div className="input-group  relative flex flex-wrap items-stretch w-full ">
        <input type="search" value={searchText} placeholder={placeholderText || "Search"} onChange={(e) => updateSearchInput(e.target.value)} className="input input-sm input-bordered  w-full max-w-xs" />
      </div>
    </div>
  )
}

export default SearchBar
