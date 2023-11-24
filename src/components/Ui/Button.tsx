type buttonProps = {
    text: string
    onClick: (param: string) => void
    color: string | null
    href?: string
    big?: boolean
}
export default function Button(props: buttonProps) {
    return (
        <button
            className={props.big ? 'button-with-big-text' : ''}
            onClick={() => {
                props.onClick(props.text)
            }}
            style={props.color ? { backgroundColor: props.color } : {}}
        >
            {props.text}
        </button>
    )
}
