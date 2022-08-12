# Angular for ex-react developers

[Angular](https://angular.io/)
[React](https://reactjs.org/)

Inspired by [component-party.dev](https://component-party.dev)

## Installation

### App Generator / CLI

En el ecosistema de Angular, además del propio framework, existe un **Client Line Interface (CLI)** con una gran cantidad de utilidades, incluyendo un generador de proyectos o **workspaces**, que pueden incluir una o varias **aplicaciones** y **librerías**.

Por defecto el proceso incluye la creación de un **repositorio git** con su commit inicial. Esta funcionalidad puede desactivarse con el parámetro --commit=false.

```shell
    npm install -g @angular/cli
    ng new demo-isdi --create-application=false
    cd my-app
    ng g app --p isdi --routing
    npm start
```

#### React

```shell
    npx create-react-app my-app --template typescript
    cd my-app
    npm start
```

### Project update

El CLI de Angular incluye la herramienta **generate** que utiliza un conjunto de templates llamados **schematics** para poder automatizar la creación de los siguientes elementos de Angular

-   ng g <schematic> Run the provided schematic. [default]
-   ng g **app-shell** Generates an application shell for running a server-side version of an app.
-   ng g **application** [name] Generates a new basic application definition in the "projects" subfolder of the workspace. [aliases: app]
-   ng g **class** [name] Creates a new, generic class definition in the given or default project. [aliases: cl]
-   ng g **component** [name] Creates a new, generic component definition in the given or default project. [aliases: c]
-   ng g **directive** [name] Creates a new, generic directive definition in the given or default project. [aliases: d]
-   ng g **enum** [name] Generates a new, generic enum definition for the given or default project. [aliases: e]
-   ng g **guard** [name] Generates a new, generic route guard definition in the given or default project. [aliases: g]
-   ng g **interceptor** [name] Creates a new, generic interceptor definition in the given or default project.
-   ng g **interface** [name] [type] Creates a new, generic interface definition in the given or default project. [aliases: i]
-   ng g **library** [name] Creates a new, generic library project in the current workspace. [aliases: lib]
-   ng g **module** [name] Creates a new, generic NgModule definition in the given or default project. [aliases: m]
-   ng g **pipe** [name] Creates a new, generic pipe definition in the given or default project. [aliases: p]
-   ng g **resolver** [name] Generates a new, generic resolver definition in the given or default project. [aliases: r]
-   ng g **service** [name] Creates a new, generic service definition in the given or default project. [aliases: s]
-   ng g **service-worker** Pass this schematic to the "run" command to create a service worker
-   ng g **web-worker** [name] Creates a new, generic web worker definition in the given or default project.

Ya hemos utilizado `ng g app app1 -p isdi --routing` para añadir al **workspace** una primera **aplicación**

## Components

### Component definition

Los **componentes** en Angular siguen el modelo de los [custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) definidos en el estándar de HTML5 y utilizados en los [web components](https://www.webcomponents.org/)

Esto significa que

-   el componente sigue existiendo en el HTML que finalmente llega al navegador
-   la etiqueta que declara el componente en el HTML (**selector**) debe incluir un prefijo seguido de un guion para ser validado como **custom element** dentro del estándar HTML.

Además esto hace que los Web Components nativos de HTML puedan ser utilizados en Angular

#### React

Los componentes solo existen en tiempo de desarrollo, como soporte al resto de la estructura HTML, pero no se incluyen en el HTML finalmente generado.

### Minimal template

Para crear un primer componente con un template mínimo podemos usar el comando del CLI

```shell
ng g c hello-world -t -s
```

```ts angular helloworld.component.ts
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "isdi-hello-world",
    template: `<p>hello-world works!</p>`,
    styles: [],
})
export class HelloWorldComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
```

El **decorador** de la clase define alguno de sus metadatos, como

-   `selector` para el selectorHTML,
-   `templete` para la vista, en un HTML enriquecido
-   `style` para el css.

Lo habitual es no utilizar los modificadores -t y -s, con lo que los metadatos serán `templateUrl` y `styleUrls` y apuntaran a ficheros independientes para el html y el css

```ts angular helloworld.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "isdi-bye-world",
    templateUrl: "./bye-world.component.html",
    styleUrls: ["./bye-world.component.scss"],
})
export class ByeWorldComponent {}
```

El código de la clase, incluyendo el constructor y otros metodos del ciclo de vida del componente pueden omitirse si no se necesitan.

#### React

```jsx react HelloWorld.jsx
export default function HelloWorld() {
    return <h1>Hello world</h1>;
}
```

### Styling

Por defecto, los componentes de Angular utilizan **CSS encapsulado**, que sólo afecta a ese componente.
Para definirlo se utiliza un metadato del decorador del componente:

-   `style` si el CSS/SCSS va en el mismo fichero
-   `styleUrls` si el CSS/SCSS va en un fichero independiente

```ts angular cssstyle.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-css-style",
    template: `
        <h1 class="title">I am red</h1>
        <button style="font-size: 10rem">I am a button</button>
    `,
    styles: [
        `
            .title {
                color: red;
            }
        `,
    ],
})
export class CssStyleComponent {}
```

#### React

```jsx react CssStyle.jsx
import "./style.css";

export default function CssStyle() {
    return (
        <>
            <h1 className="title">I am red</h1>
            <button style={{ "font-size": "10rem" }}>I am a button</button>
        </>
    );
}
```

#### React + module.css

```jsx react CssStyle.jsx
import style from "./style.module.css";

export default function CssStyle() {
    return (
        <>
            <h1 className={style.title}>I am red</h1>
            <button style={{ "font-size": "10rem" }}>I am a button</button>
        </>
    );
}
```

```css style.css
.title {
    color: red;
}
```

## Modularization

Junto con el sistema de módulos de ES (ESM) que permite acceder al código de cada fichero, Angular utiliza lo que denomina **modules** para definir una serie de espacios de nombres (namespaces) en los que agrupa los elementos **declarables** (componentes, directivas y pipes) junto a la referencia como provider a los elementos **inyectables** (servicios).

### Creación de módulos

Estos módulos se crean con el correspondiente schematics, que permite vincular el nuevo módulo a alguno ya existente, como el módulo principal app

```shell
ng g m infrastructure/core -m app
```

```ts angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class CoreModule {}
```

Los metadatos validos en el decorador ngModule son

-   declarations: elementos **declarables** (componentes, directivas y pipes) incluidos
-   imports: módulos a los que se puede acceder para importar sus elementos declarados
-   exports: elementos declarados accesibles desde otro módulo
-   bootstrap: elementos declarados accesibles desde el inicio de la aplicación
-   providers: elementos inyectables de los que el inyector del módulo actuara como proveedor

Los módulos se crean

-   dependientes de otro (modificador -m)
-   preparados para el enrutamiento lazy (modificador --routing)

### Módulos feature y sus componentes iniciales

Para las distintas features de la aplicación es habitual crear módulos de este segundo tipo:

```shell
ng g m home --routing
ng g c home/home -t -s --flat
ng g m todo --routing
ng g c todo/todo -t -s --flat
ng g m about --routing
ng g c about/about -t -s --flat
```

## Routing

### Routes

Las rutas en Angular se definen a nivel de módulo:
En cada módulo puede usarse

-   el propio fichero del módulo (e.g. `app.module.ts`)
-   un fichero específico para las rutas (e.g. `app-routing.module.ts`)

En el segundo caso, que es lo más habitual, el modulo de rutas es importado en el módulo principal

```ts Angular app-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
```

```ts Angular app.module.ts;
import { NgModule, Component } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    imports: [BrowserModule, AppRoutingModule],
    declarations: [AppComponent, HomeComponent, AboutComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
```

```ts Angular home.component.ts
@Component({
    selector: "app-home",
    template: "<h1>Home page</h1>",
})
export class HomeComponent {}
```

```ts Angular about.component.ts
@Component({
    selector: "app-about",
    template: "<h1>About page</h1>",
})
export class AboutComponent {}
```

El template de alguno de los componentes, e.g. el componente principal, incluye el componente `router-outlet`, a continuación del cual se renderizará el componente definido en la ruta activa en cada momento.

```ts Angular
@Component({
    selector: "app-root",
    template: ` <router-outlet></router-outlet>`,
})
export class AppComponent {}
```

#### React With react-router-dom

```jsx react App.tsx
return (
    <Router>
        <Layer options={options}>
            <Routes>
                <Route path="">
                    <HomePage />
                </Route>
                <Route path="about">
                    <AboutPage />
                </Route>
                <Route path="*">
                    <Navigate replace to="" />
                </Route>
            </Routes>
        </Layer>
    </Router>
);
```

#### React With NextJS

```jsx react
|-- pages/
|-- index.js // index page "/"
|-- about.js // about page "/about"
|-- 404.js // handle error HTTP 404 page not found
|-- 500.js // handle error HTTP 500
|-- \_app.js // global app layout
```

### Lazy Routes

En Angular, la carga de los **módulos** puede diferirse hasta el momento en que son invocados por primera vez.

```TS angular app-routing.module.ts
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Una vez cargado un modulo de forma lazy es necesario haberle definido el componente que presentará inicialmente

```TS angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
```

#### React

```jsx react App.tsx
const HomePage = React.lazy(() => import("./pages/home"));
const AboutPage = React.lazy(() => import("./pages/about"));

return (
    <Router>
        <Layer options={options}>
            <React.Suspense>
                <Routes>
                    <Route path="" element={<HomePage />}></Route>
                    <Route path="about" element={<AboutPage />}></Route>
                    <Route path="*" element=<Navigate replace to="" />></Route>
                </Routes>
            </React.Suspense>
        </Layer>
    </Router>
);
```

### Router link

En los enlaces de Angular, la etiqueta de HTML a debe usar la directiva `routerLink` para definir el destino, de forma que este sea presentado en el contexto de la SPA, sin que se navegue realmente a una nueva url y por tanto sin que se recargue la página.

```ts angular app.component.html
<ul>
    <li>
        <a routerLink="/home">Home</a>
    </li>
    <li>
        <a routerLink="/about">About</a>
    </li>
</ul>
```

#### React with NextJS

```jsx react
import Link from "next/link";

export default function Home() {
    return (
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/about">
                    <a>About us</a>
                </Link>
            </li>
        </ul>
    );
}
```

## Reactivity

### Declare state

En Angular todas las **propiedades de la clase** que se instancia para crear el componente son reactivas, es decir sus cambios se reflejan automáticamente en el renderizado del componente

Para acceder desde el template a esas propiedades Angular dispone de un **operador de interpolación de expresiones**, las dobles llaves (**{{}}**), que permite que cualquier expresión JS sea evaluada, renderizandose su resultado.

```ts angular name.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-name",
    template: "<h1>Hello {{ name }}</h1>",
})
export class NameComponent {
    name = "John";
}
```

Existen otros operadores que configuran el lenguaje de templating de Angular:

-   {{}}
-   [] operador de atributos
-   () operador de eventos
-   [()] operador de doble binding
-   /# operador de referencias

El operador de atributos permite que cualquier atributo de un elemento HTML tome valor resolviendo la expresión que se le proporciona.

```ts angular
    <p [title]="info">Probando info</p>
    // No se usa el siguiente formato
    <p title="{{ info }}">Probando info</p>
```

#### React

```jsx react Name.jsx
import { useState } from "react";

export default function Name() {
    const [name] = useState("John");

    return <h1>Hello {name}</h1>;
}
```

### Update state

Como cualquier propiedad de la clase puede cambiar en cualquier momento, este cambio se reflejara inmediatamente en cualquier elemento del template que la utilice.

No existe a priori el concepto del estado y sus setters.

```ts angular name.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-name",
    template: "<h1>Hello {{ name }}</h1>",
})
export class NameComponent {
    name = "John";

