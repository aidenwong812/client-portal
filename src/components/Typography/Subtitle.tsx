type PropTypes = {
	styleClass?: string
	children?: React.ReactNode
}
function Subtitle({ styleClass, children }: PropTypes) {
	return (
		<div className={`text-xl font-semibold ${styleClass}`}>{children}</div>
	)
}

export default Subtitle