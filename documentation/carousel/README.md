# Flight

**Development Documentation | Component Usage**

## Carousel Component
*August 23, 2018*

### I. Description

The carousel component makes use of *template projection* and is a two-part component designed to keep **animation/control functions** separate from **content display templates**. This allows custom design choices for slide layouts, while ensuring consistent carousel behavior that needs little to no additional configuration.

#### A. Carousel Frame (Primary Component)

Similar to a television set, this component receives an array of content, separates each item into a separate "channel" or Carousel Item, and allows "channel switching" to display each of the generated Carousel Items separately.

Responsible for:

- UI Navigation Controls & Functions

- Carousel Item Frame Creation

- Carousel Item Frame Animation

Requires:

- An array of data containing separate content items.

- A Carousel Item template specifically designed to consume the received data structure.

#### B. Carousel Item (Sub-Component)

The Carousel Item sub-component is an interchangeable static display element. It simply receives a single content item from the Carousel Frame and displays it in its customized template. Creating your own Carousel Item sub-component is almost exactly the same as creating a static webpage.

Responsible for:

- Parsing data into a template.

Requires:

- A single data item or object to populate the template.

### II. Example Implementation

To use the Carousel component, you will always need the CarouselFrame (primary component) and a single Carousel Item sub-component wrapped in an `<ng-template>`.

**Simplified Syntax**
```
<carousel-frame>

  <ng-template>
    <carousel-item></carousel-item>
  </ng-template>

</carousel-frame>
```