    constructor() {
        this.name = "Jane";
    }
}
```

La forma en que se detectan estos cambios puede optimizarse mediante el metadato `changeDetection` que permite configurar Angular para espere objetos inmutables y por tanto solo compruebe el valor de las referencias a la hora de detectar los cambios.

#### React

```jsx react Name.jsx
import { useState } from "react";

export default function Name() {
    const [name, setName] = useState("John");
    setName("Jane");

    return <h1>Hello {name}</h1>;
}
```

### Computed state

El uso de los getters del estándar ES permite disponer de propiedades computadas, cuyo valor es siempre el resultado de la ejecución de una función que se producirá cada vez que se renderiza el componente.

```ts angular doublecount.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-doublecount",
    template: "<div>{{ doubleCount }}</div>",
})
export class DoublecountComponent {
    count = 10;

    get doubleCount() {
        return this.count * 2;
    }
}
```

#### React

```jsx react DoubleCount.jsx
import { useState } from "react";

export default function DoubleCount() {
    const [count] = useState(10);
    const doubleCount = count * 2;

    return <div>{doubleCount}</div>;
}
```

## Lifecycle

### On mount / On Init

En Angular existe un hook que permite ejecutar código inmediatamente después de que se haya renderizado el componente.

La convención del framework es que siempre que sea posible se inicialicen las propiedades del componente en este método.

```ts angular pagetitle.component.ts
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-pagetitle",
    template: "<p>Page title: {{ pageTitle }}</p>",
})
export class PagetitleComponent implements OnInit {
    pageTitle: string;

