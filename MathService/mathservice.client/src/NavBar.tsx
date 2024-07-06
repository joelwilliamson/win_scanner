

export interface NavigationItem {
    name: string;
    action: () => void;
}

export function NavBar({ brand, navItems }: { brand: string, navItems: NavigationItem[] }) {

    return (<nav
        className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container">
            <a className="navbar-brand">{brand}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="navbar-toggler-icon" >collapse</span>
            </button>
            <ul className="navbar-nav flex-grow-1">
                {navItems.map(item =>
                <li key={item.name} className="nav-item">
                        <a className="nav-link text-dark" href='#' onClick={item.action}>{item.name}</a>
                </li>
                )}
            </ul>
        </div>
    </nav>)
}