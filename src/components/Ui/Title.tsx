'use client';
import React from "react";
import Link from "next/link";

export default function Title() {
    return <Link href={"/"}>
        <h1>
            <span className={"orange-text"}>Kir</span>
        -Kuty
        </h1>;
    </Link>
}