    ngOnInit() {
        this.pageTitle = document.title;
    }
}
```

#### React

```jsx react PageTitle.jsx
import { useState, useEffect } from "react";

export default function PageTitle() {
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        setPageTitle(document.title);
    }, []);

    return <p>Page title: {pageTitle}</p>;
}
```

### On unmount / On destroy

En Angular existe igualmente un hook que permite ejecutar código inmediatamente después de que se desmonte el componente.

Entre sus principales funciones esta eliminar timers y suscripciones a observables ya innecesarios.

```ts angular time.component.ts;
import { Component, OnDestroy } from "@angular/core";

@Component({
    selector: "app-time",
    template: "<p>Current time: {{ time }}</p>",
})
export class TimeComponent implements OnDestroy {
    time: string = new Date().toLocaleTimeString();
    timer: number;

    constructor() {
        this.timer = setInterval(() => {
            this.time = new Date().toLocaleTimeString();
        }, 1000);
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }
}
```

#### React

```jsx react Time.jsx
import { useState, useEffect } from "react";

export default function Time() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return <p>Current time: {time}</p>;
}
```

## Component Templating

### Iteration

La **directiva** `ngFor` permite de forma declarativa recorrer un array para poder renderizar un elemento por cada uno de los items del array

```ts angular colors.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-colors",
    template: `<ul>
        <li *ngFor="let color of colors">{{ color }}</li>
    </ul>`,
})
export class ColorsComponent {
    colors = ["red", "green", "blue"];
}
```

#### React

```jsx react Colors.jsx
export default function Colors() {
    const colors = ["red", "green", "blue"];
    return (
        <ul>
            {colors.map((color) => (
                <li key={color}>{color}</li>
            ))}
        </ul>
    );
}
```

### Conditional

En Angular existen dos opciones para crear de forma declarativa situaciones en las que el **renderizado** sea **condicional**

-   La **directiva** `ngIf`
-   La **directiva** `ngSwitch` / `ngSwitchCase`

#### Directiva `ngIf`

```ts angular
@Component({
    selector: "app-conditional",
    template: `
        <ng-container *ngIf="loaded; else elseTemplate">
            <p>Datos después de la carga inicial</p>
        </ng-container>
        <ng-template #elseTemplate>
            <p>Loading</p>
        </ng-template>
    `,
})
export class SampleComponent implements OnInit {
    loaded!: boolean;
    constructor() {}

