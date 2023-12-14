type PropTypes = {
	styleClass: string,
	children: string
}

function ErrorText({ styleClass, children }: PropTypes) {
	return (
		<p className={`text-center  text-error ${styleClass}`}>{children}</p>
	)
}

export default ErrorText