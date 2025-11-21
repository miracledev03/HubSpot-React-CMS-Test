# Test Project: Comparison Table Module Development

## Overview

This project implements a configurable **Comparison Table** using HubSpot’s **CMS React Framework**.  
The goal was to recreate the provided design while giving content editors full control to add, remove, and configure plans, sections, and feature rows directly inside the HubSpot page editor.

The module is built entirely with React, scoped CSS modules, and HubSpot’s field-based schema system.

---

## Approach

### 1. Data-driven structure using `ModuleFields`
The table is fully driven by HubSpot fields.

This is implemented using nested `RepeatedFieldGroup` components.

### 2. React component for rendering
The UI is built in `/components/modules/index.jsx` and receives all editor-configured data through `fieldValues`.  
The layout automatically adjusts based on how many plans or features the editor provides.

### 3. Scoped styling with CSS Modules
`/styles/comparison-table.module.css` is used for styling the module.

### 4. Local development workflow
The module was tested using `hs project dev` and deployed using `hs project deploy`.  
Module previews were tested at:
http://hslocal.net:3000/module/ComparisonTable

### 5. Live page for testing
https://244417785.hs-sites-na2.com/doctoralia

---

## Key Decisions

### 1. Using nested repeaters for flexibility
The table structure required support for variable numbers of plans, sections, rows, and cell values.  
Nested `RepeatedFieldGroup` components provided the simplest and most flexible way for editors to add or remove items without changing the code.

### 2. Keeping the component fully data-driven
The React component renders whatever the editor enters.  
No fixed number of rows or columns is assumed, which keeps the module reusable for different comparison layouts..

### 3. Rendering rich text manually inside repeaters
Because `RichText` cannot be used inside a repeater with a field path, promo text is edited with `RichTextField` and rendered using `dangerouslySetInnerHTML`.  

### 4. Standardizing cell types
Each table cell uses a `ChoiceField` with three options: `check`, `text`, or `blank`.  
This keeps the editor experience clear and keeps rendering logic easy to maintain.

### 5. Providing realistic default content
Default plans, sections, rows, and values were structured carefully so the module works immediately when added to a page.  
This avoids confusing empty states for editors.

---

## Obstacles Faced

### 1. Field validation errors
HubSpot rejected certain fields because names like "name" and "label" are reserved.  
**How I solved:** These fields were renamed to "planName" and "rowLabel", which allowed the module to validate correctly.

### 2. Incorrect ChoiceField configuration
I used an object-based format for choice options in the beginning, which HubSpot does not support.  
**How I solved:** All ChoiceField options were rewritten using the required `['value', 'Label']` array format.

### 3. Issues rendering rich text inside repeaters
The `<RichText />` component cannot be used inside nested repeaters because it expects a field path, not a value.  
**How I solved:** Promo text is edited with `RichTextField` but rendered using `dangerouslySetInnerHTML`, which works reliably within repeaters.

### 4. Nested default values causing validation failures
Complex nested repeaters (sections → rows → values) require tightly structured default data.  
Invalid or inconsistent defaults caused the module to fail validation.  
**How I solved:** All default objects were standardized to match the exact schema expected by HubSpot.

---

## Additional Information

### 1. Local Development
Run npm install to set up dependencies.
Start the HubSpot local development server using hs project dev.
Open http://hslocal.net:3000/module/ComparisonTable to preview the module.

### 2. Deployment
Verify the module builds without validation errors.
Deploy the project using `hs project deploy`.
After deployment, the ComparisonTable module appears in the HubSpot page editor inside the theme’s module list.

### 3. Editing the Module in HubSpot
Add the module to any page that uses this React CMS theme.
Content can be created or removed directly from the editor.

### 4. Data Structure Overview
`Plans` represent the table columns.
`Sections` group related feature rows.
`Rows` contain a label, an optional helper text value, and a list of values that match the plan order.
`Values` define the individual cell contents.