    ngOnInit(): void {
        this.loaded = false;
        loadData();
    }
}
```

#### Directiva `ngSwitch` / `ngSwitchCase`

```ts angular trafficlight.component.ts
import { Component } from "@angular/core";

const TRAFFIC_LIGHTS = ["red", "orange", "green"];

@Component({
    selector: "app-trafficlight",
    template: `<button (click)="nextLight()">Next light</button>
        <p>Light is: {{ light }}</p>
        <p>
            You must
            <ng-container [ngSwitch]="light">
                <span *ngSwitchCase="'red'">STOP</span>
                <span *ngSwitchCase="'orange'">SLOW DOWN</span>
                <span *ngSwitchCase="'green'">GO</span>
            </ng-container>
        </p>`,
})
export class TrafficlightComponent {
    lightIndex = 0;

    get light() {
        return TRAFFIC_LIGHTS[this.lightIndex];
    }

    nextLight() {
        if (this.lightIndex + 1 > TRAFFIC_LIGHTS.length - 1) {
            this.lightIndex = 0;
        } else {
            this.lightIndex++;
        }
    }
}
```

#### React

```jsx react TrafficLight.jsx
import { useState } from "react";

const TRAFFIC_LIGHTS = ["red", "orange", "green"];

export default function TrafficLight() {
    const [lightIndex, setLightIndex] = useState(0);

    const light = TRAFFIC_LIGHTS[lightIndex];

    function nextLight() {
        if (lightIndex + 1 > TRAFFIC_LIGHTS.length - 1) {
            setLightIndex(0);
        } else {
            setLightIndex(lightIndex + 1);
        }
    }

    return (
        <>
            <button onClick={nextLight}>Next light</button>
            <p>Light is: {light}</p>
            <p>
                You must
                {light === "red" && <span>STOP</span>}
                {light === "orange" && <span>SLOW DOWN</span>}
                {light === "green" && <span>GO</span>}
            </p>
        </>
    );
}
```

### Events (e.g. click)

El **operador de eventos** () permite definir el **manejador o handler** de cualquiera de los eventos existentes en HTML

```ts angular counter.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-counter",
    template: `<p>Counter: {{ count }}</p>
        <button (click)="incrementCount()">+1</button>`,
})
export class CounterComponent {
    count = 0;

