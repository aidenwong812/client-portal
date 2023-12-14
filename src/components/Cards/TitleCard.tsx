import Subtitle from "../Typography/Subtitle"

type PropTypes = {
  title: string | JSX.Element,
  children: any,
  topMargin?: string,
  TopSideButtons?: any
}

function TitleCard({ title, children, topMargin, TopSideButtons }: PropTypes) {
  return (
    <div className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>

      {/* Title for Card */}
      <Subtitle styleClass={TopSideButtons ? "flex items-center justify-between flex-col sm:flex-row gap-3" : ""}>
        {title}

        {/* Top side button, show only if present */}
        {
          TopSideButtons && <div className="flex items-center">{TopSideButtons}</div>
        }
      </Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className='h-full w-full pb-6 bg-base-100'>
        {children}
      </div>
    </div>

  )
}


export default TitleCard