# Carousel Component

**Flight | Development Docs | Component Usage**

*August 23, 2018*

## I. Description

The carousel component uses *template projection* and is a two-part component designed to keep **animation/control functions** separate from **content display templates**. This allows custom design choices for slide layouts, while ensuring consistent carousel behavior that needs little to no additional configuration.

### A. Carousel Frame (Primary Component)

Similar to a television set, this component receives an array of content, separates each item into a separate "channel" or Carousel Item, and allows "channel switching" to display each of the generated Carousel Items separately.

Responsible for:

- UI Navigation Controls & Functions

- Carousel Item Frame Creation

- Carousel Item Frame Animation

Requires:

- An array of data containing separate content items.

- A Carousel Item template specifically designed to consume the received data structure.

### B. Carousel Item (Sub-Component)

The Carousel Item sub-component is an interchangeable static display element. It simply receives a single content item from the Carousel Frame and displays it in its customized template.

Responsible for:

- Parsing data into a template.

Requires:

- A single data item or object to populate the template.

#### Creating Custom Carousel Items

Creating your own Carousel Item sub-component is almost exactly the same as creating a static webpage. Obviously, you will need to know what the input data structure will be in order to parse it out into the template.

#### Naming Convention

When creating a new Carousel Item, use *CarouselItem* and a suffix for its type.

Exmaple: A carousel item for blog posts would be named `CarouselItemBlogPost`.

## II. Implementation | Quick Start (Refresher)

To use the Carousel component, you will **always** need the Carousel Frame (primary component) and a single Carousel Item (sub-component) wrapped in an `<ng-template>`.

**Simplified Structural Syntax** (Data Binding Omitted)
```
<carousel-frame>

  <ng-template>
    <carousel-item></carousel-item>
  </ng-template>

</carousel-frame>
```

**Full Structural Syntax Example** (Data Binding Shown)
```
// A Featured Blog Posts Carousel

<fly-carousel-frame [carouselItems]="featuredPosts">

  <ng-template let-item="item">
    <fly-carousel-item-blog-post [post]="item"></fly-carousel-item-blog-post>
  </ng-template>

</fly-carousel-frame>
```

## III. Implementation | Full Reference

### A. Example Scenario

The main component for the Blog section of our website has access to a list of 5 featured blog posts, which we want to display in a carousel in the main component's template.

Let's assume the following:

- The main component is called **BlogComponent**.

- The list of 5 posts is an array of 5 objects called **featuredPosts**, which lives inside of BlogComponent.

### B. Setup & Notes

Jump from setup-to-setup steps, if you don't need any explanation notes.

1. **Setup:** In *blog.component.html*, we'll add the Carousel's primary component, **CarouselFrame**. We'll also supply our *featuredPosts* list as an input to its `carouselItems` property.

```
// blog.component.html

<fly-carousel-frame [carouselItems]="featuredPosts">
</fly-carousel-frame>
```

2. **Note:** At this point, **CarouselFrame** has the data it needs and for each item in the list, it will create a corresponding carousel item frame. It's position indicator should show 5 positions and it should start animating. Now it just needs a **CarouselItem** sub-component.

3. **Setup:** Next, we insert our custom **CarouselItem** sub-component designed specifically to handle the blog post data in *featuredPosts*. In this case, the one we created for blog posts is called **CarouselItemBlogPost**.

```
// blog.component.html

<fly-carousel-frame [carouselItems]="featuredPosts">

  <fly-carousel-item-blog-post></fly-carousel-item-blog-post>

</fly-carousel-frame>
```

4. **Setup:** Since we need to use *template projection* to send **CarouselItemBlogPost** into **CarouselFrame**, we also need to encapsulate it in `<ng-template>` tags.

```
// blog.component.html

<fly-carousel-frame [carouselItems]="featuredPosts">

  <ng-template>
    <fly-carousel-item-blog-post></fly-carousel-item-blog-post>
  </ng-template>

</fly-carousel-frame>
```