    incrementCount() {
        this.count++;
    }
}
```

#### React

```jsx react Counter.jsx
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    function incrementCount() {
        setCount((count) => count + 1);
    }

    return (
        <>
            <p>Counter: {count}</p>
            <button onClick={incrementCount}>+1</button>
        </>
    );
}
```

### Dom ref

En Angular, el operador **/#** permite generar, a nivel de la vista una variable que hace **referencia** al elemento del DOM en el que se declara.

El **decorador @ViewChild** permite que el controller del componente (la clase) acceda a un wrapper del **nodo del DOM**, cuya propiedad `nativeElement` corresponde al propio nodo.

```ts angular inputfocused.component.ts
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";

@Component({
    selector: "app-inputfocused",
    template: `<input type="text" #inputRef />`,
})
export class InputfocusedComponent implements OnInit {
    @ViewChild("inputRef", { static: true })
    inputRef!: ElementRef<HTMLInputElement>;

    ngOnInit() {
        this.inputRef.nativeElement.focus();
    }
}
```

#### React

```jsx react InputFocused.jsx
import { useEffect, useRef } from "react";

export default function InputFocused() {
    const inputElement = useRef(null);

    useEffect(() => inputElement.current.focus(), []);

    return <input type="text" ref={inputElement} />;
}
```

## Component composition

### Props#

```ts angular app.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<app-userprofile
        name="John"
        [age]="20"
        [favouriteColors]="['green', 'blue', 'red']"
        [isAvailable]="true"
    >
    </app-userprofile>`,
})
export class AppComponent {}
```

```ts angular userprofile.component.ts
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-userprofile",
    template: `
        <p>My name is {{ name }} !</p>
        <p>My age is {{ age }} !</p>
        <p>My favourite colors are {{ favouriteColors.join(", ") }} !</p>
        <p>I am {{ isAvailable ? "available" : "not available" }}</p>
    `,
})
export class UserprofileComponent {
    @Input() name: string = "";
    @Input() age: number = 0;
    @Input() favouriteColors: string[] = [];
    @Input() isAvailable: boolean = false;
}
```

#### React

```jsx react App.jsx
import UserProfile from "./UserProfile.jsx";

export default function App() {
    return (
        <UserProfile
            name="John"
            age={20}
            favouriteColors={["green", "blue", "red"]}
            isAvailable
        />
    );
}
```

```jsx react UserProfile.jsx
import PropTypes from "prop-types";

export default function UserProfile({
    name = "",
    age = null,
    favouriteColors = [],
    isAvailable = false,
}) {
    return (
        <>
            <p>My name is {name} !</p>
            <p>My age is {age} !</p>
            <p>My favourite colors are {favouriteColors.join(", ")} !</p>
            <p>I am {isAvailable ? "available" : "not available"}</p>
        </>
    );
}

UserProfile.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    favouriteColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    isAvailable: PropTypes.bool.isRequired,
};
```

### Execute from parent / Emit to parent

```ts angular answer-button.component.ts
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-answer-button",
    template: `<button (click)="yes.emit()">YES</button>
        <button (click)="no.emit()">NO</button>`,
})
export class AnswerButtonComponent {
    @Output() yes = new EventEmitter<void>();
    @Output() no = new EventEmitter<void>();
}
```

