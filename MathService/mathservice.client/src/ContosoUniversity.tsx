import { useState } from 'react';
import { NavBar, NavigationItem } from './NavBar';

import { StudentsView } from './ContosoUniversity/Students';

enum Section {
    Home,
    Students,
    Courses,
    Instructors,
    Departments
}

export function HomeSection() {


    return (<>
        <div className="jumbotron">
            <h1>Contoso University</h1>
        </div>

        <div className="row">
            <div className="col-md-4">
                <h2>Welcome to Contoso University</h2>
                <p>
                    Contoso University is a sample application that
                    demonstrates how to use Entity Framework Core in an
                    ASP.NET Core MVC web application.
                </p>
            </div>
            <div className="col-md-4">
                <h2>Build it from scratch</h2>
                <p>You can build the application by following the steps in a series of tutorials.</p>
                <p><a className="btn btn-default" href="https://docs.asp.net/en/latest/data/ef-mvc/intro.html">See the tutorial &raquo;</a></p>
            </div>
            <div className="col-md-4">
                <h2>Download it</h2>
                <p>You can download the completed project from GitHub.</p>
                <p><a className="btn btn-default" href="https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/data/ef-mvc/intro/samples/5cu-final">See project source code &raquo;</a></p>
            </div>
        </div>

    </>)
}


export function ContosoUniversity() {
    const [currentSection, setCurrentSection] = useState(Section.Home);

    const navItems: NavigationItem[] = [
        { name: "Home", action: () => setCurrentSection(Section.Home) },
        { name: "Students", action: () => setCurrentSection(Section.Students) },
        { name: "Courses", action: () => setCurrentSection(Section.Courses) },
        { name: "Instructors", action: () => setCurrentSection(Section.Instructors) },
        { name: "Departments", action: () => setCurrentSection(Section.Departments ) }
    ];

    return <div className="container">
        <main role="main" className="pb-3">
            <NavBar brand="Contoso University" navItems={navItems} />
            <CurrentSection />
        </main>
    </div>;

    function CurrentSection() {
        switch (currentSection) {
            case Section.Home: return <HomeSection />;
            case Section.Students: return <StudentsView />
            case Section.Courses: return <p>Courses</p>
            case Section.Instructors: return <p>Instructors</p>
            case Section.Departments: return <p>Departments</p>
        }
    }
}