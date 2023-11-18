type buttonProps = {
    text: String
    onClick: () => void | null
    color: string | null
}
export default function Button(props: buttonProps) {
    return (
        <button onClick={props.onClick} style={props.color ? { backgroundColor: props.color } : {}}>
            {props.text}
        </button>
    )
}