```ts angular app.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <p>Can I come ?</p>

        <app-answer-button (yes)="onAnswerYes()" (no)="onAnswerNo()">
        </app-answer-button>

        <p style="font-size: 50px">{{ canCome ? "😀" : "😥" }}</p>
    `,
})
export class AppComponent {
    canCome = true;

    onAnswerYes() {
        this.canCome = true;
    }

    onAnswerNo() {
        this.canCome = false;
    }
}
```

#### React

```jsx react App.jsx
import { useState } from "react";
import AnswerButton from "./AnswerButton.jsx";

export default function App() {
    const [canCome, setCanCome] = useState(true);

    function onAnswerNo() {
        setCanCome(false);
    }

    function onAnswerYes() {
        setCanCome(true);
    }

    return (
        <>
            <p>Can I come ?</p>
            <AnswerButton onYes={onAnswerYes} onNo={onAnswerNo} />
            <p style={{ fontSize: 50 }}>{canCome ? "😀" : "😥"}</p>
        </>
    );
}
```

```jsx react AnswerButton.jsx
import PropTypes from "prop-types";

export default function AnswerButton({ onYes, onNo }) {
    return (
        <>
            <button onClick={onYes}>YES</button>

            <button onClick={onNo}>NO</button>
        </>
    );
}

AnswerButton.propTypes = {
    onYes: PropTypes.func,
    onNo: PropTypes.func,
};
```

### Content Projection / Slot

```ts angular app.component.ts;
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: "<app-funny-button>Click me !</app-funny-button>",
})
export class AppComponent {}
```

```ts angular funny-button.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    styleUrls: ["./funny-button.component.css"],
    template: `
        <button>
            <ng-content></ng-content>
        </button>
    `,
})
export class FunnyButtonComponent {}
```

```css funny-button.component.css
button {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 10px 20px;
    font-size: 30px;
    border: 2px solid #fff;
    margin: 8px;
    transform: scale(0.9);
    box-shadow: 4px 4px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s;
    outline: 0;
}
```

#### React

```jsx react App.jsx;
import FunnyButton from "./FunnyButton.jsx";

export default function App() {
    return <FunnyButton>Click me !</FunnyButton>;
}
```

```jsx react FunnyButton.jsx
import PropTypes from "prop-types";

export default function FunnyButton({ children }) {
    return (
        <button
            style={{
                background: "rgba(0, 0, 0, 0.4)",
                color: "#fff",
                padding: "10px 20px",
                fontSize: "30px",
                border: "2px solid #fff",
                margin: "8px",
                transform: "scale(0.9)",
                boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
                transition:
                    "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
                outline: "0",
            }}
        >
            {children}
        </button>
    );
}

FunnyButton.propTypes = {
    children: PropTypes.node,
};
```

### Slot fallback

```ts angular app.component.ts;
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <app-funny-button></app-funny-button>

        <app-funny-button>
            <ng-template #content>I got content!</ng-template>
        </app-funny-button>
    `,
})
export class AppComponent {}
```

```ts funny-button.component.ts
import { Component, ContentChild, TemplateRef } from "@angular/core";

@Component({
    selector: "app-root",
    styleUrls: ["./funny-button.component.css"],
    template: `
        <button>
            <ng-container
                *ngIf="content; else fallback"
                [ngTemplateOutlet]="content"
            >
            </ng-container>

            <ng-template #fallback>
                <span>No content found</span>
            </ng-template>
        </button>
    `,
})
export class FunnyButtonComponent {
    @ContentChild("content", { read: TemplateRef })
    content?: TemplateRef<unknown>;
}
```

```css funny-button.component.css
button {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 10px 20px;
    font-size: 30px;
    border: 2px solid #fff;
    margin: 8px;
    transform: scale(0.9);
    box-shadow: 4px 4px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s;
    outline: 0;
}
```

#### React

```jsx react App.jsx;
import FunnyButton from "./FunnyButton.jsx";

export default function App() {
    return (
        <>
            <FunnyButton />
            <FunnyButton>I got content !</FunnyButton>
        </>
    );
}
```

