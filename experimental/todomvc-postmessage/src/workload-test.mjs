import { BenchmarkStep, BenchmarkSuite } from "speedometer-utils/benchmark.mjs";
import { getAllElements, getElement } from "speedometer-utils/helpers.mjs";
import { getTodoText } from "speedometer-utils/todomvc.mjs";

const numberOfItemsToAdd = 100;
const defaultLanguage = "en";

const suites = {
    default: new BenchmarkSuite("default", [
        new BenchmarkStep("Adding-items", () => {
            const input = getElement(".new-todo-input", ["todo-app", "todo-topbar"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                input.value = getTodoText(defaultLanguage, i);
                input.dispatchEvent(new Event("input"));
                input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13, key: "Enter"}));
            }
        }),
        new BenchmarkStep("Completing-items", () => {
            const items = getAllElements("todo-item", ["todo-app", "todo-list"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                const item = getElement(".toggle-todo-input", [], items[i]);
                item.click();
            }
        }),
        new BenchmarkStep("Deleting-items", () => {
            const items = getAllElements("todo-item", ["todo-app", "todo-list"]);
            for (let i = numberOfItemsToAdd - 1; i >= 0; i--) {
                const item = getElement(".remove-todo-button", [], items[i]);
                item.click();
            }
        }),
    ]),
};

export default suites;
