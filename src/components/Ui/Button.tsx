type ButtonProps = {
    text: string
    onClick: (param: string) => void
    color: string | null
    href?: string
    big?: boolean
    veryBig?: boolean
    type?: 'submit' | 'reset' | 'button'
}
export default function Button(props: ButtonProps) {
    return (
        <button
            className={props.veryBig ? 'button-with-very-big-text' : props.big ? 'button-with-big-text' : ''}
            onClick={() => {
                props.onClick(props.text)
            }}
            style={props.color ? { backgroundColor: props.color } : {}}
            type={props.type}
        >
            {props.text}
        </button>
    )
}
