interface ListWrapper {
    children : React.ReactNode;
}

export function ListWrapper({children} : ListWrapper){
    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            {children}
        </li>
    )
}