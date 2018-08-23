# Carousel Component

**Flight | Development Docs | Component Usage**

*August 23, 2018*

## I. Description

The carousel component makes use of *template projection* and is a two-part component designed to keep **animation/control functions** separate from **content display templates**. This allows custom design choices for slide layouts, while ensuring consistent carousel behavior that needs little to no additional configuration.

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

The Carousel Item sub-component is an interchangeable static display element. It simply receives a single content item from the Carousel Frame and displays it in its customized template. Creating your own Carousel Item sub-component is almost exactly the same as creating a static webpage.

Responsible for:

- Parsing data into a template.

Requires:

- A single data item or object to populate the template.

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

**Example Scenario**

The main component for the Blog section of our website has access to a list of 5 featured blog posts, which we want to display in a carousel in the main component's template.

Let's assume the following:

- The main component is called **BlogComponent**.

- The list of 5 posts is an array of 5 objects called **featuredPosts**, which lives inside of BlogComponent.

**Actions & Explanations**

1. **Action:** In *blog.component.html*, we'll add the Carousel's primary component, **CarouselFrame**. We'll also supply our *featuredPosts* list as an input to its `carouselItems` property.

```
blog.component.html

<fly-carousel-frame [carouselItems]="featuredPosts">
</fly-carousel-frame>
```

2. **Explanation:** At this point, **CarouselFrame** has the data it needs and for each item in the list, it will create a corresponding item frame. It's position indicator should show 5 positions and it should start animating. Now it just needs a **CarouselItem** template.

3. **Action:** Next, we insert our custom **CarouselItem** template designed specifically to handle the blog post data in *featuredPosts*. The component name starts with *CarouselItem* and includes a suffix for its type. In this case, it's **CarouselItemBlogPost**.

```
blog.component.html

<fly-carousel-frame [carouselItems]="featuredPosts">

  <fly-carousel-item-blog-post></fly-carousel-item-blog-post>

</fly-carousel-frame>
```

4. **Action:** Since we need to use *template projection* to send **CarouselItemBlogPost** into **CarouselFrame**, we also need to encapsulate it in `<ng-template>` tags.

```
blog.component.html

<fly-carousel-frame [carouselItems]="featuredPosts">

  <ng-template>
    <fly-carousel-item-blog-post></fly-carousel-item-blog-post>
  </ng-template>

</fly-carousel-frame>
```

5. **Explanation:** Structurally, we're all set. However, we still need to connect the data for each blog post to the **CarouselItem** template we're using. Let's switch file views to **CarouselFrame**'s TypeScript and template files to understand what needs to be done.

```
carousel-frame.component.ts

import { Component, Input, OnInit, OnDestroy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'fly-carousel-frame',
  templateUrl: './carousel-frame.component.html',
  styleUrls: ['./carousel-frame.component.scss']
})
export class CarouselFrameComponent implements OnInit {
  @ContentChild(TemplateRef) carouselItemType: TemplateRef<any>;
  @Input() carouselItems: Array<any>;
  ...
```

```
carousel-frame.component.html

<div class="carousel-frame">

  ...

  <div class="carousel-items-container">
    <div *ngFor="let item of carouselItems; let i = index" [class]="'carousel-item-frame' + itemPosition(i)">

      <ng-container [ngTemplateOutlet]="carouselItemType" [ngTemplateOutletContext]="{item: item}"></ng-container>

    </div>
  </div>

</div>

```
