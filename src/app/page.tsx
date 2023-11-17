import Link from "next/link";
import MenuItem from "@/components/MenuItem/MenuItem";
import React from "react";
import styles from "/menu.module.css"

export default function Home() {
    return (
        <main>
            <MenuItem href="games/http" title={"Http"} subTitle={"A cool game"}/>
            <MenuItem href="games/http" title={"Http"} subTitle={"A cool game"}/>
        </main>
    )
}
