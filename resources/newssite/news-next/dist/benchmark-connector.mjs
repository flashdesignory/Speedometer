/*
    Note: This will eventually come from a separate package and should be minified.
*/
window.name = "news-site-next";
window.version = "1.0.0";

/** **********************************************************************
 * Params
 *
 * All params are now forwarded from the benchmark to the workload, via its url.
 * To ensure we're handling any used params the same way as the benchmark,
 * we are converting the values to their native type.
 *************************************************************************/
function isBoolean(value) {
    if (value === "true" || value === "false")
        return true;

    return false;
}

function isNumber(value) {
    const number = Number(value);
    return Number.isInteger(number);
}

function convertToBoolean(value) {
    if (value === "true")
        return true;

    if (value === "false")
        return false;

    return value;
}

function convertToNumber(value) {
    return Number(value);
}

function getConvertedValue(value) {
    if (isBoolean(value))
        return convertToBoolean(value);

    if (isNumber(value))
        return convertToNumber(value);

    return value;
}

function getParams(value) {
    const params = Object.create(null);
    const searchParams = new URLSearchParams(value);

    for (const entry of searchParams.entries()) {
        const [key, value] = entry;
        params[key] = getConvertedValue(value);
    }

    return Object.freeze(params);
}

/** **********************************************************************
 * Benchmark Connector
 *
 * postMessage is used to communicate between app and benchmark.
 * When the app os ready, an 'app-ready' message is sent to signal that the app can receive instructions.
 *
 * A prepare script within the apps appends window.name and window.version from the package.json file.
 * The appId is build by appending name-version
 * It's used as an additional safe-guard to ensure the correct app responds to a message.
 *************************************************************************/
const appId = window.name && window.version ? `${window.name}-${window.version}` : -1;

function sendMessage(message) {
    window.top.postMessage(message, "*");
}

window.onmessage = async (event) => {
    // ensure we only let legit functions run...
    if (event.data.id !== appId || event.data.key !== "benchmark-connector")
        return;

    switch (event.data.type) {
        case "benchmark-suite":
            // eslint-disable-next-line no-case-declarations
            const params = getParams(window.location.search);
            // eslint-disable-next-line no-case-declarations
            const { result } = await window.benchmarkSuitesManager.getSuiteByName(event.data.name).runAndRecord({ params, onProgress: (test) => sendMessage({ type: "step-complete", status: "success", appId, name, test }) });
            sendMessage({ type: "suite-complete", status: "success", appId, result });
            break;
    }
};

/* requestAnimationFrame(() => {
    sendMessage({ type: "app-ready", status: "success", appId });
    console.log(`Hello, benchmark connector for ${appId} is ready!`);
}); */

window.initWorkload = () => {
    sendMessage({ type: "app-ready", status: "success", appId });
    console.log(`Hello, benchmark connector for ${appId} is ready!`);
};