```jsx react FunnyButton.jsx;
import PropTypes from "prop-types";

export default function FunnyButton({ children }) {
    return (
        <button
            style={{
                background: "rgba(0, 0, 0, 0.4)",
                color: "#fff",
                padding: "10px 20px",
                fontSize: "30px",
                border: "2px solid #fff",
                margin: "8px",
                transform: "scale(0.9)",
                boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
                transition:
                    "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
                outline: "0",
            }}
        >
            {children || <span>No content found</span>}
        </button>
    );
}

FunnyButton.propTypes = {
    children: PropTypes.node,
};
```

## Forms

### Input text

```ts angular input-hello.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-input-hello",
    template: '<input [value]="text" (change)="handleInputChange($event)" />',
})
export class InputHelloComponent {
    text = "";

    handleInputChange(event: Event) {
        this.text = (event.target as HTMLInputElement).value;
    }
}
```

#### React

```jsx react InputHello.jsx
import { useState } from "react";

export default function InputHello() {
    const [text, setText] = useState("Hello world");

    function handleChange(event) {
        setText(event.target.value);
    }

    return (
        <>
            <p>{text}</p>
            <input value={text} onChange={handleChange} />
        </>
    );
}
```

### Checkbox

```ts angular is-available.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-is-available",
    template: `<input
            id="is-available"
            type="checkbox"
            [checked]="isAvailable"
            (change)="handleChange()"
        />
        <label for="is-available">Is available</label>`,
})
export class IsAvailableComponent {
    isAvailable = false;

    handleChange() {
        this.isAvailable = !this.isAvailable;
    }
}
```

#### React

```jsx react IsAvailable.jsx
import { useState } from "react";

export default function IsAvailable() {
    const [isAvailable, setIsAvailable] = useState(false);

    function handleChange() {
        setIsAvailable(!isAvailable);
    }

    return (
        <>
            <input
                id="is-available"
                type="checkbox"
                checked={isAvailable}
                onChange={handleChange}
            />
            <label htmlFor="is-available">Is available</label>
        </>
    );
}
```

### Radio

```ts angular pick-pill.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-pick-pill",
    template: `
        <div>Picked: {{ picked }}</div>

        <input
            id="blue-pill"
            [checked]="picked === 'blue'"
            type="radio"
            value="blue"
            (change)="handleChange($event)"
        />
        <label for="blue-pill">Blue pill</label>

        <input
            id="red-pill"
            [checked]="picked === 'red'"
            type="radio"
            value="red"
            (change)="handleChange($event)"
        />
        <label for="red-pill">Red pill</label>
    `,
})
export class PickPillComponent {
    picked = "red";

    handleChange(event) {
        this.picked = event.target.value;
    }
}
```

#### React

```jsx react PickPill.jsx
import { useState } from "react";

export default function PickPill() {
    const [picked, setPicked] = useState("red");

    function handleChange(event) {
        setPicked(event.target.value);
    }

    return (
        <>
            <div>Picked: {picked}</div>

            <input
                id="blue-pill"
                checked={picked === "blue"}
                type="radio"
                value="blue"
                onChange={handleChange}
            />
            <label htmlFor="blue-pill">Blue pill</label>

            <input
                id="red-pill"
                checked={picked === "red"}
                type="radio"
                value="red"
                onChange={handleChange}
            />
            <label htmlFor="red-pill">Red pill</label>
        </>
    );
}
```

### Select

```ts angular color-select.component.ts
import { Component } from "@angular/core";

@Component({
    selector: "app-color-select",
    template: `<select
        [value]="selectedColorId"
        (change)="handleChange($event)"
    >
        <option
            *ngFor="let color of colors"
            [value]="color.id"
            [disabled]="color.isDisabled"
        >
            {{ color.text }}
        </option>
    </select>`,
})
export class ColorSelectComponent {
    selectedColorId = 2;

    colors = [
        { id: 1, text: "red" },
        { id: 2, text: "blue" },
        { id: 3, text: "green" },
        { id: 4, text: "gray", isDisabled: true },
    ];

    handleChange(event) {
        this.selectedColorId = event.target.value;
    }
}
```

#### React

