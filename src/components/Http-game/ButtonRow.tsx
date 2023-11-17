'use client'
import React from "react";
import Button from "@/components/Ui/Button";
import {Answers} from "@/app/games/http/page";



type buttonRowProps = {
    answers: Answers
    onNext: () => void
    revealed: boolean
    onClick: (id: number) => void
}

export default function ButtonRow(props: buttonRowProps) {
    return (
        <>
            <div className = "center">
                {
                    props.answers.strings.map((answer, index) => (
                        <Button key = {index} text = {answer} onClick = {() => props.onClick(index)} color = {
                            props.revealed
                                ? (props.answers.correctBtnIndex == index ? "green" : "red") : "black"
                        }/>))
                }
            
            </div>
            <Button key = "next" text = {"Következő"} onClick = {props.onNext} color = "blue"></Button>
        </>
    )
}