5. **Note:** Structurally, we're all set. However, we still need to connect the data for each blog post to the **CarouselItem** sub-component we're using. Let's switch views to **CarouselFrame**'s TypeScript and HTML files to understand how the template is projected and thus, how we can pass in data.

6. **Note:** Recall that we wrapped our **CarouselItem** sub-component in `<ng-template>` tags. The **CarouselFrame** uses `@ContentChild(TemplateRef)` to see `<ng-template>` and provide a reference to it, which is then stored in a property called `carouselItemType`.

```
// carousel-frame.component.ts

import { Component, Input, OnInit, OnDestroy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'fly-carousel-frame',
  templateUrl: './carousel-frame.component.html',
  styleUrls: ['./carousel-frame.component.scss']
})
export class CarouselFrameComponent implements OnInit {

  // Provide reference to <ng-template> child.
  @ContentChild(TemplateRef) carouselItemType: TemplateRef<any>;
  @Input() carouselItems: Array<any>;
  ...
```

7. **Note:** Template Projection. Inside **CarouselFrame**'s template, `<ng-container>` marks the location where content will be projected. It requires the `carouselItemType` reference to understand what it should place there. On `<ng-container>`, `ngTemplateOutlet` is set to the `carouselItemType` reference, which identifies and pulls in the referenced `<ng-template>`. *This is how the **CarouselItem** template structure is projected into **CarouselFrame**.*

```
// carousel-frame.component.html

...
  <div class="carousel-items-container">

    <div *ngFor="let item of carouselItems; let i = index" [class]="'carousel-item-frame' + itemPosition(i)">

      // Container marks projection location
      // Template Outlet uses a reference to find and insert our carousel item template
      <ng-container [ngTemplateOutlet]="carouselItemType" [ngTemplateOutletContext]="{item: item}"></ng-container>

    </div>
  </div>
...
```

8. **Note:** Template Data Binding. Although the `<ng-template>` structure has made it into **CarouselFrame**, it also needs to be provided context to the data that it should have access to in its new home. The `*ngFor` directive passes down carousel `item` data and `ngTemplateOutletContext` makes this data available to the `<ng-template>` that is coming through `ngTemplateOutlet`. A fun way to think about this is imagining a wizard teleporting you to another world. On your way out of the portal, the wizard gives you some contextual info that you'll need for navigating your new environment. *This is how the **CarouselItem** template can gain access to data from **CarouselFrame** after its projection.*

9. **Note:** Template Outlet Context. If you're wondering about `{item: item}`, this is a repackaging of spread values. The provided context, doesn't include `*ngFor`'s original `item`, it provides `item`'s inner contents only once inside `<ng-template>`. Therefore, we repack the contents in an identically named key in order to pass one clean package all the way through.

```
// carousel-frame.component.html

...
  <div class="carousel-items-container">

    <div *ngFor="let item of carouselItems; let i = index" [class]="'carousel-item-frame' + itemPosition(i)">

      // TemplateOutletContext repacks spread item values from the ngFor loop
      // TemplateOutletContext provides the item object to the projected template
      <ng-container [ngTemplateOutlet]="carouselItemType" [ngTemplateOutletContext]="{item: item}"></ng-container>

    </div>
  </div>
...
```

10. **Setup:** Understanding how the **CarouselItem** template is projected and how data context is provided to the encapsulating `<ng-template>`, we need to finish passing the data down to the **CarouselItem** sub-component. First, the `item` data object provided inside of **CarouselFrame** needs to passed into `<ng-template>`. We create a variable called *item* on `<ng-template>` with `let-item` and set it to the `item` data object. Then we pass it into the primary data property on the **CarouselItem** sub-component. In the case of **CarouselItemBlogPost**, the `post` property serves as our data input for `item`.

```
// blog.component.html

<fly-carousel-frame [carouselItems]="featuredPosts">

  <ng-template let-item="item">
    <fly-carousel-item-blog-post [post]="item"></fly-carousel-item-blog-post>
  </ng-template>

</fly-carousel-frame>
```

11. **Note:** Once these final changes are made, the empty frames should not begin populating with data from `carouselItems`.