```jsx react ColorSelect.jsx
import { useState } from "react";

const colors = [
    { id: 1, text: "red" },
    { id: 2, text: "blue" },
    { id: 3, text: "green" },
    { id: 4, text: "gray", isDisabled: true },
];

export default function ColorSelect() {
    const [selectedColorId, setSelectedColorId] = useState(2);

    function handleChange(event) {
        setSelectedColorId(event.target.value);
    }

    return (
        <select value={selectedColorId} onChange={handleChange}>
            {colors.map((color) => (
                <option
                    key={color.id}
                    value={color.id}
                    disabled={color.isDisabled}
                >
                    {color.text}
                </option>
            ))}
        </select>
    );
}
```

## RxJS (Reactive) features

### Fetch data

```ts angular user.service.ts;
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
    constructor(private http: HttpClient) {}

    loadUsers() {
        return this.http.get<UserResponse>(
            "https://randomuser.me/api/?results=3"
        );
    }
}

export interface UserResponse {
    results: User[];
    info: any;
}
```

```ts angular users.component.ts;
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Component({
    selector: "app-users",
    template: `
        <ng-container *ngIf="userService.state$ | async as vm">
            <div *ngIf="vm.loading; else errorTpl">Fetching users...</div>

            <ng-template #errorTpl>
                <p *ngIf="vm.error; else usersListTpl">
                    An error occured while fetching users
                </p>
            </ng-template>

            <ng-template #usersListTpl>
                <ul *ngIf="vm.users.length > 0">
                    <li *ngFor="let user of users">
                        <img [src]="user.picture.thumbnail" alt="user" />
                        <p>{{ user.name.first }} {{ user.name.last }}</p>
                    </li>
                </ul>
            </ng-template>
        </ng-container>
    `,
})
export class UsersComponent {
    constructor(public userService: UserService) {
        this.userService.loadUsers();
    }
}
```

#### React

```jsx react App.jsx;
import useFetchUsers from "./useFetchUsers";

export default function App() {
    const { isLoading, error, data: users } = useFetchUsers();

    return (
        <>
            {isLoading ? (
                <p>Fetching users...</p>
            ) : error ? (
                <p>An error occured while fetching users</p>
            ) : (
                users && (
                    <ul>
                        {users.map((user) => (
                            <li key={user.login.uuid}>
                                <img src={user.picture.thumbnail} alt="user" />
                                <p>
                                    {user.name.first} {user.name.last}
                                </p>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </>
    );
}
```

```jsx react useFetchUsers.js;
import { useEffect, useState } from "react";

export default function useFetchUsers() {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch(
                    "https://randomuser.me/api/?results=3"
                );
                const { results: users } = await response.json();
                setData(users);
                setError();
            } catch (err) {
                setData();
                setError(err);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return { isLoading, error, data };
}
```

### Reactive Forms

### Stateful services

```ts angular user.service.ts;
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface UsersState {
    users: User[];
    error: string | null;
    loading: boolean;
}

export const initialState: UsersState = {
    users: [],
    error: null,
    loading: false,
};

@Injectable({ providedIn: "root" })
export class UserService {
    private state = new BehaviorSubject<UsersState>(initialState);
    state$ = this.state.asObservable();

    constructor(private http: HttpClient) {}

    loadUsers() {
        this.state.next({ ...initialState, loading: true });

        this.http
            .get<UserResponse>("https://randomuser.me/api/?results=3")
            .subscribe({
                next: ({ results }) =>
                    this.state.next({ ...initialState, users: results }),
                error: (error) => this.state.next({ ...initialState, error }),
            });
    }
}

export interface UserResponse {
    results: User[];
    info: any;
}

export interface User {
    name: {
        title: string;
        first: string;
        last: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}
```

```ts angular users.component.ts;
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Component({
    selector: "app-users",
    template: `
        <ng-container *ngIf="userService.state$ | async as vm">
            <div *ngIf="vm.loading; else errorTpl">Fetching users...</div>

            <ng-template #errorTpl>
                <p *ngIf="vm.error; else usersListTpl">
                    An error occured while fetching users
                </p>
            </ng-template>

            <ng-template #usersListTpl>
                <ul *ngIf="vm.users.length > 0">
                    <li *ngFor="let user of users">
                        <img [src]="user.picture.thumbnail" alt="user" />
                        <p>{{ user.name.first }} {{ user.name.last }}</p>
                    </li>
                </ul>
            </ng-template>
        </ng-container>
    `,
})
export class UsersComponent {
    constructor(public userService: UserService) {
        this.userService.loadUsers();
    }
}
```
