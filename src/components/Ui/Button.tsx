type buttonProps = {
    text: string
    onClick: (param: string) => void
    color: string | null
}
export default function Button(props: buttonProps) {
    return (
        <button
            onClick={() => {
                props.onClick(props.text)
            }}
            style={props.color ? { backgroundColor: props.color } : {}}
        >
            {props.text}
        </button>
    )
}
