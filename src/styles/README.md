# Styles Overview

The general approach for styling in this project follows [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) + [BEM](http://getbem.com/).

The `components` folder has been omitted in favor of keeping component stylesheets with their respective components.

## Component Stylesheet Structure

For component stylesheets, I like to structure stylesheets by ordering things from more specific to less specific relative to the component being styled. I add properties in alphabetical order for easy scanning in larger stylesheets.

```scss
// Top level selector is the component's classname
.component-name {
  // Component-level css properties
  background-color: blue;
  display: block;
  text-align: center;

  // Overrides (mixins / media queries)
  @include some-mixin {
    // I avoid nesting selectors in mixins
    // So that properties only apply
    // to the nearest selector for easier scanning
    background-color: red;
  }

  // Modifiers (BEM)
  &--inline {
    display: inline-block;
  }

  // Modifiers (Native pseudoselectors)
  &:active {
    border: 1px solid green;
  }

  // Blocks (BEM)
  // Child level selectors in template order (top -> bottom)
  &__child-element {
    font-style: italic;

    // Child modifiers

    // Overrides
  }

  // Blocks (non-component specific / pseudoselectors)
  &:before {
    content: "";
  }

  .some-other-component {
    margin-top: auto;
  }
}
```
