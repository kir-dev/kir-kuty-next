type buttonProps = {
    text: String,
    onClick: () => void;
    color: string|null
}
export default function Button(props: buttonProps) {
    return <button onClick = {props.onClick} style={props.color?{borderColor: props.color}: {}}>
        {props.text}
    </button>;
}