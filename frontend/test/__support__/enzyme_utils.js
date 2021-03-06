import Button from "metabase/components/Button";

export const click = (enzymeWrapper) => {
    const nodeType = enzymeWrapper.type();
    if (nodeType === Button || nodeType === "button") {
        console.trace(
            'You are calling `click` for a button; you would probably want to use `clickButton` instead as ' +
            'it takes all button click scenarios into account.'
        )
    }
    // Normal click event. Works for both `onClick` React event handlers and react-router <Link> objects.
    // We simulate a left button click with `{ button: 0 }` because react-router requires that.
    enzymeWrapper.simulate('click', { button: 0 });
}

export const clickButton = (enzymeWrapper) => {
    // `clickButton` is separate from `click` because `wrapper.closest(..)` sometimes results in error
    // if the parent element isn't found, https://github.com/airbnb/enzyme/issues/410

    // Submit event must be called on the button component itself (not its child components), otherwise it won't work
    const closestButton = enzymeWrapper.closest("button");

    if (closestButton.length === 1) {
        closestButton.simulate("submit"); // for forms with onSubmit
        closestButton.simulate("click", { button: 0 }); // for lone buttons / forms without onSubmit
    } else {
        // Assume that the current component wraps a button element
        enzymeWrapper.simulate("submit");
        enzymeWrapper.simulate("click", { button: 0 });
    }
}

export const setInputValue = (inputWrapper, value, { blur = true } = {}) => {
    inputWrapper.simulate('change', { target: { value: value } });
    if (blur) inputWrapper.simulate("blur")
}

