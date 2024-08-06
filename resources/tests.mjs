import { BenchmarkTestStep } from "./benchmark-runner.mjs";
import { todos } from "./translations.mjs";

const numberOfItemsToAdd = 100;
const defaultLanguage = "en";

function getTodoText(lang, index) {
    const todosSelection = todos[lang] ?? todos[defaultLanguage];
    const currentIndex = index % todosSelection.length;
    return todosSelection[currentIndex];
}

export const Suites = [];

Suites.enable = function (names, tags) {
    if (names?.length) {
        const lowerCaseNames = names.map((each) => each.toLowerCase());
        this.forEach((suite) => {
            if (lowerCaseNames.includes(suite.name.toLowerCase()))
                suite.disabled = false;
            else
                suite.disabled = true;
        });
    } else if (tags?.length) {
        tags.forEach((tag) => {
            if (!Tags.has(tag))
                console.error(`Unknown Suites tag: "${tag}"`);
        });
        const tagsSet = new Set(tags);
        this.forEach((suite) => {
            suite.disabled = !suite.tags.some((tag) => tagsSet.has(tag));
        });
    } else {
        console.warn("Neither names nor tags provided. Enabling all default suites.");
        this.forEach((suite) => {
            suite.disabled = !("default" in suite.tags);
        });
    }
    if (this.some((suite) => !suite.disabled))
        return;
    let message, debugInfo;
    if (names?.length) {
        message = `Suites "${names}" does not match any Suite. No tests to run.`;
        debugInfo = {
            providedNames: names,
            validNames: this.map((each) => each.name),
        };
    } else if (tags?.length) {
        message = `Tags "${tags}" does not match any Suite. No tests to run.`;
        debugInfo = {
            providedTags: tags,
            validTags: Array.from(Tags),
        };
    }
    alert(message);
    console.error(message, debugInfo);
};

Suites.push({
    name: "TodoMVC-WebComponents",
    url: "/workloads/todomvc-web-components/",
    tags: ["todomvc", "webcomponents"],
    async prepare(page) {},
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const input = page.querySelector(".new-todo-input", ["todo-app", "todo-topbar"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                input.setValue(getTodoText(defaultLanguage, i));
                input.dispatchEvent("input");
                input.enter("keyup");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const items = page.querySelectorAll("todo-item", ["todo-app", "todo-list"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                const item = items[i].querySelectorInShadowRoot(".toggle-todo-input");
                item.click();
            }
        }),
        new BenchmarkTestStep("DeletingAllItems", (page) => {
            const items = page.querySelectorAll("todo-item", ["todo-app", "todo-list"]);
            for (let i = numberOfItemsToAdd - 1; i >= 0; i--) {
                const item = items[i].querySelectorInShadowRoot(".remove-todo-button");
                item.click();
            }
        }),
    ],
});

Suites.push({
    name: "NewsSite-Next-External",
    url: "/workloads/news-site-next/",
    tags: ["newssite", "language", "compare"],
    config: {
        remote: true,
        name: "Navigation", // used to get the correct BenchmarkSuite
        steps: 3, // manual step for the progress display on the bottom: this is the number of BenchmarkSteps in a BenchmarkSuite.
    },
    async prepare(page) {
        await page.waitForElement("#navbar-dropdown-toggle");
    },
});

Suites.push({
    name: "NewsSite-Next-S3",
    url: "/workloads/news-site-next/",
    tags: ["newssite", "language", "compare"],
    async prepare(page) {
        await page.waitForElement("#navbar-dropdown-toggle");
    },
    tests: [
        new BenchmarkTestStep("NavigateToUS", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-us-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToWorld", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-world-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToPolitics", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-politics-link").click();
            page.layout();
        }),
    ],
});

/* Suites.push({
    name: "NewsSite-Next-Workloads",
    url: "/workloads/news-site-next/",
    tags: ["newssite", "language", "compare"],
    async prepare(page) {},
    tests: [
        new BenchmarkTestStep("NavigateToUS", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-us-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToWorld", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-world-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToPolitics", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-politics-link").click();
            page.layout();
        }),
    ],
}); */

Suites.push({
    name: "NewsSite-Nuxt",
    url: "/workloads/news-site-nuxt/",
    tags: ["newssite"],
    async prepare(page) {},
    tests: [
        new BenchmarkTestStep("NavigateToUS", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-us-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToWorld", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-world-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToPolitics", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-politics-link").click();
            page.layout();
        }),
    ],
});

Suites.push({
    name: "Third-Party-Basic",
    url: "/workloads/news-site-next-third-party-basic/",
    tags: ["newssite", "language", "third-party"],
    async prepare(page) {},
    tests: [
        new BenchmarkTestStep("NavigateToUS", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-us-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToWorld", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-world-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToPolitics", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-politics-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToBusiness", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-business-link").click();
            page.layout();
        }),
    ],
});

Suites.push({
    name: "Third-Party-Capital",
    url: "/workloads/news-site-next-third-party-capital/",
    tags: ["newssite", "language", "third-party"],
    async prepare(page) {},
    tests: [
        new BenchmarkTestStep("NavigateToUS", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-us-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToWorld", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-world-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToPolitics", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-politics-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("NavigateToBusiness", (page) => {
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-business-link").click();
            page.layout();
        }),
    ],
});

Suites.push({
    name: "Examples-Hello-World",
    url: "/workloads/hello-world/",
    tags: ["examples"],
    async prepare(page) {},
    tests: [
        new BenchmarkTestStep("IncreasingCounter", (page) => {
            const button = page.querySelector("#increase-btn");
            for (let i = 0; i < 10; i++)
                button.click();

        }),
        new BenchmarkTestStep("DecreaseCounter", (page) => {
            const button = page.querySelector("#decrease-btn");
            for (let i = 0; i < 10; i++)
                button.click();

        }),
    ],
});

Object.freeze(Suites);
Suites.forEach((suite) => {
    if (!suite.tags)
        suite.tags = [];
    if (suite.url.startsWith("experimental/"))
        suite.tags.unshift("all", "experimental");
    else if (suite.disabled)
        suite.tags.unshift("all");
    else
        suite.tags.unshift("all", "default");
    Object.freeze(suite.tags);
    Object.freeze(suite.steps);
});

export const Tags = new Set(["all", "default", "experimental", ...Suites.flatMap((suite) => suite.tags)]);
Object.freeze(Tags);

globalThis.Suites = Suites;
globalThis.Tags = Tags;
